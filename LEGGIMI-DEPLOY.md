# FOBIA PIETRASOLE — consegna per il programmatore

Landing approvata fino all’ultima revisione: quattro loghi originali in alto e in chiusura, hero con occhi, Masseria nell’intro, NOH Dinner Show, Halloween Party con illustrazione di sfondo, release ticket, tavoli e CTA fisse cena/Party.

## Avvio rapido

Runtime verificato: Node.js 24.19.0 e npm 11.9.0. Stack: Next.js 16 App Router, React, TypeScript, Tailwind CSS 4. Nessun backend, database o segreto richiesto dalla landing.

Dalla cartella `fobia` del pacchetto:

```sh
npm ci
npm run dev
```

Per produzione:

```sh
npm ci
npm run build
npm start
```

`npm start` avvia Next.js sulla porta 3000. Il processo Node deve restare attivo. È possibile passare `--port 8080` con `npm start -- --port 8080`. I file originali e il font sono serviti dal progetto: non richiedono CDN esterne.

## Deploy su Vercel

Caricare il codice della cartella `fobia` nel repository gestito dal programmatore e importarlo in Vercel. Framework: **Next.js**. Root directory: la cartella contenente `package.json`. Install command: `npm ci`. Build command: `npm run build`. Output directory: default del framework. Se disponibile, scegliere Node.js 24.

Configurare il dominio effettivo in `src/lib/event.ts`, poi eseguire il deployment. Non sono presenti token o credenziali nel pacchetto. Il codice nel pacchetto è completo; non si deve presumere che sia già pubblicato nel repository GitHub indicato in package.json.

In alternativa è possibile usare un hosting che supporta un processo Node/Next.js, con HTTPS e proxy verso la porta dell’app. La build `.next` viene generata sul server; non è inclusa nello ZIP. Il deploy Node/Vercel usa l’ottimizzazione immagini Next.js. È disponibile anche la build statica per GitHub Pages descritta sotto.

## Da configurare prima della pubblicazione

Unico file per contenuti e collegamenti: **src/lib/event.ts**.

- `siteUrl`: origine HTTPS reale del sito, per canonical e URL assoluti Open Graph/Twitter. Finché vuota, Next.js usa localhost per le immagini social durante la build.
- `xceedUrl`: già impostato al checkout Party fornito dall’organizzatore. Tutte le CTA di acquisto Party usano questo URL.
- `releases[].url`: eventuale URL specifico della singola offerta; se vuoto viene usato `xceedUrl`.
- Verificare stati, prezzi e date delle release con l’organizzatore prima del lancio.

Il checkout XCEED è configurato: https://xceed.me/en/bari/event/fobia-pietrasole-halloween-party/248338/channel/puglia-night. `quantity` indica la capienza iniziale, non i biglietti residui: non c’è un collegamento live all’inventario XCEED. Gli stati SOLD OUT vanno aggiornati manualmente nel config.

## Collegamenti già configurati

- Cena: WhatsApp +39 346 802 2848.
- SUPER PRIVÉE: stesso WhatsApp con messaggio precompilato per BACK CONSOLE SUPER PRIVÉE.
- PRIVÉE: stesso WhatsApp con messaggio precompilato per un tavolo PRIVÉE.
- GET DIRECTION: https://share.google/Fwdj2Vf0Kybxr2W0X.

La cena su prenotazione comprende l’accesso al Party. Il prezzo DOOR ENTRY include 1 drink. L’ingresso Party è dalle 23:30; la dicitura sul cambio di ritmo è stata rimossa. I pass Party includono Fast Lane e 1 drink, come da configurazione. I tavoli si prenotano tramite WhatsApp.

## Asset e design

Tutti i file originali sono in `public/artwork`. I ritagli avvengono nel layout CSS, senza alterazioni degli originali. `event.partners` contiene i quattro loghi nell’ordine 1–4; il componente `PartnerLogos` li riusa in alto e in fondo. NŌH Samba ha dimensione originale 661×471; gli altri loghi hanno canvas 1080×1350. Non normalizzare i canvas o sostituire i loghi con testi.

La grafica originale date.png sostituisce la data centrale nell’intestazione, con ritaglio in artworkCrops.headerDate e dimensione responsive. La versione mobile ha spazi tra sezioni e blocchi più compatti, mantenendo leggibili le grafiche e CTA con touch target adeguati. Hero e location hanno crop dedicati in `artworkCrops`. Il file TESTO-HERO è `3_piotta.png`, centrato sotto il payoff: i crop in `heroSupplement` mostrano la riga completa su desktop e più righe leggibili su mobile, usando sempre i pixel originali. `dinner-fobia.png` è lo sfondo della parte introduttiva NOH Dinner Show, con posizioni responsive e opacità in `dinner.artworkStyle`; il menu mantiene il fondo rosso per leggibilità. `dance-fobia.png` è lo sfondo decorativo del Party, con ritaglio responsive, opacità e gradienti; le impostazioni sono in `party.artworkStyle`. Il font Bodoni Moda è incluso tramite il pacchetto npm e `next/font/local`. La licenza originale del font è in `licenses/Bodoni-Moda-OFL.txt`.

## Verifica

```sh
npm run typecheck
npm run build
npm test
```

I test Playwright avviano un server di produzione sulla porta 3000: liberarla prima del test. Se Chromium di sistema non è disponibile:

```sh
npx playwright install chromium
npm test
```

In alternativa usare `CHROMIUM_PATH` per indicare un eseguibile Chromium già installato. Verificati build, TypeScript e 17 test: responsive da 320 a 1440 px, CTA, link e messaggi, asset, release, riduzione movimento e metadati. I test non eseguono pagamenti o inviano messaggi WhatsApp.

Dopo il deploy verificare da telefono: hero e immagini, assenza di scroll orizzontale, WhatsApp cena e tavoli, Maps, prezzo corrente nella barra fissa e checkout XCEED. Verificare la social preview dal dominio definitivo.

## Anteprima inclusa

`ANTEPRIMA/FOBIA.html`, nella radice dello ZIP, è una pagina autonoma per revisione, con immagini e font incorporati. Si apre direttamente nel browser. È un’istantanea del layout e delle release, non la versione di produzione: per aggiornamenti automatici delle scadenze e per il sito live usare il progetto Next.js.

Per rigenerarla, con Python 3 e il server di produzione acceso:

```sh
python scripts/export-preview.py --url http://127.0.0.1:3000 --output FOBIA-anteprima.html
```

`SHA256SUMS.txt` nella radice del pacchetto permette di verificare l’integrità di tutti i file consegnati.


## GitHub Pages — build statica pronta

```sh
npm ci
npm run build:pages
```

Il comando produce `out/`, genera copie WebP ottimizzate (gli originali restano intatti) e configura basePath `/fobia` e URL `https://vhagakure.github.io/fobia/`. Il sito mantiene JavaScript e cambio automatico delle release. È stato verificato localmente a 320, 390 e 1440 px, compreso passaggio €15 → €20 dopo la scadenza.

È già stato caricato un branch `gh-pages` con il sito compilato e `.nojekyll`. Per attivarlo, il proprietario del repository deve aprire https://github.com/vhagakure/fobia/settings/pages, scegliere Source **Deploy from a branch**, branch **gh-pages**, cartella **/(root)** e salvare. Il caricamento del branch non prova che GitHub Pages sia attivo: l’attivazione e l’URL esterno vanno verificati.

Per un altro dominio/percorso, impostare `NEXT_PUBLIC_BASE_PATH` e `NEXT_PUBLIC_SITE_URL` prima di `npm run build:pages`. L’export statico usa `src/lib/assets.ts` per gli URL pubblici sotto il percorso corretto; `.next` e `public/optimized` sono output rigenerabili. La build normale rimane `npm run build`.

## Revisione cena spettacolo

Hero: SCOPRI L'EVENTO. Intro diretto: IL 31 OTTOBRE CI VEDIAMO A PIETRASOLE., DINNER SHOW · HALLOWEEN PARTY e breve descrizione. La cena dà priorità alla musica: CENA SPETTACOLO, DALLE 21:00, MUSIC BY, VALERIO BARILE / LIVE HYBRID DUO e ALESSANDRO GUASTELLA, poi MENU BY NŌH SAMBA, portate, chef, prezzo e PRENOTA LA CENA. Artisti in dinner.musicians; diciture in copy. Party mantiene DJ SET & CLUB DANCEFLOOR, LINE UP PARTY / TBA e ingresso dalle 23:30; il testo sul cambio di ritmo è rimosso. Ticket: TICKETS & RELEASES senza PASSES. Il Privée non ha più il payoff descrittivo.
