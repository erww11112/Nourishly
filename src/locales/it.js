// ── Italiano ─────────────────────────────────────────────────────────────
// Stessa struttura di chiavi di en.js — tradotto in modo naturale, non
// letterale, mantenendo il tono caloroso e vicino di Nourishly.
export const it = {
  common: {
    appName: "Nourishly",
    tagline: "Pasti in famiglia, senza pensieri",
    fields: {
      familySize: "Numero di persone",
      familySizePlaceholder: "es. 4",
      allergies: "Allergie o restrizioni",
      allergiesPlaceholder: "es. senza frutta a guscio — o lascia vuoto",
      cookTime: "Tempo di cucina infrasettimanale",
      cookTimePlaceholder: "es. 30 minuti",
    },
  },

  // ── Schermata iniziale (splash) ──────────────────────────────────────────
  splash: {},

  // ── Scelta della lingua (primo passo dell'onboarding, solo nuovi account) ──
  chooseLanguage: {
    title: "Scegli la tua lingua",
    subtitle: "Puoi cambiarla in qualsiasi momento dal tuo profilo",
  },

  // ── Slide di benvenuto (prima dell'onboarding) ───────────────────────────
  welcome: {
    slide1Title: "Non sai mai cosa cucinare?",
    slide1Body: "Sempre gli stessi cinque piatti. Il panico delle 18. L'asporto che in realtà non ti andava nemmeno di mangiare. Ti suona familiare?",
    slide2Title: "Più tempo con i tuoi figli. Meno tempo a chiederti cosa fare per cena.",
    slide2Body: "Una settimana intera di cene fatte in casa, pianificata per la tua famiglia in meno di un minuto — così puoi concentrarti su ciò che conta davvero.",
    continue: "Continua",
    begin: "Iniziamo",
  },

  // ── Domande dell'onboarding ──────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "Per quante persone cucini?",
    familySizeSub: "Contando te e i tuoi figli",
    allergiesTitle: "Allergie o esigenze alimentari particolari?",
    allergiesSub: "Ne terremo conto in ogni ricetta",
    cookTimeTitle: "Quanto tempo hai per cucinare durante la settimana?",
    cookTimeSub: "Adatteremo ogni ricetta a questo tempo",
    continue: "Continua",
    almostThere: "Ci siamo quasi",
    back: "Indietro",
  },

  // ── Accesso / registrazione ──────────────────────────────────────────────
  auth: {
    createAccount: "Crea account",
    signIn: "Accedi",
    yourName: "Il tuo nome",
    yourNamePlaceholder: "es. Maria",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    password: "Password",
    forgotPassword: "Password dimenticata?",
    startPlanning: "Inizia a pianificare",
    welcomeBack: "Bentornato",
    pleaseWait: "Un attimo...",
    privacyFooter: "I tuoi dati restano privati · Nessuna carta di credito richiesta",
    prefsSavedBanner: "Le tue preferenze sono già salvate — manca solo creare l'account",
    fillAllFields: "Compila tutti i campi, per favore.",
    enterName: "Inserisci il tuo nome, per favore.",
    signupFailed: "Registrazione non riuscita",
    profileCreateFailed: "Non è stato possibile creare il tuo profilo. Riprova o contatta l'assistenza.",
    confirmEmail: "Account creato — controlla la tua email per confermare, poi accedi.",
    invalidCredentials: "Email o password non corretti.",
    somethingWrong: "Qualcosa è andato storto.",
  },

  forgotPassword: {
    title: "Reimposta la password",
    subtitle: "Inserisci la tua email e ti invieremo un link per reimpostarla.",
    sentMessage: "Controlla la tua email — ti abbiamo inviato un link per reimpostare la password.",
    sendLink: "Invia link di reimpostazione",
    sending: "Invio in corso...",
    backToSignIn: "Torna al login",
    enterEmail: "Inserisci la tua email, per favore.",
    sendFailed: "Non è stato possibile inviare l'email di reimpostazione. Riprova.",
  },

  resetPassword: {
    headerSubtitle: "Imposta la tua nuova password",
    cardTitle: "Scegli una nuova password",
    newPassword: "Nuova password",
    confirmNewPassword: "Conferma la nuova password",
    submit: "Imposta nuova password",
    pleaseWait: "Un attimo...",
    fillBothFields: "Compila entrambi i campi, per favore.",
    tooShort: "La password deve contenere almeno 6 caratteri.",
    noMatch: "Le password non coincidono.",
    updateFailed: "Non è stato possibile aggiornare la tua password.",
  },

  // ── Barra di navigazione + intestazione ──────────────────────────────────
  nav: {
    home: "Home",
    thisWeek: "Questa settimana",
    shopping: "Spesa",
    saved: "Salvati",
    profile: "Profilo",
    greeting: "Ciao {name}",
    greetingFallback: "a te",
  },

  // ── Scheda Home ───────────────────────────────────────────────────────────
  home: {
    cardTitle: "Pianifica la settimana",
    cardSubtitle: "Una settimana di cene, tutta organizzata",
    buildButton: "Crea il mio piano dei pasti",
    building: "Creazione del tuo piano in corso...",
    recentPlans: "Piani recenti",
    planOf: "Piano di {name}",
    yourPlanFallback: "Il tuo piano",
    fillFamilyCookTime: "Indica il numero di persone e il tempo di cucina, per favore.",
    freeLimitReached: "Hai già usato i tuoi 2 piani gratuiti questo mese. Passa a Nourishly Plus per piani illimitati.",
    planSavedButUpdateFailed: "Il piano è stato salvato, ma non è stato possibile aggiornare il numero di utilizzi — potrebbe mostrare un numero sbagliato finché non verrà corretto.",
    planNotSaved: "Il piano è stato creato ma non è stato possibile salvarlo. Prova ad accedere di nuovo.",
    planNotSavedError: "Il piano è stato creato ma non è stato possibile salvarlo: {error}",
    genericError: "Qualcosa è andato storto: {error}",
  },

  // ── Scheda Plan (piano settimanale) ──────────────────────────────────────
  plan: {
    nutritionTotals: "Totali nutrizionali della settimana",
    calLabel: "Cal",
    proteinLabel: "Proteine",
    carbsLabel: "Carboidrati",
    fatLabel: "Grassi",
    plusFeatureChip: "Nutrizione completa con Plus",
    findingAlternative: "Ricerca di un'alternativa...",
    generateNewPlan: "Crea un nuovo piano",
    emptyTitle: "Ancora nessun piano dei pasti",
    emptySubtitle: "Vai su Home e crea la tua prima settimana di cene.",
    goToHome: "Vai alla Home",
  },

  // ── Scheda Spesa ──────────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "Le liste della spesa sono una funzione Plus",
    paywallSubtitle: "Passa a Nourishly Plus per una lista della spesa automatica e organizzata ogni settimana.",
    upgradeButton: "Passa a Plus — 7,99 €/mese",
    redirecting: "Reindirizzamento...",
    emptyTitle: "Ancora nessuna lista della spesa",
    emptySubtitle: "Crea un piano dei pasti e la tua lista apparirà qui.",
    buildPlan: "Crea un piano",
  },

  // ── Scheda Salvati ────────────────────────────────────────────────────────
  saved: {
    countOne: "{count} piano salvato",
    countOther: "{count} piani salvati",
    mealPlanOf: "Piano dei pasti di {name}",
    yourMealPlanFallback: "Il tuo piano dei pasti",
    view: "Visualizza",
    moreCount: "+{count} altri",
    emptyTitle: "Ancora nessun piano salvato",
    emptySubtitle: "I tuoi piani si salvano automaticamente ogni volta che ne crei uno.",
    createFirst: "Crea il primo piano",
  },

  // ── Scheda Profilo ────────────────────────────────────────────────────────
  profile: {
    accountFallback: "Il tuo account",
    plusActive: "Nourishly Plus — piani illimitati sbloccati",
    manageSubscription: "Gestisci abbonamento",
    redirecting: "Reindirizzamento...",
    freePlan: "Piano gratuito",
    plansUsed: "{used}/2 piani usati questo mese",
    upgradeButton: "Passa a Nourishly Plus — 7,99 €/mese",
    redirectingCheckout: "Reindirizzamento al pagamento...",
    preferencesTitle: "Preferenze",
    save: "Salva preferenze",
    saving: "Salvataggio in corso...",
    saved: "Salvato ✓",
    savePrefsFailed: "Non è stato possibile salvare le tue preferenze. Riprova.",
    changePasswordTitle: "Cambia password",
    currentPassword: "Password attuale",
    updatePassword: "Aggiorna password",
    updating: "Aggiornamento in corso...",
    passwordUpdated: "Password aggiornata con successo.",
    passwordUpdateFailed: "Non è stato possibile aggiornare la tua password.",
    currentPasswordWrong: "La password attuale non è corretta.",
    noAccountEmail: "Non è stato possibile trovare l'email del tuo account.",
    newPasswordTooShort: "La nuova password deve contenere almeno 6 caratteri.",
    newPasswordNoMatch: "Le nuove password non coincidono.",
    logout: "Esci",
    language: "Lingua",
    languageEnglish: "English",
    languagePortuguese: "Português",
    languageSpanish: "Español",
    languageChinese: "中文",
    languageFrench: "Français",
    languageGerman: "Deutsch",
    languageItalian: "Italiano",
    languageRussian: "Русский",
    languageHindi: "हिन्दी",
    languageArabic: "العربية",
    portalOpenFailed: "Non è stato possibile aprire il portale dell'abbonamento. Riprova.",
    portalOpenFailedError: "Non è stato possibile aprire il portale dell'abbonamento: {error}",
    checkoutFailed: "Non è stato possibile avviare il pagamento. Riprova.",
    checkoutFailedError: "Non è stato possibile avviare il pagamento: {error}",
  },

  // ── Scheda del pasto (usata nella scheda Plan) ───────────────────────────
  mealCard: {
    markAsCooked: "Segna come preparato",
    howToMakeIt: "Come prepararlo",
  },

  // ── Lista della spesa ─────────────────────────────────────────────────────
  shoppingList: {
    progress: "Progresso della spesa",
    categories: {
      proteins: "Proteine",
      vegHerbs: "Verdure ed erbe",
      grainsPasta: "Cereali e pasta",
      dairy: "Latticini",
      pantry: "Dispensa",
    },
    pantryDefaults: ["Olio d'oliva", "Sale e pepe", "Erbe miste", "Dadi da brodo"],
    vegDefaults: ["Insalata mista", "Pomodorini", "Erbe fresche", "Aglio", "Cipolle"],
    grainDefaults: ["Riso", "Pasta"],
    dairyDefaults: ["Burro", "Parmigiano"],
    tipTitle: "Guarda prima cosa hai già in casa",
    tipBody: "Sale, pepe, olio d'oliva, aglio — probabilmente li hai già.",
    // Etichette mostrate per gli ingredienti rilevati nei nomi dei piatti
    // (generati in inglese dall'IA) — il rilevamento resta in inglese perché
    // si basa sull'output di Claude, solo il testo mostrato viene tradotto.
    ingredients: {
      chicken: "Pollo", beef: "Manzo", salmon: "Salmone", fish: "Pesce", lamb: "Agnello",
      pork: "Maiale", shrimp: "Gamberi", tuna: "Tonno", turkey: "Tacchino", tofu: "Tofu", eggs: "Uova",
      tomato: "Pomodoro", spinach: "Spinaci", pepper: "Peperone", broccoli: "Broccoli",
      carrot: "Carota", onion: "Cipolla", garlic: "Aglio", lettuce: "Lattuga",
      mushroom: "Funghi", lemon: "Limone", basil: "Basilico", parsley: "Prezzemolo",
      ginger: "Zenzero", pasta: "Pasta", rice: "Riso", noodle: "Noodle", bread: "Pane",
      tortilla: "Tortilla", quinoa: "Quinoa", couscous: "Couscous", lentil: "Lenticchie",
      bean: "Fagioli", cheese: "Formaggio", butter: "Burro", milk: "Latte", cream: "Panna",
      yogurt: "Yogurt", parmesan: "Parmigiano", mozzarella: "Mozzarella",
    },
  },
};
