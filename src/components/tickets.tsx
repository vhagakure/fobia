"use client";
import { useEffect, useState } from "react";
import { activeRelease, endLabel, event, releaseState } from "@/lib/event";
import { Action } from "./action";
export function Tickets() {
  const [now, setNow] = useState<number | undefined>();
  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  const current =
    now === undefined
      ? event.releases.find((r) => r.status === "CURRENT RELEASE")
      : activeRelease(event.releases, now);
  return (
    <>
      <section id="tickets" className="section tickets">
        <div className="section-top">
          <span className="eyebrow">04 / HALLOWEEN PARTY · PASSES</span>
          <span className="eyebrow">{event.copy.ticketsPayoff}</span>
        </div>
        <h2 className="display">
          ENTER
          <br />
          <span className="outline">FOBIA.</span>
        </h2>
        <p className="ticket-progression">
          €15 <span>→</span> €20 <span>→</span> €25 <span>→</span> €30{" "}
          <small>DOOR</small>
        </p>
        <div className="release-list">
          {event.releases.map((r, i) => {
            const state = releaseState(r, current, now);
            return (
              <article
                key={r.id}
                className={`release ${state === "CURRENT RELEASE" ? "current" : ""} ${state === "SOLD OUT" || state === "CLOSED" ? "closed" : ""}`}
              >
                <div className="release-name">
                  <span className="eyebrow">
                    0{i + 1} / <span className="status">{state}</span>
                  </span>
                  <h3>{r.name}</h3>
                  <p>{r.benefits}</p>
                </div>
                <div className="release-price">€{r.price}</div>
                <div className="release-details">
                  {r.quantity && <p>{r.quantity} PASS TOTALI</p>}
                  {r.endsAt && (
                    <p>
                      Fino al {endLabel(r.endsAt)}
                      <br />o esaurimento disponibilità.
                    </p>
                  )}
                  {r.id === "door" && (
                    <p>
                      Solo al botteghino.
                      <br />
                      Drink non incluso.
                    </p>
                  )}
                </div>
                {state === "CURRENT RELEASE" && (
                  <Action href={r.url || event.xceedUrl}>
                    GET TICKET ON XCEED
                  </Action>
                )}
              </article>
            );
          })}
        </div>
        <p className="fine-print">
          I pass e i tavoli sono per l’Halloween Party.{" "}
          {event.copy.dinnerIncludesParty} Disponibilità e acquisto dei pass
          sono confermati su XCEED.
        </p>
      </section>
      <nav
        className="sticky-ticket"
        aria-label="Prenota cena o acquista ticket Party"
      >
        <Action href={event.dinnerUrl} className="sticky-dinner">
          PRENOTA CENA
        </Action>
        <Action href={current?.url || event.xceedUrl} className="sticky-party">
          {current ? `PARTY €${current.price} → XCEED` : "PARTY → XCEED"}
        </Action>
      </nav>
    </>
  );
}
