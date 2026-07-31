// ── Français ─────────────────────────────────────────────────────────────
// Même structure de clés que en.js — traduit de façon naturelle, pas mot à
// mot, en gardant le ton chaleureux et proche de Nourishly.
export const fr = {
  common: {
    appName: "Nourishly",
    tagline: "Les repas en famille, en toute simplicité",
    fields: {
      familySize: "Nombre de personnes",
      familySizePlaceholder: "ex : 4",
      allergies: "Allergies ou restrictions",
      allergiesPlaceholder: "ex : sans fruits à coque — ou laisse vide",
      cookTime: "Temps de cuisine en semaine",
      cookTimePlaceholder: "ex : 30 minutes",
    },
  },

  // ── Écran de démarrage (splash) ──────────────────────────────────────────
  splash: {},

  // ── Choix de la langue (première étape de l'onboarding, nouveaux comptes) ──
  chooseLanguage: {
    title: "Choisis ta langue",
    subtitle: "Tu peux changer ça à tout moment dans ton profil",
  },

  // ── Slides de bienvenue (avant l'onboarding) ────────────────────────────
  welcome: {
    slide1Title: "Marre de ne pas savoir quoi cuisiner ?",
    slide1Body: "Toujours les cinq mêmes plats. La panique de 18h. Le plat à emporter qui ne te faisait pas vraiment envie. Ça te parle ?",
    slide2Title: "Plus de temps avec tes enfants. Moins de temps à te demander quoi faire à dîner.",
    slide2Body: "Une semaine entière de dîners maison, planifiée pour ta famille en moins d'une minute — pour te concentrer sur ce qui compte vraiment.",
    continue: "Continuer",
    begin: "C'est parti",
  },

  // ── Questions de l'onboarding ────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "Combien de personnes mangent ?",
    familySizeSub: "En te comptant toi et tes enfants",
    allergiesTitle: "Des allergies ou besoins alimentaires particuliers ?",
    allergiesSub: "On en tiendra compte à chaque fois",
    cookTimeTitle: "Combien de temps as-tu pour cuisiner en semaine ?",
    cookTimeSub: "On adaptera chaque recette à ce temps",
    continue: "Continuer",
    almostThere: "Presque fini",
    back: "Retour",
  },

  // ── Connexion / inscription ──────────────────────────────────────────────
  auth: {
    createAccount: "Créer un compte",
    signIn: "Se connecter",
    yourName: "Ton prénom",
    yourNamePlaceholder: "ex : Marie",
    email: "Email",
    emailPlaceholder: "toi@email.com",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    startPlanning: "Commencer à planifier",
    welcomeBack: "Content de te revoir",
    pleaseWait: "Un instant...",
    privacyFooter: "Tes données restent privées · Pas besoin de carte bancaire",
    prefsSavedBanner: "Tes préférences sont déjà enregistrées — il ne reste plus qu'à créer ton compte",
    fillAllFields: "Merci de remplir tous les champs.",
    enterName: "Merci d'indiquer ton prénom.",
    signupFailed: "Impossible de créer le compte",
    profileCreateFailed: "Impossible de créer ton profil. Réessaie ou contacte le support.",
    confirmEmail: "Compte créé — vérifie tes emails pour confirmer, puis connecte-toi.",
    invalidCredentials: "Email ou mot de passe incorrect.",
    somethingWrong: "Un problème est survenu.",
  },

  forgotPassword: {
    title: "Réinitialiser ton mot de passe",
    subtitle: "Indique ton email et on t'enverra un lien de réinitialisation.",
    sentMessage: "Vérifie tes emails — on t'a envoyé un lien pour réinitialiser ton mot de passe.",
    sendLink: "Envoyer le lien",
    sending: "Envoi en cours...",
    backToSignIn: "Retour à la connexion",
    enterEmail: "Merci d'indiquer ton email.",
    sendFailed: "Impossible d'envoyer l'email de réinitialisation. Réessaie.",
  },

  resetPassword: {
    headerSubtitle: "Définis ton nouveau mot de passe",
    cardTitle: "Choisis un nouveau mot de passe",
    newPassword: "Nouveau mot de passe",
    confirmNewPassword: "Confirme le nouveau mot de passe",
    submit: "Définir le nouveau mot de passe",
    pleaseWait: "Un instant...",
    fillBothFields: "Merci de remplir les deux champs.",
    tooShort: "Le mot de passe doit contenir au moins 6 caractères.",
    noMatch: "Les mots de passe ne correspondent pas.",
    updateFailed: "Impossible de mettre à jour ton mot de passe.",
  },

  // ── Navigation inférieure + en-tête ──────────────────────────────────────
  nav: {
    home: "Accueil",
    thisWeek: "Cette semaine",
    shopping: "Courses",
    saved: "Enregistrés",
    profile: "Profil",
    greeting: "Salut {name}",
    greetingFallback: "toi",
  },

  // ── Onglet Accueil ────────────────────────────────────────────────────────
  home: {
    cardTitle: "Planifier la semaine",
    cardSubtitle: "Une semaine de dîners, toute organisée",
    buildButton: "Créer mon plan de repas",
    building: "Création de ton plan...",
    recentPlans: "Plans récents",
    planOf: "Plan de {name}",
    yourPlanFallback: "Ton plan",
    fillFamilyCookTime: "Merci d'indiquer le nombre de personnes et le temps de cuisine.",
    freeLimitReached: "Tu as utilisé tes 2 plans gratuits ce mois-ci. Passe à Nourishly Plus pour des plans illimités.",
    planSavedButUpdateFailed: "Le plan a été enregistré, mais le nombre d'utilisations n'a pas pu être mis à jour — il pourrait afficher un chiffre incorrect en attendant que ce soit corrigé.",
    planNotSaved: "Le plan a été créé mais n'a pas pu être enregistré. Essaie de te reconnecter.",
    planNotSavedError: "Le plan a été créé mais n'a pas pu être enregistré : {error}",
    genericError: "Un problème est survenu : {error}",
  },

  // ── Onglet Plan (plan hebdomadaire) ──────────────────────────────────────
  plan: {
    nutritionTotals: "Totaux nutritionnels de la semaine",
    calLabel: "Cal",
    proteinLabel: "Protéines",
    carbsLabel: "Glucides",
    fatLabel: "Lipides",
    plusFeatureChip: "Nutrition complète avec Plus",
    findingAlternative: "Recherche d'une alternative...",
    generateNewPlan: "Créer un nouveau plan",
    emptyTitle: "Pas encore de plan de repas",
    emptySubtitle: "Va dans Accueil et crée ta première semaine de dîners.",
    goToHome: "Aller à l'accueil",
  },

  // ── Onglet Courses ────────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "Les listes de courses sont une fonctionnalité Plus",
    paywallSubtitle: "Passe à Nourishly Plus pour une liste de courses automatique et organisée chaque semaine.",
    upgradeButton: "Passer à Plus — 7,99 €/mois",
    redirecting: "Redirection...",
    emptyTitle: "Pas encore de liste de courses",
    emptySubtitle: "Crée un plan de repas et ta liste apparaîtra ici.",
    buildPlan: "Créer un plan",
  },

  // ── Onglet Enregistrés ────────────────────────────────────────────────────
  saved: {
    countOne: "{count} plan enregistré",
    countOther: "{count} plans enregistrés",
    mealPlanOf: "Plan de repas de {name}",
    yourMealPlanFallback: "Ton plan de repas",
    view: "Voir",
    moreCount: "+{count} de plus",
    emptyTitle: "Pas encore de plans enregistrés",
    emptySubtitle: "Tes plans se sauvegardent automatiquement à chaque création.",
    createFirst: "Créer le premier plan",
  },

  // ── Onglet Profil ─────────────────────────────────────────────────────────
  profile: {
    accountFallback: "Ton compte",
    plusActive: "Nourishly Plus — plans illimités activés",
    manageSubscription: "Gérer l'abonnement",
    redirecting: "Redirection...",
    freePlan: "Plan gratuit",
    plansUsed: "{used}/2 plans utilisés ce mois-ci",
    upgradeButton: "Passer à Nourishly Plus — 7,99 €/mois",
    redirectingCheckout: "Redirection vers le paiement...",
    preferencesTitle: "Préférences",
    save: "Enregistrer les préférences",
    saving: "Enregistrement...",
    saved: "Enregistré ✓",
    savePrefsFailed: "Impossible d'enregistrer tes préférences. Réessaie.",
    changePasswordTitle: "Changer le mot de passe",
    currentPassword: "Mot de passe actuel",
    updatePassword: "Mettre à jour le mot de passe",
    updating: "Mise à jour...",
    passwordUpdated: "Mot de passe mis à jour avec succès.",
    passwordUpdateFailed: "Impossible de mettre à jour ton mot de passe.",
    currentPasswordWrong: "Le mot de passe actuel est incorrect.",
    noAccountEmail: "Impossible de trouver l'email de ton compte.",
    newPasswordTooShort: "Le nouveau mot de passe doit contenir au moins 6 caractères.",
    newPasswordNoMatch: "Les nouveaux mots de passe ne correspondent pas.",
    logout: "Se déconnecter",
    language: "Langue",
    languageEnglish: "English",
    languagePortuguese: "Português",
    languageSpanish: "Español",
    languageChinese: "中文",
    languageFrench: "Français",
    languageGerman: "Deutsch",
    languageItalian: "Italiano",
    portalOpenFailed: "Impossible d'ouvrir le portail d'abonnement. Réessaie.",
    portalOpenFailedError: "Impossible d'ouvrir le portail d'abonnement : {error}",
    checkoutFailed: "Impossible de démarrer le paiement. Réessaie.",
    checkoutFailedError: "Impossible de démarrer le paiement : {error}",
  },

  // ── Carte de repas (utilisée dans l'onglet Plan) ─────────────────────────
  mealCard: {
    markAsCooked: "Marquer comme préparé",
    howToMakeIt: "Comment le préparer",
  },

  // ── Liste de courses ──────────────────────────────────────────────────────
  shoppingList: {
    progress: "Progression des courses",
    categories: {
      proteins: "Protéines",
      vegHerbs: "Légumes et herbes",
      grainsPasta: "Céréales et pâtes",
      dairy: "Produits laitiers",
      pantry: "Placard",
    },
    pantryDefaults: ["Huile d'olive", "Sel et poivre", "Herbes mélangées", "Cubes de bouillon"],
    vegDefaults: ["Salade mélangée", "Tomates cerises", "Herbes fraîches", "Ail", "Oignons"],
    grainDefaults: ["Riz", "Pâtes"],
    dairyDefaults: ["Beurre", "Parmesan"],
    tipTitle: "Regarde d'abord ce que tu as déjà",
    tipBody: "Sel, poivre, huile d'olive, ail — tu as sûrement déjà tout ça chez toi.",
    // Libellés affichés pour les ingrédients détectés dans les noms de plats
    // (générés en anglais par l'IA) — la détection reste en anglais car elle
    // se base sur la sortie de Claude, seul le texte affiché est traduit.
    ingredients: {
      chicken: "Poulet", beef: "Bœuf", salmon: "Saumon", fish: "Poisson", lamb: "Agneau",
      pork: "Porc", shrimp: "Crevettes", tuna: "Thon", turkey: "Dinde", tofu: "Tofu", eggs: "Œufs",
      tomato: "Tomate", spinach: "Épinards", pepper: "Poivron", broccoli: "Brocoli",
      carrot: "Carotte", onion: "Oignon", garlic: "Ail", lettuce: "Laitue",
      mushroom: "Champignons", lemon: "Citron", basil: "Basilic", parsley: "Persil",
      ginger: "Gingembre", pasta: "Pâtes", rice: "Riz", noodle: "Nouilles", bread: "Pain",
      tortilla: "Tortilla", quinoa: "Quinoa", couscous: "Couscous", lentil: "Lentilles",
      bean: "Haricots", cheese: "Fromage", butter: "Beurre", milk: "Lait", cream: "Crème",
      yogurt: "Yaourt", parmesan: "Parmesan", mozzarella: "Mozzarella",
    },
  },
};
