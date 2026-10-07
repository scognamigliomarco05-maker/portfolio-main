/* =========================================================
   LINGUA (IT / EN)
   - La lingua scelta resta salvata nel browser (IT all'inizio).
   - t("testo italiano") restituisce la traduzione inglese, se c'è.
   - In inglese i testi di SITE e PROJECTS vengono sostituiti con quelli qui sotto.
   - Nelle pagine HTML gli elementi con data-i18n vengono tradotti al caricamento.
   ========================================================= */
(() => {
  let lang = "it";
  try { lang = localStorage.getItem("ms-lang") || "it"; } catch (e) {}
  if (lang !== "it" && lang !== "en") lang = "it";
  document.documentElement.lang = lang;

  const norm = (s) => String(s).replace(/\s+/g, " ").trim();

  /* ---------- Interfaccia ---------- */
  const UI = {
    // pagine
    "Marco Scognamiglio — Portfolio": "Marco Scognamiglio — Portfolio",
    "Portfolio di Marco Scognamiglio, studente di Interfacce e Tecnologie della Comunicazione all'Università di Trento. UX/UI design, interaction design e front-end.":
      "Portfolio of Marco Scognamiglio, Interfaces and Communication Technologies student at the University of Trento. UX/UI design, interaction design and front-end.",
    "Progetto — Marco Scognamiglio": "Project — Marco Scognamiglio",
    "Progetto dal portfolio di Marco Scognamiglio.": "A project from Marco Scognamiglio's portfolio.",
    // hero
    "Portfolio · Verona/Trento": "Portfolio · Verona/Trento",
    "Ciao, sono Marco": "Hi, I'm Marco",
    '<span class="hero-role">UX/UI Designer</span> che progetta interfacce digitali chiare, accessibili e umane.':
      '<span class="hero-role">UX/UI Designer</span> designing digital interfaces that are clear, accessible and human.',
    "Ogni progetto che creo nasce da una persona: ascolto le sue abitudini, le sue difficoltà, quello che non dice. E lo trasformo in qualcosa che può usare davvero.":
      "Every project I create starts with a person: I listen to their habits, their struggles, what they leave unsaid. And I turn it into something they can actually use.",
    "Scroll": "Scroll",
    "Vedi CV": "View CV",
    "Vedi CV ↗": "View CV ↗",
    "Email copiata": "Email copied",
    "Email copiata ✓": "Email copied ✓",
    "Indirizzo email copiato negli appunti": "Email address copied to the clipboard",
    "Copia l'indirizzo email": "Copy the email address",
    "Copia l'indirizzo email:": "Copy the email address:",
    // progetti (home)
    "Dal 2023": "Since 2023",
    "Progetti": "Projects",
    "Università, scuola e progetti personali: ricerca, design e codice per creare esperienze che mettono in relazione persone, spazi e servizi.":
      "University, school and personal projects: research, design and code to create experiences that connect people, places and services.",
    'Scorri <span aria-hidden="true">→</span>': 'Scroll <span aria-hidden="true">→</span>',
    "Vedi progetto": "View project",
    "In corso": "In progress",
    "progetto in corso": "project in progress",
    "è ancora in corso: presto qui tutto il progetto.": "is still in progress: the full project is coming soon.",
    "Anteprima del progetto": "Preview of the project",
    // nav, menu, footer
    "Chi sono": "About",
    "Contatti": "Contact",
    "Contattami": "Contact me",
    "Principale": "Main",
    "Apri il menu": "Open the menu",
    "Chiudi il menu": "Close the menu",
    "Lingua": "Language",
    "Scrivimi": "Email me",
    "Lavoriamo": "Let's work",
    "insieme!": "together!",
    "Torna su ↑": "Back to top ↑",
    "Verona, Italia": "Verona, Italy",
    // viewer
    "Voce precedente": "Previous item",
    "Voce successiva": "Next item",
    "Chiudi": "Close",
    // pagina progetto
    "← Tutti i progetti": "← All projects",
    "Tutti i progetti": "All projects",
    "Progetto non trovato": "Project not found",
    "Il link potrebbe essere sbagliato. Torna alla lista dei progetti.": "The link may be wrong. Go back to the list of projects.",
    "Ruolo": "Role",
    "Contesto": "Context",
    "Durata": "Duration",
    "Strumenti": "Tools",
    "Immagine principale del progetto": "Main image of the project",
    "Altri progetti": "More projects",
    "Prossimo": "Next",
    " progetto": " project",
    "Metti in pausa": "Pause",
    "Riproduci": "Play",
    "Vai alla schermata": "Go to slide",
    "di": "of",
    "Scorri per vedere tutto il flusso →": "Scroll to see the whole flow →",
    "Scorri per vedere tutti i passaggi →": "Scroll to see every step →",
    // mappa del sistema (Riabilitazione a ritmo)
    "Utente": "User",
    "Sensori": "Sensors",
    "interazione": "interaction",
    "indossa": "wears",
    // user flow (Riabilitazione a ritmo)
    "User flow dell'app: accesso, dati personali, home e i tre percorsi di referto, allenamento e impostazioni":
      "App user flow: sign-in, personal data, home and the three paths for medical report, training and settings",
    "Accesso": "Sign in",
    "email · Apple · Google": "email · Apple · Google",
    "I tuoi dati": "Your data",
    "sesso · età · peso": "sex · age · weight",
    "piano del giorno": "today's plan",
    "Carica referto": "Upload report",
    "PDF del medico": "doctor's PDF",
    "Conferma dati": "Confirm data",
    "motivo · esito": "reason · outcome",
    "Terapia con IA": "AI therapy",
    "generazione": "generation",
    "Piano": "Plan",
    "settimane · giorni": "weeks · days",
    "Associa TV": "Pair TV",
    "WiFi · QR · codice": "WiFi · QR · code",
    "Posizionamento": "Positioning",
    "telefono sotto la TV": "phone under the TV",
    "Allenamento": "Training",
    "avatar · musica": "avatar · music",
    "Questionario": "Survey",
    "dolore · fatica": "pain · fatigue",
    "Impostazioni": "Settings",
    "Profilo": "Profile",
    "dati · avatar": "data · avatar",
    "Piani": "Plans",
    "attuale · vecchi": "current · past",
    "Dispositivi": "Devices",
    "sensori · TV": "sensors · TV",
    "a fine allenamento si torna alla Home": "after training, back to Home",
    "primo accesso": "first sign-in",
  };
  const DICT = {};
  Object.keys(UI).forEach((k) => { DICT[norm(k)] = UI[k]; });
  const t = (s) => (lang === "it" ? s : (DICT[norm(s)] ?? s));

  /* ---------- Contenuti (SITE e PROJECTS) ---------- */
  const SITE_EN = {
    location: "Verona, Italy",
    marquee: ["UX/UI Design", "User Research", "Wireframing", "Prototyping", "Interaction Design", "Usability Testing", "Material Design", "Front-end"],
    about: {
      eyebrow: "About",
      headline: "Design, computer science and psychology: three worlds I bring together to understand people and turn their needs into concrete interfaces.",
      items: [
        {
          label: "Hi, I'm Marco",
          title: "Hi, I'm Marco.",
          text: "I study Interfaces and Communication Technologies at the University of Trento and design digital experiences that start from people: I listen to them, understand what they need and design the interfaces in Figma. My technical diploma in computer science helps me see things from the point of view of those who actually build the product, so my projects stay concrete and feasible.",
        },
        {
          label: "My method",
          title: "My method.",
          text: "I always start from people and work in four phases, each with its own tools.",
          phases: [
            { name: "Research", text: "Interviews, surveys and competitor analysis to understand who will use the product. I sum it all up in personas, user journeys and pain points." },
            { name: "Wireframe", text: "I define information architecture and user flows, then draw low-fidelity wireframes in Figma to set the structure before the style." },
            { name: "Prototype", text: "I turn wireframes into high-fidelity interactive prototypes, taking care of the interface, visual hierarchy and micro-interactions." },
            { name: "Test", text: "I put the prototype in people's hands with usability tests, collect feedback and iterate until the experience becomes simple." },
          ],
        },
        {
          label: "Skills",
          title: "Skills.",
          text: "From research with people to the prototype, with an eye on how it will be built.",
          chips: ["UX research", "Wireframing", "Prototyping", "UI Design (Material Design)", "Usability", "Interaction design", "Front-end"],
        },
        {
          label: "Tools",
          title: "Tools.",
          text: "The ones I use to design and give shape to ideas.",
        },
      ],
    },
  };

  const PROJECTS_EN = {
    riabilitazione: {
      title: "Rehab in Rhythm",
      year: "2024/25",
      summary: "A system that guides amateur athletes through rehabilitation at home, with artificial intelligence, a TV and music.",
      role: "Group project · all phases",
      context: "HCI course (Human-Computer Interaction)",
      duration: "A.Y. 2024/25",
      sections: [
        { divider: "Behind the prototype", text: "Before the screens: the problem, the method and the choices that shaped the system." },
        {
          eyebrow: "The problem",
          title: "Recovering on your own is hard.",
          text: "After an injury, amateur athletes often have to recover at home, without a physiotherapist by their side. The course brief asked us to design, with Design Thinking, a multi-device system with multimodal interfaces: we chose sport and this problem.",
          columns: [
            { title: "Who", text: "Amateur athletes who, after an injury, want to follow a rehabilitation programme and track their progress from the comfort of home." },
            { title: "Needs", text: "Exercises targeted at the injured area, real-time feedback, clear instructions and a way to see their own progress." },
            { title: "Problems", text: "Generic programmes, little knowledge of the exercises, fading motivation and trouble understanding whether they're improving." },
          ],
        },
        {
          eyebrow: "The method",
          title: "Design Thinking, step by step.",
          text: "The project followed the Design Thinking phases required by the brief, taking the basic principles of ergonomics into account.",
          steps: [
            { title: "Understand the user", text: "Who the athletes are, where and how they train." },
            { title: "Analyse existing products", text: "Strengths and limits of the apps already out there." },
            { title: "Define the point of view", text: "Target, needs, problems and goals." },
            { title: "Create the system", text: "Which devices to use, and what role each plays." },
            { title: "Define the interaction", text: "How user and devices communicate." },
            { title: "Build the prototype", text: "User flows, interfaces and prototype." },
          ],
        },
        {
          eyebrow: "The goals",
          title: "Safe, tailored, motivating.",
          text: "Recreate a physiotherapist's supervision digitally and make recovery less lonely: fewer visits, more autonomy, more well-being.",
          columns: [
            { title: "Guide", text: "A safe programme tailored to the injury and to the body of whoever follows it." },
            { title: "Correct", text: "Real-time feedback to do every exercise right, even with nobody around." },
            { title: "Motivate", text: "Music, visible progress and small milestones so you don't give up halfway." },
          ],
        },
        {
          eyebrow: "The system",
          title: "Three devices, one journey.",
          text: "Each device has a precise job and talks to the others over WiFi. Open the items to discover each one's role.",
          viewer: [
            { label: "User", title: "The user.", text: "Wears the sensors, uses the app on the phone and, during the exercises, gets instructions and video and audio feedback from the TV." },
            { label: "Smartphone", title: "The smartphone.", text: "The heart of the system: it sets up the programme, collects data from the sensors and camera, checks posture and shows progress." },
            { label: "TV", title: "The TV.", text: "The visual support during training: virtual avatar, guide silhouette and instant feedback, to focus on the movements without distractions." },
            { label: "Sensors", title: "The gyroscopic sensors.", text: "Wearable bands that track movements accurately and work together with the smartphone's camera." },
          ],
        },
        {
          eyebrow: "How it works",
          title: "Four moments, one journey.",
          steps: [
            { title: "The plan", text: "You upload the medical report and the AI creates tailored exercises." },
            { title: "The setup", text: "Devices connected and the phone facing the user." },
            { title: "The training", text: "Avatar, guide silhouette and instant feedback, to the beat of music." },
            { title: "The tracking", text: "A weekly report and a plan that adapts to the results." },
          ],
        },
        {
          eyebrow: "The architecture",
          title: "Every screen, first as a flow.",
          text: "Before drawing the interfaces we mapped every path of the app in FigJam: sign-in, medical report, training, survey and settings.",
        },
        { divider: "The interfaces", text: "From the first sign-in to the end of the week, screen by screen." },
        {
          eyebrow: "From report to therapy",
          title: "Upload the report. The AI prepares the plan.",
          text: "After the basic data, the user uploads the medical report: the system reads it, asks for confirmation and creates an exercise plan tailored to the injury.",
          gallery: [
            { alt: "Sign-up and entry of sex, weight, height and age", title: "First sign-in.", caption: "A few details to get started: sex, weight, height and age." },
            { alt: "Uploading and confirming the medical report data", title: "The report.", caption: "You upload the doctor's PDF and confirm the data read by the system." },
            { alt: "Generating the therapy with AI", title: "The therapy.", caption: "The AI analyses the report and creates the exercise programme." },
            { alt: "Weekly plan with today's training", title: "The plan.", caption: "Each day's training, week after week." },
          ],
        },
        {
          eyebrow: "The setup",
          title: "Phone under the TV. And off you go.",
          text: "The TV pairs via WiFi, QR code or a numeric code. Then the phone goes under the screen, facing the user, and a green or red border shows whether the framing is right.",
          gallery: [
            { alt: "Pairing the TV with the smartphone", title: "Pair the TV.", caption: "With WiFi, a QR code or a numeric code, in a few seconds." },
            { alt: "Placing the phone under the TV", title: "Place the phone.", caption: "Under the TV, with the camera facing you." },
            { alt: "Green border if the framing is right, red if it needs fixing", title: "Green, you're ready.", caption: "Red, fix the framing before starting." },
          ],
        },
        {
          eyebrow: "The training",
          title: "An avatar guides you. The system corrects you.",
          text: "You start with a thumbs-up. On the TV an avatar shows the exercise and a silhouette turns green when the movement is right and red when it needs correcting.",
          alt: "Training on the TV with avatar, guide silhouette and music",
        },
        {
          eyebrow: "The music",
          title: "Every exercise has its own rhythm.",
          text: "Music makes rehabilitation less lonely and more motivating. Each exercise has a BPM range: the user picks a song from recommended, favourite and popular tracks, and the movement follows the beat.",
          alt: "Choosing a song based on the exercise BPM",
        },
        {
          eyebrow: "Progress",
          title: "Every week, a step forward.",
          text: "At the end of the training a short survey asks about pain, fatigue and mood. Weekly charts show recovery, strength and mobility, and the plan adapts if the results fall short.",
          gallery: [
            { alt: "Stopping the training and end-of-session survey", title: "The survey.", caption: "Pain, fatigue, difficulty and mood: four questions after each training." },
            { alt: "Weekly summary and progress details", title: "Progress.", caption: "Overall recovery, pain, strength and mobility, week after week." },
          ],
        },
      ],
    },

    justcook: {
      summary: "Boxes of pre-portioned ingredients and an app with recipes, to help students living away from home eat healthily even when short on time.",
      role: "Group project · all phases",
      context: "Semiotics, Sociology and Psychology of Communication",
      duration: "A.Y. 2024/25",
      tools: ["Figma", "Value Proposition Design", "Surveys and interviews"],
      sections: [
        {
          eyebrow: "The journey",
          title: "One project, three courses.",
          text: "We carried the same idea through the whole year: each course added a piece, from the idea to field research, all the way to the product and the campaign to launch it.",
          steps: [
            { title: "Semiotics of visual representation", text: "The problem and the first idea: box and app." },
            { title: "Sociology of communication", text: "Field research with students living away from home." },
            { title: "Psychology of communication", text: "The final product and the launch campaign." },
          ],
        },
        { divider: "The idea", text: "First semester, semiotics: understanding the problem and finding an answer." },
        {
          eyebrow: "The problem",
          title: "Eating well away from home is hard.",
          text: "Between lectures, studying and a tight budget, many students end up choosing ready-made, unhealthy food. The project starts from two goals of the 2030 Agenda: good health and well-being, responsible consumption.",
          columns: [
            { title: "Little time", text: "Between lectures, studying and commitments, cooking becomes the last thing of the day." },
            { title: "Little experience", text: "Those living alone for the first time often don't know what to cook, or how much." },
            { title: "Tight budget", text: "Fresh food seems to cost more than ready meals, and packs are too big for one person." },
          ],
        },
        {
          eyebrow: "The method",
          title: "From the problem to the value proposition.",
          text: "First we reframed the problem several times, then we laid out what students do, what holds them back and what they expect.",
          columns: [
            { title: "Client Problem Solution", text: "Six cycles to define who has the problem, which problem and a first solution." },
            { title: "Value Proposition Design", text: "Students' jobs, pains and gains, grouped by type and ranked by importance." },
            { title: "Value map", text: "Products, gain creators and pain relievers: this is where the box and the app came from." },
          ],
        },
        {
          eyebrow: "The solution",
          title: "One box. One meal. Zero waste.",
          text: "Each box contains pre-portioned ingredients for a single meal. The app suggests recipes to use them, plans the week and lets you buy the boxes.",
          alt: "The Just Cook box next to the app",
        },
        { divider: "The research", text: "Second semester, sociology: testing the idea with the people who actually live the problem." },
        {
          eyebrow: "In the field",
          title: "We asked the students.",
          text: "We focused on students of Psychology and Cognitive Science living away from home in Rovereto: surveys to reach more people, interviews to go deeper, observations in their kitchens.",
          stats: [
            { label: "survey responses" },
            { label: "in-depth interviews" },
            { label: "try to avoid wasting food" },
          ],
        },
        {
          eyebrow: "From research to features",
          title: "Every answer became a choice.",
          text: "Some recurring themes emerged from the interviews. Each one shaped a part of the product.",
          pairs: [
            { topic: "Weekly planning", insight: "Nobody follows a fixed plan: they decide day by day.", feature: "A flexible weekly plan that tells you which box to use and when." },
            { topic: "Shopping", insight: "People forget things, or end up buying products that have already gone off.", feature: "Boxes you book in the app and pick up at the nearest supermarket." },
            { topic: "Time and cooking", insight: "With little time, people fall back on frozen food.", feature: "Pre-portioned ingredients and recipes ready in about 20 minutes." },
            { topic: "Skills", insight: "Nobody feels inexperienced, but few are real experts.", feature: "Step-by-step recipes, with video and written tutorials." },
            { topic: "Waste", insight: "Packs are too big for one person.", feature: "Single portion: you buy only what you need." },
            { topic: "Self-expression", insight: "Food says who we are and what we care about.", feature: "Four boxes with four personalities: you pick the one that suits you." },
          ],
        },
        { divider: "The product", text: "Psychology of communication: the final product and how to make it known." },
        {
          eyebrow: "The boxes",
          title: "Four boxes, four personalities.",
          text: "Each box has its own colour and personality, is ready in 20 minutes and designed for one person. The QR code on the side opens ten different recipes with the same ingredients.",
          gallery: [
            { alt: "Box A, the protein one", title: "The protein one.", caption: "Chicken, spinach, feta and eggs." },
            { alt: "Box B, the energising one", title: "The energising one.", caption: "Pasta, smoked salmon, avocado, cherry tomatoes and walnuts." },
            { alt: "Box C, the light one", title: "The light one.", caption: "Turkey, courgettes, carrots and basmati rice." },
            { alt: "Box D, the comfort one", title: "The comfort one.", caption: "Meatballs, mashed potatoes, peas and carrots." },
          ],
        },
        {
          eyebrow: "The app",
          title: "The week, already planned.",
          text: "The app holds everything together: what to cook today, the weekly plan, the recipes for each box and buying the ones you're missing.",
          gallery: [
            { alt: "Home with today's box and the weekly plan", title: "Today and this week.", caption: "Today's box, the time to cook and the plan for the next two weeks." },
            { alt: "Recipes of a box and video recipe", title: "The recipes.", caption: "The recipes for each box and a video guide, step by step." },
            { alt: "Buying boxes in the app", title: "The missing boxes.", caption: "Bought automatically or by hand, and picked up at the supermarket." },
            { alt: "Notification on the lock screen", title: "The reminder.", caption: "A notification reminds you when it's time to cook." },
          ],
        },
        {
          eyebrow: "Name and logo",
          title: "Ironic, reassuring, empowering.",
          text: "Just Cook: a short, direct name. The logo is a pot on the four coloured stripes of the boxes, and each colour recalls one of the three tones of the message.",
          brand: {
            alt: "Just Cook logo: a pot on the four coloured stripes of the boxes",
            items: [
              { title: "Ironic", text: "A light tone and a name that plays things down: cooking shouldn't feel like one more chore." },
              { title: "Reassuring", text: "Ready-made portions and simple recipes: even people who can't cook can manage." },
              { title: "Empowering", text: "Eating well and not wasting food become a choice you feel part of." },
            ],
          },
        },
        {
          eyebrow: "The campaign",
          title: "Be found where students are.",
          text: "The goal was to make Just Cook known to students living away from home in Rovereto and to involve a supermarket in town where the boxes could be picked up.",
          gallery: [
            { alt: "Just Cook Instagram profile", title: "The Instagram profile.", caption: "The four boxes and the recipes, in the same style as the packaging." },
            { alt: "Posts of the four boxes", title: "One post per box.", caption: "The protein, the energising, the light and the comfort one, each with its own colour." },
            { alt: "Ironic campaign posts", title: "The ironic tone.", caption: "«So good», «Good food always win»: wordplay and real dishes." },
            { alt: "Posts inviting you to challenge your friends", title: "Challenges with friends.", caption: "«Download the app and eat healthy by challenging your friends»." },
          ],
          columns: [
            { title: "Instagram", text: "A profile with one post per box and the recipes, in the same style as the packaging." },
            { title: "WhatsApp groups", text: "Messages in freshers' group chats, where students actually get their news." },
            { title: "Challenges with friends", text: "Weekly score and leaderboard: they push people to use the app and spread the word." },
          ],
        },
        {
          eyebrow: "The impact",
          title: "How to tell if it works.",
          columns: [
            { title: "Registered boxes", text: "Each box has a code to scan: we know how many are bought and used." },
            { title: "In-app feedback", text: "How much people liked the dish, time saved and waste avoided, collected after each recipe." },
            { title: "Progress and challenges", text: "Weekly score and leaderboard with friends: they measure use and encourage it." },
          ],
        },
      ],
    },

    smarthome: {
      summary: "A single app to run a smart home: devices, security, access and automations, designed with Material Design 3.",
      role: "Group project · all phases",
      context: "Graphical User Interface Design course",
      duration: "A.Y. 2025/26",
      sections: [
        {
          eyebrow: "The process",
          title: "From problem to prototype.",
          text: "The project followed the double diamond: first understand the home and who lives in it, then design the solutions and give them shape with Material Design 3.",
          steps: [
            { title: "The brief", text: "Business, value and stakeholders." },
            { title: "The domain", text: "Objects, daily actions and spaces of the home." },
            { title: "Personas and pain points", text: "Who lives in the home and what gets in their way." },
            { title: "Design concept", text: "Sketches by hand, then comparison and synthesis." },
            { title: "The prototype", text: "Interfaces and user flows in Material Design 3." },
          ],
        },
        { divider: "The problem", text: "First diamond: understanding the problem and the people before drawing." },
        {
          eyebrow: "The brief",
          title: "One app for the whole home.",
          text: "The scenario: a company that makes and installs smart home devices asks us for the software to manage them. Today every device has its own app; we wanted to control them all from one place.",
          columns: [
            { title: "The value", text: "A single app for the whole home sets the company apart from competitors and encourages customers to add new devices." },
            { title: "The constraints", text: "Only managing devices already installed: no sales, installation or hardware support." },
            { title: "The stakeholders", text: "Those who live in the home, those with limited access (babysitters, carers) and those just passing by, like guests and couriers." },
          ],
        },
        {
          eyebrow: "Personas and pain points",
          title: "Six different lives, one common thread.",
          text: "We imagined six personas, from the businessman always in a rush to the grandfather who wants to stay independent, from the absent-minded artist to the courier who finds nobody at home. Different lifestyles, but a shared struggle: running the home calmly and in control.",
          stats: [
            { label: "personas, each with their own story" },
            { label: "pain points collected in a table" },
            { label: "problems chosen to solve" },
          ],
        },
        { divider: "The design", text: "Second diamond: from everyone's ideas to a single interface." },
        {
          eyebrow: "Design concept",
          title: "Every problem, a solution.",
          text: "Each of us sketched our own ideas by hand; then we compared them and picked, for each pain point, the essential solutions. Here's how they became interfaces.",
          gallery: [
            { alt: "Floor plan of the home with devices, room detail and notification", title: "Did I leave something on?", caption: "The floor plan shows where the devices are and whether they're on; each room opens in detail and a notification warns you if something turns on." },
            { alt: "Security with sensors and open-window warning", title: "Did I set the alarm?", caption: "The alarm status is always visible and it's set with one button. If a window is open, the app tells you first." },
            { alt: "Intercom call and answer panel", title: "Someone rang and I didn't hear.", caption: "The intercom reaches the phone like a call: you see who's there and open with a slider, even when you're out." },
            { alt: "Cameras and automations", title: "I don't feel safe home alone.", caption: "Cameras on the floor plan and routines that turn on security by themselves, for example in the evening." },
            { alt: "Permanent and temporary codes and new access", title: "I don't trust leaving my keys.", caption: "Each person has their own code, valid only on certain days and times; couriers and guests get temporary codes." },
          ],
        },
        {
          eyebrow: "Material Design 3",
          title: "Every component has a reason.",
          text: "We followed the Material Design 3 guidelines and justified every choice, even when we departed from them.",
          columns: [
            { title: "Navigation bar", text: "The five sections always within thumb's reach, with icon and label." },
            { title: "Connected buttons and tabs", text: "To switch view (lights, windows, appliances) or floor without changing page." },
            { title: "Cards and extended FAB", text: "Each device is a card in the colour of its room; the main action, like setting the alarm, is a FAB." },
            { title: "A slider to open", text: "Outside the guidelines, but on purpose: a continuous gesture avoids opening the gate by mistake." },
          ],
        },
      ],
    },

    meteora: {
      summary: "A weather dashboard for the whole world: real time, 5-day forecasts, favourite cities and disaster alerts. I redesigned it end to end on my own.",
      role: "Group project · solo redesign",
      context: "Programming 2 course",
      sections: [
        {
          eyebrow: "In short",
          title: "A group project, a redesign all my own.",
          text: "Meteora started as a group project for the Programming 2 course: a web app that gathers weather data from all over the world. After the exam I picked it up on my own and rebuilt its interface, from design to code.",
          columns: [
            { title: "A new design", text: "Every screen redesigned in a single style: dark palette, light blue and orange accents, glass cards and the Plus Jakarta Sans font." },
            { title: "For every device", text: "On desktop the menu is a sidebar, on mobile it becomes a bottom bar: every section adapts to the space." },
            { title: "Installable", text: "It's a PWA: it installs on phone or computer like a real app, with its own icon." },
          ],
        },
        {
          eyebrow: "Built with",
          title: "The tools.",
          text: "A modern web app, with data from public services in real time.",
        },
        { divider: "The features", text: "What you can do with Meteora, screen by screen." },
        {
          eyebrow: "The app",
          title: "The world's weather, in a single dashboard.",
          text: "Every feature, on desktop and on mobile.",
          gallery: [
            { alt: "Sign-in screen on desktop and mobile", title: "Sign in and sign up.", caption: "You sign in with email and password; when signing up, the password requirements tick off as you type." },
            { alt: "Current weather in Verona", title: "The weather, right now.", caption: "Search a city or use your location: temperature, feels-like, lows, highs, humidity and wind at a glance." },
            { alt: "Hourly forecast and details", title: "Hour by hour.", caption: "5-day forecasts in 3-hour slots, with temperature, rain and snow, humidity, wind with compass and pressure." },
            { alt: "Favourite cities", title: "Favourite cities.", caption: "Tap the heart to save a city: favourites live in the cloud and follow you on every device." },
            { alt: "GDACS alerts", title: "Alerts.", caption: "GDACS data flags droughts, floods, earthquakes and other disasters within 500 km of the chosen city." },
            { alt: "Profile and preferences", title: "Profile and preferences.", caption: "Choose between Celsius and Fahrenheit and the wind unit, edit your profile or delete your account." },
          ],
        },
      ],
    },

    "lunapark-vr": {
      title: "VR Amusement Park",
      category: "Virtual reality",
      year: "In progress",
      summary: "An amusement park in virtual reality to study change blindness: how much we notice the changes around us.",
      tools: ["Unity", "Virtual reality", "Change blindness"],
    },
  };

  // copia i testi inglesi sopra quelli italiani (oggetti per chiave, liste per posizione)
  function merge(target, src) {
    if (!src || !target) return;
    Object.keys(src).forEach((k) => {
      const v = src[k];
      if (Array.isArray(v) && Array.isArray(target[k])) {
        v.forEach((item, i) => {
          if (item && typeof item === "object" && target[k][i] && typeof target[k][i] === "object") merge(target[k][i], item);
          else target[k][i] = item;
        });
      } else if (v && typeof v === "object" && !Array.isArray(v) && target[k] && typeof target[k] === "object") merge(target[k], v);
      else target[k] = v;
    });
  }

  if (lang === "en") {
    merge(window.SITE, SITE_EN);
    (window.PROJECTS || []).forEach((p) => {
      merge(p, PROJECTS_EN[p.slug]);
    });
    document.title = t(document.title);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t(desc.content);
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = t(el.innerHTML); });
    document.querySelectorAll("[data-i18n-label]").forEach((el) => { el.setAttribute("aria-label", t(el.getAttribute("aria-label"))); });
  }

  // cambio lingua: salva la scelta e ricarica la pagina nella stessa posizione
  function setLang(next) {
    if (next === lang) return;
    try { localStorage.setItem("ms-lang", next); } catch (e) {}
    location.reload();
  }

  window.LANG = lang;
  window.t = t;
  window.setLang = setLang;
})();
