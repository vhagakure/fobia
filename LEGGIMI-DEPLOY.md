# FOBIA PIETRASOLE — consegna per il programmatore

Landing approvata fino all’ultima revisione: quattro loghi originali in alto e in chiusura, hero con occhi, Masseria nell’intro, NŌH Experience, Halloween Party con illustrazione di sfondo, release ticket, tavoli e CTA fisse cena/Party.

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

In alternativa è possibile usare un hosting che supporta un processo Node/Next.js, con HTTPS e proxy verso la porta dell’app. La build `.next` viene generata sul server; non è inclusa nello ZIP. Questo progetto usa l’ottimizzazione immagini di Next.js e va pubblicato come applicazione Next.js.

## Da configurare prima della pubblicazione

Unico file per contenuti e collegamenti: **src/lib/event.ts**.

- `siteUrl`: origine HTTPS reale del sito, per canonical e URL assoluti Open Graph/Twitter. Finché vuota, Next.js usa localhost per le immagini social durante la build.
- `xceedUrl`: URL reale del checkout Party. Può essere usato per tutte le release.
- `releases[].url`: eventuale URL specifico della singola offerta; se vuoto viene usato `xceedUrl`.
- Verificare stati, prezzi e date delle release con l’organizzatore prima del lancio.

Gli URL XCEED sono ancora vuoti: le CTA Party attualmente mostrano un messaggio di disponibilità futura. Questa parte va completata per consentire la vendita. `quantity` indica la capienza iniziale, non i biglietti residui: non c’è un collegamento live all’inventario XCEED. Gli stati SOLD OUT vanno aggiornati manualmente nel config.

## Collegamenti già configurati

- Cena: WhatsApp +39 346 802 2848.
- SUPER PRIVÉE: stesso WhatsApp con messaggio precompilato per BACK CONSOLE SUPER PRIVÉE.
- PRIVÉE: stesso WhatsApp con messaggio precompilato per un tavolo PRIVÉE.
- GET DIRECTION: https://share.google/Fwdj2Vf0Kybxr2W0X.

La cena comprende l’ingresso al Party. Il prezzo DOOR ENTRY non include il drink. I pass Party includono Fast Lane e 1 drink, come da configurazione. I tavoli si prenotano tramite WhatsApp.

## Asset e design

Tutti i file originali sono in `public/artwork`. I ritagli avvengono nel layout CSS, senza alterazioni degli originali. `event.partners` contiene i quattro loghi nell’ordine 1–4; il componente `PartnerLogos` li riusa in alto e in fondo. NŌH Samba ha dimensione originale 661×471; gli altri loghi hanno canvas 1080×1350. Non normalizzare i canvas o sostituire i loghi con testi.

La grafica originale date.png sostituisce la data centrale nell’intestazione, con ritaglio in artworkCrops.headerDate e dimensione responsive. La versione mobile ha spazi tra sezioni e blocchi più compatti, mantenendo leggibili le grafiche e CTA con touch target adeguati. Hero e location hanno crop dedicati in `artworkCrops`. Il file TESTO-HERO è `3_piotta.png`, centrato sotto il payoff: i crop in `heroSupplement` mostrano la riga completa su desktop e più righe leggibili su mobile, usando sempre i pixel originali. `dinner-fobia.png` è lo sfondo della parte introduttiva NŌH Experience, con posizioni responsive e opacità in `dinner.artworkStyle`; il menu mantiene il fondo rosso per leggibilità. `dance-fobia.png` è lo sfondo decorativo del Party, con ritaglio responsive, opacità e gradienti; le impostazioni sono in `party.artworkStyle`. Il font Bodoni Moda è incluso tramite il pacchetto npm e `next/font/local`. La licenza originale del font è in `licenses/Bodoni-Moda-OFL.txt`.

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

In alternativa usare `CHROMIUM_PATH` per indicare un eseguibile Chromium già installato. Verificati build, TypeScript e 16 test: responsive da 320 a 1440 px, CTA, link e messaggi, asset, release, riduzione movimento e metadati. I test non eseguono pagamenti o inviano messaggi WhatsApp.

Dopo il deploy verificare da telefono: hero e immagini, assenza di scroll orizzontale, WhatsApp cena e tavoli, Maps, prezzo corrente nella barra fissa e checkout XCEED. Verificare la social preview dal dominio definitivo.

## Anteprima inclusa

`ANTEPRIMA/FOBIA.html`, nella radice dello ZIP, è una pagina autonoma per revisione, con immagini e font incorporati. Si apre direttamente nel browser. È un’istantanea del layout e delle release, non la versione di produzione: per aggiornamenti automatici delle scadenze e per il sito live usare il progetto Next.js.

Per rigenerarla, con Python 3 e il server di produzione acceso:

```sh
python scripts/export-preview.py --url http://127.0.0.1:3000 --output FOBIA-anteprima.html
```

`SHA256SUMS.txt` nella radice del pacchetto permette di verificare l’integrità di tutti i file consegnati.
