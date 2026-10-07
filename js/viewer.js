/* =========================================================
   Riquadro "product viewer" (stile Apple), usato in "Chi sono" e nei progetti:
   pillole che si aprono in card, immagine grande che cambia, frecce, X,
   su telefono carosello con la card che diventa la freccia.
   ========================================================= */
(() => {
  if (!window.App) return;
  const { reduceMotion } = window.App;
  const t = window.App.t || ((x) => x);

  const ICON_UP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_DOWN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  // HTML del riquadro: "stage" = immagini, "items" = [{label, title, text, key?, extra?}]
  function viewerMarkup({ stage, items, prefix = "v" }) {
    return `
      <div class="viewer" data-viewer data-reveal>
        <div class="viewer-stage" data-viewer-stage>${stage}</div>
        <div class="viewer-controls">
          <div class="viewer-paddles">
            <button class="viewer-paddle" data-viewer-prev aria-label="${t("Voce precedente")}">${ICON_UP}</button>
            <button class="viewer-paddle" data-viewer-next aria-label="${t("Voce successiva")}">${ICON_DOWN}</button>
          </div>
          <ul class="viewer-list" data-viewer-list>${itemsMarkup(items, prefix)}</ul>
        </div>
        <button class="viewer-close" data-viewer-close aria-label="${t("Chiudi")}">${ICON_X}</button>
      </div>`;
  }
  function itemsMarkup(items, prefix = "v") {
    return items.map((it, i) => `
      <li class="v-item"${it.key ? ` data-tool="${it.key}"` : ""}>
        <button class="v-pill" aria-expanded="false" aria-controls="${prefix}-panel-${i}" data-i="${i}">
          <span class="v-plus" aria-hidden="true"></span>
          <span>${it.label}</span>
        </button>
        <div class="v-panel" id="${prefix}-panel-${i}" role="region" aria-label="${it.label}" hidden>
          <p><strong>${it.title}</strong> ${it.text}</p>
          ${it.extra || ""}
        </div>
      </li>`).join("");
  }

  // sfondo comune delle illustrazioni (tela 1800×1000): gradiente, puntini, bagliore verde.
  // "p" rende unici gli id, perché più illustrazioni stanno nella stessa pagina
  function artSvg(p, content, opts = {}) { // opts.tint: alone viola come nel flusso
    return `<svg viewBox="0 0 1800 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        ${opts.tint
          ? `<radialGradient id="${p}-glow" gradientUnits="userSpaceOnUse" cx="1200" cy="530" r="900"><stop offset="0" stop-color="${opts.tint}" stop-opacity=".18"/><stop offset="1" stop-color="${opts.tint}" stop-opacity="0"/></radialGradient>`
          : `<radialGradient id="${p}-glow" gradientUnits="userSpaceOnUse" cx="1180" cy="500" r="1000"><stop offset="0" stop-color="#5ee6a8" stop-opacity=".3"/><stop offset=".55" stop-color="#5ee6a8" stop-opacity=".08"/><stop offset="1" stop-color="#5ee6a8" stop-opacity="0"/></radialGradient>`}
        <linearGradient id="${p}-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#17191d"/><stop offset="1" stop-color="#0b0c0e"/></linearGradient>
        <linearGradient id="${p}-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#20242a"/><stop offset="1" stop-color="#16181c"/></linearGradient>
        <linearGradient id="${p}-edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity=".04"/></linearGradient>
        <pattern id="${p}-dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#fff" fill-opacity=".07"/></pattern>
        <filter id="${p}-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="40" stdDeviation="40" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <!-- sfondo più grande della tela: copre il riquadro anche quando da telefono l'illustrazione è rimpicciolita -->
      <rect x="-2000" y="-2000" width="5800" height="5000" fill="#111317"/>
      <rect x="-2000" y="-2000" width="5800" height="5000" fill="url(#${p}-dots)"/>
      <rect x="-2000" y="-2000" width="5800" height="5000" fill="url(#${p}-glow)"/>
      ${content}
    </svg>`;
  }


  // Attiva il riquadro. onChange(next) viene chiamata a ogni cambio di voce (-1 = nessuna aperta);
  // di default mostra l'immagine n+1 dello stage (la 0 è lo stato iniziale).
  function initViewer(viewer, options = {}) {
    const stage = viewer.querySelector("[data-viewer-stage]");
    const list = viewer.querySelector("[data-viewer-list]");
    const images = [...stage.children];
    const onChange = options.onChange || ((next) => images.forEach((img, i) => img.classList.toggle("is-active", i === next + 1)));
    const items = [...list.children];
    const mobile = matchMedia("(max-width: 899px)");
    const n = items.length;
    let active = -1; // voce aperta (-1 = nessuna)
    let current = 0; // su telefono: la voce mostrata (una alla volta, come Apple)

    const prevBtn = viewer.querySelector("[data-viewer-prev]");
    const nextBtn = viewer.querySelector("[data-viewer-next]");

    function showCurrent() {
      items.forEach((el, i) => el.classList.toggle("is-current", i === current));
      // su telefono niente giro completo: alla prima/ultima voce la freccia si spegne
      const isMobile = mobile.matches;
      prevBtn.disabled = isMobile && current === 0;
      nextBtn.disabled = isMobile && current === n - 1;
      // su telefono la riga di pillole scorre in orizzontale: lo smooth scroll della pagina non deve interferire
      if (isMobile) list.setAttribute("data-lenis-prevent-touch", "");
      else list.removeAttribute("data-lenis-prevent-touch");
    }

    function closeItem(el) {
      el.classList.remove("is-open");
      el.querySelector(".v-pill").setAttribute("aria-expanded", "false");
      el.querySelector(".v-panel").hidden = true;
    }
    // esegue un cambiamento e fa variare l'altezza del riquadro in modo morbido invece che a scatti
    function smoothHeight(change) {
      const h0 = viewer.offsetHeight;
      change();
      const h1 = viewer.offsetHeight;
      if (!reduceMotion && mobile.matches && Math.abs(h1 - h0) > 1) {
        gsap.fromTo(viewer, { height: h0 }, { height: h1, duration: 0.45, ease: "power3.out", clearProps: "height", overwrite: true });
      }
    }

    /* --- Telefono: la card che esce diventa la freccia, quella che entra nasce dall'altra freccia ---
       Si animano delle "sagome" (div con lo stesso aspetto della card) posizionate nel riquadro.
       Le misure sono prese dal basso del riquadro, così restano giuste anche se l'altezza cambia. */
    const MORPH = { duration: 0.6, ease: "power3.inOut" };
    const CARD_BG = "rgba(42, 42, 46, .72)", ARROW_BG = "rgba(66, 66, 70, .72)";
    function boxOf(el) {
      const v = viewer.getBoundingClientRect(), r = el.getBoundingClientRect();
      return { left: r.left - v.left, bottom: v.bottom - r.bottom, width: r.width, height: r.height };
    }
    function makeGhost(box, radius, bg, content) {
      const g = content ? content.cloneNode(true) : document.createElement("div");
      g.removeAttribute("id");
      g.removeAttribute("role");
      g.hidden = false;
      g.setAttribute("aria-hidden", "true");
      g.className = "v-ghost" + (content ? " v-panel" : "");
      gsap.set(g, { left: box.left, bottom: box.bottom, width: box.width, height: box.height, borderRadius: radius, backgroundColor: bg });
      viewer.appendChild(g);
      return g;
    }
    function clearGhosts() {
      viewer.querySelectorAll(".v-ghost").forEach((g) => { gsap.killTweensOf(g); gsap.killTweensOf(g.children); g.remove(); });
      items.forEach((el) => gsap.set(el.querySelector(".v-panel"), { clearProps: "opacity" }));
      gsap.set([prevBtn, nextBtn], { clearProps: "opacity" });
    }
    function morphCards(outPanel, dir) {
      const inPanel = items[active].querySelector(".v-panel");
      const toBtn = dir > 0 ? prevBtn : nextBtn;   // la card esce verso la freccia da cui si allontana il contenuto
      const fromBtn = dir > 0 ? nextBtn : prevBtn; // la nuova arriva dalla freccia opposta
      const outBox = outPanel.box, inBox = boxOf(inPanel);
      const toBox = boxOf(toBtn), fromBox = boxOf(fromBtn);

      // card che esce: il testo sfuma subito, la sagoma si rimpicciolisce fino a diventare la freccia
      const out = makeGhost(outBox, 22, CARD_BG, outPanel.el);
      gsap.to(out.children, { opacity: 0, duration: 0.3, ease: "power1.in" }); // il testo sfuma mentre la card si stringe
      gsap.to(out, { ...MORPH, left: toBox.left, bottom: toBox.bottom, width: toBox.width, height: toBox.height, borderRadius: toBox.width / 2, backgroundColor: ARROW_BG });
      gsap.to(out, { opacity: 0, duration: 0.15, delay: MORPH.duration - 0.1, onComplete: () => out.remove() });
      gsap.fromTo(toBtn, { opacity: 0 }, { opacity: toBtn.disabled ? 0.3 : 1, duration: 0.2, delay: MORPH.duration - 0.15, clearProps: "opacity" });

      // card che entra: parte dalla freccia e si allarga; il testo compare quando è arrivata
      const inn = makeGhost(fromBox, fromBox.width / 2, ARROW_BG);
      gsap.fromTo(fromBtn, { opacity: 0 }, { opacity: fromBtn.disabled ? 0.3 : 1, duration: 0.3, delay: MORPH.duration * 0.6, clearProps: "opacity" });
      gsap.set(inPanel, { opacity: 0 });
      gsap.to(inn, { ...MORPH, left: inBox.left, bottom: inBox.bottom, width: inBox.width, height: inBox.height, borderRadius: 22, backgroundColor: CARD_BG });
      // verso la fine, quando la sagoma ha quasi la forma finale, il testo vero compare sopra di lei
      const reveal = MORPH.duration * 0.62;
      gsap.to(inPanel, { opacity: 1, duration: 0.3, delay: reveal, ease: "power1.out", clearProps: "opacity" });
      gsap.to(inn, { opacity: 0, duration: 0.3, delay: reveal, onComplete: () => inn.remove() });
    }

    function setActive(next, dir = 1) {
      if (next === active) return;
      clearGhosts();
      const prev = active;
      const isMobile = mobile.matches;
      // telefono, da una card all'altra: effetto "card ⇄ freccia"
      const morph = isMobile && prev > -1 && next > -1 && !reduceMotion;
      const outPanel = morph ? { el: items[prev].querySelector(".v-panel"), box: boxOf(items[prev].querySelector(".v-panel")) } : null;
      // su computer la pillola si allarga/restringe dalla misura precedente a quella nuova
      const morphing = isMobile ? [] : [items[prev], items[next]].filter(Boolean);
      const first = morphing.map((el) => el.getBoundingClientRect());

      smoothHeight(() => {
        items.forEach((el, i) => {
          if (i === next) {
            el.classList.add("is-open");
            el.querySelector(".v-pill").setAttribute("aria-expanded", "true");
            el.querySelector(".v-panel").hidden = false;
          } else closeItem(el);
        });
        if (next > -1) current = next;
        active = next;
        showCurrent();
        onChange(next);
        viewer.classList.toggle("is-open", next > -1);
        if (isMobile && next === -1) {
          // tornando alla riga di pillole, mostra quella appena vista
          const item = items[current];
          list.scrollLeft = Math.max(0, item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2);
        } else if (isMobile) list.scrollLeft = 0;
      });

      if (reduceMotion) return;
      if (morph) { morphCards(outPanel, dir); return; }
      morphing.forEach((el, k) => {
        const last = el.getBoundingClientRect();
        gsap.fromTo(el, { width: first[k].width, height: first[k].height }, {
          width: last.width, height: last.height, duration: 0.6, ease: "power3.inOut", clearProps: "width,height",
        });
      });
      if (isMobile) {
        // telefono: la card (o la riga di pillole) compare dal basso
        const target = next > -1 ? items[next].querySelector(".v-panel") : list;
        gsap.fromTo(target, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", clearProps: "opacity,transform" });
      } else if (next > -1) {
        gsap.fromTo(items[next].querySelector(".v-panel"), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.3, ease: "power2.out" });
      }
    }

    function step(dir) {
      if (mobile.matches) {
        // telefono: a card chiusa le pillole sono tutte visibili (si scorrono col dito), le frecce non servono;
        // a card aperta niente giro completo, ci si ferma alla prima/ultima voce
        if (active === -1) return false;
        const target = current + dir;
        if (target < 0 || target >= n) return false;
        setActive(target, dir);
        return true;
      }
      setActive(active === -1 ? (dir > 0 ? 0 : n - 1) : (active + dir + n) % n, dir);
      return true;
    }

    let swipedAt = 0; // momento dell'ultimo swipe: il "tocco" che lo segue subito non apre una pillola
    list.addEventListener("click", (e) => {
      const pill = e.target.closest(".v-pill");
      if (pill && Date.now() - swipedAt > 400) setActive(+pill.dataset.i);
    });
    viewer.querySelector("[data-viewer-prev]").addEventListener("click", () => step(-1));
    viewer.querySelector("[data-viewer-next]").addEventListener("click", () => step(1));
    viewer.querySelector("[data-viewer-close]").addEventListener("click", () => setActive(-1));
    viewer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setActive(-1);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });

    // swipe col dito sull'immagine: sinistra = voce successiva, destra = precedente
    let start = null;
    viewer.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") start = { x: e.clientX, y: e.clientY }; });
    viewer.addEventListener("pointerup", (e) => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      start = null;
      // conta come swipe solo se ha davvero cambiato voce
      // (scorrere la riga di pillole col dito non deve impedire di toccarne una dopo)
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && step(dx < 0 ? 1 : -1)) swipedAt = Date.now();
    });
    viewer.addEventListener("pointercancel", () => { start = null; });
    // Illustrazioni (Competenze, Strumenti): inquadra la tela 1800×1000 come un'immagine "cover"
    // (posizione orizzontale 70%, 76% su telefono) calcolando la porzione visibile: identica in tutti i browser
    const artSvgs = [...stage.querySelectorAll(".stage-art svg")];
    if (artSvgs.length) {
      const frame = () => {
        const w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h) return;
        if (mobile.matches) {
          // telefono: il soggetto (x 760–1640, y 180–880) entra tutto in larghezza, nella parte alta del riquadro
          const vw = 1040, vh = vw * h / w;
          artSvgs.forEach((svg) => svg.setAttribute("viewBox", `${1200 - vw / 2} ${530 - vh * 0.36} ${vw} ${vh}`));
          return;
        }
        // computer: come un'immagine "cover", ma rimpicciolita del 15% (ZOOM) e con il soggetto
        // (centro x 1200, y 530) al 66% della larghezza, a destra delle pillole
        const ZOOM = 1.18;
        const scale = Math.max(w / 1800, h / 1000) / ZOOM, vw = w / scale, vh = h / scale;
        artSvgs.forEach((svg) => svg.setAttribute("viewBox", `${1200 - vw * 0.66} ${530 - vh / 2} ${vw} ${vh}`));
      };
      frame();
      if (window.ResizeObserver) new ResizeObserver(frame).observe(stage);
      else window.addEventListener("resize", frame);
    }

    // Strumenti: passando col mouse su una voce dell'elenco si illumina la tessera corrispondente, e viceversa
    const lightTool = (key, on) => viewer.querySelectorAll(`[data-tool="${key}"]`).forEach((el) => el.classList.toggle("is-lit", on));
    ["pointerover", "pointerout"].forEach((type) => viewer.addEventListener(type, (e) => {
      if (e.pointerType !== "mouse") return;
      const el = e.target.closest("[data-tool]");
      if (!el || el.contains(e.relatedTarget)) return; // ignora i movimenti dentro lo stesso elemento
      lightTool(el.dataset.tool, type === "pointerover");
    }));

    // se la finestra passa da computer a telefono (o viceversa) aggiorna le frecce
    if (mobile.addEventListener) mobile.addEventListener("change", showCurrent);
    else if (mobile.addListener) mobile.addListener(showCurrent); // Safari < 14
    showCurrent();
    }

  Object.assign(window.App, { viewerMarkup, itemsMarkup, artSvg, initViewer });
})();
