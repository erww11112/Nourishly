// ── 中文（简体） ──────────────────────────────────────────────────────────
// 与 en.js 结构完全一致的键名 —— 采用自然、贴近生活的表达，而非逐字直译，
// 保持 Nourishly 温暖亲切的语气。
export const zh = {
  common: {
    appName: "Nourishly",
    tagline: "全家餐，轻松搞定",
    fields: {
      familySize: "家庭人数",
      familySizePlaceholder: "例如：4",
      allergies: "过敏或饮食限制",
      allergiesPlaceholder: "例如：不吃坚果——或留空",
      cookTime: "平日烹饪时间",
      cookTimePlaceholder: "例如：30分钟",
    },
  },

  // ── 启动画面 ──────────────────────────────────────────────────────────────
  splash: {},

  // ── 语言选择（onboarding 的第一步，仅新用户可见） ──────────────────────
  chooseLanguage: {
    title: "选择你的语言",
    subtitle: "你可以随时在个人资料中更改",
  },

  // ── 欢迎页面（onboarding 之前） ────────────────────────────────────────
  welcome: {
    slide1Title: "不知道该做什么菜？",
    slide1Body: "总是那几道老菜轮流上桌。傍晚六点的手忙脚乱。点了外卖却又不是真正想吃的。是不是很熟悉？",
    slide2Title: "多陪陪孩子，少纠结晚餐吃什么。",
    slide2Body: "不到一分钟，就能为你的家庭规划好一整周的家常晚餐——把心思放在真正重要的事情上。",
    continue: "继续",
    begin: "开始吧",
  },

  // ── Onboarding 问题 ────────────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "一共有几个人吃饭？",
    familySizeSub: "包括你自己和孩子们",
    allergiesTitle: "有没有过敏或特殊饮食需求？",
    allergiesSub: "我们会完全为你避开",
    cookTimeTitle: "平日晚上你有多少时间做饭？",
    cookTimeSub: "我们会按这个时间为你匹配每一道菜",
    continue: "继续",
    almostThere: "就快好了",
    back: "返回",
  },

  // ── 登录 / 注册 ────────────────────────────────────────────────────────
  auth: {
    createAccount: "创建账户",
    signIn: "登录",
    yourName: "你的名字",
    yourNamePlaceholder: "例如：小美",
    email: "邮箱",
    emailPlaceholder: "you@email.com",
    password: "密码",
    forgotPassword: "忘记密码？",
    startPlanning: "开始规划",
    welcomeBack: "欢迎回来",
    pleaseWait: "请稍候……",
    privacyFooter: "你的数据完全私密 · 无需信用卡",
    prefsSavedBanner: "你的偏好设置已保存——只差创建账户了",
    fillAllFields: "请填写所有字段。",
    enterName: "请输入你的名字。",
    signupFailed: "注册失败",
    profileCreateFailed: "无法创建你的个人资料，请重试或联系客服。",
    confirmEmail: "账户已创建——请查收邮件确认，然后登录。",
    invalidCredentials: "邮箱或密码不正确。",
    somethingWrong: "出了点问题。",
  },

  forgotPassword: {
    title: "重置密码",
    subtitle: "输入你的邮箱，我们会发送一个重置链接给你。",
    sentMessage: "请查收邮件，里面有重置密码的链接。",
    sendLink: "发送重置链接",
    sending: "发送中……",
    backToSignIn: "返回登录",
    enterEmail: "请输入你的邮箱。",
    sendFailed: "重置邮件发送失败，请重试。",
  },

  resetPassword: {
    headerSubtitle: "设置你的新密码",
    cardTitle: "选择一个新密码",
    newPassword: "新密码",
    confirmNewPassword: "确认新密码",
    submit: "设置新密码",
    pleaseWait: "请稍候……",
    fillBothFields: "请填写这两个字段。",
    tooShort: "密码长度至少需要6个字符。",
    noMatch: "两次密码不一致。",
    updateFailed: "无法更新你的密码。",
  },

  // ── 底部导航 + 顶部标题 ────────────────────────────────────────────────
  nav: {
    home: "首页",
    thisWeek: "本周",
    shopping: "购物",
    saved: "已保存",
    profile: "我的",
    greeting: "你好，{name}",
    greetingFallback: "朋友",
  },

  // ── 首页 ──────────────────────────────────────────────────────────────
  home: {
    cardTitle: "规划本周餐食",
    cardSubtitle: "崭新一周的晚餐，安排妥当",
    buildButton: "生成我的餐食计划",
    building: "正在生成你的计划……",
    recentPlans: "最近的计划",
    planOf: "{name}的计划",
    yourPlanFallback: "你的计划",
    fillFamilyCookTime: "请填写家庭人数和烹饪时间。",
    freeLimitReached: "你本月的2次免费计划已经用完。升级到 Nourishly Plus 即可无限次生成计划。",
    planSavedButUpdateFailed: "计划已保存，但使用次数未能更新——在修复之前可能会显示错误的次数。",
    planNotSaved: "计划已生成，但未能保存。请尝试重新登录。",
    planNotSavedError: "计划已生成，但未能保存：{error}",
    genericError: "出了点问题：{error}",
  },

  // ── 计划页面（每周餐食计划） ────────────────────────────────────────────
  plan: {
    nutritionTotals: "本周营养总计",
    calLabel: "卡路里",
    proteinLabel: "蛋白质",
    carbsLabel: "碳水",
    fatLabel: "脂肪",
    plusFeatureChip: "完整营养信息见 Plus",
    findingAlternative: "正在寻找替代菜品……",
    generateNewPlan: "生成新计划",
    emptyTitle: "还没有餐食计划",
    emptySubtitle: "去首页规划你的第一周晚餐吧。",
    goToHome: "前往首页",
  },

  // ── 购物页面 ──────────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "购物清单是 Plus 专属功能",
    paywallSubtitle: "升级到 Nourishly Plus，每周自动获得整理好的购物清单。",
    upgradeButton: "升级 —— €7.99/月",
    redirecting: "正在跳转……",
    emptyTitle: "还没有购物清单",
    emptySubtitle: "生成一份餐食计划，清单就会出现在这里。",
    buildPlan: "生成计划",
  },

  // ── 已保存的计划 ──────────────────────────────────────────────────────
  saved: {
    countOne: "{count} 份已保存的计划",
    countOther: "{count} 份已保存的计划",
    mealPlanOf: "{name}的餐食计划",
    yourMealPlanFallback: "你的餐食计划",
    view: "查看",
    moreCount: "还有 {count} 项",
    emptyTitle: "还没有已保存的计划",
    emptySubtitle: "每次生成新计划都会自动保存在这里。",
    createFirst: "创建第一个计划",
  },

  // ── 个人资料页面 ──────────────────────────────────────────────────────
  profile: {
    accountFallback: "你的账户",
    plusActive: "Nourishly Plus —— 无限计划已解锁",
    manageSubscription: "管理订阅",
    redirecting: "正在跳转……",
    freePlan: "免费版",
    plansUsed: "本月已用 {used}/2 次",
    upgradeButton: "升级到 Nourishly Plus —— €7.99/月",
    redirectingCheckout: "正在跳转到付款页面……",
    preferencesTitle: "偏好设置",
    save: "保存偏好设置",
    saving: "保存中……",
    saved: "已保存 ✓",
    savePrefsFailed: "无法保存你的偏好设置，请重试。",
    changePasswordTitle: "修改密码",
    currentPassword: "当前密码",
    updatePassword: "更新密码",
    updating: "更新中……",
    passwordUpdated: "密码已成功更新。",
    passwordUpdateFailed: "无法更新你的密码。",
    currentPasswordWrong: "当前密码不正确。",
    noAccountEmail: "找不到你账户的邮箱。",
    newPasswordTooShort: "新密码长度至少需要6个字符。",
    newPasswordNoMatch: "两次输入的新密码不一致。",
    logout: "退出登录",
    language: "语言",
    languageEnglish: "English",
    languagePortuguese: "Português",
    languageSpanish: "Español",
    languageChinese: "中文",
    languageFrench: "Français",
    languageGerman: "Deutsch",
    languageItalian: "Italiano",
    languageRussian: "Русский",
    portalOpenFailed: "无法打开订阅管理页面，请重试。",
    portalOpenFailedError: "无法打开订阅管理页面：{error}",
    checkoutFailed: "无法开始付款流程，请重试。",
    checkoutFailedError: "无法开始付款流程：{error}",
  },

  // ── 菜品卡片（计划页面中使用） ────────────────────────────────────────
  mealCard: {
    markAsCooked: "标记为已完成",
    howToMakeIt: "制作方法",
  },

  // ── 购物清单 ──────────────────────────────────────────────────────────
  shoppingList: {
    progress: "购物进度",
    categories: {
      proteins: "蛋白质类",
      vegHerbs: "蔬菜和香草",
      grainsPasta: "谷物和面食",
      dairy: "乳制品",
      pantry: "常备食材",
    },
    pantryDefaults: ["橄榄油", "盐和胡椒", "混合香草", "高汤块"],
    vegDefaults: ["什锦沙拉叶", "圣女果", "新鲜香草", "大蒜", "洋葱"],
    grainDefaults: ["米饭", "意面"],
    dairyDefaults: ["黄油", "帕玛森芝士"],
    tipTitle: "先看看家里已经有什么",
    tipBody: "盐、胡椒、橄榄油、大蒜——这些你家里很可能已经有了。",
    // 用于展示的食材标签，对应从（英文）AI 生成的菜名中检测到的关键词——
    // 检测关键词本身保持英文，因为要匹配 Claude 的输出，只有展示文本会被翻译。
    ingredients: {
      chicken: "鸡肉", beef: "牛肉", salmon: "三文鱼", fish: "鱼", lamb: "羊肉",
      pork: "猪肉", shrimp: "虾", tuna: "金枪鱼", turkey: "火鸡肉", tofu: "豆腐", eggs: "鸡蛋",
      tomato: "番茄", spinach: "菠菜", pepper: "彩椒", broccoli: "西兰花",
      carrot: "胡萝卜", onion: "洋葱", garlic: "大蒜", lettuce: "生菜",
      mushroom: "蘑菇", lemon: "柠檬", basil: "罗勒", parsley: "欧芹",
      ginger: "姜", pasta: "意面", rice: "米饭", noodle: "面条", bread: "面包",
      tortilla: "玉米饼", quinoa: "藜麦", couscous: "北非小米", lentil: "扁豆",
      bean: "豆类", cheese: "芝士", butter: "黄油", milk: "牛奶", cream: "奶油",
      yogurt: "酸奶", parmesan: "帕玛森芝士", mozzarella: "马苏里拉芝士",
    },
  },
};
