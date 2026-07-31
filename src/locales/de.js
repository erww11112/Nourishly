// ── Deutsch ──────────────────────────────────────────────────────────────
// Gleiche Struktur wie en.js — natürlich formuliert statt wörtlich übersetzt,
// im warmen, persönlichen Ton von Nourishly.
export const de = {
  common: {
    appName: "Nourishly",
    tagline: "Familienessen, ganz entspannt",
    fields: {
      familySize: "Anzahl der Personen",
      familySizePlaceholder: "z. B. 4",
      allergies: "Allergien oder Einschränkungen",
      allergiesPlaceholder: "z. B. keine Nüsse — oder leer lassen",
      cookTime: "Kochzeit unter der Woche",
      cookTimePlaceholder: "z. B. 30 Minuten",
    },
  },

  // ── Startbildschirm (splash) ──────────────────────────────────────────────
  splash: {},

  // ── Sprachauswahl (erster Onboarding-Schritt, nur neue Konten) ──────────
  chooseLanguage: {
    title: "Wähle deine Sprache",
    subtitle: "Du kannst das jederzeit in deinem Profil ändern",
  },

  // ── Willkommens-Folien (vor dem Onboarding) ──────────────────────────────
  welcome: {
    slide1Title: "Keine Ahnung, was du kochen sollst?",
    slide1Body: "Immer dieselben fünf Gerichte. Die Panik um 18 Uhr. Der Lieferservice, auf den du eigentlich gar keine Lust hattest. Kommt dir das bekannt vor?",
    slide2Title: "Mehr Zeit mit deinen Kindern. Weniger Grübeln, was es zum Abendessen gibt.",
    slide2Body: "Eine ganze Woche hausgemachter Abendessen, in unter einer Minute für deine Familie geplant — damit du dich auf das konzentrieren kannst, was wirklich zählt.",
    continue: "Weiter",
    begin: "Los geht's",
  },

  // ── Onboarding-Fragen ────────────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "Für wie viele Personen wird gekocht?",
    familySizeSub: "Dich selbst und deine Kinder eingerechnet",
    allergiesTitle: "Allergien oder besondere Ernährungsbedürfnisse?",
    allergiesSub: "Wir berücksichtigen das bei jedem Rezept",
    cookTimeTitle: "Wie viel Zeit hast du unter der Woche zum Kochen?",
    cookTimeSub: "Wir passen jedes Rezept daran an",
    continue: "Weiter",
    almostThere: "Fast geschafft",
    back: "Zurück",
  },

  // ── Anmeldung / Registrierung ────────────────────────────────────────────
  auth: {
    createAccount: "Konto erstellen",
    signIn: "Anmelden",
    yourName: "Dein Name",
    yourNamePlaceholder: "z. B. Maria",
    email: "E-Mail",
    emailPlaceholder: "du@email.com",
    password: "Passwort",
    forgotPassword: "Passwort vergessen?",
    startPlanning: "Los planen",
    welcomeBack: "Schön, dich wiederzusehen",
    pleaseWait: "Einen Moment...",
    privacyFooter: "Deine Daten bleiben privat · Keine Kreditkarte nötig",
    prefsSavedBanner: "Deine Angaben sind schon gespeichert — jetzt nur noch das Konto erstellen",
    fillAllFields: "Bitte fülle alle Felder aus.",
    enterName: "Bitte gib deinen Namen ein.",
    signupFailed: "Registrierung fehlgeschlagen",
    profileCreateFailed: "Dein Profil konnte nicht erstellt werden. Bitte versuche es erneut oder wende dich an den Support.",
    confirmEmail: "Konto erstellt — bestätige deine E-Mail und melde dich dann an.",
    invalidCredentials: "E-Mail oder Passwort ist falsch.",
    somethingWrong: "Da ist etwas schiefgelaufen.",
  },

  forgotPassword: {
    title: "Passwort zurücksetzen",
    subtitle: "Gib deine E-Mail ein, und wir senden dir einen Link zum Zurücksetzen.",
    sentMessage: "Schau in dein Postfach — wir haben dir einen Link zum Zurücksetzen deines Passworts geschickt.",
    sendLink: "Link zum Zurücksetzen senden",
    sending: "Wird gesendet...",
    backToSignIn: "Zurück zur Anmeldung",
    enterEmail: "Bitte gib deine E-Mail ein.",
    sendFailed: "Die E-Mail zum Zurücksetzen konnte nicht gesendet werden. Bitte versuche es erneut.",
  },

  resetPassword: {
    headerSubtitle: "Lege dein neues Passwort fest",
    cardTitle: "Wähle ein neues Passwort",
    newPassword: "Neues Passwort",
    confirmNewPassword: "Neues Passwort bestätigen",
    submit: "Neues Passwort festlegen",
    pleaseWait: "Einen Moment...",
    fillBothFields: "Bitte fülle beide Felder aus.",
    tooShort: "Das Passwort muss mindestens 6 Zeichen lang sein.",
    noMatch: "Die Passwörter stimmen nicht überein.",
    updateFailed: "Dein Passwort konnte nicht aktualisiert werden.",
  },

  // ── Untere Navigation + Kopfzeile ────────────────────────────────────────
  nav: {
    home: "Start",
    thisWeek: "Diese Woche",
    shopping: "Einkauf",
    saved: "Gespeichert",
    profile: "Profil",
    greeting: "Hallo {name}",
    greetingFallback: "du",
  },

  // ── Tab „Start" ───────────────────────────────────────────────────────────
  home: {
    cardTitle: "Diese Woche planen",
    cardSubtitle: "Eine frische Woche voller Abendessen, alles organisiert",
    buildButton: "Meinen Essensplan erstellen",
    building: "Dein Plan wird erstellt...",
    recentPlans: "Letzte Pläne",
    planOf: "Plan von {name}",
    yourPlanFallback: "Dein Plan",
    fillFamilyCookTime: "Bitte gib die Anzahl der Personen und die Kochzeit an.",
    freeLimitReached: "Du hast deine 2 kostenlosen Pläne für diesen Monat schon genutzt. Wechsle zu Nourishly Plus für unbegrenzte Pläne.",
    planSavedButUpdateFailed: "Der Plan wurde gespeichert, aber die Nutzungsanzahl konnte nicht aktualisiert werden — bis das behoben ist, wird eventuell die falsche Zahl angezeigt.",
    planNotSaved: "Der Plan wurde erstellt, konnte aber nicht gespeichert werden. Bitte versuche, dich erneut anzumelden.",
    planNotSavedError: "Der Plan wurde erstellt, konnte aber nicht gespeichert werden: {error}",
    genericError: "Da ist etwas schiefgelaufen: {error}",
  },

  // ── Tab „Plan" (Wochenessensplan) ────────────────────────────────────────
  plan: {
    nutritionTotals: "Nährwerte der Woche",
    calLabel: "Kal",
    proteinLabel: "Eiweiß",
    carbsLabel: "Kohlenhydrate",
    fatLabel: "Fett",
    plusFeatureChip: "Vollständige Nährwerte mit Plus",
    findingAlternative: "Alternative wird gesucht...",
    generateNewPlan: "Neuen Plan erstellen",
    emptyTitle: "Noch kein Essensplan",
    emptySubtitle: "Geh zu Start und erstelle deine erste Woche voller Abendessen.",
    goToHome: "Zu Start",
  },

  // ── Tab „Einkauf" ─────────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "Einkaufslisten sind eine Plus-Funktion",
    paywallSubtitle: "Wechsle zu Nourishly Plus für eine automatische, organisierte Einkaufsliste jede Woche.",
    upgradeButton: "Upgrade — 7,99 €/Monat",
    redirecting: "Wird weitergeleitet...",
    emptyTitle: "Noch keine Einkaufsliste",
    emptySubtitle: "Erstelle einen Essensplan, und deine Liste erscheint hier.",
    buildPlan: "Plan erstellen",
  },

  // ── Tab „Gespeichert" ─────────────────────────────────────────────────────
  saved: {
    countOne: "{count} gespeicherter Plan",
    countOther: "{count} gespeicherte Pläne",
    mealPlanOf: "Essensplan von {name}",
    yourMealPlanFallback: "Dein Essensplan",
    view: "Ansehen",
    moreCount: "+{count} weitere",
    emptyTitle: "Noch keine gespeicherten Pläne",
    emptySubtitle: "Deine Pläne werden automatisch gespeichert, sobald du einen erstellst.",
    createFirst: "Ersten Plan erstellen",
  },

  // ── Tab „Profil" ──────────────────────────────────────────────────────────
  profile: {
    accountFallback: "Dein Konto",
    plusActive: "Nourishly Plus — unbegrenzte Pläne freigeschaltet",
    manageSubscription: "Abo verwalten",
    redirecting: "Wird weitergeleitet...",
    freePlan: "Kostenloser Plan",
    plansUsed: "{used}/2 Pläne diesen Monat genutzt",
    upgradeButton: "Zu Nourishly Plus wechseln — 7,99 €/Monat",
    redirectingCheckout: "Wird zur Kasse weitergeleitet...",
    preferencesTitle: "Einstellungen",
    save: "Einstellungen speichern",
    saving: "Wird gespeichert...",
    saved: "Gespeichert ✓",
    savePrefsFailed: "Deine Einstellungen konnten nicht gespeichert werden. Bitte versuche es erneut.",
    changePasswordTitle: "Passwort ändern",
    currentPassword: "Aktuelles Passwort",
    updatePassword: "Passwort aktualisieren",
    updating: "Wird aktualisiert...",
    passwordUpdated: "Passwort erfolgreich aktualisiert.",
    passwordUpdateFailed: "Dein Passwort konnte nicht aktualisiert werden.",
    currentPasswordWrong: "Das aktuelle Passwort ist falsch.",
    noAccountEmail: "Die E-Mail deines Kontos konnte nicht gefunden werden.",
    newPasswordTooShort: "Das neue Passwort muss mindestens 6 Zeichen lang sein.",
    newPasswordNoMatch: "Die neuen Passwörter stimmen nicht überein.",
    logout: "Abmelden",
    language: "Sprache",
    languageEnglish: "English",
    languagePortuguese: "Português",
    languageSpanish: "Español",
    languageChinese: "中文",
    languageFrench: "Français",
    languageGerman: "Deutsch",
    languageItalian: "Italiano",
    portalOpenFailed: "Das Abo-Portal konnte nicht geöffnet werden. Bitte versuche es erneut.",
    portalOpenFailedError: "Das Abo-Portal konnte nicht geöffnet werden: {error}",
    checkoutFailed: "Der Bezahlvorgang konnte nicht gestartet werden. Bitte versuche es erneut.",
    checkoutFailedError: "Der Bezahlvorgang konnte nicht gestartet werden: {error}",
  },

  // ── Essenskarte (im Tab „Plan") ───────────────────────────────────────────
  mealCard: {
    markAsCooked: "Als gekocht markieren",
    howToMakeIt: "Zubereitung",
  },

  // ── Einkaufsliste ─────────────────────────────────────────────────────────
  shoppingList: {
    progress: "Einkaufsfortschritt",
    categories: {
      proteins: "Eiweißquellen",
      vegHerbs: "Gemüse und Kräuter",
      grainsPasta: "Getreide und Nudeln",
      dairy: "Milchprodukte",
      pantry: "Vorratsschrank",
    },
    pantryDefaults: ["Olivenöl", "Salz und Pfeffer", "Kräutermischung", "Brühwürfel"],
    vegDefaults: ["Gemischter Salat", "Kirschtomaten", "Frische Kräuter", "Knoblauch", "Zwiebeln"],
    grainDefaults: ["Reis", "Nudeln"],
    dairyDefaults: ["Butter", "Parmesan"],
    tipTitle: "Schau zuerst, was du schon zu Hause hast",
    tipBody: "Salz, Pfeffer, Olivenöl, Knoblauch — das hast du wahrscheinlich schon im Haus.",
    // Angezeigte Bezeichnungen für Zutaten-Stichwörter, die in den (englischen)
    // KI-generierten Gerichtnamen erkannt werden — die Erkennung selbst bleibt
    // Englisch, da sie auf Claudes Ausgabe basiert; nur der angezeigte Text wird übersetzt.
    ingredients: {
      chicken: "Hähnchen", beef: "Rindfleisch", salmon: "Lachs", fish: "Fisch", lamb: "Lamm",
      pork: "Schwein", shrimp: "Garnelen", tuna: "Thunfisch", turkey: "Pute", tofu: "Tofu", eggs: "Eier",
      tomato: "Tomate", spinach: "Spinat", pepper: "Paprika", broccoli: "Brokkoli",
      carrot: "Karotte", onion: "Zwiebel", garlic: "Knoblauch", lettuce: "Salat",
      mushroom: "Pilze", lemon: "Zitrone", basil: "Basilikum", parsley: "Petersilie",
      ginger: "Ingwer", pasta: "Nudeln", rice: "Reis", noodle: "Nudeln", bread: "Brot",
      tortilla: "Tortilla", quinoa: "Quinoa", couscous: "Couscous", lentil: "Linsen",
      bean: "Bohnen", cheese: "Käse", butter: "Butter", milk: "Milch", cream: "Sahne",
      yogurt: "Joghurt", parmesan: "Parmesan", mozzarella: "Mozzarella",
    },
  },
};
