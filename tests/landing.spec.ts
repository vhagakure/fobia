import { test, expect } from "@playwright/test";
import { activeRelease, event, releaseState } from "../src/lib/event";
for (const width of [320, 390, 768, 1440]) {
  test(`layout and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400 && !r.url().endsWith("favicon.ico"))
        errors.push(`${r.status()} ${r.url()}`);
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "FOBIA",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("link", { name: "SCOPRI LA NOTTE" }).click();
    await expect(page).toHaveURL(/#experiences$/);
    await expect(page.locator("#experiences .fine-print")).toBeVisible();
    await expect(page.locator(".menu-item")).toHaveCount(6);
    await expect(page.locator(".artist")).toHaveCount(0);
    await expect(page.getByText("MUSIC BY", { exact: true })).toHaveCount(0);
    await expect(page.locator("#dinner .fine-print")).toHaveText(
      event.copy.dinnerIncludesParty,
    );
    await expect(page.locator(".release.current")).toHaveCount(1);
    expect(errors).toEqual([]);
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `/tmp/fobia-${width}.png`,
        fullPage: true,
      });
  });
}
test("party CTAs open the supplied XCEED offer", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  for (const link of [
    page.getByRole("link", { name: "GET TICKET ON XCEED" }),
    page.locator(".sticky-ticket .sticky-party"),
  ]) {
    await expect(link).toHaveAttribute("href", event.xceedUrl);
    await expect(link).toHaveAttribute("target", "_blank");
  }
});
test("metadata and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page).toHaveTitle("FOBIA PIETRASOLE | Halloween 31 Oct 2026");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "it_IT",
  );
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});
test("release switching respects sellouts, Rome deadlines and door exclusion", () => {
  const before = Date.parse("2026-10-18T23:58:00+02:00");
  expect(activeRelease(event.releases, before)?.id).toBe("early");
  const sold = event.releases.map((r) => ({
    ...r,
    status: r.id === "early" ? ("SOLD OUT" as const) : r.status,
  }));
  expect(activeRelease(sold, before)?.id).toBe("second");
  expect(
    activeRelease(event.releases, Date.parse("2026-10-19T00:00:00+02:00"))?.id,
  ).toBe("second");
  expect(
    activeRelease(event.releases, Date.parse("2026-10-26T00:00:00+01:00"))?.id,
  ).toBe("final");
  expect(
    releaseState(
      event.releases[0],
      undefined,
      Date.parse("2026-10-19T00:00:00+02:00"),
    ),
  ).toBe("CLOSED");
  expect(
    activeRelease(
      event.releases.map((r) => ({ ...r, status: "SOLD OUT" as const })),
      before,
    ),
  ).toBeUndefined();
});

test("poster typography loads the local serif font", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.locator("h1").evaluate((el) => getComputedStyle(el).fontFamily),
  ).not.toContain("Arial");
  expect(
    await page
      .locator("html")
      .evaluate((el) =>
        getComputedStyle(el).getPropertyValue("--font-poster").trim(),
      ),
  ).not.toBe("");
});

test("dinner reservation opens the requested WhatsApp chat", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const link = page.getByRole("link", { name: "PRENOTA LA DINNER EXPERIENCE" });
  await expect(link).toHaveAttribute("href", "https://wa.me/393468022848");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(page.locator("#experiences .fine-print")).toHaveText(
    event.copy.dinnerIncludesParty,
  );
  await expect(page.locator(".intro-foot")).toHaveCount(0);
  await expect(
    page.getByText("Dj Set & Club Dancefloor", { exact: true }),
  ).toBeVisible();
});

test("official artwork loads and crops in the requested sections", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const partners = page.locator(".partners-top img");
  await expect(partners).toHaveCount(4);
  const hero = page.locator(".hero-artwork > .cropped-artwork img");
  const location = page.locator(".intro-location img");
  for (const img of [...(await partners.all()), hero, location]) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(page.locator(".hero-title")).toHaveCount(0);
  await expect(page.locator(".intro-location")).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /artwork\/hero.png$/,
  );
});

test("partner order and persistent dinner CTA", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(
    await page
      .locator(".partners-top .partners-row img")
      .evaluateAll((images) => images.map((img) => img.getAttribute("alt"))),
  ).toEqual(["Cambè", "NŌH Samba", "Hagakure", "Yuppies"]);
  const cta = page.locator(".sticky-ticket .sticky-dinner");
  await expect(cta).toHaveAttribute("href", "https://wa.me/393468022848");
  for (const action of await page.locator(".sticky-ticket > .action").all()) {
    await expect(action).toBeInViewport();
    expect((await action.boundingBox())?.height).toBeGreaterThanOrEqual(44);
  }
  await page.locator("#tables").scrollIntoViewIfNeeded();
  await expect(cta).toBeInViewport();
});

test("Halloween Party uses the new dancefloor description", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#party")).toContainText(
    "DJ SET & CLUB DANCEFLOOR",
  );
  await expect(page.locator("#party")).not.toContainText("Musica, performance");
  const artwork = page.locator(".party-backdrop img");
  await artwork.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      artwork.evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
      ),
    )
    .toBe(true);
});

test("table WhatsApp requests, location and production credits", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const messages: string[] = [];
  for (const name of ["RESERVE SUPER PRIVÉE", "RESERVE PRIVÉE"]) {
    const url = new URL(
      (await page
        .getByRole("link", { name, exact: true })
        .getAttribute("href"))!,
    );
    expect(url.origin + url.pathname).toBe("https://wa.me/393468022848");
    messages.push(url.searchParams.get("text")!);
  }
  expect(messages[0]).toContain("BACK CONSOLE SUPER PRIVÉE");
  expect(messages[1]).toContain("un tavolo PRIVÉE");
  expect(messages[0]).not.toBe(messages[1]);
  await expect(page.locator("#tickets")).toContainText(
    "PRIMA SCEGLI. MENO SPENDI.",
  );
  await expect(page.locator("#location")).toContainText(
    "STRADA SCANZANO - BARI",
  );
  await expect(
    page.getByRole("link", { name: "GET DIRECTION", exact: true }),
  ).toHaveAttribute("href", "https://share.google/Fwdj2Vf0Kybxr2W0X");
  await expect(
    page.getByRole("heading", { name: "UN EVENTO PRODOTTO DA" }),
  ).toBeVisible();
  expect(
    await page
      .locator(".production-credits img")
      .evaluateAll((images) => images.map((img) => img.getAttribute("alt"))),
  ).toEqual(["Cambè", "NŌH Samba", "Hagakure", "Yuppies"]);
});

test("hero supplement is centered below the payoff and its artwork loads", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  const supplement = page.locator(".hero-supplement");
  await supplement.scrollIntoViewIfNeeded();
  await expect(supplement).toHaveAttribute(
    "aria-label",
    /DRESSCODE OBBLIGATORIO/,
  );
  const bounds = (await supplement.boundingBox())!;
  const payoff = (await page.locator(".hero-artwork > p").boundingBox())!;
  expect(bounds.y).toBeGreaterThan(payoff.y + payoff.height);
  expect(Math.abs(bounds.x + bounds.width / 2 - 195)).toBeLessThan(2);
  for (const img of await page.locator(".hero-supplement-mobile img").all()) {
    await expect
      .poll(() =>
        img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});

test("dinner artwork loads behind content while the six-course menu stays readable", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const image = page.locator(".dinner-backdrop img");
  await page.locator(".dinner-stage").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      image.evaluate(
        (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(page.locator("#dinner")).toHaveClass(/has-dinner-artwork/);
  await expect(page.locator(".dinner-menu .menu-item")).toHaveCount(6);
  await expect(page.locator(".dinner-stage .action")).toHaveAttribute(
    "href",
    "https://wa.me/393468022848",
  );
});

test("header uses the centered original date artwork", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const date = page.locator(".header-date");
  await expect(date.getByRole("img")).toHaveAttribute("alt", event.date);
  await expect
    .poll(() =>
      date
        .locator("img")
        .evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0),
    )
    .toBe(true);
  const box = (await date.boundingBox())!;
  expect(Math.abs(box.x + box.width / 2 - 195)).toBeLessThan(2);
  await expect(page.locator(".site-header > span")).toHaveCount(0);
});

test("updated dinner narrative, party entry and ticket inclusions", async ({ page }) => {
  await page.goto("/");
  const tickets = page.locator("#tickets");
  await expect(tickets).not.toContainText(/PASS TOTALI|PASS DISPONIBILI|Drink non incluso/);
  await expect(tickets.locator(".release").last()).toContainText("Ingresso + 1 drink");
  await expect(tickets.locator(".fine-print")).toContainText(event.copy.ticketsExplanation);
  await expect(tickets.locator(".fine-print")).toContainText(event.copy.dinnerIncludesParty);
  const dinner = page.locator("#dinner");
  await expect(dinner.getByRole("heading", { level: 2 })).toHaveText("NOHDINNER SHOW");
  await expect(dinner).toContainText("Alessandro Guastella");
  await expect(dinner).toContainText("Chef Daniel Cavuoto");
  await expect(dinner).toContainText("NON AVERE PAURA!");
  const party = page.locator("#party");
  await expect(party.locator(".section-top")).toContainText("AFTER DINNER PARTY");
  await expect(party.locator(".section-top")).toContainText("ENTRY FROM 23:30");
  await expect(party.locator(".party-copy")).toHaveText("Dalle 23:00, la paura cambia ritmo.");
});
