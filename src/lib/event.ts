const whatsappNumber = "393468022848";
export function whatsappLink(message = "") {
  return `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
export type ReleaseStatus =
  "AVAILABLE" | "SOLD OUT" | "NEXT" | "CURRENT RELEASE";
export type Release = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  benefits: string;
  status: ReleaseStatus;
  endsAt?: string;
  url?: string;
};
export const event = {
  name: "FOBIA PIETRASOLE",
  date: "31 OCT 2026",
  dateISO: "2026-10-31T21:00:00+01:00",
  location: "Masseria Pietrasole",
  payoff: "UNA NOTTE DENTRO LE TUE PAURE.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  mapsUrl: "https://share.google/Fwdj2Vf0Kybxr2W0X",
  xceedUrl:
    "https://xceed.me/en/bari/event/fobia-pietrasole-halloween-party/248338/channel/puglia-night",
  dinnerUrl: whatsappLink(),
  // Paths to original files only. Leave empty until supplied; never replace logos with redraws.
  artwork: {
    hero: "/artwork/hero.png",
    headerDate: "/artwork/date.png",
    heroText: "/artwork/3_piotta.png",
    dinner: "/artwork/dinner-fobia.png",
    party: "/artwork/dance-fobia.png",
    location: "/artwork/location.png",
    social: "/artwork/hero.png",
  },
  heroSupplement: {
    alt: "DINNER SHOW · HALLOWEEN PARTY · DRINKLIST SELECTION. DRESSCODE OBBLIGATORIO | PREMIO MIGLIOR COSTUME.",
    desktop: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 85,
      y: 638,
      width: 910,
      height: 73,
    },
    dinner: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 91,
      y: 644,
      width: 221,
      height: 32,
    },
    party: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 333,
      y: 644,
      width: 296,
      height: 32,
    },
    drinks: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 649,
      y: 644,
      width: 340,
      height: 32,
    },
    dresscode: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 220,
      y: 675,
      width: 314,
      height: 30,
    },
    prize: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 544,
      y: 675,
      width: 316,
      height: 30,
    },
  },

  partners: [
    {
      name: "Cambè",
      src: "/artwork/partners/CAMBE-PARTNER-1.png",
      crop: {
        sourceWidth: 1080,
        sourceHeight: 1350,
        x: 145,
        y: 482,
        width: 790,
        height: 386,
      },
    },
    {
      name: "NŌH Samba",
      src: "/artwork/partners/NOH-SAMBA-PARTNER-2.png",
      crop: {
        sourceWidth: 661,
        sourceHeight: 471,
        x: 0,
        y: 0,
        width: 661,
        height: 471,
      },
    },
    {
      name: "Hagakure",
      src: "/artwork/partners/HAGAKURE-PARTNER-3.png",
      crop: {
        sourceWidth: 1080,
        sourceHeight: 1350,
        x: 276,
        y: 638,
        width: 528,
        height: 72,
      },
    },
    {
      name: "Yuppies",
      src: "/artwork/partners/YUPPIES-PARTNER-4.png",
      crop: {
        sourceWidth: 1080,
        sourceHeight: 1350,
        x: 174,
        y: 473,
        width: 732,
        height: 402,
      },
    },
  ],
  artworkCrops: {
    headerDate: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 222,
      y: 597,
      width: 636,
      height: 154,
    },
    hero: {
      sourceWidth: 1080,
      sourceHeight: 1350,
      x: 6,
      y: 280,
      width: 1068,
      height: 790,
    },
    location: {
      sourceWidth: 1350,
      sourceHeight: 1080,
      x: 48,
      y: 122,
      width: 1254,
      height: 836,
    },
  },
  copy: {
    ticketsPayoff: "PRIMA SCEGLI. MENO SPENDI.",
    address: "STRADA SCANZANO - BARI",
    directionsLabel: "GET DIRECTION",
    producersLabel: "UN EVENTO PRODOTTO DA",
    dinnerLabel: "NOH DINNER SHOW",
    experiencesHeading: "SCEGLI COME PARTECIPARE",
    dinnerPreviewTitle: "NOH EXPERIENCE",
    dinnerPreviewMusic: "Music by: Valerio Barile Hybrid Duo + Alessandro Guastella",
    dinnerFormat: "DINNER SHOW",
    dinnerPerformance: "Una cena spettacolo con Valerio Barile Hybrid Duo e Alessandro Guastella.",
    dinnerJourney: "Sei portate firmate dallo Chef Daniel Cavuoto, in un percorso gastronomico attraverso le nostre fobie.",
    dinnerClosing: "NON AVERE PAURA!",
    ticketsExplanation: "I ticket sono per la festa dopo cena con ingresso a partire dalle 23:30.",
    partyFormat: "AFTER DINNER PARTY",
    partyIntro: "Dalle 23:30, la paura cambia ritmo.",
    partySummary: "Dj Set & Club Dancefloor",
    partyLineupLabel: "LINE UP PARTY",
    partyLineupAnnouncement: "TBA",
    dinnerIncludesParty:
      "La partecipazione alla cena è su prenotazione e comprende l'accesso al party.",
  },
  dinner: {
    name: "NŌH",
    start: "21:00",
    price: 60,
    note: "Vini esclusi",
    artworkStyle: {
      desktopPosition: "center 42%",
      mobilePosition: "center 38%",
      opacity: 0.5,
    },
    menu: [
      { fear: "ARACNOFOBIA", dish: "Black Waffle · Mayo polpo · Tobiko" },
      { fear: "SUINOFOBIA", dish: "Basara Sandwich and Red Sauce" },
      { fear: "EMOFOBIA", dish: "Salmone · Barbabietola · Yuzu Miso" },
      { fear: "COULROFOBIA", dish: "Sushi Roll" },
      {
        fear: "CUCURBITOFOBIA",
        dish: "Risotto alla zucca candita · Barbabietola · Lampone",
      },
      { fear: "CANNIBALOFOBIA", dish: "Dessert arachide e lampone" },
    ],
  },
  party: {
    start: "23:30",
    entryFrom: "23:30",
    artworkStyle: {
      desktopPosition: "center 60%",
      mobilePosition: "center 58%",
      opacity: 0.58,
    },
    lineup: [
      "VALERIO BARILE HYBRID DUO",
      "ALESSANDRO GUSTELLA",
      "GAETANO GALA",
      "CISKY",
    ],
  },
  releases: [
    {
      id: "early",
      name: "EARLY PASS",
      price: 15,
      quantity: 200,
      benefits: "Fast Lane + 1 drink",
      status: "CURRENT RELEASE",
      endsAt: "2026-10-18T23:59:00+02:00",
      url: "",
    },
    {
      id: "second",
      name: "SECOND RELEASE",
      price: 20,
      quantity: 200,
      benefits: "Fast Lane + 1 drink",
      status: "NEXT",
      endsAt: "2026-10-25T23:59:00+01:00",
      url: "",
    },
    {
      id: "final",
      name: "FINAL RELEASE",
      price: 25,
      quantity: 500,
      benefits: "Fast Lane + 1 drink",
      status: "NEXT",
      url: "",
    },
    {
      id: "door",
      name: "DOOR ENTRY",
      price: 30,
      benefits: "Ingresso + 1 drink",
      status: "NEXT",
    },
  ] satisfies Release[],
  tables: [
    {
      id: "super",
      name: "BACK CONSOLE SUPER PRIVÉE",
      description:
        "La postazione più esclusiva della serata. Direttamente alle spalle del DJ.",
      availability: "1 solo tavolo disponibile",
      minimum: 600,
      deposit: 100,
      entries: "Fino a 10 ingressi Fast Track.",
      extra: "",
      cta: "RESERVE SUPER PRIVÉE",
      url: whatsappLink(
        "Ciao, vorrei prenotare il BACK CONSOLE SUPER PRIVÉE per FOBIA Pietrasole del 31 ottobre 2026.",
      ),
    },
    {
      id: "prive",
      name: "PRIVÉE",
      description: "Il tuo spazio dentro la notte.",
      availability: "",
      minimum: 200,
      deposit: 50,
      entries: "5 ingressi compresi.",
      extra:
        "Fino a 5 ingressi aggiuntivi a €40 p.p., convertiti in spesa al tavolo.",
      cta: "RESERVE PRIVÉE",
      url: whatsappLink(
        "Ciao, vorrei prenotare un tavolo PRIVÉE per FOBIA Pietrasole del 31 ottobre 2026.",
      ),
    },
  ],
};
export function activeRelease(
  releases: readonly Release[],
  now = Date.now(),
): Release | undefined {
  const eligible = releases.filter(
    (r) =>
      r.id !== "door" &&
      r.status !== "SOLD OUT" &&
      (!r.endsAt || now <= Date.parse(r.endsAt)),
  );
  return (
    eligible.find((r) => r.status === "CURRENT RELEASE") ??
    eligible.find((r) => r.status === "AVAILABLE") ??
    eligible[0]
  );
}
export function releaseState(
  release: Release,
  current?: Release,
  now = Date.now(),
): ReleaseStatus | "CLOSED" {
  if (release.status === "SOLD OUT") return "SOLD OUT";
  if (release.endsAt && now > Date.parse(release.endsAt)) return "CLOSED";
  return release.id === current?.id
    ? "CURRENT RELEASE"
    : release.status === "CURRENT RELEASE"
      ? "AVAILABLE"
      : release.status;
}
export function endLabel(iso: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Rome",
  }).format(new Date(iso));
}
