// ── English (default) ───────────────────────────────────────────────────────
// Every user-facing string in the app, grouped by the screen/section it
// appears in. Keep this structure in sync with pt.js — same keys, translated
// values — so adding a new language later is just a new sibling file.
export const en = {
  common: {
    appName: "Nourishly",
    tagline: "Family meals, made easy",
    fields: {
      familySize: "Family size",
      familySizePlaceholder: "e.g. 4",
      allergies: "Allergies or restrictions",
      allergiesPlaceholder: "e.g. no nuts — or leave blank",
      cookTime: "Weeknight cook time",
      cookTimePlaceholder: "e.g. 30 minutes",
    },
  },

  // ── Splash screen ──────────────────────────────────────────────────────────
  splash: {},

  // ── Welcome slides (before onboarding) ───────────────────────────────────
  welcome: {
    slide1Title: "Tired of not knowing what to cook?",
    slide1Body: "The same five meals on repeat. The 6pm panic. The takeaway you didn't really want. Sound familiar?",
    slide2Title: "More time with your kids. Less time wondering what's for dinner.",
    slide2Body: "A full week of home-cooked dinners, planned for your family in under a minute — so you can focus on what actually matters.",
    continue: "Continue",
    begin: "Let's begin",
  },

  // ── Onboarding questions ──────────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "How many people are eating?",
    familySizeSub: "Including yourself and any children",
    allergiesTitle: "Any allergies or dietary needs?",
    allergiesSub: "We'll work around them completely",
    cookTimeTitle: "How long to cook on a weeknight?",
    cookTimeSub: "We'll match every recipe to this",
    continue: "Continue",
    almostThere: "Almost there",
    back: "Back",
  },

  // ── Auth (sign up / sign in) ──────────────────────────────────────────────
  auth: {
    createAccount: "Create account",
    signIn: "Sign in",
    yourName: "Your name",
    yourNamePlaceholder: "e.g. Maria",
    email: "Email",
    emailPlaceholder: "you@email.com",
    password: "Password",
    forgotPassword: "Forgot password?",
    startPlanning: "Start planning",
    welcomeBack: "Welcome back",
    pleaseWait: "Please wait...",
    privacyFooter: "Your data stays private · No credit card needed",
    prefsSavedBanner: "Your preferences are saved — just create your account",
    fillAllFields: "Please fill in all fields.",
    enterName: "Please enter your name.",
    signupFailed: "Sign up failed",
    profileCreateFailed: "Couldn't create your profile. Please try again or contact support.",
    confirmEmail: "Account created — check your email to confirm, then sign in.",
    invalidCredentials: "Invalid email or password.",
    somethingWrong: "Something went wrong.",
  },

  forgotPassword: {
    title: "Reset your password",
    subtitle: "Enter your email and we'll send you a reset link.",
    sentMessage: "Check your email for a reset link.",
    sendLink: "Send reset link",
    sending: "Sending...",
    backToSignIn: "Back to sign in",
    enterEmail: "Please enter your email.",
    sendFailed: "Couldn't send reset email. Please try again.",
  },

  resetPassword: {
    headerSubtitle: "Set your new password",
    cardTitle: "Choose a new password",
    newPassword: "New password",
    confirmNewPassword: "Confirm new password",
    submit: "Set new password",
    pleaseWait: "Please wait...",
    fillBothFields: "Please fill in both fields.",
    tooShort: "Password must be at least 6 characters.",
    noMatch: "Passwords don't match.",
    updateFailed: "Couldn't update your password.",
  },

  // ── Bottom nav + top header ──────────────────────────────────────────────
  nav: {
    home: "Home",
    thisWeek: "This week",
    shopping: "Shopping",
    saved: "Saved",
    profile: "Profile",
    greeting: "Hey {name}",
    greetingFallback: "there",
  },

  // ── Home tab ──────────────────────────────────────────────────────────────
  home: {
    cardTitle: "Plan this week",
    cardSubtitle: "A fresh week of dinners, sorted",
    buildButton: "Build my meal plan",
    building: "Building your plan...",
    recentPlans: "Recent plans",
    planOf: "{name}'s plan",
    yourFallback: "Your",
    fillFamilyCookTime: "Please fill in family size and cook time.",
    freeLimitReached: "You've used your 2 free plans this month. Upgrade to Nourishly Plus for unlimited plans.",
    planSavedButUpdateFailed: "Plan saved, but your usage count couldn't be updated — it may show the wrong number until this is fixed.",
    planNotSaved: "Plan generated but couldn't be saved. Please try logging in again.",
    planNotSavedError: "Plan generated but couldn't be saved: {error}",
    genericError: "Something went wrong: {error}",
  },

  // ── Plan (weekly meal plan) tab ──────────────────────────────────────────
  plan: {
    nutritionTotals: "Weekly nutrition totals",
    calLabel: "Cal",
    proteinLabel: "Protein",
    carbsLabel: "Carbs",
    fatLabel: "Fat",
    plusFeatureChip: "Full nutrition on Plus",
    findingAlternative: "Finding alternative...",
    generateNewPlan: "Generate a new plan",
    emptyTitle: "No meal plan yet",
    emptySubtitle: "Head to Home and build your first week of dinners.",
    goToHome: "Go to Home",
  },

  // ── Shopping tab ──────────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "Shopping lists are a Plus feature",
    paywallSubtitle: "Upgrade to Nourishly Plus for an automatic, organised shopping list every week.",
    upgradeButton: "Upgrade — €7.99/mo",
    redirecting: "Redirecting...",
    emptyTitle: "No shopping list yet",
    emptySubtitle: "Generate a meal plan and your list appears here.",
    buildPlan: "Build a plan",
  },

  // ── Saved plans tab ──────────────────────────────────────────────────────
  saved: {
    countOne: "{count} saved plan",
    countOther: "{count} saved plans",
    mealPlanOf: "{name}'s meal plan",
    yourFallback: "Your",
    view: "View",
    moreCount: "+{count} more",
    emptyTitle: "No saved plans yet",
    emptySubtitle: "Your plans save automatically every time you generate one.",
    createFirst: "Create first plan",
  },

  // ── Profile tab ───────────────────────────────────────────────────────────
  profile: {
    accountFallback: "Your account",
    plusActive: "Nourishly Plus — unlimited plans unlocked",
    manageSubscription: "Manage subscription",
    redirecting: "Redirecting...",
    freePlan: "Free plan",
    plansUsed: "{used}/2 plans used this month",
    upgradeButton: "Upgrade to Nourishly Plus — €7.99/mo",
    redirectingCheckout: "Redirecting to checkout...",
    preferencesTitle: "Preferences",
    save: "Save preferences",
    saving: "Saving...",
    saved: "Saved ✓",
    savePrefsFailed: "Couldn't save your preferences. Please try again.",
    changePasswordTitle: "Change password",
    currentPassword: "Current password",
    updatePassword: "Update password",
    updating: "Updating...",
    passwordUpdated: "Password updated successfully.",
    passwordUpdateFailed: "Couldn't update your password.",
    currentPasswordWrong: "Current password is incorrect.",
    noAccountEmail: "Couldn't find your account email.",
    newPasswordTooShort: "New password must be at least 6 characters.",
    newPasswordNoMatch: "New passwords don't match.",
    logout: "Log out",
    language: "Language",
    languageEnglish: "English",
    languagePortuguese: "Português",
    portalOpenFailed: "Couldn't open the subscription portal. Please try again.",
    portalOpenFailedError: "Couldn't open the subscription portal: {error}",
    checkoutFailed: "Couldn't start checkout. Please try again.",
    checkoutFailedError: "Couldn't start checkout: {error}",
  },

  // ── Meal card (used in the Plan tab) ─────────────────────────────────────
  mealCard: {
    markAsCooked: "Mark as cooked",
    howToMakeIt: "How to make it",
  },

  // ── Shopping list ─────────────────────────────────────────────────────────
  shoppingList: {
    progress: "Shopping progress",
    categories: {
      proteins: "Proteins",
      vegHerbs: "Vegetables & Herbs",
      grainsPasta: "Grains & Pasta",
      dairy: "Dairy",
      pantry: "Pantry",
    },
    pantryDefaults: ["Olive oil", "Salt & pepper", "Mixed herbs", "Stock cubes"],
    vegDefaults: ["Mixed salad leaves", "Cherry tomatoes", "Fresh herbs", "Garlic", "Onions"],
    grainDefaults: ["Rice", "Pasta"],
    dairyDefaults: ["Butter", "Parmesan"],
    tipTitle: "Check your cupboards first",
    tipBody: "Salt, pepper, olive oil, garlic — you likely already have these.",
    // Display labels for ingredient keywords detected in (English) AI-generated
    // meal names — the detection keywords themselves stay in English since
    // they're matched against Claude's output, only the label shown is localized.
    ingredients: {
      chicken: "Chicken", beef: "Beef", salmon: "Salmon", fish: "Fish", lamb: "Lamb",
      pork: "Pork", shrimp: "Shrimp", tuna: "Tuna", turkey: "Turkey", tofu: "Tofu",
      tomato: "Tomato", spinach: "Spinach", pepper: "Pepper", broccoli: "Broccoli",
      carrot: "Carrot", onion: "Onion", garlic: "Garlic", lettuce: "Lettuce",
      mushroom: "Mushroom", lemon: "Lemon", basil: "Basil", parsley: "Parsley",
      ginger: "Ginger", pasta: "Pasta", rice: "Rice", noodle: "Noodles", bread: "Bread",
      tortilla: "Tortilla", quinoa: "Quinoa", couscous: "Couscous", lentil: "Lentils",
      bean: "Beans", cheese: "Cheese", butter: "Butter", milk: "Milk", cream: "Cream",
      yogurt: "Yogurt", parmesan: "Parmesan", mozzarella: "Mozzarella",
    },
  },
};
