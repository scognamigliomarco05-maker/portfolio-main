/* =========================================================
   Home page
   ========================================================= */
(() => {
  if (!window.App) return; // librerie non disponibili (vedi main.js)
  const { SITE, PROJECTS, App } = window;
  const { lenis, splitText, reduceMotion, finePointer, ICONS } = App;
  const t = App.t || ((x) => x);
  const pad = (n) => String(n).padStart(2, "0");

  /* ---------- Loader + animazione iniziale ---------- */
  function initLoader() {
    const loader = document.querySelector(".loader");
    let seen = false;
    try { seen = sessionStorage.getItem("ms-loaded") === "1"; } catch (e) {}

    if (reduceMotion || seen) {
      loader.remove();
      heroIntro(0.1);
      return;
    }
    lenis && lenis.stop();
    const chars = splitText(loader.querySelector(".loader-name"));
    const step = 0.05;
    gsap.timeline({
      onComplete: () => {
        loader.remove();
        lenis && lenis.start();
        try { sessionStorage.setItem("ms-loaded", "1"); } catch (e) {}
      },
    })
      .to(chars, { color: "#f1f2f4", duration: 0.25, stagger: step, ease: "none" }, 0.2)
      .to(".loader-bar span", { scaleX: 1, duration: chars.length * step + 0.25, ease: "power1.inOut" }, 0.2)
      .to(loader, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "+=0.25")
      .add(() => heroIntro(0), "-=0.45");
  }

  function heroIntro(delay) {
    if (reduceMotion) {
      gsap.set("[data-intro], .nav", { opacity: 1 });
      gsap.set(".hero-title .line-inner", { yPercent: 0, y: 0 });
      return;
    }
    gsap.timeline({ delay, defaults: { ease: "expo.out", duration: 1.4 } })
      .from(".nav-inner", { y: -30, opacity: 0, duration: 1.2 }, 0)
      .fromTo(".hero-title .line-inner", { yPercent: 110, y: 0 }, { yPercent: 0, stagger: 0.12 }, 0.05)
      .fromTo("[data-intro]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.35);
  }

  /* ---------- Copia email negli appunti ---------- */
  const COPY_ICONS = {
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 15V6a2 2 0 0 1 2-2h9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  function initCopyEmail(root) {
    const btn = root.querySelector("[data-copy-email]");
    const text = btn.querySelector(".btn-copy-text");
    const icon = btn.querySelector(".btn-copy-icon");
    const status = root.querySelector("[data-copy-status]");
    let timer = null;

    btn.addEventListener("click", async () => {
      const ok = await App.copyText(SITE.email);
      if (!ok) { window.prompt(t("Copia l'indirizzo email:"), SITE.email); return; }
      clearTimeout(timer);
      btn.style.width = `${btn.offsetWidth}px`; // il bottone non cambia larghezza
      btn.classList.add("is-copied");
      text.textContent = t("Email copiata");
      icon.innerHTML = COPY_ICONS.check;
      status.textContent = t("Indirizzo email copiato negli appunti");
      timer = setTimeout(() => {
        btn.classList.remove("is-copied");
        text.textContent = SITE.email;
        icon.innerHTML = ICONS.mail;
        btn.style.width = "";
        status.textContent = "";
      }, 2000);
    });
  }

  /* ---------- Hero ---------- */
  function initHero() {
    // bottoni: email (si copia con un clic) + CV
    const actions = document.querySelector("[data-hero-actions]");
    actions.innerHTML = `
      <button class="btn btn-copy" type="button" data-copy-email aria-label="${t("Copia l'indirizzo email")} ${SITE.email}">
        <span class="btn-copy-icon">${ICONS.mail}</span>
        <span class="btn-copy-text">${SITE.email}</span>
        <span class="btn-copy-hint">${COPY_ICONS.copy}</span>
      </button>
      <a class="btn btn-light" href="${SITE.cv}" target="_blank" rel="noopener">${ICONS.doc}${t("Vedi CV")}</a>
      <span class="sr-only" aria-live="polite" data-copy-status></span>`;
    initCopyEmail(actions);

    // bagliore che segue il mouse
    const hero = document.querySelector(".hero");
    if (finePointer) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }

    // parallasse in uscita
    if (reduceMotion) return;
    gsap.to(".hero-content", {
      yPercent: -12, opacity: 0.2, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  /* ---------- Marquee (accelera con lo scroll) ---------- */
  function initMarquee() {
    const track = document.querySelector("[data-marquee]");
    const items = SITE.marquee.map((t) => `<span class="marquee-item">${t}</span>`).join("");
    track.innerHTML = items + items; // duplicato per il loop infinito
    if (reduceMotion) return;

    let x = 0, boost = 0, dir = 1;
    ScrollTrigger.create({
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 300, 8);
      },
    });
    gsap.ticker.add((time, delta) => {
      boost *= 0.94;
      x -= dir * (1 + boost) * delta * 0.0022;
      x = gsap.utils.wrap(-50, 0, x);
      gsap.set(track, { xPercent: x });
    });
  }

  /* Icone degli strumenti (semplificate, con i colori dei rispettivi marchi) */
  const TOOL_ICONS = {
    figma: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v6H9a3 3 0 0 1 0-6z" fill="#F24E1E"/><path d="M12 2h3a3 3 0 0 1 0 6h-3z" fill="#FF7262"/><path d="M12 8v6H9a3 3 0 0 1 0-6z" fill="#A259FF"/><circle cx="15" cy="11" r="3" fill="#1ABCFE"/><path d="M12 14v3a3 3 0 1 1-3-3z" fill="#0ACF83"/></svg>',
    framer: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2h14v7h-7zM5 9h7l7 7H5zM5 16h7v7z" fill="#f1f2f4"/></svg>',
    wordpress: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#60a5fa" stroke-width="1.6"/><text x="12" y="16.2" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="11.5" fill="#60a5fa">W</text></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    python: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.9 2C7.8 2 8 3.8 8 3.8v1.9h4v.6H6.4S3.7 6 3.7 10.2s2.4 4 2.4 4h1.4v-2s-.1-2.4 2.3-2.4h4s2.3 0 2.3-2.2V4.2S16.4 2 11.9 2z" fill="#4B8BBE"/><circle cx="10" cy="3.9" r=".8" fill="#0c0d10"/><g transform="rotate(180 12 12)"><path d="M11.9 2C7.8 2 8 3.8 8 3.8v1.9h4v.6H6.4S3.7 6 3.7 10.2s2.4 4 2.4 4h1.4v-2s-.1-2.4 2.3-2.4h4s2.3 0 2.3-2.2V4.2S16.4 2 11.9 2z" fill="#FFD43B"/><circle cx="10" cy="3.9" r=".8" fill="#0c0d10"/></g></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" fill="none" stroke="#f1f2f4" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    unity: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4zM12 12L3.5 7.4M12 12l8.5-4.6M12 12v9.5" fill="none" stroke="#f1f2f4" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  };

  /* Tessere grandi degli strumenti (immagine di "Strumenti"): sigla, colore, dimensione del testo */
  const TOOL_TILES = {
    figma: ["Fi", "#a78bfa"], framer: ["Fr", "#f1f2f4"], wordpress: ["Wp", "#60a5fa"], code: ["&lt;/&gt;", "#f97316", 50],
    python: ["Py", "#FFD43B"], github: ["Git", "#f1f2f4", 54], unity: ["Un", "#5ee6a8"],
  };
  // posizioni delle tessere (coordinate su una tela 1800×1000): 4 sopra e 3 sotto, sfalsate
  const TILE_SLOTS = [[796, 256], [996, 286], [1196, 256], [1396, 286], [896, 486], [1096, 516], [1296, 486]];
  const { artSvg } = App;

  function toolsArt(tools) {
    const tiles = tools.slice(0, TILE_SLOTS.length).map((t, i) => {
      const [x, y] = TILE_SLOTS[i];
      const [label, color, size = 58] = TOOL_TILES[t.icon] || [t.name.slice(0, 2), "#f1f2f4"];
      return `<g class="tool-tile" data-tool="${t.icon}">
        <rect class="tile-bg" x="${x}" y="${y}" width="168" height="168" rx="42" fill="url(#tt-fill)" stroke="url(#tt-edge)" stroke-width="2"/>
        <text x="${x + 84}" y="${y + 84 + size * 0.36}" text-anchor="middle" font-size="${size}" fill="${color}">${label}</text>
      </g>`;
    }).join("");
    return artSvg("tt", `<g filter="url(#tt-shadow)" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-weight="700">${tiles}</g>`);
  }

  // Competenze: costellazione intorno a "UX" (fino a 8 etichette; il testo tra parentesi è omesso)
  const SKILL_SLOTS = [[1180, 270], [915, 380], [1445, 380], [860, 570], [1500, 570], [1010, 770], [1350, 770], [1180, 850]];
  const SKILL_COLORS = ["#5ee6a8", "#8b7cf6", "#60a5fa", "#a78bfa", "#f5b94a", "#f472b6", "#f97316", "#5ee6a8"];
  function skillsArt(chips) {
    const cx = 1180, cy = 555;
    const rings = [150, 260, 360].map((r, i) => `<ellipse cx="${cx}" cy="${cy}" rx="${r * 1.3}" ry="${r}" fill="none" stroke="#fff" stroke-opacity="${[0.16, 0.11, 0.07][i]}" stroke-width="2" stroke-dasharray="3 10"/>`).join("");
    const items = chips.slice(0, SKILL_SLOTS.length).map((c, i) => {
      const [x, y] = SKILL_SLOTS[i], col = SKILL_COLORS[i];
      const label = c.replace(/\s*\(.*\)/, "");
      const w = 44 + label.length * 13.6;
      return { line: `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${col}" stroke-opacity=".25" stroke-width="2"/>`,
        chip: `<g class="tool-tile" data-tool="skill-${i}">
          <rect class="tile-bg" x="${x - w / 2}" y="${y - 30}" width="${w}" height="60" rx="30" fill="url(#sk-fill)" stroke="${col}" stroke-opacity=".7" stroke-width="2"/>
          <circle cx="${x - w / 2 + 26}" cy="${y}" r="7" fill="${col}"/>
          <text x="${x - w / 2 + 44}" y="${y + 8}" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-weight="500" font-size="23" fill="#f1f2f4">${label}</text>
        </g>` };
    });
    return artSvg("sk", `${rings}${items.map((it) => it.line).join("")}
      <circle cx="${cx}" cy="${cy}" r="80" fill="#5ee6a8" fill-opacity=".12"/><circle cx="${cx}" cy="${cy}" r="52" fill="#5ee6a8"/>
      <text x="${cx}" y="${cy + 13}" text-anchor="middle" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-weight="700" font-size="36" fill="#03140c">UX</text>
      <g filter="url(#sk-shadow)">${items.map((it) => it.chip).join("")}</g>`);
  }

  // Competenze: le 4 tappe del metodo (ricerca → wireframe → prototipo → test)
  function processArt() {
    const T = 200; // lato delle tessere
    const steps = [
      { x: 790, y: 520, name: "Ricerca", color: "#5ee6a8",
        icon: (c) => `<circle cx="94" cy="64" r="24" fill="none" stroke="${c}" stroke-width="6"/><path d="M112 82l18 18" stroke="${c}" stroke-width="7" stroke-linecap="round"/>` },
      { x: 1010, y: 330, name: "Wireframe", color: "#8b7cf6",
        icon: (c) => `<rect x="66" y="36" width="68" height="68" rx="8" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="7 6"/><path d="M66 36L134 104M134 36L66 104" stroke="${c}" stroke-opacity=".5" stroke-width="3"/>` },
      { x: 1230, y: 520, name: "Prototipo", color: "#60a5fa",
        icon: (c) => `<rect x="74" y="32" width="52" height="76" rx="10" fill="none" stroke="${c}" stroke-width="5"/><rect x="86" y="46" width="28" height="7" rx="3.5" fill="${c}"/><rect x="86" y="60" width="20" height="7" rx="3.5" fill="${c}"/><path d="M110 76v30l8-8 6 12 6-3-6-12h11z" fill="#f1f2f4" stroke="#16181c" stroke-width="2.5" stroke-linejoin="round"/>` },
      { x: 1450, y: 330, name: "Test", color: "#f5b94a",
        icon: (c) => `<circle cx="100" cy="70" r="32" fill="none" stroke="${c}" stroke-width="6"/><path d="M85 71l10 11 21-24" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>` },
    ];
    const line = "M" + steps.map((st) => `${st.x + T / 2} ${st.y + T / 2}`).join(" ");
    const tiles = steps.map((st, i) => `<g class="tool-tile" data-tool="step-${i + 1}">
        <rect class="tile-bg" x="${st.x}" y="${st.y}" width="${T}" height="${T}" rx="48" fill="url(#pa-fill)" stroke="url(#pa-edge)" stroke-width="2"/>
        <g transform="translate(${st.x + T / 2} ${st.y + 84}) scale(1.35) translate(-100 -70)">${st.icon(st.color)}</g>
        <text x="${st.x + T / 2}" y="${st.y + T - 24}" text-anchor="middle" font-family="Space Grotesk, Helvetica, Arial, sans-serif" font-weight="600" font-size="26" fill="#f1f2f4">${st.name}</text>
        <text x="${st.x + 20}" y="${st.y + 36}" font-family="JetBrains Mono, Menlo, monospace" font-size="17" fill="#9097a1">0${i + 1}</text>
      </g>`).join("");
    return artSvg("pa", `<path d="${line}" fill="none" stroke="#5ee6a8" stroke-opacity=".55" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
      <g filter="url(#pa-shadow)">${tiles}</g>`);
  }

  /* ---------- Chi sono (stile "product viewer") ----------
     Pillole a sinistra: cliccandone una si apre in una card con il testo
     e l'immagine grande cambia. Frecce su/giù per scorrere, X per chiudere. */
  function initAbout() {
    const { about } = SITE;
    const viewer = document.querySelector("[data-viewer]");
    const stage = viewer.querySelector("[data-viewer-stage]");
    const list = viewer.querySelector("[data-viewer-list]");
    document.querySelector("[data-about-eyebrow]").textContent = about.eyebrow;
    document.querySelector("[data-about-headline]").textContent = about.headline.replace("\n", " ");

    // immagine 0 = stato iniziale, poi una per ogni voce
    const sources = [about, ...about.items].map((it) => ({ src: it.image, fit: it.fit, tools: it.tools, chips: it.chips }));
    stage.innerHTML = sources
      .map((img, i) => {
        const active = i === 0 ? " is-active" : "";
        // "ritratto": la foto va dentro il cerchio con il bagliore verde
        if (img.fit === "ritratto") {
          return `<div class="stage-portrait${active}"><div class="portrait-circle"><img src="${img.src}" alt=""></div></div>`;
        }
        // "strumenti": le tessere sono disegnate nella pagina, così possono illuminarsi col cursore
        if (img.fit === "strumenti") return `<div class="stage-art${active}">${toolsArt(img.tools)}</div>`;
        // "processo": le 4 tappe del metodo, con tessere che si illuminano col cursore
        if (img.fit === "processo") return `<div class="stage-art${active}">${processArt()}</div>`;
        // "competenze": costellazione delle competenze, collegata alle etichette della card
        if (img.fit === "competenze") return `<div class="stage-art${active}">${skillsArt(img.chips)}</div>`;
        return `<img src="${img.src}" alt="" class="${active.trim()}">`;
      })
      .join("");
    list.innerHTML = about.items.map((it, i) => `
      <li class="v-item">
        <button class="v-pill" aria-expanded="false" aria-controls="v-panel-${i}" data-i="${i}">
          <span class="v-plus" aria-hidden="true"></span>
          <span>${it.label}</span>
        </button>
        <div class="v-panel" id="v-panel-${i}" role="region" aria-label="${it.label}" hidden>
          <p><strong>${it.title}</strong> ${it.text}</p>
          ${it.chips ? `<ul class="chips">${it.chips.map((c, k) => `<li${it.fit === "competenze" ? ` data-tool="skill-${k}"` : ""}>${c}</li>`).join("")}</ul>` : ""}
          ${it.groups ? it.groups.map((g) => `
            <p class="v-group-label">${g.label}</p>
            <ul class="chips">${g.items.map((c) => `<li>${c}</li>`).join("")}</ul>`).join("") : ""}
          ${it.phases ? `<ol class="v-phases">${it.phases.map((ph, k) => `<li data-tool="${ph.key}"><span class="v-phase-num">0${k + 1}</span><div><strong>${ph.name}</strong><span>${ph.text}</span></div></li>`).join("")}</ol>` : ""}
          ${it.tools ? `<ul class="v-tools">${it.tools.map((t) => `<li data-tool="${t.icon}"><span class="v-tool-icon">${TOOL_ICONS[t.icon] || ""}</span><span>${t.name}</span></li>`).join("")}</ul>` : ""}
        </div>
      </li>`).join("");

    App.initViewer(viewer);
  }

  /* ---------- Progetti (scroll orizzontale) ---------- */
  function initPlayground() {
    const track = document.querySelector("[data-play-track]");
    // i progetti in corso hanno la card ma non ancora la pagina: niente link, solo l'etichetta "In corso"
    track.insertAdjacentHTML("beforeend", PROJECTS.map((p, i) => `
      <${p.soon ? 'div class="play-card is-soon" role="button" tabindex="0" aria-disabled="true" aria-label="' + p.title + ': ' + t("progetto in corso") + '"' : `a class="play-card" href="progetto.html?id=${p.slug}" data-cursor="${t("Vedi progetto")}"`}>
        <div class="play-media"><img src="${p.cover}" alt="${t("Anteprima del progetto")} ${p.title}" loading="lazy">${p.soon ? `<span class="play-soon"><i class="dot dot-live"></i>${t("In corso")}</span>` : ""}</div>
        <p class="play-meta"><span>${pad(i + 1)}</span>${p.category} · ${p.year}</p>
        <h3><span data-vt-title>${p.title}</span></h3>
        <p>${p.summary}</p>
        <ul class="chips">${p.tools.map((t) => `<li>${t}</li>`).join("")}</ul>
      </${p.soon ? "div" : "a"}>`).join(""));

    // progetto in corso: al clic la card trema e compare un avviso
    const toast = document.createElement("div");
    toast.className = "soon-toast"; toast.setAttribute("role", "status"); toast.setAttribute("aria-live", "polite");
    toast.innerHTML = '<i class="dot dot-live"></i><span></span>';
    document.body.appendChild(toast);
    let toastTimer = null;
    const notSoon = (card) => {
      card.classList.remove("is-shaking"); void card.offsetWidth; card.classList.add("is-shaking");
      if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
      toast.querySelector("span").textContent = `${card.querySelector("h3").textContent} ${t("è ancora in corso: presto qui tutto il progetto.")}`;
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
    };
    track.querySelectorAll(".play-card.is-soon").forEach((card) => {
      card.addEventListener("click", () => notSoon(card));
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); notSoon(card); } });
      card.addEventListener("animationend", () => card.classList.remove("is-shaking"));
    });

    const section = document.querySelector(".playground");
    const intro = track.querySelector(".play-intro");
    const bar = document.querySelector("[data-play-progress]");
    const mm = gsap.matchMedia();

    // Telefono o animazioni ridotte: niente blocco, le card si scorrono col dito.
    // L'introduzione va sopra le card, così il titolo resta sempre visibile.
    mm.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => {
      section.classList.add("is-native");
      section.insertBefore(intro, track);
      // lo smooth scroll della pagina non deve "rubare" lo scorrimento orizzontale delle card
      track.setAttribute("data-lenis-prevent-touch", "");
      const onScroll = () => gsap.set(bar, { scaleX: track.scrollLeft / (track.scrollWidth - track.clientWidth || 1) });
      track.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => {
        section.classList.remove("is-native");
        track.prepend(intro);
        track.removeAttribute("data-lenis-prevent-touch");
        track.removeEventListener("scroll", onScroll);
      };
    });

    // Computer: la sezione si blocca e le card scorrono in orizzontale mentre scorri in verticale.
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      // se le card entrano tutte nello schermo non c'è niente da scorrere (distanza 0, niente blocco)
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".playground",
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.8,
          refreshPriority: 1, // calcolato per primo: le sezioni dopo dipendono dal suo spazio
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        },
      });

      // con la tastiera (Tab) la sezione scorre fino alla card che riceve il focus
      const st = tween.scrollTrigger;
      const onFocus = (e) => {
        const card = e.target.closest(".play-card");
        if (!card) return;
        requestAnimationFrame(() => { section.scrollLeft = 0; }); // il browser prova a scorrere da solo: lo annulliamo
        const offset = card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2;
        App.scrollToTarget(st.start + gsap.utils.clamp(0, st.end - st.start, offset));
      };
      track.addEventListener("focusin", onFocus);

      // Trackpad: scorrere di lato con due dita (o Shift + rotellina) fa avanzare le card
      // esattamente come lo scorrimento verticale. Il gesto viene "consumato" qui, così il browser
      // non lo usa per tornare alla pagina precedente mentre si è nella sezione.
      const onWheel = (e) => {
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1; // righe / pagine → pixel
        const dx = e.deltaX * unit, dy = e.deltaY * unit;
        const delta = Math.abs(dx) > Math.abs(dy) ? dx : (e.shiftKey ? dy : 0);
        if (!delta) return; // scorrimento verticale normale: ci pensa già la pagina
        e.preventDefault();
        e.stopPropagation(); // lo smooth scroll della pagina non deve gestirlo una seconda volta
        const lenis = App.lenis;
        const from = lenis ? lenis.targetScroll : window.scrollY;
        const target = gsap.utils.clamp(st.start, st.end, from + delta);
        // programmatic:false = trattalo come un gesto dell'utente, così i passi consecutivi si sommano
        if (lenis) lenis.scrollTo(target, { lerp: 0.1, programmatic: false });
        else window.scrollTo(0, target);
      };
      section.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        track.removeEventListener("focusin", onFocus);
        section.removeEventListener("wheel", onWheel);
      };
    });
  }

  // Ogni parte è isolata: se una va in errore, le altre funzionano comunque
  // e il loader non resta mai bloccato sopra la pagina.
  const safe = (fn) => { try { fn(); } catch (err) { console.error(err); } };
  safe(initHero);
  safe(initMarquee);
  safe(initPlayground);
  safe(initAbout);
  try {
    initLoader();
  } catch (err) {
    console.error(err);
    document.querySelector(".loader")?.remove();
    document.documentElement.classList.remove("js"); // mostra il contenuto senza animazioni
    lenis && lenis.start();
  }

  // se si arriva da un'altra pagina con un'ancora (es. index.html#progetti)
  window.addEventListener("load", () => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const target = location.hash && document.querySelector(location.hash);
    if (target) setTimeout(() => App.scrollToTarget(target), 300);
  });
})();
