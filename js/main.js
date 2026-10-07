/* =========================================================
   Parti comuni a tutte le pagine:
   smooth scroll, cursore, navbar, menu, footer, reveal
   ========================================================= */
(() => {
  // Rete di sicurezza: se le librerie non si caricano, mostra il contenuto senza animazioni
  if (!window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.remove("js");
    document.querySelector(".loader")?.remove();
    return;
  }
  const { SITE } = window;
  const App = window.App || {};
  const isHome = document.body.dataset.page === "home";
  const base = isHome ? "" : "./";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  gsap.registerPlugin(ScrollTrigger);

  const t = window.t || ((x) => x); // traduzioni (js/i18n.js)
  const LANG = window.LANG || "it";
  const NAV_LINKS = [
    ["progetti", t("Progetti")],
    ["chi-sono", t("Chi sono")],
    ["contatti", t("Contattami")],
  ];
  // interruttore IT / EN
  const langSwitch = (cls = "") => `
        <div class="lang-switch ${cls}" role="group" aria-label="${t("Lingua")}">
          <button type="button" data-lang="it" aria-pressed="${LANG === "it"}">IT</button>
          <button type="button" data-lang="en" aria-pressed="${LANG === "en"}">EN</button>
        </div>`;

  const ICONS = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 6.5l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  };

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToTarget(target) {
    if (lenis) return lenis.scrollTo(target, { duration: 1.4 });
    if (typeof target === "number") window.scrollTo({ top: target, behavior: reduceMotion ? "auto" : "smooth" });
    else target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  /* ---------- Utility: divide un testo in parole/lettere ---------- */
  function splitText(el, type = "chars") {
    const text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.innerHTML = text
      .split(/\s+/)
      .map((w) => {
        const inner = type === "chars" ? [...w].map((c) => `<span class="char">${c}</span>`).join("") : w;
        return `<span class="word" aria-hidden="true">${inner}</span>`;
      })
      .join(" ");
    return el.querySelectorAll(type === "chars" ? ".char" : ".word");
  }

  /* ---------- Copia negli appunti (usata dai bottoni dell'email) ---------- */
  async function copyText(text) {
    // metodo moderno: serve una pagina sicura (https o localhost)
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {}
    // riserva per browser più vecchi / pagine non https (funziona anche su iPhone)
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none;font-size:16px";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove();
    return ok;
  }

  /* ---------- Navbar, menu, footer ---------- */
  function renderChrome() {
    // "Contatti" resta solo nel menu: nella barra c'è già il bottone "Contattami"
    const sections = NAV_LINKS.filter(([id]) => id !== "contatti");
    const links = sections.map(([id, label]) => `<a href="${base}#${id}" data-link>${label}</a>`).join("");

    document.querySelector("[data-nav]").innerHTML = `
      <div class="nav-inner">
        <a href="${base}#home" class="nav-brand" data-link aria-label="${SITE.name} — Home">
          <svg class="nav-logo" viewBox="0 0 64 64" aria-hidden="true">
            <rect x="1.5" y="1.5" width="61" height="61" rx="16" fill="#0c0d10" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
            <!-- logo: m e s unite in un solo segno, con il punto verde (dalla bozza di Marco) -->
            <g transform="translate(1.9 4.8) scale(0.219)"><path d="M37 212 L88 212 C100 196 106 182 100 160 C95 140 84 118 90 90 C91 83 95 78 102 77 C108 77 110 80 111 88 L121 168 L140 168 L183 82 L189 168 L238 168 L238 75 C238 50 222 36 200 37 C180 38 165 50 152 70 C143 52 128 40 106 40 C75 40 52 55 45 80 C38 105 50 120 60 132 C70 145 72 160 68 175 Z" fill="#f1f2f4"/><ellipse cx="211" cy="196" rx="19" ry="14" fill="#5ee6a8"/></g>
          </svg>
          <span class="nav-name">${SITE.name}</span>
        </a>
        <nav class="nav-links" aria-label="${t("Principale")}">${links}</nav>
        <div class="nav-right">
${langSwitch("nav-lang")}
          <a class="btn btn-accent nav-cta" href="${base}#contatti" data-link>${t("Contattami")}</a>
        </div>
        <button class="nav-menu-btn" aria-label="${t("Apri il menu")}" aria-expanded="false" aria-controls="menu">
          <span></span><span></span><span></span>
        </button>
      </div>`;

    document.querySelector("[data-menu]").innerHTML = `
      <nav class="menu-links" aria-label="Menu">
        ${NAV_LINKS.filter(([id]) => id !== "contatti").map(([id, label], i) => `<a href="${base}#${id}" data-link><span>0${i + 1}</span>${label}</a>`).join("")}
      </nav>
      <div class="menu-foot">
        <div class="menu-lang-row">${langSwitch("menu-lang")}<a class="btn btn-accent menu-cta" href="${base}#contatti" data-link>${t("Contattami")}</a></div>
        <button class="menu-copy" type="button" data-copy-email aria-label="${t("Copia l'indirizzo email")} ${SITE.email}"><span data-copy-text>${SITE.email}</span></button>
        <a href="${SITE.cv}" target="_blank" rel="noopener">${t("Vedi CV ↗")}</a>
      </div>`;

    const footer = document.querySelector("[data-footer]");
    footer.innerHTML = `
      <div class="container">
        <a class="footer-big" href="mailto:${SITE.email}" data-cursor="${t("Scrivimi")}">
          <span class="line"><span class="line-inner">${t("Lavoriamo")}</span></span>
          <span class="line"><span class="line-inner grad-hover">${t("insieme!")}</span></span>
        </a>
        <div class="footer-cols">
          <div>
            <p class="f-label">Menu</p>
            <ul>${sections.map(([id, label]) => `<li><a href="${base}#${id}" data-link>${label}</a></li>`).join("")}</ul>
          </div>
          <div>
            <p class="f-label">${t("Progetti")}</p>
            <ul>${(window.PROJECTS || []).filter((p) => !p.soon).map((p) => `<li><a href="progetto?id=${p.slug}">${p.title}</a></li>`).join("")}</ul>
          </div>
          <div class="footer-hello">
            <p class="f-label">${t("Scrivimi")}</p>
            <button class="footer-email" type="button" data-copy-footer aria-label="${t("Copia l'indirizzo email")} ${SITE.email}">
              <span data-copy-text>${SITE.email}</span>
              <svg class="footer-copy-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 15V6a2 2 0 0 1 2-2h9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
            <span class="sr-only" aria-live="polite" data-copy-footer-status></span>
            <p class="footer-status">${SITE.location}</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${SITE.name}</span>
          <button class="to-top" data-top>${t("Torna su ↑")}</button>
        </div>
      </div>`;
  }

  /* ---------- Link interni con smooth scroll ---------- */
  function initLinks() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-link]");
      if (!a) return;
      const hash = a.getAttribute("href").split("#")[1];
      const target = hash && document.getElementById(hash);
      if (!target) return; // link verso un'altra pagina: comportamento normale
      e.preventDefault();
      closeMenu();
      scrollToTarget(hash === "home" ? 0 : target);
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-top]")) scrollToTarget(0);
    });
  }

  /* ---------- Transizione verso i progetti ----------
     Con le View Transitions del browser (Chrome, Edge, Safari recenti) l'immagine
     della card cliccata "volano" al loro posto nella pagina del progetto. Dove non sono
     supportate il link funziona come sempre. */
  const VT_KEY = "ms-vt";
  const vtSupported = "onpagereveal" in window || "startViewTransition" in document;
  function clearVT() {
    document.querySelectorAll("[data-vt]").forEach((el) => { el.style.viewTransitionName = ""; el.removeAttribute("data-vt"); });
  }
  function initProjectTransitions() {
    if (!vtSupported || reduceMotion) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
      clearVT();
      if (!/progetto\.html\?id=/.test(a.getAttribute("href"))) return;
      const img = a.querySelector("img");
      if (img) { img.style.viewTransitionName = "vt-media"; img.setAttribute("data-vt", ""); }
      try { sessionStorage.setItem(VT_KEY, "1"); } catch (err) {}
    });
    // tornando indietro con la cronologia nessun elemento deve restare "nominato"
    window.addEventListener("pageshow", (e) => { if (e.persisted) clearVT(); });
  }

  function initLang() {
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lang]");
      if (b && window.setLang) window.setLang(b.dataset.lang);
    });
  }

  /* ---------- Menu ---------- */
  function openMenu() {
    document.body.classList.add("menu-open");
    const btn = document.querySelector(".nav-menu-btn");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", t("Chiudi il menu"));
    lenis && lenis.stop();
    setTimeout(() => document.querySelector(".menu-links a")?.focus({ preventScroll: true }), 300);
  }
  function closeMenu() {
    if (!document.body.classList.contains("menu-open")) return;
    document.body.classList.remove("menu-open");
    const btn = document.querySelector(".nav-menu-btn");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", t("Apri il menu"));
    lenis && lenis.start();
    if (document.querySelector(".menu").contains(document.activeElement)) btn.focus({ preventScroll: true });
  }
  function initMenu() {
    document.querySelector(".nav-menu-btn").addEventListener("click", () => {
      // computer: i tre puntini riaprono la barra lunga; telefono e schermi piccoli: tendina
      if (wideScreen.matches && !document.body.classList.contains("menu-open")) { expandNav(); return; }
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());
    // la tendina si chiude toccando fuori, o scegliendo una voce
    document.addEventListener("pointerdown", (e) => {
      if (!document.body.classList.contains("menu-open")) return;
      if (!e.target.closest(".menu, .nav-menu-btn")) closeMenu();
    });
  }

  /* ---------- Navbar che si compatta ---------- */
  // barra riaperta con i tre puntini (computer): resta lunga finché non si scorre di nuovo
  const wideScreen = matchMedia("(min-width: 900px)");
  let navExpandedAt = null;
  function expandNav() {
    navExpandedAt = window.scrollY;
    document.querySelector(".nav").classList.remove("is-compact");
  }
  function initNav() {
    const nav = document.querySelector(".nav");
    const update = () => {
      if (navExpandedAt !== null) {
        if (Math.abs(window.scrollY - navExpandedAt) < 60) return; // piccoli movimenti: resta aperta
        navExpandedAt = null;
      }
      nav.classList.toggle("is-compact", window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", update, { passive: true });
    wideScreen.addEventListener("change", () => { navExpandedAt = null; closeMenu(); update(); });
    update();

    if (!isHome) return;
    NAV_LINKS.forEach(([id]) => {
      const section = document.getElementById(id);
      const link = nav.querySelector(`.nav-links a[href="#${id}"]`);
      if (!section || !link) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => link.classList.toggle("is-active", self.isActive),
      });
    });
  }

  /* ---------- Cursore ---------- */
  function initCursor() {
    const cursor = document.querySelector(".cursor");
    if (!cursor || !finePointer) return;
    const label = cursor.querySelector(".cursor-label");
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });

    window.addEventListener("pointermove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      cursor.classList.add("is-visible");
    });
    document.documentElement.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));

    document.addEventListener("pointerover", (e) => {
      const labelled = e.target.closest("[data-cursor]");
      // sopra le foto trascinabili e la card "Prossimo progetto" il puntatore si ingrandisce appena, senza scritte
      const grow = e.target.closest("[data-cursor-grow]");
      const interactive = e.target.closest("a, button");
      if (labelled && !e.target.closest("button")) {
        label.textContent = labelled.dataset.cursor;
        cursor.classList.add("has-label");
        cursor.classList.remove("is-hover");
      } else {
        cursor.classList.remove("has-label");
        cursor.classList.toggle("is-hover", !!interactive && !(grow && grow.contains(interactive)));
      }
      cursor.classList.toggle("is-drag", !labelled && !!grow && !(interactive && !grow.contains(interactive)));
    });
  }

  /* ---------- Animazioni in entrata ---------- */
  function initReveals() {
    if (reduceMotion) return;
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
    });

    // Rete di sicurezza: ricaricando la pagina a metà, il browser riporta alla posizione di prima
    // e gli elementi già visibili (o già superati) non "entrano" mai nello schermo scorrendo,
    // quindi resterebbero trasparenti. Qui vengono mostrati subito.
    const revealInView = () => {
      const els = [...document.querySelectorAll("[data-reveal]")].filter((el) =>
        !el.dataset.revealed && !gsap.isTweening(el) && el.getBoundingClientRect().top < window.innerHeight * 0.95 && +getComputedStyle(el).opacity < 1);
      // una classe CSS (con breve dissolvenza) invece di un'animazione JS: i ricalcoli della libreria non la annullano
      els.forEach((el, i) => { el.dataset.revealed = "1"; el.style.transitionDelay = `${Math.min(i, 6) * 50}ms`; el.classList.add("is-shown", "is-fading"); });
      const fb = document.querySelector(".footer-big");
      if (fb && fb.getBoundingClientRect().top < window.innerHeight * 0.95) fb.classList.add("is-shown");
    };
    App.revealInView = revealInView;
    window.addEventListener("load", () => { [80, 400, 1000, 2000].forEach((ms) => setTimeout(revealInView, ms)); });
    // anche a ogni scroll (una volta per fotogramma): copre il ripristino della posizione, che può arrivare in ritardo
    let revealRaf = 0;
    window.addEventListener("scroll", () => {
      if (revealRaf) return;
      revealRaf = requestAnimationFrame(() => { revealRaf = 0; revealInView(); });
    }, { passive: true });
    ScrollTrigger.addEventListener("refresh", () => setTimeout(revealInView, 50));
    window.addEventListener("pageshow", (e) => { if (e.persisted) revealInView(); }); // ritorno con "indietro"

    const big = document.querySelectorAll(".footer-big .line-inner");
    gsap.fromTo(big, { yPercent: 110, y: 0 }, {
      yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.1,
      scrollTrigger: { trigger: ".footer-big", start: "top 85%" },
    });
  }

  /* ---------- Ripristino della posizione al ricaricamento ----------
     Il browser proverebbe a ripristinarla da solo, ma prima che il sito abbia costruito
     le sezioni (pagina ancora "corta"): nella home finiva in cima, nei progetti in ritardo.
     Qui salviamo la posizione quando si lascia la pagina e la ripristiniamo subito dopo
     che home.js / project.js hanno costruito tutto, mostrando all'istante ciò che è a schermo. */
  function initScrollRestore() {
    const key = "ms-scroll:" + location.pathname + location.search;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const save = () => { try { sessionStorage.setItem(key, String(Math.round(window.scrollY))); } catch (e) {} };
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") save(); });

    let saved = 0;
    try { saved = +sessionStorage.getItem(key) || 0; } catch (e) {}
    // se si arriva con un'ancora (es. index.html#progetti) vince l'ancora
    if (!saved || location.hash) return;
    // eseguito dopo gli script della pagina (DOMContentLoaded arriva quando hanno finito)
    document.addEventListener("DOMContentLoaded", () => {
      ScrollTrigger.refresh(); // misure corrette (es. la sezione Progetti bloccata)
      const y = Math.min(saved, document.documentElement.scrollHeight - window.innerHeight);
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y);
      ScrollTrigger.update();
      // ciò che è già sullo schermo compare subito, senza animazione
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) { el.dataset.revealed = "1"; el.classList.add("is-shown"); }
      });
      const fb = document.querySelector(".footer-big");
      if (fb && fb.getBoundingClientRect().top < window.innerHeight) fb.classList.add("is-shown");
    });
  }

  // Ogni parte è isolata: un errore in una non blocca le altre (né le pagine)
  const safe = (fn) => { try { fn(); } catch (err) { console.error(err); } };
  [renderChrome, initLinks, initMenu, initNav, initCursor, initReveals, initScrollRestore, initProjectTransitions, initLang].forEach(safe);

  // Condivisi con home.js e project.js
  // footer e menu: un clic sull'email la copia (come il bottone della prima sezione)
  safe(() => {
    const status = document.querySelector("[data-copy-footer-status]");
    document.querySelectorAll("[data-copy-footer], [data-copy-email]").forEach((btn) => {
      const text = btn.querySelector("[data-copy-text]");
      let timer = null;
      btn.addEventListener("click", async () => {
        const ok = await copyText(SITE.email);
        if (!ok) { window.prompt(t("Copia l'indirizzo email:"), SITE.email); return; }
        clearTimeout(timer);
        btn.classList.add("is-copied");
        text.textContent = t("Email copiata ✓");
        if (status) status.textContent = t("Indirizzo email copiato negli appunti");
        timer = setTimeout(() => {
          btn.classList.remove("is-copied");
          text.textContent = SITE.email;
          if (status) status.textContent = "";
        }, 2000);
      });
    });
  });

  Object.assign(App, { t, vtSupported, lenis, scrollToTarget, splitText, reduceMotion, finePointer, ICONS, copyText });
  window.App = App;
})();
