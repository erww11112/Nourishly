// ── Português (Portugal) ────────────────────────────────────────────────────
// Mesma estrutura de chaves que en.js — traduzido de forma natural, não à
// letra, mantendo o tom caloroso e próximo da Nourishly.
export const pt = {
  common: {
    appName: "Nourishly",
    tagline: "Refeições em família, sem complicações",
    fields: {
      familySize: "Número de pessoas",
      familySizePlaceholder: "ex: 4",
      allergies: "Alergias ou restrições",
      allergiesPlaceholder: "ex: sem frutos secos — ou deixa em branco",
      cookTime: "Tempo de cozinha ao fim do dia",
      cookTimePlaceholder: "ex: 30 minutos",
    },
  },

  // ── Ecrã inicial (splash) ────────────────────────────────────────────────
  splash: {},

  // ── Slides de boas-vindas (antes do onboarding) ─────────────────────────
  welcome: {
    slide1Title: "Cansado de não saber o que cozinhar?",
    slide1Body: "As mesmas cinco refeições sempre a repetir. O pânico às 18h. A comida para fora que nem apetecia. Soa familiar?",
    slide2Title: "Mais tempo com os teus filhos. Menos tempo a pensar no jantar.",
    slide2Body: "Uma semana inteira de jantares caseiros, planeados para a tua família em menos de um minuto — para te focares no que realmente importa.",
    continue: "Continuar",
    begin: "Vamos começar",
  },

  // ── Perguntas do onboarding ──────────────────────────────────────────────
  onboarding: {
    familySizeTitle: "Quantas pessoas vão comer?",
    familySizeSub: "Incluindo-te a ti e aos teus filhos",
    allergiesTitle: "Alguma alergia ou necessidade alimentar?",
    allergiesSub: "Vamos ter tudo isso em conta",
    cookTimeTitle: "Quanto tempo tens para cozinhar num dia de semana?",
    cookTimeSub: "Vamos ajustar todas as receitas a esse tempo",
    continue: "Continuar",
    almostThere: "Quase lá",
    back: "Voltar",
  },

  // ── Autenticação (criar conta / iniciar sessão) ─────────────────────────
  auth: {
    createAccount: "Criar conta",
    signIn: "Iniciar sessão",
    yourName: "O teu nome",
    yourNamePlaceholder: "ex: Maria",
    email: "Email",
    emailPlaceholder: "tu@email.com",
    password: "Palavra-passe",
    forgotPassword: "Esqueceste-te da palavra-passe?",
    startPlanning: "Começar a planear",
    welcomeBack: "Bem-vindo de volta",
    pleaseWait: "Só um momento...",
    privacyFooter: "Os teus dados são privados · Sem cartão de crédito",
    prefsSavedBanner: "As tuas preferências já estão guardadas — falta só criar a conta",
    fillAllFields: "Preenche todos os campos, por favor.",
    enterName: "Indica o teu nome, por favor.",
    signupFailed: "Não foi possível criar a conta",
    profileCreateFailed: "Não foi possível criar o teu perfil. Tenta novamente ou contacta o apoio ao cliente.",
    confirmEmail: "Conta criada — confirma o teu email e depois inicia sessão.",
    invalidCredentials: "Email ou palavra-passe incorretos.",
    somethingWrong: "Algo correu mal.",
  },

  forgotPassword: {
    title: "Repor a palavra-passe",
    subtitle: "Indica o teu email e enviamos-te um link para a repores.",
    sentMessage: "Verifica o teu email — enviámos-te um link para repores a palavra-passe.",
    sendLink: "Enviar link de reposição",
    sending: "A enviar...",
    backToSignIn: "Voltar a iniciar sessão",
    enterEmail: "Indica o teu email, por favor.",
    sendFailed: "Não foi possível enviar o email de reposição. Tenta novamente.",
  },

  resetPassword: {
    headerSubtitle: "Define a tua nova palavra-passe",
    cardTitle: "Escolhe uma nova palavra-passe",
    newPassword: "Nova palavra-passe",
    confirmNewPassword: "Confirma a nova palavra-passe",
    submit: "Definir nova palavra-passe",
    pleaseWait: "Só um momento...",
    fillBothFields: "Preenche os dois campos, por favor.",
    tooShort: "A palavra-passe deve ter pelo menos 6 caracteres.",
    noMatch: "As palavras-passe não coincidem.",
    updateFailed: "Não foi possível atualizar a tua palavra-passe.",
  },

  // ── Navegação inferior + cabeçalho ──────────────────────────────────────
  nav: {
    home: "Início",
    thisWeek: "Esta semana",
    shopping: "Compras",
    saved: "Guardados",
    profile: "Perfil",
    greeting: "Olá {name}",
    greetingFallback: "por aí",
  },

  // ── Separador Início ──────────────────────────────────────────────────────
  home: {
    cardTitle: "Planear esta semana",
    cardSubtitle: "Uma semana de jantares, toda organizada",
    buildButton: "Criar o meu plano de refeições",
    building: "A criar o teu plano...",
    recentPlans: "Planos recentes",
    planOf: "Plano de {name}",
    yourPlanFallback: "O teu plano",
    fillFamilyCookTime: "Preenche o número de pessoas e o tempo de cozinha, por favor.",
    freeLimitReached: "Já usaste os teus 2 planos gratuitos este mês. Passa ao Nourishly Plus para planos ilimitados.",
    planSavedButUpdateFailed: "O plano foi guardado, mas não foi possível atualizar o número de utilizações — pode aparecer errado até isto ser corrigido.",
    planNotSaved: "O plano foi criado mas não foi possível guardá-lo. Tenta iniciar sessão novamente.",
    planNotSavedError: "O plano foi criado mas não foi possível guardá-lo: {error}",
    genericError: "Algo correu mal: {error}",
  },

  // ── Separador Plano (plano semanal) ──────────────────────────────────────
  plan: {
    nutritionTotals: "Totais nutricionais da semana",
    calLabel: "Cal",
    proteinLabel: "Proteína",
    carbsLabel: "Hidratos",
    fatLabel: "Gordura",
    plusFeatureChip: "Nutrição completa no Plus",
    findingAlternative: "A procurar alternativa...",
    generateNewPlan: "Criar um novo plano",
    emptyTitle: "Ainda não tens nenhum plano",
    emptySubtitle: "Vai a Início e cria a tua primeira semana de jantares.",
    goToHome: "Ir para o Início",
  },

  // ── Separador Compras ─────────────────────────────────────────────────────
  shopping: {
    paywallTitle: "As listas de compras são uma funcionalidade Plus",
    paywallSubtitle: "Passa ao Nourishly Plus para teres uma lista de compras automática e organizada todas as semanas.",
    upgradeButton: "Subscrever — 7,99€/mês",
    redirecting: "A redirecionar...",
    emptyTitle: "Ainda não tens lista de compras",
    emptySubtitle: "Cria um plano de refeições e a tua lista aparece aqui.",
    buildPlan: "Criar um plano",
  },

  // ── Separador Guardados ──────────────────────────────────────────────────
  saved: {
    countOne: "{count} plano guardado",
    countOther: "{count} planos guardados",
    mealPlanOf: "Plano de refeições de {name}",
    yourMealPlanFallback: "O teu plano de refeições",
    view: "Ver",
    moreCount: "+{count} mais",
    emptyTitle: "Ainda não tens planos guardados",
    emptySubtitle: "Os teus planos ficam guardados automaticamente sempre que criares um.",
    createFirst: "Criar o primeiro plano",
  },

  // ── Separador Perfil ──────────────────────────────────────────────────────
  profile: {
    accountFallback: "A tua conta",
    plusActive: "Nourishly Plus — planos ilimitados ativos",
    manageSubscription: "Gerir subscrição",
    redirecting: "A redirecionar...",
    freePlan: "Plano gratuito",
    plansUsed: "{used}/2 planos usados este mês",
    upgradeButton: "Passar ao Nourishly Plus — 7,99€/mês",
    redirectingCheckout: "A redirecionar para o pagamento...",
    preferencesTitle: "Preferências",
    save: "Guardar preferências",
    saving: "A guardar...",
    saved: "Guardado ✓",
    savePrefsFailed: "Não foi possível guardar as tuas preferências. Tenta novamente.",
    changePasswordTitle: "Alterar palavra-passe",
    currentPassword: "Palavra-passe atual",
    updatePassword: "Atualizar palavra-passe",
    updating: "A atualizar...",
    passwordUpdated: "Palavra-passe atualizada com sucesso.",
    passwordUpdateFailed: "Não foi possível atualizar a tua palavra-passe.",
    currentPasswordWrong: "A palavra-passe atual está incorreta.",
    noAccountEmail: "Não foi possível encontrar o email da tua conta.",
    newPasswordTooShort: "A nova palavra-passe deve ter pelo menos 6 caracteres.",
    newPasswordNoMatch: "As novas palavras-passe não coincidem.",
    logout: "Terminar sessão",
    language: "Idioma",
    languageEnglish: "English",
    languagePortuguese: "Português",
    languageSpanish: "Español",
    portalOpenFailed: "Não foi possível abrir o portal de subscrição. Tenta novamente.",
    portalOpenFailedError: "Não foi possível abrir o portal de subscrição: {error}",
    checkoutFailed: "Não foi possível iniciar o pagamento. Tenta novamente.",
    checkoutFailedError: "Não foi possível iniciar o pagamento: {error}",
  },

  // ── Cartão de refeição (separador Plano) ─────────────────────────────────
  mealCard: {
    markAsCooked: "Marcar como feito",
    howToMakeIt: "Como preparar",
  },

  // ── Lista de compras ──────────────────────────────────────────────────────
  shoppingList: {
    progress: "Progresso das compras",
    categories: {
      proteins: "Proteínas",
      vegHerbs: "Legumes e ervas",
      grainsPasta: "Cereais e massa",
      dairy: "Laticínios",
      pantry: "Despensa",
    },
    pantryDefaults: ["Azeite", "Sal e pimenta", "Ervas aromáticas", "Cubos de caldo"],
    vegDefaults: ["Salada variada", "Tomate cherry", "Ervas frescas", "Alho", "Cebolas"],
    grainDefaults: ["Arroz", "Massa"],
    dairyDefaults: ["Manteiga", "Queijo parmesão"],
    tipTitle: "Vê primeiro o que já tens em casa",
    tipBody: "Sal, pimenta, azeite, alho — o mais provável é já teres isto na despensa.",
    // Rótulos para os ingredientes detetados nos nomes das refeições (gerados
    // em inglês pela IA) — a deteção mantém-se em inglês, só o texto mostrado
    // é traduzido.
    ingredients: {
      chicken: "Frango", beef: "Carne de vaca", salmon: "Salmão", fish: "Peixe", lamb: "Borrego",
      pork: "Porco", shrimp: "Camarão", tuna: "Atum", turkey: "Peru", tofu: "Tofu",
      tomato: "Tomate", spinach: "Espinafres", pepper: "Pimento", broccoli: "Brócolos",
      carrot: "Cenoura", onion: "Cebola", garlic: "Alho", lettuce: "Alface",
      mushroom: "Cogumelos", lemon: "Limão", basil: "Manjericão", parsley: "Salsa",
      ginger: "Gengibre", pasta: "Massa", rice: "Arroz", noodle: "Noodles", bread: "Pão",
      tortilla: "Tortilha", quinoa: "Quinoa", couscous: "Cuscuz", lentil: "Lentilhas",
      bean: "Feijão", cheese: "Queijo", butter: "Manteiga", milk: "Leite", cream: "Natas",
      yogurt: "Iogurte", parmesan: "Parmesão", mozzarella: "Mozarela",
    },
  },
};
