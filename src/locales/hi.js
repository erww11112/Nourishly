// ── हिन्दी ───────────────────────────────────────────────────────────────
// en.js जैसी ही key संरचना — अनुवाद शब्दशः नहीं, बल्कि सहज और स्वाभाविक रखा
// गया है, ताकि Nourishly का गर्मजोशी भरा, आत्मीय लहजा बना रहे।
export const hi = {
  common: {
    appName: "Nourishly",
    tagline: "बिना झंझट के पूरे परिवार का खाना",
    fields: {
      familySize: "घर में कितने लोग हैं",
      familySizePlaceholder: "जैसे: 4",
      allergies: "एलर्जी या खानपान की पाबंदियाँ",
      allergiesPlaceholder: "जैसे: मूंगफली नहीं — या खाली छोड़ दें",
      cookTime: "रोज़ खाना बनाने का समय",
      cookTimePlaceholder: "जैसे: 30 मिनट",
    },
  },

  // ── स्प्लैश स्क्रीन ────────────────────────────────────────────────────
  splash: {},

  // ── भाषा चुनें (onboarding का पहला चरण, सिर्फ़ नए खातों के लिए) ─────────
  chooseLanguage: {
    title: "अपनी भाषा चुनें",
    subtitle: "इसे तुम कभी भी प्रोफ़ाइल में जाकर बदल सकती हो",
  },

  // ── स्वागत स्लाइड्स (onboarding से पहले) ─────────────────────────────────
  welcome: {
    slide1Title: "समझ नहीं आ रहा क्या बनाएँ?",
    slide1Body: "वही पाँच डिशेज़ बार-बार। शाम छह बजे की भागदौड़। खाना मँगवाया, पर मन तो कुछ और खाने का था। जाना-पहचाना लगता है?",
    slide2Title: "बच्चों के साथ ज़्यादा वक़्त। रात के खाने की कम उलझन।",
    slide2Body: "एक मिनट से भी कम में, तुम्हारे परिवार के लिए पूरे हफ़्ते के घर के बने खाने की योजना — ताकि तुम उन चीज़ों पर ध्यान दे सको जो सच में मायने रखती हैं।",
    continue: "आगे बढ़ें",
    begin: "शुरू करें",
  },

  // ── Onboarding के सवाल ────────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "कितने लोग खाना खाएँगे?",
    familySizeSub: "खुद को और बच्चों को गिनते हुए",
    allergiesTitle: "कोई एलर्जी या खास खानपान की ज़रूरत है?",
    allergiesSub: "हम पूरी तरह इसका ध्यान रखेंगे",
    allergyConsent: "मैं Nourishly और उसके AI प्रदाता को इस स्वास्थ्य-संबंधी जानकारी को मेरे भोजन योजना को व्यक्तिगत बनाने के लिए संसाधित करने की सहमति देता/देती हूँ।",
    cookTimeTitle: "हफ़्ते के दिनों में शाम को खाना बनाने के लिए तुम्हारे पास कितना समय होता है?",
    cookTimeSub: "हर रेसिपी हम इसी समय के हिसाब से चुनेंगे",
    continue: "आगे बढ़ें",
    almostThere: "बस थोड़ा और",
    back: "वापस",
  },

  // ── साइन इन / साइन अप ────────────────────────────────────────────────
  auth: {
    createAccount: "खाता बनाएँ",
    signIn: "साइन इन करें",
    yourName: "तुम्हारा नाम",
    yourNamePlaceholder: "जैसे: प्रिया",
    email: "ईमेल",
    emailPlaceholder: "you@email.com",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड भूल गए?",
    startPlanning: "योजना बनाना शुरू करें",
    welcomeBack: "फिर से स्वागत है",
    pleaseWait: "बस एक पल...",
    privacyFooter: "तुम्हारा डेटा पूरी तरह निजी रहता है · कार्ड की ज़रूरत नहीं",
    prefsSavedBanner: "तुम्हारी पसंद पहले ही सेव हो चुकी है — बस खाता बनाना बाकी है",
    fillAllFields: "कृपया सभी फ़ील्ड भरें।",
    enterName: "कृपया अपना नाम दर्ज करें।",
    signupFailed: "खाता नहीं बन पाया",
    profileCreateFailed: "तुम्हारी प्रोफ़ाइल नहीं बन पाई। दोबारा कोशिश करें या सहायता से संपर्क करें।",
    confirmEmail: "खाता बन गया है — पुष्टि के लिए अपना ईमेल देखें, फिर साइन इन करें।",
    invalidCredentials: "ईमेल या पासवर्ड ग़लत है।",
    somethingWrong: "कुछ गड़बड़ हो गई।",
  },

  forgotPassword: {
    title: "पासवर्ड रीसेट करें",
    subtitle: "अपना ईमेल दर्ज करें, हम तुम्हें पासवर्ड रीसेट करने का लिंक भेज देंगे।",
    sentMessage: "अपना ईमेल देखें — हमने तुम्हें पासवर्ड रीसेट का लिंक भेज दिया है।",
    sendLink: "लिंक भेजें",
    sending: "भेजा जा रहा है...",
    backToSignIn: "साइन इन पर वापस जाएँ",
    enterEmail: "कृपया अपना ईमेल दर्ज करें।",
    sendFailed: "रीसेट ईमेल नहीं भेजा जा सका। दोबारा कोशिश करें।",
  },

  resetPassword: {
    headerSubtitle: "अपना नया पासवर्ड सेट करें",
    cardTitle: "एक नया पासवर्ड चुनें",
    newPassword: "नया पासवर्ड",
    confirmNewPassword: "नए पासवर्ड की पुष्टि करें",
    submit: "नया पासवर्ड सेट करें",
    pleaseWait: "बस एक पल...",
    fillBothFields: "कृपया दोनों फ़ील्ड भरें।",
    tooShort: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
    noMatch: "पासवर्ड मेल नहीं खाते।",
    updateFailed: "तुम्हारा पासवर्ड अपडेट नहीं हो पाया।",
  },

  // ── नीचे का नेविगेशन + हेडर ───────────────────────────────────────────
  nav: {
    home: "होम",
    thisWeek: "इस हफ़्ते",
    shopping: "खरीदारी",
    saved: "सेव किए गए",
    profile: "प्रोफ़ाइल",
    greeting: "नमस्ते, {name}",
    greetingFallback: "तुम्हें",
  },

  // ── होम टैब ───────────────────────────────────────────────────────────
  home: {
    cardTitle: "इस हफ़्ते की योजना बनाएँ",
    cardSubtitle: "नए हफ़्ते का रात का खाना, सब कुछ सोच-समझकर",
    buildButton: "मेरी भोजन योजना बनाएँ",
    building: "तुम्हारी योजना बन रही है...",
    recentPlans: "हाल की योजनाएँ",
    planOf: "{name} की योजना",
    yourPlanFallback: "तुम्हारी योजना",
    fillFamilyCookTime: "कृपया घर के सदस्यों की संख्या और खाना बनाने का समय भरें।",
    freeLimitReached: "तुम इस महीने अपनी दोनों मुफ़्त योजनाएँ इस्तेमाल कर चुकी हो। असीमित योजनाओं के लिए Nourishly Plus लो।",
    planSavedButUpdateFailed: "योजना सेव हो गई, लेकिन इस्तेमाल की गिनती अपडेट नहीं हो पाई — जब तक इसे ठीक न किया जाए, संख्या ग़लत दिख सकती है।",
    planNotSaved: "योजना बन गई, लेकिन सेव नहीं हो पाई। दोबारा साइन इन करने की कोशिश करें।",
    planNotSavedError: "योजना बन गई, लेकिन सेव नहीं हो पाई: {error}",
    genericError: "कुछ गड़बड़ हो गई: {error}",
  },

  // ── प्लान टैब (साप्ताहिक भोजन योजना) ─────────────────────────────────
  plan: {
    nutritionTotals: "हफ़्ते भर का पोषण योग",
    calLabel: "कैलोरी",
    proteinLabel: "प्रोटीन",
    carbsLabel: "कार्ब्स",
    fatLabel: "फैट",
    plusFeatureChip: "पूरी पोषण जानकारी Plus में",
    findingAlternative: "विकल्प ढूँढा जा रहा है...",
    generateNewPlan: "नई योजना बनाएँ",
    emptyTitle: "अभी तक कोई भोजन योजना नहीं है",
    emptySubtitle: "होम पर जाकर अपनी पहली हफ़्ते की योजना बनाएँ।",
    goToHome: "होम पर जाएँ",
  },

  // ── खरीदारी टैब ──────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "खरीदारी की सूची — Plus फ़ीचर",
    paywallSubtitle: "Nourishly Plus लो और हर हफ़्ते अपने आप बनी हुई, व्यवस्थित खरीदारी सूची पाओ।",
    upgradeButton: "अपग्रेड करें — €7.99/माह",
    redirecting: "आगे भेजा जा रहा है...",
    emptyTitle: "अभी तक कोई खरीदारी सूची नहीं है",
    emptySubtitle: "एक भोजन योजना बनाएँ, सूची यहाँ अपने आप आ जाएगी।",
    buildPlan: "योजना बनाएँ",
  },

  // ── सेव किए गए टैब ────────────────────────────────────────────────────
  saved: {
    countOne: "{count} सेव की गई योजना",
    countOther: "{count} सेव की गई योजनाएँ",
    mealPlanOf: "{name} की भोजन योजना",
    yourMealPlanFallback: "तुम्हारी भोजन योजना",
    view: "देखें",
    moreCount: "+{count} और",
    emptyTitle: "अभी तक कोई सेव की गई योजना नहीं है",
    emptySubtitle: "जब भी तुम नई योजना बनाती हो, वह यहाँ अपने आप सेव हो जाती है।",
    createFirst: "पहली योजना बनाएँ",
  },

  // ── प्रोफ़ाइल टैब ─────────────────────────────────────────────────────
  profile: {
    accountFallback: "तुम्हारा खाता",
    plusActive: "Nourishly Plus — असीमित योजनाएँ अनलॉक हैं",
    manageSubscription: "सब्सक्रिप्शन प्रबंधित करें",
    redirecting: "आगे भेजा जा रहा है...",
    freePlan: "मुफ़्त प्लान",
    plansUsed: "इस महीने {used}/2 योजनाएँ इस्तेमाल हुईं",
    upgradeButton: "Nourishly Plus लें — €7.99/माह",
    redirectingCheckout: "भुगतान पेज पर भेजा जा रहा है...",
    preferencesTitle: "पसंद",
    save: "पसंद सेव करें",
    saving: "सेव हो रहा है...",
    saved: "सेव हो गया ✓",
    savePrefsFailed: "तुम्हारी पसंद सेव नहीं हो पाई। दोबारा कोशिश करें।",
    changePasswordTitle: "पासवर्ड बदलें",
    currentPassword: "मौजूदा पासवर्ड",
    updatePassword: "पासवर्ड अपडेट करें",
    updating: "अपडेट हो रहा है...",
    passwordUpdated: "पासवर्ड सफलतापूर्वक अपडेट हो गया।",
    passwordUpdateFailed: "तुम्हारा पासवर्ड अपडेट नहीं हो पाया।",
    currentPasswordWrong: "मौजूदा पासवर्ड ग़लत है।",
    noAccountEmail: "तुम्हारे खाते का ईमेल नहीं मिल पाया।",
    newPasswordTooShort: "नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
    newPasswordNoMatch: "नए पासवर्ड मेल नहीं खाते।",
    logout: "लॉग आउट करें",
    language: "भाषा",
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
    portalOpenFailed: "सब्सक्रिप्शन प्रबंधन पेज नहीं खुल पाया। दोबारा कोशिश करें।",
    portalOpenFailedError: "सब्सक्रिप्शन प्रबंधन पेज नहीं खुल पाया: {error}",
    checkoutFailed: "भुगतान शुरू नहीं हो पाया। दोबारा कोशिश करें।",
    checkoutFailedError: "भुगतान शुरू नहीं हो पाया: {error}",
  },

  // ── मील कार्ड (प्लान टैब में) ─────────────────────────────────────────
  mealCard: {
    markAsCooked: "बना लिया, मार्क करें",
    howToMakeIt: "बनाने का तरीका",
  },

  // ── खरीदारी सूची ──────────────────────────────────────────────────────
  shoppingList: {
    progress: "खरीदारी की प्रगति",
    categories: {
      proteins: "प्रोटीन",
      vegHerbs: "सब्ज़ियाँ और जड़ी-बूटियाँ",
      grainsPasta: "अनाज और पास्ता",
      dairy: "डेयरी उत्पाद",
      pantry: "रसोई का सामान",
    },
    pantryDefaults: ["ऑलिव ऑयल", "नमक और काली मिर्च", "मिक्स हर्ब्स", "स्टॉक क्यूब्स"],
    vegDefaults: ["मिक्स सलाद पत्तियाँ", "चेरी टमाटर", "ताज़ी जड़ी-बूटियाँ", "लहसुन", "प्याज़"],
    grainDefaults: ["चावल", "पास्ता"],
    dairyDefaults: ["मक्खन", "परमेज़ान"],
    tipTitle: "पहले देख लो घर में क्या पहले से है",
    tipBody: "नमक, काली मिर्च, ऑलिव ऑयल, लहसुन — ये तो शायद तुम्हारी रसोई में पहले से ही होंगे।",
    // ये लेबल AI द्वारा (अंग्रेज़ी में) बनाए गए डिश नामों में मिले
    // ingredients के लिए दिखाए जाते हैं — पहचान अंग्रेज़ी में ही होती है
    // क्योंकि यह Claude के जवाब से मेल खाती है, सिर्फ़ दिखने वाला टेक्स्ट
    // अनुवादित होता है।
    ingredients: {
      chicken: "चिकन", beef: "बीफ़", salmon: "सैल्मन", fish: "मछली", lamb: "मटन",
      pork: "पोर्क", shrimp: "झींगा", tuna: "टूना", turkey: "टर्की", tofu: "टोफू", eggs: "अंडे",
      tomato: "टमाटर", spinach: "पालक", pepper: "शिमला मिर्च", broccoli: "ब्रोकली",
      carrot: "गाजर", onion: "प्याज़", garlic: "लहसुन", lettuce: "लेट्यूस",
      mushroom: "मशरूम", lemon: "नींबू", basil: "तुलसी", parsley: "अजमोद",
      ginger: "अदरक", pasta: "पास्ता", rice: "चावल", noodle: "नूडल्स", bread: "ब्रेड",
      tortilla: "टॉर्टिला", quinoa: "क्विनोआ", couscous: "कूसकूस", lentil: "दाल",
      bean: "बीन्स", cheese: "चीज़", butter: "मक्खन", milk: "दूध", cream: "क्रीम",
      yogurt: "दही", parmesan: "परमेज़ान", mozzarella: "मोज़ेरेला",
    },
  },
};
