# Portfolio — Marco Scognamiglio

Sito statico (HTML, CSS, JavaScript) senza build: basta aprirlo con un server locale.

## Avviarlo in locale

```bash
cd ~/Desktop/marco/portfolio
python3 server.py
```

`server.py` è come `python3 -m http.server`, ma dice al browser di non usare la cache:
così dopo ogni modifica vedi sempre la versione aggiornata.

Poi apri http://localhost:5500

## Dove modificare cosa

| Cosa | File |
| --- | --- |
| Testi, email, CV, banda che scorre, "Chi sono" | `js/data.js` → `SITE` |
| Progetti (titoli, testi, sezioni, gallerie) | `js/data.js` → `PROJECTS` |
| Immagini dei progetti | `assets/img/<progetto>/` (le schermate sono esportate da Figma) |
| Foto della sezione "Chi sono" | `assets/img/marco-ritratto.jpg` |
| CV | `assets/Marco-Scognamiglio-CV.pdf` |
| Colori e font | `css/style.css` → `:root` |

I progetti compaiono nella sezione "Progetti" (scorrimento orizzontale) nello stesso ordine in cui sono scritti in `PROJECTS`.

La pagina di dettaglio (`progetto?id=<slug>`, file `progetto.html`) viene generata in automatico dai dati.

## Aggiornare il sito online

In `index.html` e `progetto.html` i file CSS/JS hanno una versione (`style.css?v=2026-10-01.1`).
Quando pubblichi delle modifiche, cambia quel numero in entrambe le pagine: così i browser
dei visitatori scaricano i file nuovi invece di usare quelli vecchi salvati in cache.

## Librerie

Salvate in `js/vendor/` (il sito non dipende da CDN esterni):

- [GSAP](https://gsap.com) 3.12.5 + ScrollTrigger — animazioni
- [Lenis](https://lenis.darkroom.engineering) 1.1.18 — smooth scroll

Se per qualche motivo non si caricassero, il sito non resta bloccato sul loader: la presentazione iniziale resta visibile (le sezioni generate da JavaScript, come progetti e "Chi sono", no).

## Compatibilità

Chrome, Edge, Firefox e Safari recenti (anche iOS/Android). Su telefono e con
"riduci movimento" attivo, la sezione Progetti si scorre col dito invece di bloccarsi.
