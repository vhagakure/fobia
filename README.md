# FOBIA PIETRASOLE

Landing editoriale mobile-first per l’evento Halloween del 31 ottobre 2026 a Masseria Pietrasole. Next.js App Router, React, TypeScript e Tailwind CSS 4; font Bodoni Moda locale; asset originali inclusi.

Le istruzioni complete per installazione, deploy, configurazione dei link e verifica sono in **[LEGGIMI-DEPLOY.md](LEGGIMI-DEPLOY.md)**.

```sh
npm ci
npm run dev
```

Tutti i contenuti modificabili e gli URL sono in `src/lib/event.ts`. Il checkout XCEED è configurato. Per Node/Vercel impostare `siteUrl` o `NEXT_PUBLIC_SITE_URL` al dominio effettivo; la build Pages lo imposta automaticamente. Cena e tavoli sono già collegati a WhatsApp; Maps è configurato. La cena comprende ingresso al Party.

```sh
npm run typecheck
npm run build
npm test
```

Il progetto è stato verificato con Node.js 24.19.0 e npm 11.9.0. L’anteprima HTML inclusa nel pacchetto è un’istantanea per revisione; la versione da pubblicare è il progetto Next.js.

GitHub Pages: `npm run build:pages` produce `out/` per il branch `gh-pages`. Attivazione dal pannello GitHub Settings → Pages.
