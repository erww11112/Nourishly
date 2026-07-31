// ── Español ──────────────────────────────────────────────────────────────
// Misma estructura de claves que en.js — traducido de forma natural, no
// literal, manteniendo el tono cálido y cercano de Nourishly.
export const es = {
  common: {
    appName: "Nourishly",
    tagline: "Comidas en familia, sin complicaciones",
    fields: {
      familySize: "Número de personas",
      familySizePlaceholder: "ej: 4",
      allergies: "Alergias o restricciones",
      allergiesPlaceholder: "ej: sin frutos secos — o déjalo en blanco",
      cookTime: "Tiempo de cocina entre semana",
      cookTimePlaceholder: "ej: 30 minutos",
    },
  },

  // ── Pantalla de bienvenida (splash) ──────────────────────────────────────
  splash: {},

  // ── Selector de idioma (primer paso del onboarding, solo cuentas nuevas) ──
  chooseLanguage: {
    title: "Elige tu idioma",
    subtitle: "Puedes cambiarlo cuando quieras desde tu perfil",
  },

  // ── Slides de bienvenida (antes del onboarding) ─────────────────────────
  welcome: {
    slide1Title: "¿Cansado de no saber qué cocinar?",
    slide1Body: "Las mismas cinco comidas de siempre. El agobio de las 18h. La comida a domicilio que en realidad no te apetecía. ¿Te suena?",
    slide2Title: "Más tiempo con tus hijos. Menos tiempo pensando en la cena.",
    slide2Body: "Una semana entera de cenas caseras, planificadas para tu familia en menos de un minuto — para que te centres en lo que de verdad importa.",
    continue: "Continuar",
    begin: "Vamos a empezar",
  },

  // ── Preguntas del onboarding ──────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "¿Cuántas personas van a comer?",
    familySizeSub: "Incluyéndote a ti y a tus hijos",
    allergiesTitle: "¿Alguna alergia o necesidad alimentaria?",
    allergiesSub: "Lo tendremos en cuenta en todo momento",
    cookTimeTitle: "¿Cuánto tiempo tienes para cocinar entre semana?",
    cookTimeSub: "Ajustaremos todas las recetas a ese tiempo",
    continue: "Continuar",
    almostThere: "Ya casi está",
    back: "Atrás",
  },

  // ── Autenticación (crear cuenta / iniciar sesión) ────────────────────────
  auth: {
    createAccount: "Crear cuenta",
    signIn: "Iniciar sesión",
    yourName: "Tu nombre",
    yourNamePlaceholder: "ej: María",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    startPlanning: "Empezar a planificar",
    welcomeBack: "Bienvenido de nuevo",
    pleaseWait: "Un momento...",
    privacyFooter: "Tus datos son privados · Sin tarjeta de crédito",
    prefsSavedBanner: "Tus preferencias ya están guardadas — solo falta crear la cuenta",
    fillAllFields: "Rellena todos los campos, por favor.",
    enterName: "Indica tu nombre, por favor.",
    signupFailed: "No se pudo crear la cuenta",
    profileCreateFailed: "No se pudo crear tu perfil. Inténtalo de nuevo o contacta con soporte.",
    confirmEmail: "Cuenta creada — confirma tu email y luego inicia sesión.",
    invalidCredentials: "Email o contraseña incorrectos.",
    somethingWrong: "Algo salió mal.",
  },

  forgotPassword: {
    title: "Restablecer tu contraseña",
    subtitle: "Indica tu email y te enviaremos un enlace para restablecerla.",
    sentMessage: "Revisa tu email — te hemos enviado un enlace para restablecer la contraseña.",
    sendLink: "Enviar enlace de restablecimiento",
    sending: "Enviando...",
    backToSignIn: "Volver a iniciar sesión",
    enterEmail: "Indica tu email, por favor.",
    sendFailed: "No se pudo enviar el email de restablecimiento. Inténtalo de nuevo.",
  },

  resetPassword: {
    headerSubtitle: "Define tu nueva contraseña",
    cardTitle: "Elige una nueva contraseña",
    newPassword: "Nueva contraseña",
    confirmNewPassword: "Confirma la nueva contraseña",
    submit: "Establecer nueva contraseña",
    pleaseWait: "Un momento...",
    fillBothFields: "Rellena los dos campos, por favor.",
    tooShort: "La contraseña debe tener al menos 6 caracteres.",
    noMatch: "Las contraseñas no coinciden.",
    updateFailed: "No se pudo actualizar tu contraseña.",
  },

  // ── Navegación inferior + cabecera ───────────────────────────────────────
  nav: {
    home: "Inicio",
    thisWeek: "Esta semana",
    shopping: "Compra",
    saved: "Guardados",
    profile: "Perfil",
    greeting: "Hola {name}",
    greetingFallback: "de nuevo",
  },

  // ── Pestaña Inicio ────────────────────────────────────────────────────────
  home: {
    cardTitle: "Planificar esta semana",
    cardSubtitle: "Una semana de cenas, toda organizada",
    buildButton: "Crear mi plan de comidas",
    building: "Creando tu plan...",
    recentPlans: "Planes recientes",
    planOf: "Plan de {name}",
    yourPlanFallback: "Tu plan",
    fillFamilyCookTime: "Indica el número de personas y el tiempo de cocina, por favor.",
    freeLimitReached: "Ya has usado tus 2 planes gratuitos este mes. Pásate a Nourishly Plus para planes ilimitados.",
    planSavedButUpdateFailed: "El plan se guardó, pero no se pudo actualizar el número de usos — puede que se muestre incorrecto hasta que se solucione.",
    planNotSaved: "El plan se creó pero no se pudo guardar. Intenta iniciar sesión de nuevo.",
    planNotSavedError: "El plan se creó pero no se pudo guardar: {error}",
    genericError: "Algo salió mal: {error}",
  },

  // ── Pestaña Plan (plan semanal) ──────────────────────────────────────────
  plan: {
    nutritionTotals: "Totales nutricionales de la semana",
    calLabel: "Cal",
    proteinLabel: "Proteína",
    carbsLabel: "Carbohidratos",
    fatLabel: "Grasa",
    plusFeatureChip: "Nutrición completa con Plus",
    findingAlternative: "Buscando alternativa...",
    generateNewPlan: "Crear un nuevo plan",
    emptyTitle: "Todavía no tienes ningún plan",
    emptySubtitle: "Ve a Inicio y crea tu primera semana de cenas.",
    goToHome: "Ir a Inicio",
  },

  // ── Pestaña Compra ────────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "Las listas de la compra son una función Plus",
    paywallSubtitle: "Pásate a Nourishly Plus para tener una lista de la compra automática y organizada cada semana.",
    upgradeButton: "Mejorar plan — 7,99€/mes",
    redirecting: "Redirigiendo...",
    emptyTitle: "Todavía no tienes lista de la compra",
    emptySubtitle: "Crea un plan de comidas y tu lista aparecerá aquí.",
    buildPlan: "Crear un plan",
  },

  // ── Pestaña Guardados ─────────────────────────────────────────────────────
  saved: {
    countOne: "{count} plan guardado",
    countOther: "{count} planes guardados",
    mealPlanOf: "Plan de comidas de {name}",
    yourMealPlanFallback: "Tu plan de comidas",
    view: "Ver",
    moreCount: "+{count} más",
    emptyTitle: "Todavía no tienes planes guardados",
    emptySubtitle: "Tus planes se guardan automáticamente cada vez que creas uno.",
    createFirst: "Crear el primer plan",
  },

  // ── Pestaña Perfil ────────────────────────────────────────────────────────
  profile: {
    accountFallback: "Tu cuenta",
    plusActive: "Nourishly Plus — planes ilimitados activados",
    manageSubscription: "Gestionar suscripción",
    redirecting: "Redirigiendo...",
    freePlan: "Plan gratuito",
    plansUsed: "{used}/2 planes usados este mes",
    upgradeButton: "Pásate a Nourishly Plus — 7,99€/mes",
    redirectingCheckout: "Redirigiendo al pago...",
    preferencesTitle: "Preferencias",
    save: "Guardar preferencias",
    saving: "Guardando...",
    saved: "Guardado ✓",
    savePrefsFailed: "No se pudieron guardar tus preferencias. Inténtalo de nuevo.",
    changePasswordTitle: "Cambiar contraseña",
    currentPassword: "Contraseña actual",
    updatePassword: "Actualizar contraseña",
    updating: "Actualizando...",
    passwordUpdated: "Contraseña actualizada correctamente.",
    passwordUpdateFailed: "No se pudo actualizar tu contraseña.",
    currentPasswordWrong: "La contraseña actual es incorrecta.",
    noAccountEmail: "No se pudo encontrar el email de tu cuenta.",
    newPasswordTooShort: "La nueva contraseña debe tener al menos 6 caracteres.",
    newPasswordNoMatch: "Las nuevas contraseñas no coinciden.",
    logout: "Cerrar sesión",
    language: "Idioma",
    languageEnglish: "English",
    languagePortuguese: "Português",
    languageSpanish: "Español",
    languageChinese: "中文",
    languageFrench: "Français",
    languageGerman: "Deutsch",
    languageItalian: "Italiano",
    portalOpenFailed: "No se pudo abrir el portal de suscripción. Inténtalo de nuevo.",
    portalOpenFailedError: "No se pudo abrir el portal de suscripción: {error}",
    checkoutFailed: "No se pudo iniciar el pago. Inténtalo de nuevo.",
    checkoutFailedError: "No se pudo iniciar el pago: {error}",
  },

  // ── Tarjeta de comida (pestaña Plan) ──────────────────────────────────────
  mealCard: {
    markAsCooked: "Marcar como cocinado",
    howToMakeIt: "Cómo prepararlo",
  },

  // ── Lista de la compra ────────────────────────────────────────────────────
  shoppingList: {
    progress: "Progreso de la compra",
    categories: {
      proteins: "Proteínas",
      vegHerbs: "Verduras y hierbas",
      grainsPasta: "Cereales y pasta",
      dairy: "Lácteos",
      pantry: "Despensa",
    },
    pantryDefaults: ["Aceite de oliva", "Sal y pimienta", "Hierbas variadas", "Pastillas de caldo"],
    vegDefaults: ["Ensalada variada", "Tomates cherry", "Hierbas frescas", "Ajo", "Cebollas"],
    grainDefaults: ["Arroz", "Pasta"],
    dairyDefaults: ["Mantequilla", "Parmesano"],
    tipTitle: "Mira primero lo que ya tienes en casa",
    tipBody: "Sal, pimienta, aceite de oliva, ajo — lo más probable es que ya los tengas.",
    // Etiquetas para los ingredientes detectados en los nombres de las comidas
    // (generados en inglés por la IA) — la detección se mantiene en inglés,
    // solo se traduce el texto que se muestra.
    ingredients: {
      chicken: "Pollo", beef: "Ternera", salmon: "Salmón", fish: "Pescado", lamb: "Cordero",
      pork: "Cerdo", shrimp: "Gambas", tuna: "Atún", turkey: "Pavo", tofu: "Tofu", eggs: "Huevos",
      tomato: "Tomate", spinach: "Espinacas", pepper: "Pimiento", broccoli: "Brócoli",
      carrot: "Zanahoria", onion: "Cebolla", garlic: "Ajo", lettuce: "Lechuga",
      mushroom: "Champiñones", lemon: "Limón", basil: "Albahaca", parsley: "Perejil",
      ginger: "Jengibre", pasta: "Pasta", rice: "Arroz", noodle: "Fideos", bread: "Pan",
      tortilla: "Tortilla", quinoa: "Quinoa", couscous: "Cuscús", lentil: "Lentejas",
      bean: "Alubias", cheese: "Queso", butter: "Mantequilla", milk: "Leche", cream: "Nata",
      yogurt: "Yogur", parmesan: "Parmesano", mozzarella: "Mozzarella",
    },
  },
};
