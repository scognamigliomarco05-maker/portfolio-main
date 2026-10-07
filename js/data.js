/* =========================================================
   CONTENUTI DEL SITO
   Modifica questo file per cambiare testi, link e progetti.
   I progetti qui sotto sono ESEMPI: sostituiscili con i tuoi.
   ========================================================= */

window.SITE = {
  name: "Marco Scognamiglio",
  location: "Verona, Italia",
  email: "scognamigliomarco05@gmail.com",
  cv: "assets/Marco-Scognamiglio-CV.pdf",

  // Banda che scorre sotto la hero
  marquee: ["UX/UI Design", "User Research", "Wireframing", "Prototipazione", "Interaction Design", "Usability Test", "Material Design", "Front-end"],

  // Sezione "Chi sono": ogni voce è una pillola che si apre in una card,
  // e cambia l'immagine grande. Sostituisci le immagini con le tue foto.
  about: {
    eyebrow: "Chi sono",
    headline: "Design, informatica e psicologia: tre mondi che uso insieme per capire le persone e trasformare le loro esigenze in interfacce concrete.",
    image: "assets/img/marco-ritratto.jpg", // immagine iniziale (nessuna voce aperta)
    fit: "ritratto", // "ritratto" = la foto va dentro il cerchio con il bagliore verde
    items: [
      {
        label: "Ciao, sono Marco",
        title: "Ciao, sono Marco.",
        text: "Studio Interfacce e Tecnologie della Comunicazione all'Università di Trento e progetto esperienze digitali che partono dalle persone: le ascolto, capisco di cosa hanno bisogno e disegno le interfacce in Figma. Il diploma da perito informatico mi aiuta a capire anche il punto di vista di chi il prodotto lo sviluppa davvero, così i miei progetti restano concreti e realizzabili.",
        image: "assets/img/marco-ritratto.jpg",
        fit: "ritratto",
      },
      {
        label: "Il mio metodo",
        title: "Il mio metodo.",
        text: "Parto sempre dalle persone e procedo in quattro fasi, ognuna con i suoi strumenti.",
        // fasi: "key" collega ogni fase alla tessera corrispondente dell'illustrazione
        phases: [
          { key: "step-1", name: "Ricerca", text: "Interviste, questionari e analisi dei competitor per capire chi userà il prodotto. Sintetizzo tutto in personas, user journey e pain point." },
          { key: "step-2", name: "Wireframe", text: "Definisco architettura dell'informazione e user flow, poi disegno wireframe a bassa fedeltà in Figma per fissare la struttura prima dello stile." },
          { key: "step-3", name: "Prototipo", text: "Trasformo i wireframe in prototipi interattivi ad alta fedeltà, curando interfaccia, gerarchia visiva e micro-interazioni." },
          { key: "step-4", name: "Test", text: "Metto il prototipo nelle mani delle persone con test di usabilità, raccolgo i feedback e itero finché l'esperienza non diventa semplice." },
        ],
        fit: "processo", // illustrazione con le 4 tappe (si illuminano insieme alle fasi)
      },
      {
        label: "Competenze",
        title: "Competenze.",
        text: "Dalla ricerca con le persone al prototipo, con un occhio anche a come verrà realizzato.",
        chips: ["UX research", "Wireframing", "Prototipazione", "UI Design (Material Design)", "Usability", "Interaction design", "Front-end"],
        fit: "competenze", // costellazione generata dalle etichette qui sopra (si illuminano insieme a quelle della card)
      },
      {
        label: "Strumenti",
        title: "Strumenti.",
        text: "Quelli che uso per progettare e dare forma alle idee.",
        // elenco: icona + nome (icone disponibili: figma, framer, wordpress, code, python, github, unity)
        tools: [
          { name: "Figma", icon: "figma" },
          { name: "Framer", icon: "framer" },
          { name: "WordPress", icon: "wordpress" },
          { name: "HTML/CSS/JS", icon: "code" },
          { name: "Python", icon: "python" },
          { name: "GitHub", icon: "github" },
          { name: "Unity", icon: "unity" },
        ],
        fit: "strumenti", // l'immagine è generata dall'elenco qui sopra (tessere che si illuminano)
      },
    ],
  },
};

/* ---------------------------------------------------------
   PROGETTI
   Compaiono nella sezione "Progetti" nello stesso ordine di questa lista.
   cover/gallery: percorsi delle immagini in assets/img
   --------------------------------------------------------- */
window.PROJECTS = [
  {
    slug: "riabilitazione",
    title: "Riabilitazione a ritmo",
    category: "Mobile App · HCI",
    year: "2024/25",
    color: "#8b7cf6",
    summary: "Un sistema che accompagna gli sportivi amatoriali nella riabilitazione a casa, tra intelligenza artificiale, TV e musica.",
    role: "Progetto di gruppo · tutte le fasi",
    context: "Corso di HCI (Interazione persona-macchina)",
    duration: "A.A. 2024/25",
    tools: ["Figma", "FigJam", "Design Thinking"],
    cover: "assets/img/riabilitazione/cover.jpg",
    hero: "assets/img/riabilitazione/hero.jpg",
    // Pagina in stile Apple: una sezione per ogni aspetto del progetto
    sections: [
      { divider: "Dietro al prototipo", text: "Prima delle schermate: il problema, il metodo e le scelte che hanno dato forma al sistema." },
      {
        eyebrow: "Il problema",
        title: "Riabilitarsi da soli è difficile.",
        text: "Dopo un infortunio, gli sportivi amatoriali devono spesso recuperare a casa, senza un fisioterapista accanto. La consegna del corso chiedeva di progettare, con il Design Thinking, un sistema di più dispositivi con interfacce multimodali: abbiamo scelto lo sport e questo problema.",
        columns: [
          { title: "Chi", text: "Sportivi amatoriali che, dopo un infortunio, vogliono seguire un percorso di riabilitazione e monitorare i progressi dalla comodità di casa." },
          { title: "Bisogni", text: "Esercizi mirati per la zona infortunata, feedback in tempo reale, istruzioni chiare e la possibilità di vedere i propri progressi." },
          { title: "Problemi", text: "Programmi generici, poca conoscenza degli esercizi, motivazione che cala e difficoltà a capire se si sta migliorando." },
        ],
      },
      {
        eyebrow: "Il metodo",
        title: "Design Thinking, passo dopo passo.",
        text: "Il progetto ha seguito le fasi del Design Thinking richieste dalla consegna, tenendo conto dei principi base dell'ergonomia.",
        steps: [
          { title: "Comprendere l'utente", text: "Chi sono gli sportivi, dove e come si allenano." },
          { title: "Analizzare i prodotti", text: "Punti di forza e limiti delle app già esistenti." },
          { title: "Definire il punto di vista", text: "Target, bisogni, problemi e obiettivi." },
          { title: "Creare il sistema", text: "Quali dispositivi usare e con che ruolo." },
          { title: "Definire l'interazione", text: "Come utente e dispositivi comunicano." },
          { title: "Realizzare il prototipo", text: "User flow, interfacce e prototipo." },
        ],
      },
      {
        eyebrow: "Gli obiettivi",
        title: "Sicuro, su misura, motivante.",
        text: "Replicare in digitale la supervisione di un fisioterapista, e rendere il recupero meno solitario: meno visite, più autonomia, più benessere.",
        columns: [
          { title: "Guidare", text: "Un percorso sicuro e personalizzato sull'infortunio e sulla fisionomia di chi lo segue." },
          { title: "Correggere", text: "Feedback in tempo reale per eseguire bene ogni esercizio, anche senza nessuno accanto." },
          { title: "Motivare", text: "Musica, progressi visibili e piccoli traguardi per non mollare a metà percorso." },
        ],
      },
      {
        eyebrow: "Il sistema",
        title: "Tre dispositivi, un solo percorso.",
        text: "Ogni dispositivo ha un compito preciso e comunica con gli altri via WiFi. Apri le voci per scoprire il ruolo di ciascuno.",
        // riquadro interattivo come in "Chi sono": "key" illumina il nodo corrispondente della mappa
        viewer: [
          { key: "node-user", label: "Utente", title: "L'utente.", text: "Indossa i sensori, interagisce con l'app sul telefono e, durante gli esercizi, riceve dalla TV istruzioni e feedback video e audio." },
          { key: "node-phone", label: "Smartphone", title: "Lo smartphone.", text: "Il cuore del sistema: configura il percorso, raccoglie i dati di sensori e fotocamera, controlla la postura e mostra i progressi." },
          { key: "node-tv", label: "TV", title: "La TV.", text: "Il supporto visivo durante l'allenamento: avatar virtuale, sagoma guida e feedback immediati, per concentrarsi sui movimenti senza distrazioni." },
          { key: "node-sensor", label: "Sensori", title: "I sensori giroscopici.", text: "Bracciali indossabili che rilevano i movimenti in modo accurato e lavorano insieme alla fotocamera dello smartphone." },
        ],
      },
      {
        eyebrow: "Come funziona",
        title: "Quattro momenti, un unico percorso.",
        steps: [
          { title: "Il piano", text: "Si carica il referto e l'IA genera gli esercizi su misura." },
          { title: "La preparazione", text: "Dispositivi collegati e telefono davanti all'utente." },
          { title: "L'allenamento", text: "Avatar, sagoma guida e feedback immediati, a ritmo di musica." },
          { title: "Il monitoraggio", text: "Report settimanale e piano che si adatta ai risultati." },
        ],
      },
      {
        eyebrow: "L'architettura",
        title: "Ogni schermata, prima come flusso.",
        text: "Prima di disegnare le interfacce abbiamo mappato in FigJam tutti i percorsi dell'app: accesso, referto, allenamento, questionario e impostazioni.",
        flow: true, // user flow disegnato nella pagina (project.js → flowArt)
      },
      { divider: "Le interfacce", text: "Dal primo accesso alla fine della settimana, schermata dopo schermata." },
      {
        eyebrow: "Dal referto alla terapia",
        title: "Carichi il referto. L'IA prepara il percorso.",
        text: "Dopo i dati di base, l'utente carica il referto medico: il sistema lo legge, lo fa confermare e genera un piano di esercizi su misura per l'infortunio.",
        // galleria in stile Apple ("Prima di tutto, la novità"): card grandi che scorrono
        gallery: [
          { src: "assets/img/riabilitazione/onboarding.webp", alt: "Registrazione e inserimento di sesso, peso, altezza ed età", title: "Primo accesso.", caption: "Pochi dati per partire: sesso, peso, altezza ed età." },
          { src: "assets/img/riabilitazione/referto.webp", alt: "Caricamento e conferma dei dati del referto medico", title: "Il referto.", caption: "Si carica il PDF del medico e si confermano i dati letti dal sistema." },
          { src: "assets/img/riabilitazione/terapia-ia.webp", alt: "Generazione della terapia con l'IA", title: "La terapia.", caption: "L'IA analizza il referto e genera il percorso di esercizi." },
          { src: "assets/img/riabilitazione/piano.webp", alt: "Piano settimanale con l'allenamento del giorno", title: "Il piano.", caption: "Ogni giorno l'allenamento da fare, settimana dopo settimana." },
        ],
      },
      {
        eyebrow: "La preparazione",
        title: "Telefono sotto la TV. E si parte.",
        text: "La TV si associa con WiFi, QR code o codice numerico. Poi il telefono va sotto lo schermo, rivolto verso l'utente, e un bordo verde o rosso indica se l'inquadratura è corretta.",
        gallery: [
          { src: "assets/img/riabilitazione/collega-tv.webp", alt: "Associazione della TV allo smartphone", title: "Si collega la TV.", caption: "Con WiFi, QR code o un codice numerico, in pochi secondi." },
          { src: "assets/img/riabilitazione/posizionamento.webp", alt: "Posizionamento del telefono sotto la TV", title: "Si posiziona il telefono.", caption: "Sotto la TV, con la fotocamera rivolta verso di sé." },
          { src: "assets/img/riabilitazione/feedback.webp", alt: "Bordo verde se l'inquadratura è corretta, rosso se va sistemata", title: "Verde, si parte.", caption: "Rosso, si sistema l'inquadratura prima di iniziare." },
        ],
      },
      {
        eyebrow: "L'allenamento",
        title: "Un avatar ti guida. Il sistema ti corregge.",
        text: "Si inizia con un pollice in su. Sulla TV un avatar mostra l'esercizio e una sagoma si colora di verde quando il movimento è giusto e di rosso quando va corretto.",
        image: "assets/img/riabilitazione/allenamento.webp",
        alt: "Allenamento sulla TV con avatar, sagoma guida e musica",
      },
      {
        eyebrow: "La musica",
        title: "Ogni esercizio ha il suo ritmo.",
        text: "La musica rende la riabilitazione meno solitaria e più motivante. Ogni esercizio ha un intervallo di BPM: l'utente sceglie il brano tra consigliati, preferiti e popolari, e il movimento segue il ritmo.",
        image: "assets/img/riabilitazione/musica.webp",
        alt: "Scelta del brano in base ai BPM dell'esercizio",
      },
      {
        eyebrow: "I progressi",
        title: "Ogni settimana, un passo avanti.",
        text: "A fine allenamento un breve questionario chiede dolore, fatica e umore. I grafici settimanali mostrano ripresa, forza e mobilità, e il piano si adatta se i risultati non bastano.",
        gallery: [
          { src: "assets/img/riabilitazione/questionario.webp", alt: "Interruzione dell'allenamento e questionario di fine sessione", title: "Il questionario.", caption: "Dolore, fatica, difficoltà e umore: quattro domande a fine allenamento." },
          { src: "assets/img/riabilitazione/progressi.webp", alt: "Riepilogo settimanale e dettagli dei progressi", title: "I progressi.", caption: "Ripresa generale, dolore, forza e mobilità, settimana dopo settimana." },
        ],
      },
    ],
  },
  {
    slug: "justcook",
    title: "Just Cook",
    category: "Packaging · Mobile App",
    year: "2024/25",
    color: "#f59e0b",
    surface: "#1f2125", // fondo delle immagini: neutro, per non coprire i colori delle box
    summary: "Box di ingredienti già dosati e un'app con le ricette, per aiutare gli studenti fuori sede a mangiare sano anche con poco tempo.",
    role: "Progetto di gruppo · tutte le fasi",
    context: "Semiotica, Sociologia e Psicologia della comunicazione",
    duration: "A.A. 2024/25",
    tools: ["Figma", "Value Proposition Design", "Questionari e interviste"],
    cover: "assets/img/justcook/cover.jpg",
    hero: "assets/img/justcook/hero.jpg",
    sections: [
      {
        eyebrow: "Il percorso",
        title: "Un progetto, tre corsi.",
        text: "Abbiamo portato avanti la stessa idea per tutto l'anno: ogni corso ha aggiunto un pezzo, dall'idea alla ricerca sul campo, fino al prodotto e alla campagna per lanciarlo.",
        steps: [
          { title: "Semiotica della rappresentazione visiva", text: "Il problema e la prima idea: box e app." },
          { title: "Sociologia della comunicazione", text: "La ricerca sul campo con gli studenti fuori sede." },
          { title: "Psicologia della comunicazione", text: "Il prodotto finale e la campagna di lancio." },
        ],
      },
      { divider: "L'idea", text: "Primo semestre, semiotica: capire il problema e trovare una risposta." },
      {
        eyebrow: "Il problema",
        title: "Mangiare bene da fuori sede è difficile.",
        text: "Tra lezioni, studio e un budget limitato, molti studenti finiscono per scegliere cibi pronti e poco sani. Il progetto parte da due obiettivi dell'Agenda 2030: salute e benessere, consumo responsabile.",
        columns: [
          { title: "Poco tempo", text: "Tra lezioni, studio e impegni, cucinare diventa l'ultima cosa della giornata." },
          { title: "Poca esperienza", text: "Chi vive da solo per la prima volta spesso non sa cosa cucinare, né in che quantità." },
          { title: "Budget limitato", text: "Il cibo fresco sembra costare più dei piatti pronti, e le confezioni sono troppo grandi per una persona." },
        ],
      },
      {
        eyebrow: "Il metodo",
        title: "Dal problema alla proposta di valore.",
        text: "Prima abbiamo riformulato il problema più volte, poi abbiamo messo in fila ciò che gli studenti fanno, ciò che li blocca e ciò che si aspettano.",
        columns: [
          { title: "Client Problem Solution", text: "Sei cicli per definire chi ha il problema, quale problema e una prima soluzione." },
          { title: "Value Proposition Design", text: "Attività, difficoltà e vantaggi attesi dagli studenti, divisi per tipo e ordinati per importanza." },
          { title: "Mappa di valore", text: "Prodotti, vantaggi e soluzioni alle difficoltà: da qui nascono la box e l'app." },
        ],
      },
      {
        eyebrow: "La soluzione",
        title: "Una box. Un pasto. Zero sprechi.",
        text: "Ogni box contiene gli ingredienti già dosati per un pasto singolo. L'app propone le ricette per usarli, organizza la settimana e permette di comprare le box.",
        image: "assets/img/justcook/soluzione.webp",
        alt: "La box Just Cook accanto all'app",
        small: true, // immagine quasi quadrata: da computer resta più piccola
      },
      { divider: "La ricerca", text: "Secondo semestre, sociologia: verificare l'idea con chi vive davvero il problema." },
      {
        eyebrow: "Sul campo",
        title: "Lo abbiamo chiesto agli studenti.",
        text: "Ci siamo concentrati sugli studenti fuori sede di Psicologia e Scienze Cognitive a Rovereto: questionari per raggiungere più persone, interviste per approfondire, osservazioni nelle loro cucine.",
        stats: [
          { value: "41", label: "risposte al questionario" },
          { value: "4", label: "interviste in profondità" },
          { value: "95%", label: "cerca di evitare lo spreco di cibo" },
        ],
      },
      {
        eyebrow: "Dalla ricerca alle funzioni",
        title: "Ogni risposta è diventata una scelta.",
        text: "Dalle interviste sono emersi alcuni temi ricorrenti. Ognuno ha dato forma a una parte del prodotto.",
        pairs: [
          { topic: "Gestione settimanale", insight: "Nessuno segue uno schema fisso: si decide giorno per giorno.", feature: "Un programma settimanale flessibile, che dice quale box usare e quando." },
          { topic: "La spesa", insight: "Si dimentica qualcosa o si comprano prodotti già rovinati.", feature: "Box da prenotare in app e ritirare al supermercato più vicino." },
          { topic: "Tempo e cucina", insight: "Con poco tempo si ripiega sui surgelati.", feature: "Ingredienti già porzionati e ricette pronte in circa 20 minuti." },
          { topic: "Competenze", insight: "Nessuno si sente inesperto, ma pochi sono davvero esperti.", feature: "Ricette passo passo, con tutorial video e scritti." },
          { topic: "Spreco", insight: "Le confezioni sono troppo grandi per una persona sola.", feature: "Porzione singola: si compra solo quello che serve." },
          { topic: "Espressione di sé", insight: "Il cibo racconta chi siamo e cosa ci importa.", feature: "Quattro box con quattro caratteri, da scegliere in base a sé." },
        ],
      },
      { divider: "Il prodotto", text: "Psicologia della comunicazione: il prodotto finale e il modo per farlo conoscere." },
      {
        eyebrow: "Le box",
        title: "Quattro box, quattro caratteri.",
        text: "Ogni box ha un colore e un carattere, pronta in 20 minuti e pensata per una persona. Il QR code sul lato apre dieci ricette diverse con gli stessi ingredienti.",
        gallerySmall: true, // le box occupano meno spazio nella card
        gallery: [
          { src: "assets/img/justcook/box-a.webp", alt: "Box A, la proteica", title: "La proteica.", caption: "Pollo, spinaci, feta e uova." },
          { src: "assets/img/justcook/box-b.webp", alt: "Box B, la energica", title: "La energica.", caption: "Pasta, salmone affumicato, avocado, pomodorini e noci." },
          { src: "assets/img/justcook/box-c.webp", alt: "Box C, la leggera", title: "La leggera.", caption: "Tacchino, zucchine, carote e riso basmati." },
          { src: "assets/img/justcook/box-d.webp", alt: "Box D, la comfort", title: "La comfort.", caption: "Polpette, purè, piselli e carote." },
        ],
      },
      {
        eyebrow: "L'app",
        title: "La settimana, già organizzata.",
        text: "L'app tiene insieme tutto: cosa cucinare oggi, il programma della settimana, le ricette di ogni box e l'acquisto di quelle che mancano.",
        gallery: [
          { src: "assets/img/justcook/app-home.webp", alt: "Home con il box del giorno e il programma settimanale", title: "Oggi e questa settimana.", caption: "Il box del giorno, l'orario per cucinare e il programma delle prossime due settimane." },
          { src: "assets/img/justcook/app-ricette.webp", alt: "Ricette di una box e videoricetta", title: "Le ricette.", caption: "Le ricette di ogni box e una guida video, passo dopo passo." },
          { src: "assets/img/justcook/app-acquisto.webp", alt: "Acquisto delle box in app", title: "Le box che mancano.", caption: "Si comprano in automatico o a mano, e si ritirano al supermercato." },
          { src: "assets/img/justcook/app-notifica.webp", alt: "Notifica sulla schermata di blocco", title: "Il promemoria.", caption: "Una notifica ricorda quando è ora di cucinare." },
        ],
      },
      {
        eyebrow: "Il nome e il logo",
        title: "Ironico, rassicurante, responsabilizzante.",
        text: "Just Cook, «cucina e basta»: un nome breve e diretto. Il logo è una pentola sulle quattro strisce colorate delle box, e ogni colore richiama uno dei tre toni del messaggio.",
        brand: {
          logo: "assets/img/justcook/logo.webp",
          alt: "Logo Just Cook: una pentola sulle quattro strisce colorate delle box",
          items: [
            { title: "Ironico", color: "#e8503a", text: "Un tono leggero e un nome che sdrammatizza: cucinare non deve sembrare un compito in più." },
            { title: "Rassicurante", color: "#0a9bf5", text: "Porzioni già pronte e ricette semplici: anche chi non sa cucinare ce la può fare." },
            { title: "Responsabilizzante", color: "#ff8800", text: "Mangiare bene e non sprecare diventano una scelta di cui sentirsi parte." },
          ],
        },
      },
      {
        eyebrow: "La campagna",
        title: "Farsi trovare dove sono gli studenti.",
        text: "L'obiettivo era far conoscere Just Cook agli studenti fuori sede di Rovereto e coinvolgere un supermercato della città, dove ritirare le box.",
        gallery: [
          { src: "assets/img/justcook/camp-instagram.webp", alt: "Profilo Instagram di Just Cook", title: "Il profilo Instagram.", caption: "Le quattro box e le ricette, con lo stesso stile del packaging." },
          { src: "assets/img/justcook/camp-post-box.webp", alt: "Post delle quattro box", title: "Un post per ogni box.", caption: "La proteica, la energica, la leggera e la comfort, ognuna con il suo colore." },
          { src: "assets/img/justcook/camp-post-tono.webp", alt: "Post ironici della campagna", title: "Il tono ironico.", caption: "«So good», «Good food always win»: giochi di parole e piatti veri." },
          { src: "assets/img/justcook/camp-post-sfide.webp", alt: "Post che invitano a sfidare gli amici", title: "Le sfide tra amici.", caption: "«Scarica l'app e mangia sano sfidando i tuoi amici»." },
        ],
        columns: [
          { title: "Instagram", text: "Un profilo con un post per ogni box e le ricette, nello stesso stile del packaging." },
          { title: "Gruppi WhatsApp", text: "Messaggi nei gruppi delle matricole, dove gli studenti si informano davvero." },
          { title: "Volantini con QR code", text: "In università e nelle aule studio, per arrivare all'app in un attimo." },
          { title: "Sfide tra amici", text: "Punteggio settimanale e classifica: spingono a usare l'app e a farla conoscere." },
        ],
      },
      {
        eyebrow: "L'impatto",
        title: "Come capire se funziona.",
        columns: [
          { title: "Box registrate", text: "Ogni box ha un codice da scansionare: si sa quante ne vengono acquistate e usate." },
          { title: "Feedback in app", text: "Gradimento dei piatti, tempo risparmiato e spreco evitato, raccolti dopo ogni ricetta." },
          { title: "Progressi e sfide", text: "Punteggio settimanale e classifica con gli amici: misurano l'uso e lo incentivano." },
        ],
      },
    ],
  },
  {
    slug: "smarthome",
    title: "Smart home",
    category: "Mobile App",
    year: "2025/26",
    color: "#7c6bc4",
    surface: "#1f2125",
    summary: "Un'unica app per gestire una casa domotica: dispositivi, sicurezza, accessi e automazioni, progettata con Material Design 3.",
    role: "Progetto di gruppo · tutte le fasi",
    context: "Corso di Progettazione di interfacce grafiche",
    duration: "A.A. 2025/26",
    tools: ["Figma", "Material Design 3", "FigJam"],
    cover: "assets/img/smarthome/cover.jpg",
    hero: "assets/img/smarthome/hero.jpg",
    sections: [
      {
        eyebrow: "Il processo",
        title: "Dal problema al prototipo.",
        text: "Il progetto ha seguito il doppio diamante: prima capire la casa e chi la abita, poi progettare le soluzioni e dare loro forma con Material Design 3.",
        steps: [
          { title: "Il brief", text: "Business, valore e stakeholder." },
          { title: "Il dominio", text: "Oggetti, azioni quotidiane e spazi della casa." },
                    { title: "Personas e pain point", text: "Chi vive la casa e cosa lo mette in difficoltà." },
          { title: "Design concept", text: "Idee a mano, poi confronto e sintesi." },
          { title: "Il prototipo", text: "Interfacce e user flow in Material Design 3." },
        ],
      },
      { divider: "Il problema", text: "Primo diamante: capire il problema e le persone prima di disegnare." },
      {
        eyebrow: "Il brief",
        title: "Una sola app per tutta la casa.",
        text: "L'ipotesi: un'azienda che produce e installa dispositivi domotici ci chiede il software per gestirli. Oggi ogni dispositivo ha la sua app; noi volevamo controllarli tutti da un unico posto.",
        columns: [
          { title: "Il valore", text: "Un solo software per tutta la casa distingue l'azienda dalla concorrenza e invoglia i clienti ad aggiungere nuovi dispositivi." },
          { title: "I vincoli", text: "Solo gestione dei dispositivi già installati: niente vendita, installazione o assistenza hardware." },
          { title: "Gli stakeholder", text: "Chi vive la casa, chi la frequenta con un accesso limitato (babysitter, badanti) e chi ci passa soltanto, come ospiti e corrieri." },
        ],
      },
      {
        eyebrow: "Personas e pain point",
        title: "Sei vite diverse, un filo comune.",
        text: "Abbiamo immaginato sei personas, dal businessman sempre di corsa al nonno che vuole restare indipendente, dall'artista distratta al corriere che non trova nessuno in casa. Stili di vita diversi, ma una difficoltà condivisa: gestire la casa in modo sereno e sotto controllo.",
        stats: [
          { value: "6", label: "personas, ognuna con la sua storia" },
          { value: "16", label: "pain point raccolti in una tabella" },
          { value: "5", label: "problemi scelti da risolvere" },
        ],
      },
      { divider: "Il design", text: "Secondo diamante: dalle idee di ciascuno a un'unica interfaccia." },
      {
        eyebrow: "Design concept",
        title: "Ogni problema, una soluzione.",
        text: "Ognuno di noi ha disegnato le proprie idee a mano; poi le abbiamo confrontate e scelto, per ogni pain point, le soluzioni fondamentali. Ecco come sono diventate interfacce.",
        gallery: [
          { src: "assets/img/smarthome/pp-dispositivi.webp", alt: "Piantina della casa con i dispositivi, dettaglio della stanza e notifica", title: "Ho lasciato qualcosa acceso?", caption: "La piantina mostra dove sono i dispositivi e se sono accesi; ogni stanza si apre nel dettaglio e una notifica avvisa se qualcosa si accende." },
          { src: "assets/img/smarthome/pp-allarme.webp", alt: "Sicurezza con i sensori e avviso di finestre aperte", title: "Ho armato l'allarme?", caption: "Lo stato dell'allarme è sempre visibile e si arma con un tasto. Se una finestra è aperta, l'app lo segnala prima." },
          { src: "assets/img/smarthome/pp-citofono.webp", alt: "Chiamata del citofono e pannello di risposta", title: "Hanno suonato e non ho sentito.", caption: "Il citofono arriva sul telefono come una chiamata: si guarda chi c'è e si apre con uno slider, anche fuori casa." },
          { src: "assets/img/smarthome/pp-sicurezza.webp", alt: "Telecamere e automazioni", title: "Da solo in casa non sono tranquillo.", caption: "Telecamere sulla piantina e routine che attivano la sicurezza da sole, ad esempio la sera." },
          { src: "assets/img/smarthome/pp-accessi.webp", alt: "Codici permanenti, temporanei e nuovo accesso", title: "Non mi fido a lasciare le chiavi.", caption: "Ogni persona ha il suo codice, valido solo in certi giorni e orari; per corrieri e ospiti ci sono codici temporanei." },
        ],
      },
      {
        eyebrow: "Material Design 3",
        title: "Ogni componente ha un motivo.",
        text: "Abbiamo seguito le linee guida di Material Design 3 e giustificato ogni scelta, anche quando ce ne siamo allontanati.",
        columns: [
          { title: "Navigation bar", text: "Le cinque sezioni sempre a portata di pollice, con icona ed etichetta." },
          { title: "Connected buttons e tab", text: "Per cambiare vista (luci, serramenti, apparecchi) o piano della casa senza cambiare pagina." },
          { title: "Card ed extended FAB", text: "Ogni dispositivo è una card con il colore della sua stanza; l'azione principale, come armare l'allarme, è un FAB." },
          { title: "Uno slider per aprire", text: "Fuori dalle linee guida, ma voluto: un gesto continuo evita di aprire il cancello per sbaglio." },
        ],
      },
    ],
  },
  {
    slug: "meteora",
    title: "Meteora",
    category: "Web App",
    year: "2026",
    color: "#22d3ee",
    surface: "#1f2125",
    summary: "Una dashboard meteo per tutto il mondo: tempo reale, previsioni a 5 giorni, città preferite e allerte per calamità. Ne ho curato da solo il restyling completo.",
    role: "Progetto di gruppo · restyling individuale",
    context: "Corso di Programmazione 2",
    duration: "2026",
    tools: ["Vue 3", "Vuetify", "Firebase"],
    cover: "assets/img/meteora/cover.jpg",
    hero: "assets/img/meteora/hero.jpg",
    sections: [
      {
        eyebrow: "In breve",
        title: "Un progetto di gruppo, un restyling tutto mio.",
        text: "Meteora è nata come progetto di gruppo per il corso di Programmazione 2: una web app che raccoglie i dati meteo di tutto il mondo. Dopo l'esame l'ho ripresa da solo e ne ho rifatto l'interfaccia, dal design al codice.",
        columns: [
          { title: "Un nuovo design", text: "Tutte le schermate ridisegnate con un unico stile: palette scura, azzurro e arancione come accenti, card in vetro e il font Plus Jakarta Sans." },
          { title: "Per ogni schermo", text: "Sul computer il menu è una barra laterale, sul telefono diventa una barra in basso: ogni sezione si adatta allo spazio." },
          { title: "Installabile", text: "È una PWA: si installa sul telefono o sul computer come un'app vera, con la sua icona." },
        ],
      },
      {
        eyebrow: "Con cosa",
        title: "Gli strumenti.",
        text: "Un'app web moderna, con i dati presi da servizi pubblici in tempo reale.",
        chips: ["Vue 3", "Vuetify", "Vite", "Vue Router", "Firebase Auth", "Cloud Firestore", "OpenWeather API", "GDACS API", "PWA"],
      },
      { divider: "Le funzionalità", text: "Cosa si può fare con Meteora, schermata dopo schermata." },
      {
        eyebrow: "L'app",
        title: "Il meteo del mondo, in un'unica dashboard.",
        text: "Ogni funzione, sul computer e sul telefono.",
        gallery: [
          { src: "assets/img/meteora/accesso.webp", alt: "Schermata di accesso su computer e telefono", title: "Accesso e registrazione.", caption: "Si entra con email e password; in registrazione i requisiti della password si spuntano mentre si scrive." },
          { src: "assets/img/meteora/meteo.webp", alt: "Meteo attuale di Verona", title: "Il meteo, adesso.", caption: "Si cerca una città o si usa la propria posizione: temperatura, percepita, minime, massime, umidità e vento in un colpo d'occhio." },
          { src: "assets/img/meteora/previsioni.webp", alt: "Previsioni orarie e dettagli", title: "Ora per ora.", caption: "Previsioni a 5 giorni a fasce di 3 ore, con temperatura, pioggia e neve, umidità, vento con la bussola e pressione." },
          { src: "assets/img/meteora/preferiti.webp", alt: "Città preferite", title: "Le città preferite.", caption: "Con il cuore si salva una città: i preferiti restano nel cloud e si ritrovano su ogni dispositivo." },
          { src: "assets/img/meteora/allerte.webp", alt: "Allerte GDACS", title: "Le allerte.", caption: "I dati GDACS segnalano siccità, alluvioni, terremoti e altre calamità entro 500 km dalla città scelta." },
          { src: "assets/img/meteora/profilo.webp", alt: "Profilo e preferenze", title: "Profilo e preferenze.", caption: "Si sceglie tra Celsius e Fahrenheit e l'unità del vento, si modifica il profilo o si elimina l'account." },
        ],
      },
    ],
  },
  {
    slug: "lunapark-vr",
    soon: true, // progetto in corso: card visibile nel carosello, pagina non ancora disponibile
    title: "Luna park in VR",
    category: "Realtà virtuale",
    year: "In corso",
    color: "#8b7cf6",
    summary: "Un luna park in realtà virtuale per studiare la change blindness: quanto ci accorgiamo dei cambiamenti intorno a noi.",
    tools: ["Unity", "Realtà virtuale", "Change blindness"],
    cover: "assets/img/vr-lunapark.svg",
  },
];
