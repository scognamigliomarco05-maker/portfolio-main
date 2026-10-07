/* =========================================================
   Pagina di dettaglio: progetto.html?id=<slug>
   ========================================================= */
(() => {
  if (!window.App) return; // librerie non disponibili (vedi main.js)
  const { SITE, PROJECTS, App } = window;
  const t = App.t || ((x) => x);
  const main = document.querySelector("[data-project]");
  const id = new URLSearchParams(location.search).get("id");
  // i progetti in corso (soon) non hanno ancora una pagina
  const LIST = PROJECTS.filter((p) => !p.soon);
  const index = LIST.findIndex((p) => p.slug === id);

  if (index === -1) {
    main.innerHTML = `
      <section class="container p-hero">
        <a class="back" href="index.html#progetti">${t("← Tutti i progetti")}</a>
        <h1 class="p-title">${t("Progetto non trovato")}</h1>
        <p class="p-lead">${t("Il link potrebbe essere sbagliato. Torna alla lista dei progetti.")}</p>
      </section>`;
    return;
  }

  const p = LIST[index];
  const next = LIST[(index + 1) % LIST.length];
  document.title = `${p.title} — ${SITE.name}`;
  document.querySelector('meta[name="description"]').content = p.summary;

  // Mappa del sistema (tela 1800×1000, soggetto tra x 760–1640): nodi che si illuminano
  function systemArt() {
    const ICON = {
      "node-user": (c) => `<circle cx="0" cy="-9" r="11" fill="none" stroke="${c}" stroke-width="4"/><path d="M-19 20c3-12 11-17 19-17s16 5 19 17" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
      "node-phone": (c) => `<rect x="-14" y="-24" width="28" height="48" rx="7" fill="none" stroke="${c}" stroke-width="4"/><path d="M-5 -17h10" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
      "node-tv": (c) => `<rect x="-24" y="-19" width="48" height="31" rx="5" fill="none" stroke="${c}" stroke-width="4"/><path d="M-9 22h18M0 12v10" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`,
      "node-sensor": (c) => `<path d="M-24 -6c10-9 38-9 48 0v12c-10 9-38 9-48 0z" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round"/><rect x="-10" y="-8" width="20" height="16" rx="8" fill="${c}"/>`,
    };
    // disposizione a rombo: utente in alto, sensori e TV ai lati, smartphone in basso
    const nodes = [
      { key: "node-user", label: "Utente", x: 1200, y: 235, color: "#5ee6a8" },
      { key: "node-sensor", label: "Sensori", x: 885, y: 530, color: "#d4f25a" },
      { key: "node-tv", label: "TV", x: 1515, y: 530, color: "#60a5fa" },
      { key: "node-phone", label: "Smartphone", x: 1200, y: 825, color: "#8b7cf6" },
    ];
    const at = (k) => nodes.find((n) => n.key === k);
    const W = 280, H = 104;
    // pos = punto della linea dove sta l'etichetta (0.5 = a metà)
    const link = (a, b, label, pos = 0.5) => { label = t(label);
      const p = at(a), q = at(b), mx = p.x + (q.x - p.x) * pos, my = p.y + (q.y - p.y) * pos;
      const lw = label.length * 12.5 + 30; // etichetta in una pillola scura, al centro della linea
      return `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="#fff" stroke-opacity=".22" stroke-width="3" stroke-dasharray="3 12" stroke-linecap="round"/>
        <rect x="${mx - lw / 2}" y="${my - 19}" width="${lw}" height="38" rx="19" fill="#121418" stroke="#fff" stroke-opacity=".12" stroke-width="1.5"/>
        <text x="${mx}" y="${my + 7}" text-anchor="middle" font-family="JetBrains Mono, Menlo, monospace" font-size="19" fill="#9097a1">${label}</text>`;
    };
    const links = link("node-user", "node-phone", "interazione") + link("node-user", "node-sensor", "indossa")
      + link("node-sensor", "node-phone", "WiFi") + link("node-phone", "node-tv", "WiFi")
      + link("node-tv", "node-user", "feedback");
    const tiles = nodes.map((n) => `<g class="tool-tile" data-tool="${n.key}">
        <rect class="tile-bg" x="${n.x - W / 2}" y="${n.y - H / 2}" width="${W}" height="${H}" rx="30" fill="url(#sy-fill)" stroke="url(#sy-edge)" stroke-width="2"/>
        <g transform="translate(${n.x - W / 2 + 56} ${n.y})">${ICON[n.key](n.color)}</g>
        <text x="${n.x - W / 2 + 100}" y="${n.y + 9}" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-weight="600" font-size="27" fill="#f1f2f4">${t(n.label)}</text>
      </g>`).join("");
    // stesso fondo del flusso ("Ogni schermata, prima come flusso"): puntini e alone viola
    return App.artSvg("sy", `${links}<g filter="url(#sy-shadow)">${tiles}</g>`, { tint: "#8b7cf6" });
  }

  // User flow dell'app, nello stile del sito (viewBox 1800×820)
  function flowArt() {
    const W = 222, H = 78;
    const C = { main: "#5ee6a8", ref: "#8b7cf6", train: "#60a5fa", set: "#f5b94a" };
    const node = (x, y, label, sub, color, strong) => { label = t(label); sub = sub && t(sub); return `
      <g>
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="22" fill="${strong ? "#17241e" : "url(#fl-fill)"}" stroke="${strong ? color : "url(#fl-edge)"}" stroke-width="${strong ? 2.5 : 2}"/>
        <circle cx="${x + 26}" cy="${y + 30}" r="6" fill="${color}"/>
        <text x="${x + 42}" y="${y + 37}" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-weight="600" font-size="21" fill="#f1f2f4">${label}</text>
        ${sub ? `<text x="${x + 26}" y="${y + 61}" font-family="JetBrains Mono, Menlo, monospace" font-size="13.5" fill="#9097a1">${sub}</text>` : ""}
      </g>`; };
    const arrow = (x1, y1, x2, y2, color = "#6b7280") => `<path d="M${x1} ${y1} C${x1 + 40} ${y1} ${x2 - 40} ${y2} ${x2} ${y2}" fill="none" stroke="${color}" stroke-opacity=".7" stroke-width="2.5" marker-end="url(#fl-arrow)"/>`;
    const tag = (x, y, text) => { text = t(text); return `<rect x="${x - text.length * 4.4 - 14}" y="${y - 15}" width="${text.length * 8.8 + 28}" height="30" rx="15" fill="#0c0d10" stroke="#fff" stroke-opacity=".12"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-family="JetBrains Mono, Menlo, monospace" font-size="14" fill="#9097a1">${text}</text>`; };
    const rows = { ref: 110, train: 371, set: 632 }, cols = [806, 1050, 1294, 1538], mainY = 371, cy = (y) => y + H / 2;
    const chain = (y, color, items) => items.map(([l, sub], i) => node(cols[i], y, l, sub, color)).join("")
      + items.slice(1).map((_, i) => arrow(cols[i] + W, cy(y), cols[i + 1], cy(y), color)).join("");
    const homeX = 530, homeR = homeX + W;
    return `<svg viewBox="0 0 1800 820" role="img" aria-label="${t("User flow dell'app: accesso, dati personali, home e i tre percorsi di referto, allenamento e impostazioni")}">
      <defs>
        <linearGradient id="fl-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#20242a"/><stop offset="1" stop-color="#16181c"/></linearGradient>
        <linearGradient id="fl-edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient>
        <radialGradient id="fl-glow" gradientUnits="userSpaceOnUse" cx="900" cy="410" r="900"><stop offset="0" stop-color="#8b7cf6" stop-opacity=".18"/><stop offset="1" stop-color="#8b7cf6" stop-opacity="0"/></radialGradient>
        <pattern id="fl-dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#fff" fill-opacity=".07"/></pattern>
        <marker id="fl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L8 5L1 9" fill="none" stroke="#9097a1" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>
      </defs>
      <rect width="1800" height="820" fill="#111317"/><rect width="1800" height="820" fill="url(#fl-dots)"/><rect width="1800" height="820" fill="url(#fl-glow)"/>
      <!-- flusso principale -->
      ${node(20, mainY, "Accesso", "email · Apple · Google", C.main)}
      ${node(282, mainY, "I tuoi dati", "sesso · età · peso", C.main)}
      ${node(homeX, mainY, "Home", "piano del giorno", C.main, true)}
      ${arrow(20 + W, cy(mainY), 282, cy(mainY))}${arrow(282 + W, cy(mainY), homeX, cy(mainY))}
      <!-- tre percorsi dalla Home -->
      ${arrow(homeR, cy(mainY) - 14, cols[0], cy(rows.ref), C.ref)}
      ${arrow(homeR, cy(mainY), cols[0], cy(rows.train), C.train)}
      ${arrow(homeR, cy(mainY) + 14, cols[0], cy(rows.set), C.set)}
      ${chain(rows.ref, C.ref, [["Carica referto", "PDF del medico"], ["Conferma dati", "motivo · esito"], ["Terapia con IA", "generazione"], ["Piano", "settimane · giorni"]])}
      ${chain(rows.train, C.train, [["Associa TV", "WiFi · QR · codice"], ["Posizionamento", "telefono sotto la TV"], ["Allenamento", "avatar · musica"], ["Questionario", "dolore · fatica"]])}
      ${chain(rows.set, C.set, [["Impostazioni", ""], ["Profilo", "dati · avatar"], ["Piani", "attuale · vecchi"], ["Dispositivi", "sensori · TV"]])}
      <!-- ritorno alla Home dopo il questionario -->
      <path d="M${cols[3] + W / 2} ${rows.train + H} V${rows.train + H + 70} H${homeX + W / 2} V${mainY + H + 6}" fill="none" stroke="${C.train}" stroke-opacity=".45" stroke-width="2.5" stroke-dasharray="4 10" stroke-linecap="round" marker-end="url(#fl-arrow)"/>
      ${tag((cols[1] + cols[2]) / 2 + W / 2, rows.train + H + 70, "a fine allenamento si torna alla Home")}
      ${tag(homeR + 40, cy(rows.ref) + 70, "primo accesso")}
    </svg>`;
  }

  // Galleria in stile Apple: card grandi con didascalia, puntini e pausa
  const PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="3.5" height="14" rx="1.5" fill="currentColor"/><rect x="13.5" y="5" width="3.5" height="14" rx="1.5" fill="currentColor"/></svg>';
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  function galleryHTML(items, small) {
    return `
      <div class="hl${small ? " is-small" : ""}" data-hl data-reveal>
        <div class="hl-track" data-hl-track data-lenis-prevent-touch data-cursor-grow>
          ${items.map((it, i) => `
            <figure class="hl-item" aria-roledescription="slide" aria-label="${i + 1} ${t("di")} ${items.length}">
              <figcaption class="hl-caption"><strong>${it.title}</strong> ${it.caption}</figcaption>
              <div class="hl-media"><img src="${it.src}" alt="${it.alt}" loading="lazy" draggable="false"></div>
            </figure>`).join("")}
        </div>
        <div class="hl-controls">
          <div class="hl-dots" role="tablist">${items.map((_, i) => `<button class="hl-dot" role="tab" aria-label="${t("Vai alla schermata")} ${i + 1}" data-i="${i}"><i></i></button>`).join("")}</div>
          <button class="hl-play" data-hl-play aria-label="${t("Metti in pausa")}">${PAUSE}</button>
        </div>
      </div>`;
  }
  function initGallery(root) {
    const track = root.querySelector("[data-hl-track]");
    const slides = [...track.children];
    const dots = [...root.querySelectorAll(".hl-dot")];
    const playBtn = root.querySelector("[data-hl-play]");
    const DURATION = 5000;
    let index = 0, playing = false, inView = false, timer = null, startedAt = 0, remaining = DURATION;

    const setDots = () => dots.forEach((d, i) => {
      d.classList.toggle("is-active", i === index);
      d.setAttribute("aria-selected", i === index);
      if (i !== index) d.querySelector("i").style.animation = "none"; // i puntini piccoli restano vuoti
    });
    // la barra del puntino attivo si riempie in DURATION millisecondi
    const restartFill = () => {
      const fill = dots[index].querySelector("i");
      fill.style.animation = "none"; void fill.offsetWidth;
      fill.style.animation = playing && inView ? `hl-fill ${DURATION}ms linear forwards` : "none";
    };
    const scrollToIndex = (i, smooth = true) => {
      const s = slides[i];
      const left = s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2;
      track.scrollTo({ left, behavior: smooth && !App.reduceMotion ? "smooth" : "auto" });
    };
    const schedule = () => {
      clearTimeout(timer);
      if (!playing || !inView) return;
      timer = setTimeout(() => go((index + 1) % slides.length), DURATION);
      restartFill();
    };
    function go(i) { index = i; setDots(); scrollToIndex(i); schedule(); }

    // quale card è al centro mentre si scorre (col dito o col trackpad)
    let raf = 0;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0, dist = Infinity;
        slides.forEach((s, i) => { const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid); if (d < dist) { dist = d; best = i; } });
        if (best !== index) { index = best; setDots(); schedule(); }
      });
    }, { passive: true });

    const setPlaying = (on) => {
      playing = on;
      playBtn.innerHTML = on ? PAUSE : PLAY;
      playBtn.setAttribute("aria-label", on ? t("Metti in pausa") : t("Riproduci"));
      root.classList.toggle("is-paused", !on);
      schedule(); if (!on) restartFill();
    };
    playBtn.addEventListener("click", () => setPlaying(!playing));
    dots.forEach((d) => d.addEventListener("click", () => go(+d.dataset.i)));
    // col mouse: tieni premuto e trascina per passare da una foto all'altra (col dito funziona già)
    let drag = null, dragEnd = 0;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      clearTimeout(dragEnd);
      drag = { x: e.clientX, left: track.scrollLeft, from: index, moved: false, id: e.pointerId };
    });
    track.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved) {
        if (Math.abs(dx) < 5) return;
        drag.moved = true;
        track.setPointerCapture(drag.id);
        track.classList.add("is-dragging"); // niente aggancio mentre si trascina
      }
      track.scrollLeft = drag.left - dx;
    });
    const endDrag = (e) => {
      if (!drag) return;
      const { moved, x, from } = drag; drag = null;
      if (!moved) return;
      const dx = e.clientX - x;
      // basta un piccolo trascinamento per passare alla foto accanto
      let to = index !== from ? index : Math.abs(dx) > 50 ? from + (dx < 0 ? 1 : -1) : from;
      to = Math.max(0, Math.min(slides.length - 1, to));
      go(to);
      dragEnd = setTimeout(() => track.classList.remove("is-dragging"), 650);
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("dragstart", (e) => e.preventDefault());

    // se la persona scorre a mano, l'avanzamento automatico si ferma
    track.addEventListener("pointerdown", () => playing && setPlaying(false));
    track.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && playing) setPlaying(false); }, { passive: true });

    // visibilità misurata direttamente dal browser (sempre precisa, anche se la pagina cambia altezza):
    // - la barra dei controlli compare appena si vede la galleria e sparisce quando la si supera
    // - l'avanzamento automatico va solo quando la galleria è ben visibile
    const track2 = root.querySelector("[data-hl-track]");
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => root.classList.toggle("is-visible", e.isIntersecting), { rootMargin: "0px 0px -12% 0px" }).observe(root);
      new IntersectionObserver(([e]) => {
        const entering = e.isIntersecting && !inView;
        inView = e.isIntersecting;
        // ogni volta che si arriva sulla galleria è ferma: le foto avanzano solo premendo play
        if (entering && playing) setPlaying(false);
        else { schedule(); if (!inView) restartFill(); }
      }, { threshold: 0.5 }).observe(track2);
    } else { root.classList.add("is-visible"); inView = true; schedule(); }
    setDots();
    if (!playing) setPlaying(false);
  }

  // Sezioni in stile Apple: occhiello, titolo grande, testo breve, poi immagini o colonne
  function sectionsHTML(sections) {
    const fig = (img) => `<figure class="ps-figure${img.half ? " is-half" : ""}${img.light ? " is-light" : ""}${img.small ? " is-small" : ""}" data-reveal><img src="${img.src}" alt="${img.alt || ""}" loading="lazy"></figure>`;
    let chapter = 0;
    return sections.map((sec, i) => sec.divider ? `
      <section class="container ps ps-divider">
        <p class="ps-chapter" data-reveal>${String(++chapter).padStart(2, "0")}</p>
        <h2 class="ps-divider-title" data-reveal>${sec.divider}</h2>
        ${sec.text ? `<p class="ps-text" data-reveal>${sec.text}</p>` : ""}
      </section>` : `
      <section class="container ps">
        <header class="ps-head">
          <p class="ps-eyebrow" data-reveal>${sec.eyebrow}</p>
          <h2 class="ps-title" data-reveal>${sec.title}</h2>
          ${sec.text ? `<p class="ps-text" data-reveal>${sec.text}</p>` : ""}
        </header>
        ${sec.viewer ? `<div class="ps-media ps-viewer" data-system>${App.viewerMarkup({ stage: `<div class="stage-art is-active">${systemArt()}</div>`, items: sec.viewer, prefix: "sys" })}</div>` : ""}
        ${sec.flow ? `<div class="ps-media"><figure class="ps-figure ps-flow" data-reveal><div class="ps-flow-scroll" data-lenis-prevent-touch>${flowArt()}</div></figure><p class="ps-flow-hint mono">${t("Scorri per vedere tutto il flusso →")}</p></div>` : ""}
        ${sec.image ? `<div class="ps-media">${fig({ src: sec.image, alt: sec.alt, light: sec.light, small: sec.small })}</div>` : ""}
        ${sec.images ? `<div class="ps-media">${sec.images.map(fig).join("")}</div>` : ""}
        ${sec.gallery ? galleryHTML(sec.gallery, sec.gallerySmall) : ""}
        ${sec.stats ? `<div class="ps-stats">${sec.stats.map((st) => `
          <div class="ps-stat" data-reveal><strong>${st.value}</strong><span>${st.label}</span></div>`).join("")}</div>` : ""}
        ${sec.pairs ? `<ol class="ps-pairs">${sec.pairs.map((pr) => `
          <li data-reveal><span class="ps-pair-topic">${pr.topic}</span><p class="ps-pair-insight">${pr.insight}</p><i class="ps-pair-arrow" aria-hidden="true">→</i><p class="ps-pair-feature">${pr.feature}</p></li>`).join("")}</ol>` : ""}
        ${sec.brand ? `<div class="ps-brand">
          <figure class="ps-brand-logo" data-reveal><img src="${sec.brand.logo}" alt="${sec.brand.alt || ""}" loading="lazy"></figure>
          <ul class="ps-brand-list">${sec.brand.items.map((t) => `
            <li data-reveal><strong><i style="background:${t.color}" aria-hidden="true"></i>${t.title}</strong><p>${t.text}</p></li>`).join("")}</ul>
        </div>` : ""}
        ${sec.chips ? `<ul class="chips ps-chips" data-reveal>${sec.chips.map((c) => `<li>${c}</li>`).join("")}</ul>` : ""}
        ${sec.columns ? `<div class="ps-cols" style="--cols:${sec.columns.length}">${sec.columns.map((c) => `
          <div class="ps-col" data-reveal><h3>${c.title}</h3><p>${c.text}</p></div>`).join("")}</div>` : ""}
        ${sec.steps ? `<div class="ps-tl-scroll" data-lenis-prevent-touch><ol class="ps-tl" style="--n:${sec.steps.length}">${sec.steps.map((st, k) => `
          <li data-reveal><i class="ps-tl-dot" aria-hidden="true"></i><span class="ps-tl-num">0${k + 1}</span><strong>${st.title}</strong><em>${st.text}</em></li>`).join("")}</ol></div>
          <p class="ps-tl-hint mono">${t("Scorri per vedere tutti i passaggi →")}</p>` : ""}
      </section>`).join("");
  }

  const blocks = [
    ["Il problema", p.problem],
    ["Il processo", p.process],
    ["Il risultato", p.result],
  ].filter(([, text]) => text);

  main.innerHTML = `
    <article${p.surface ? ` style="--card:${p.surface}"` : ""}>
      <header class="container p-hero">
        <a class="back" href="index.html#progetti" data-intro>${t("← Tutti i progetti")}</a>
        <p class="tag" data-intro><i class="dot dot-live"></i>${p.category} · ${p.year}</p>
        <h1 class="p-title"><span class="line"><span class="line-inner">${p.title}</span></span></h1>
        <p class="p-lead" data-intro>${p.summary}</p>
        <dl class="p-meta" data-intro>
          <div><dt>${t("Ruolo")}</dt><dd>${p.role}</dd></div>
          <div><dt>${t("Contesto")}</dt><dd>${p.context}</dd></div>
          <div><dt>${t("Durata")}</dt><dd>${p.duration}</dd></div>
          <div><dt>${t("Strumenti")}</dt><dd>${p.tools.join(", ")}</dd></div>
        </dl>
      </header>

      <figure class="container p-cover" data-intro>
        <div class="p-cover-inner"><img src="${p.hero || p.cover}" alt="${t("Immagine principale del progetto")} ${p.title}"></div>
      </figure>

      ${p.sections ? sectionsHTML(p.sections) : `
      <div class="container p-body">
        ${blocks.map(([title, text], i) => `
          <section class="p-block" data-reveal>
            <h2><span>0${i + 1}</span>${title}</h2>
            <p>${text}</p>
          </section>`).join("")}
      </div>

      ${p.gallery && p.gallery.length ? `
        <div class="container p-gallery">
          ${p.gallery.map((src, i) => `<figure data-reveal><img src="${src}" alt="${p.title} — immagine ${i + 2}" loading="lazy"></figure>`).join("")}
        </div>` : ""}`}

      <nav class="container p-end-wrap" aria-label="${t("Altri progetti")}">
       <div class="p-end">
        <a class="p-back-btn" href="index.html#progetti">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="p-back-label-long">${t("Tutti i progetti")}</span><span class="p-back-label-short">${t("Progetti")}</span>
        </a>
        <a class="p-next-card" href="progetto.html?id=${next.slug}" data-cursor-grow>
          <span class="p-next-media"><img src="${next.cover}" alt="" loading="lazy"></span>
          <span class="p-next-text">
            <span class="p-next-label">${t("Prossimo")}<span class="p-back-label-long">${t(" progetto")}</span></span>
            <span class="p-next-name"><span data-vt-title>${next.title}</span></span>
          </span>
          <span class="p-next-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </a>
       </div>
      </nav>
    </article>`;

  document.querySelectorAll("[data-hl]").forEach(initGallery);

  // numeri della ricerca: quando entrano nello schermo contano da 0 fino al valore scritto
  document.querySelectorAll(".ps-stat strong").forEach((el) => {
    const m = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!m || App.reduceMotion || !("IntersectionObserver" in window)) return;
    const end = +m[1], suffix = m[2], n = { v: 0 };
    el.textContent = "0" + suffix;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      gsap.to(n, {
        v: end, duration: 1.6, ease: "power2.out", delay: 0.15,
        onUpdate: () => { el.textContent = Math.round(n.v) + suffix; },
      });
    }, { threshold: 0.6 });
    io.observe(el);
  });

  // riquadro del sistema: la voce aperta illumina il suo nodo nella mappa
  document.querySelectorAll("[data-system] [data-viewer]").forEach((viewer) => {
    const items = [...viewer.querySelectorAll(".v-item")];
    App.initViewer(viewer, {
      onChange: (next) => viewer.querySelectorAll(".tool-tile").forEach((t) => {
        t.classList.toggle("is-on", next > -1 && t.dataset.tool === items[next].dataset.tool);
      }),
    });
  });

  // arrivo da una card: l'immagine arriva "volando" (View Transition), quindi niente animazione d'ingresso per lei
  let viaCard = false;
  try { viaCard = sessionStorage.getItem("ms-vt") === "1"; sessionStorage.removeItem("ms-vt"); } catch (err) {}
  const heroImg = document.querySelector(".p-cover-inner img");
  if (App.vtSupported && !App.reduceMotion && heroImg) {
    heroImg.style.viewTransitionName = "vt-media"; heroImg.setAttribute("data-vt", "");
  }

  if (App.reduceMotion) return;

  gsap.timeline({ defaults: { ease: "expo.out", duration: 1.3 } })
    .from(".nav-inner", { y: -30, opacity: 0 }, 0)
    .fromTo(".p-title .line-inner", { yPercent: 110, y: 0 }, { yPercent: 0 }, 0.1)
    .fromTo(viaCard && App.vtSupported ? "[data-intro]:not(.p-cover)" : "[data-intro]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.07 }, 0.25);
  if (viaCard && App.vtSupported) gsap.set(".p-cover", { opacity: 1 });

  // leggero zoom dell'immagine principale mentre si scorre (l'immagine resta sempre intera)
  gsap.fromTo(".p-cover-inner img", { scale: 1.06 }, {
    scale: 1, ease: "none",
    scrollTrigger: { trigger: ".p-cover", start: "top bottom", end: "bottom top", scrub: true },
  });

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08 }),
  });
})();
