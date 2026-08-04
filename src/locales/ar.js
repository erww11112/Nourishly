// ── العربية ──────────────────────────────────────────────────────────────
// نفس بنية المفاتيح الموجودة في en.js — الترجمة طبيعية وليست حرفية، مع
// الحفاظ على أسلوب Nourishly الدافئ والودود. تم استخدام صيغة المخاطب
// المذكر كافتراضي عام (كما هو معتاد في أغلب تطبيقات الواجهة العربية)
// بدلاً من التفريع بين المذكر والمؤنث في كل جملة.
export const ar = {
  common: {
    appName: "Nourishly",
    tagline: "عشاء العائلة بدون تعقيد",
    fields: {
      familySize: "عدد أفراد العائلة",
      familySizePlaceholder: "مثال: 4",
      allergies: "الحساسية أو القيود الغذائية",
      allergiesPlaceholder: "مثال: بدون مكسرات — أو اتركها فارغة",
      cookTime: "وقت الطهي في أيام الأسبوع",
      cookTimePlaceholder: "مثال: 30 دقيقة",
    },
  },

  // ── شاشة البداية ─────────────────────────────────────────────────────────
  splash: {},

  // ── اختيار اللغة (أول خطوة في onboarding، للحسابات الجديدة فقط) ────────
  chooseLanguage: {
    title: "اختر لغتك",
    subtitle: "يمكنك تغييرها في أي وقت من صفحة حسابك الشخصي",
  },

  // ── شرائح الترحيب (قبل onboarding) ──────────────────────────────────────
  welcome: {
    slide1Title: "ما تدري تطبخ إيش؟",
    slide1Body: "نفس الوجبات الخمس تتكرر. فوضى الساعة السادسة مساءً. طلب من الخارج ما كان فيه رغبة حقيقية. يبدو مألوفًا؟",
    slide2Title: "وقت أكثر مع أطفالك، وتفكير أقل في عشاء الليلة.",
    slide2Body: "خطة كاملة لعشاء أسبوع من الأكل البيتي لعائلتك في أقل من دقيقة — عشان تركّز على اللي يستاهل وقتك فعلاً.",
    continue: "متابعة",
    begin: "لنبدأ",
  },

  // ── أسئلة onboarding ──────────────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "كم شخص راح يأكل؟",
    familySizeSub: "احسب نفسك وأطفالك",
    allergiesTitle: "عندك حساسية أو احتياجات غذائية خاصة؟",
    allergiesSub: "بناخذها بعين الاعتبار بالكامل",
    allergyConsent: "أوافق على قيام Nourishly ومزوّد الذكاء الاصطناعي الخاص بها بمعالجة هذه المعلومات الصحية لتخصيص خطط وجباتي.",
    cookTimeTitle: "كم من الوقت متوفر لك للطبخ في أيام الأسبوع؟",
    cookTimeSub: "بنختار كل وصفة تناسب هذا الوقت بالضبط",
    continue: "متابعة",
    almostThere: "خطوة وحدة تفصلنا",
    back: "رجوع",
  },

  // ── تسجيل الدخول / إنشاء حساب ─────────────────────────────────────────────
  auth: {
    createAccount: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    yourName: "اسمك",
    yourNamePlaceholder: "مثال: سارة",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@email.com",
    password: "كلمة المرور",
    forgotPassword: "نسيت كلمة المرور؟",
    startPlanning: "ابدأ التخطيط",
    welcomeBack: "أهلاً بعودتك",
    pleaseWait: "لحظة من فضلك...",
    privacyFooter: "بياناتك تبقى خاصة · بدون الحاجة لبطاقة ائتمان",
    prefsSavedBanner: "تفضيلاتك محفوظة بالفعل — ما تبقى إلا إنشاء الحساب",
    fillAllFields: "الرجاء تعبئة جميع الحقول.",
    enterName: "الرجاء إدخال اسمك.",
    signupFailed: "تعذّر إنشاء الحساب",
    profileCreateFailed: "تعذّر إنشاء ملفك الشخصي. جرّب مرة أخرى أو تواصل مع الدعم.",
    confirmEmail: "تم إنشاء الحساب — تحقق من بريدك الإلكتروني لتأكيده، ثم سجّل الدخول.",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    somethingWrong: "حدث خطأ ما.",
  },

  forgotPassword: {
    title: "إعادة تعيين كلمة المرور",
    subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
    sentMessage: "تحقق من بريدك الإلكتروني — أرسلنا لك رابط إعادة تعيين كلمة المرور.",
    sendLink: "إرسال الرابط",
    sending: "جارٍ الإرسال...",
    backToSignIn: "العودة لتسجيل الدخول",
    enterEmail: "الرجاء إدخال بريدك الإلكتروني.",
    sendFailed: "تعذّر إرسال بريد إعادة التعيين. جرّب مرة أخرى.",
  },

  resetPassword: {
    headerSubtitle: "عيّن كلمة مرورك الجديدة",
    cardTitle: "اختر كلمة مرور جديدة",
    newPassword: "كلمة المرور الجديدة",
    confirmNewPassword: "تأكيد كلمة المرور الجديدة",
    submit: "تعيين كلمة المرور الجديدة",
    pleaseWait: "لحظة من فضلك...",
    fillBothFields: "الرجاء تعبئة كلا الحقلين.",
    tooShort: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
    noMatch: "كلمتا المرور غير متطابقتين.",
    updateFailed: "تعذّر تحديث كلمة مرورك.",
  },

  // ── التنقل السفلي + الترويسة ──────────────────────────────────────────────
  nav: {
    home: "الرئيسية",
    thisWeek: "هذا الأسبوع",
    shopping: "التسوق",
    saved: "المحفوظات",
    profile: "حسابي",
    greeting: "أهلاً، {name}",
    greetingFallback: "بك",
  },

  // ── تبويب الرئيسية ─────────────────────────────────────────────────────
  home: {
    cardTitle: "خطط لأسبوعك",
    cardSubtitle: "أسبوع جديد من العشاء، كله مرتّب",
    buildButton: "أنشئ خطة وجباتي",
    building: "جارٍ إنشاء خطتك...",
    recentPlans: "الخطط الأخيرة",
    planOf: "خطة {name}",
    yourPlanFallback: "خطتك",
    fillFamilyCookTime: "الرجاء إدخال عدد أفراد العائلة ووقت الطهي.",
    freeLimitReached: "استخدمت خطتيك المجانيتين لهذا الشهر. اشترك في Nourishly Plus للحصول على خطط غير محدودة.",
    planSavedButUpdateFailed: "تم حفظ الخطة، لكن تعذّر تحديث عداد الاستخدام — قد يظهر الرقم غير صحيح حتى يتم إصلاحه.",
    planNotSaved: "تم إنشاء الخطة، لكن تعذّر حفظها. جرّب تسجيل الدخول من جديد.",
    planNotSavedError: "تم إنشاء الخطة، لكن تعذّر حفظها: {error}",
    genericError: "حدث خطأ ما: {error}",
  },

  // ── تبويب الخطة (خطة الوجبات الأسبوعية) ────────────────────────────────
  plan: {
    nutritionTotals: "إجمالي القيم الغذائية للأسبوع",
    calLabel: "سعرات",
    proteinLabel: "بروتين",
    carbsLabel: "كربوهيدرات",
    fatLabel: "دهون",
    plusFeatureChip: "التفاصيل الغذائية الكاملة في Plus",
    findingAlternative: "جارٍ البحث عن بديل...",
    generateNewPlan: "إنشاء خطة جديدة",
    emptyTitle: "لا توجد خطة وجبات بعد",
    emptySubtitle: "اذهب إلى الرئيسية وأنشئ أسبوعك الأول من العشاء.",
    goToHome: "الذهاب إلى الرئيسية",
  },

  // ── تبويب التسوق ───────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "قوائم التسوق — ميزة Plus",
    paywallSubtitle: "اشترك في Nourishly Plus لتحصل كل أسبوع على قائمة تسوق منظمة تُنشأ تلقائيًا.",
    upgradeButton: "الترقية — €7.99/شهريًا",
    redirecting: "جارٍ التحويل...",
    emptyTitle: "لا توجد قائمة تسوق بعد",
    emptySubtitle: "أنشئ خطة وجبات، وستظهر القائمة هنا.",
    buildPlan: "إنشاء خطة",
  },

  // ── تبويب المحفوظات ────────────────────────────────────────────────────
  saved: {
    countOne: "خطة واحدة محفوظة",
    countOther: "{count} خطط محفوظة",
    mealPlanOf: "خطة وجبات {name}",
    yourMealPlanFallback: "خطة وجباتك",
    view: "عرض",
    moreCount: "+{count} أخرى",
    emptyTitle: "لا توجد خطط محفوظة بعد",
    emptySubtitle: "تُحفظ خططك تلقائيًا في كل مرة تنشئ فيها خطة جديدة.",
    createFirst: "أنشئ خطتك الأولى",
  },

  // ── تبويب الحساب الشخصي ───────────────────────────────────────────────
  profile: {
    accountFallback: "حسابك",
    plusActive: "Nourishly Plus — تم فتح الخطط غير المحدودة",
    manageSubscription: "إدارة الاشتراك",
    redirecting: "جارٍ التحويل...",
    freePlan: "الخطة المجانية",
    plansUsed: "تم استخدام {used}/2 خطط هذا الشهر",
    upgradeButton: "اشترك في Nourishly Plus — €7.99/شهريًا",
    redirectingCheckout: "جارٍ التحويل إلى الدفع...",
    preferencesTitle: "التفضيلات",
    save: "حفظ التفضيلات",
    saving: "جارٍ الحفظ...",
    saved: "تم الحفظ ✓",
    savePrefsFailed: "تعذّر حفظ تفضيلاتك. جرّب مرة أخرى.",
    changePasswordTitle: "تغيير كلمة المرور",
    currentPassword: "كلمة المرور الحالية",
    updatePassword: "تحديث كلمة المرور",
    updating: "جارٍ التحديث...",
    passwordUpdated: "تم تحديث كلمة مرورك بنجاح.",
    passwordUpdateFailed: "تعذّر تحديث كلمة مرورك.",
    currentPasswordWrong: "كلمة المرور الحالية غير صحيحة.",
    noAccountEmail: "تعذّر العثور على البريد الإلكتروني لحسابك.",
    newPasswordTooShort: "يجب أن تتكون كلمة المرور الجديدة من 6 أحرف على الأقل.",
    newPasswordNoMatch: "كلمتا المرور الجديدتان غير متطابقتين.",
    logout: "تسجيل الخروج",
    language: "اللغة",
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
    portalOpenFailed: "تعذّر فتح صفحة إدارة الاشتراك. جرّب مرة أخرى.",
    portalOpenFailedError: "تعذّر فتح صفحة إدارة الاشتراك: {error}",
    checkoutFailed: "تعذّر بدء عملية الدفع. جرّب مرة أخرى.",
    checkoutFailedError: "تعذّر بدء عملية الدفع: {error}",
  },

  // ── بطاقة الوجبة (تبويب الخطة) ────────────────────────────────────────
  mealCard: {
    markAsCooked: "تمييزها كمُحضّرة",
    howToMakeIt: "طريقة التحضير",
  },

  // ── قائمة التسوق ──────────────────────────────────────────────────────
  shoppingList: {
    progress: "تقدّم التسوق",
    categories: {
      proteins: "البروتينات",
      vegHerbs: "الخضار والأعشاب",
      grainsPasta: "الحبوب والمعكرونة",
      dairy: "منتجات الألبان",
      pantry: "مؤن المطبخ",
    },
    pantryDefaults: ["زيت زيتون", "ملح وفلفل", "خلطة أعشاب", "مكعبات مرق"],
    vegDefaults: ["خلطة أوراق سلطة", "طماطم كرزية", "أعشاب طازجة", "ثوم", "بصل"],
    grainDefaults: ["أرز", "معكرونة"],
    dairyDefaults: ["زبدة", "جبن بارميزان"],
    tipTitle: "تأكد أولاً مما هو موجود عندك بالفعل",
    tipBody: "الملح والفلفل وزيت الزيتون والثوم — على الأغلب موجودة في مطبخك بالفعل.",
    // تسميات تُعرض لمكونات يتم اكتشافها من أسماء الأطباق (بالإنجليزية)
    // التي يولّدها الذكاء الاصطناعي — عملية الاكتشاف نفسها تبقى بالإنجليزية
    // لأنها تعتمد على استجابة Claude، ويُترجم فقط النص المعروض.
    ingredients: {
      chicken: "دجاج", beef: "لحم بقري", salmon: "سلمون", fish: "سمك", lamb: "لحم ضأن",
      pork: "لحم خنزير", shrimp: "روبيان", tuna: "تونة", turkey: "ديك رومي", tofu: "توفو", eggs: "بيض",
      tomato: "طماطم", spinach: "سبانخ", pepper: "فلفل", broccoli: "بروكلي",
      carrot: "جزر", onion: "بصل", garlic: "ثوم", lettuce: "خس",
      mushroom: "فطر", lemon: "ليمون", basil: "ريحان", parsley: "بقدونس",
      ginger: "زنجبيل", pasta: "معكرونة", rice: "أرز", noodle: "نودلز", bread: "خبز",
      tortilla: "تورتيلا", quinoa: "كينوا", couscous: "كسكس", lentil: "عدس",
      bean: "فاصوليا", cheese: "جبن", butter: "زبدة", milk: "حليب", cream: "كريمة",
      yogurt: "لبن زبادي", parmesan: "جبن بارميزان", mozzarella: "جبن موزاريلا",
    },
  },
};
