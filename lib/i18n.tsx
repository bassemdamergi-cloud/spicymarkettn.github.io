import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// --- TRANSLATION DATA ---
const translations = {
  en: {
    general: {
      username: 'Username',
      password: 'Password',
    },
    nav: {
      home: 'Home',
      categories: 'Categories',
      orders: 'Orders',
      account: 'Account',
    },
    header: {
      appNameSpicy: 'Spicy',
      appNameMarket: ' Market Tn',
    },
    signIn: {
      title: 'Log In',
      subtitle: 'Enter your credentials to continue',
      emailPlaceholder: 'E-mail or phone',
      passwordPlaceholder: '••••••••',
      emptyFieldsError: 'Please enter both username and password.',
      authError: 'Error: User not found or password incorrect.',
      logInButton: 'Log In',
      noAccount: "Don't have an account?",
      signUpLink: 'Sign Up',
      adminPanelLink: 'Administrator Panel',
    },
    signUp: {
      title: 'Sign Up',
      subtitle: 'Create a new account',
      confirmPassword: 'Confirm Password',
      emptyFieldsError: 'Please fill in all fields.',
      passwordMismatchError: 'Passwords do not match.',
      userExistsError: 'Username is already taken.',
      successMessage: 'Account created successfully! Redirecting to log in...',
      signUpButton: 'Sign Up',
      hasAccount: 'Already have an account?',
      logInLink: 'Log In',
    },
    home: {
      title: "Today's Deals",
      addToCart: 'Add to Cart',
      productAddedToCart: '{{productName}} added to cart!',
    },
    categories: {
      title: 'Shop by Category',
      navigateTo: 'Navigating to {{categoryName}}',
      categoryNames: {
        electronics: 'Electronics',
        books: 'Books',
        homeAndKitchen: 'Home & Kitchen',
        fashion: 'Fashion',
        toysAndGames: 'Toys & Games',
        beautyAndPersonalCare: 'Beauty & Personal Care',
        sportsAndOutdoors: 'Sports & Outdoors',
        automotive: 'Automotive',
      },
    },
    orders: {
      title: 'My Orders',
      emptyMessage: 'Your order list is empty.',
      emptyHint: 'Products you add to your cart from the Home page will appear here.',
      total: 'Total',
      placeOrder: 'Place Order',
      emptyCartAlert: 'Your cart is empty.',
      orderPlacedAlert: 'Order placed successfully! Order ID: {{orderId}}',
      decreaseQuantity: 'Decrease quantity',
      increaseQuantity: 'Increase quantity',
      deleteOrder: 'Delete order',
    },
    account: {
      title: 'Account',
      disconnect: 'Disconnect',
      disconnectAriaLabel: 'Disconnect and return to log-in page',
      featureNotImplemented: 'Feature "{{featureName}}" is not implemented yet.',
      language: 'Language',
      options: {
        editProfile: 'Edit Profile',
        changePassword: 'Change Password',
        paymentMethods: 'Payment Methods',
        orderHistory: 'Order History',
        notifications: 'Notifications',
        privacySettings: 'Privacy Settings',
      },
    },
    adminVerify: {
      title: 'Administrator Verification',
      subtitle: 'Please enter the verification code to proceed.',
      codeLabel: 'Verification Code',
      incorrectCodeError: 'Incorrect verification code. Please try again.',
      verifyButton: 'Verify',
      backToLogin: 'Back to Log In',
    },
    adminLayout: {
      titleAdmin: 'Admin',
      titlePanel: ' Panel',
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      orderList: 'Order List',
      users: 'Users',
      logOut: 'Log Out',
    },
    adminDashboard: {
      title: 'Dashboard',
      subtitle: "Welcome! Here's a summary of your application.",
      totalProductsTitle: 'Total Products',
      totalProductsDesc: 'Number of items available in the store',
      totalUsersTitle: 'Total Users',
      totalUsersDesc: 'Registered regular and admin users',
      totalOrdersTitle: 'Total Orders',
      totalOrdersDesc: 'Number of completed transactions',
    },
    adminProducts: {
      title: 'Product Management',
      subtitle: 'Add, edit, or remove products from the store.',
      addNewProduct: 'Add New Product',
      productNamePlaceholder: 'Product Name',
      pricePlaceholder: 'Price (e.g., 29.99)',
      imageUrlPlaceholder: 'Image URL',
      addProductButton: 'Add Product',
      tableHeaderImage: 'Image',
      tableHeaderName: 'Name',
      tableHeaderPrice: 'Price',
      tableHeaderActions: 'Actions',
      editButton: 'Edit',
      deleteButton: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this product?',
      editModalTitle: 'Edit Product',
      cancelButton: 'Cancel',
      saveButton: 'Save Changes',
    },
    adminOrders: {
      title: 'Order History',
      subtitle: 'View all completed orders from customers.',
      orderIdLabel: 'Order',
      itemsLabel: 'Items',
      quantityLabel: 'Quantity',
      noOrders: 'No orders have been placed yet.',
    },
    adminList: {
      title: 'Order List',
      subtitle: 'A detailed list of all placed orders.',
      tableHeaderId: 'Order ID',
      tableHeaderDateTime: 'Date & Time',
      tableHeaderTotal: 'Total Price',
      productsInOrder: 'Products in this order:',
      noOrders: 'No orders have been placed yet.',
    },
    adminUsers: {
      title: 'User Management',
      subtitle: 'View and create new users.',
      registeredUsers: 'Registered Users',
      adminBadge: 'Admin',
      noUsersFound: 'No users found in the database.',
      addNewUser: 'Add New User',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      provideCredentialsError: 'Please provide both username and password.',
      userAddedSuccess: 'User added successfully!',
      addUserButton: 'Add User',
    },
  },
  fr: {
    general: {
      username: 'Nom d\'utilisateur',
      password: 'Mot de passe',
    },
    nav: {
      home: 'Accueil',
      categories: 'Catégories',
      orders: 'Commandes',
      account: 'Compte',
    },
    header: {
      appNameSpicy: 'Spicy',
      appNameMarket: ' Market Tn',
    },
    signIn: {
      title: 'Connexion',
      subtitle: 'Entrez vos identifiants pour continuer',
      emailPlaceholder: 'E-mail ou téléphone',
      passwordPlaceholder: '••••••••',
      emptyFieldsError: 'Veuillez saisir le nom d\'utilisateur et le mot de passe.',
      authError: 'Erreur : Utilisateur non trouvé ou mot de passe incorrect.',
      logInButton: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      signUpLink: 'S\'inscrire',
      adminPanelLink: 'Panneau Administrateur',
    },
    signUp: {
      title: 'Inscription',
      subtitle: 'Créer un nouveau compte',
      confirmPassword: 'Confirmer le mot de passe',
      emptyFieldsError: 'Veuillez remplir tous les champs.',
      passwordMismatchError: 'Les mots de passe ne correspondent pas.',
      userExistsError: 'Ce nom d\'utilisateur est déjà pris.',
      successMessage: 'Compte créé avec succès ! Redirection vers la connexion...',
      signUpButton: 'S\'inscrire',
      hasAccount: 'Vous avez déjà un compte ?',
      logInLink: 'Se connecter',
    },
    home: {
      title: 'Offres du jour',
      addToCart: 'Ajouter au panier',
      productAddedToCart: '{{productName}} ajouté au panier !',
    },
    categories: {
      title: 'Acheter par catégorie',
      navigateTo: 'Navigation vers {{categoryName}}',
      categoryNames: {
        electronics: 'Électronique',
        books: 'Livres',
        homeAndKitchen: 'Maison et Cuisine',
        fashion: 'Mode',
        toysAndGames: 'Jouets et Jeux',
        beautyAndPersonalCare: 'Beauté et Soins',
        sportsAndOutdoors: 'Sports et Plein air',
        automotive: 'Automobile',
      },
    },
    orders: {
      title: 'Mes Commandes',
      emptyMessage: 'Votre liste de commandes est vide.',
      emptyHint: 'Les produits que vous ajoutez au panier depuis la page d\'accueil apparaîtront ici.',
      total: 'Total',
      placeOrder: 'Passer la commande',
      emptyCartAlert: 'Votre panier est vide.',
      orderPlacedAlert: 'Commande passée avec succès ! ID de commande : {{orderId}}',
      decreaseQuantity: 'Diminuer la quantité',
      increaseQuantity: 'Augmenter la quantité',
      deleteOrder: 'Supprimer la commande',
    },
    account: {
      title: 'Compte',
      disconnect: 'Déconnexion',
      disconnectAriaLabel: 'Se déconnecter et retourner à la page de connexion',
      featureNotImplemented: 'La fonctionnalité "{{featureName}}" n\'est pas encore implémentée.',
      language: 'Langue',
      options: {
        editProfile: 'Modifier le profil',
        changePassword: 'Changer le mot de passe',
        paymentMethods: 'Moyens de paiement',
        orderHistory: 'Historique des commandes',
        notifications: 'Notifications',
        privacySettings: 'Paramètres de confidentialité',
      },
    },
    adminVerify: {
      title: 'Vérification Administrateur',
      subtitle: 'Veuillez saisir le code de vérification pour continuer.',
      codeLabel: 'Code de vérification',
      incorrectCodeError: 'Code de vérification incorrect. Veuillez réessayer.',
      verifyButton: 'Vérifier',
      backToLogin: 'Retour à la connexion',
    },
    adminLayout: {
      titleAdmin: 'Admin',
      titlePanel: ' Panel',
      dashboard: 'Tableau de bord',
      products: 'Produits',
      orders: 'Commandes',
      orderList: 'Liste des commandes',
      users: 'Utilisateurs',
      logOut: 'Déconnexion',
    },
    adminDashboard: {
      title: 'Tableau de bord',
      subtitle: 'Bienvenue ! Voici un résumé de votre application.',
      totalProductsTitle: 'Total des Produits',
      totalProductsDesc: 'Nombre d\'articles disponibles dans la boutique',
      totalUsersTitle: 'Total des Utilisateurs',
      totalUsersDesc: 'Utilisateurs réguliers et administrateurs inscrits',
      totalOrdersTitle: 'Total des Commandes',
      totalOrdersDesc: 'Nombre de transactions terminées',
    },
    adminProducts: {
      title: 'Gestion des Produits',
      subtitle: 'Ajoutez, modifiez ou supprimez des produits de la boutique.',
      addNewProduct: 'Ajouter un nouveau produit',
      productNamePlaceholder: 'Nom du produit',
      pricePlaceholder: 'Prix (ex: 29.99)',
      imageUrlPlaceholder: 'URL de l\'image',
      addProductButton: 'Ajouter le produit',
      tableHeaderImage: 'Image',
      tableHeaderName: 'Nom',
      tableHeaderPrice: 'Prix',
      tableHeaderActions: 'Actions',
      editButton: 'Modifier',
      deleteButton: 'Supprimer',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      editModalTitle: 'Modifier le produit',
      cancelButton: 'Annuler',
      saveButton: 'Enregistrer',
    },
    adminOrders: {
      title: 'Historique des Commandes',
      subtitle: 'Voir toutes les commandes terminées des clients.',
      orderIdLabel: 'Commande',
      itemsLabel: 'Articles',
      quantityLabel: 'Quantité',
      noOrders: 'Aucune commande n\'a encore été passée.',
    },
    adminList: {
      title: 'Liste des Commandes',
      subtitle: 'Une liste détaillée de toutes les commandes passées.',
      tableHeaderId: 'ID Commande',
      tableHeaderDateTime: 'Date et Heure',
      tableHeaderTotal: 'Prix Total',
      productsInOrder: 'Produits dans cette commande :',
      noOrders: 'Aucune commande n\'a encore été passée.',
    },
    adminUsers: {
      title: 'Gestion des Utilisateurs',
      subtitle: 'Voir et créer de nouveaux utilisateurs.',
      registeredUsers: 'Utilisateurs enregistrés',
      adminBadge: 'Admin',
      noUsersFound: 'Aucun utilisateur trouvé dans la base de données.',
      addNewUser: 'Ajouter un nouvel utilisateur',
      usernamePlaceholder: 'Saisir le nom d\'utilisateur',
      passwordPlaceholder: 'Saisir le mot de passe',
      provideCredentialsError: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.',
      userAddedSuccess: 'Utilisateur ajouté avec succès !',
      addUserButton: 'Ajouter l\'utilisateur',
    },
  },
  ar: {
    general: {
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
    },
    nav: {
      home: 'الرئيسية',
      categories: 'الفئات',
      orders: 'الطلبات',
      account: 'الحساب',
    },
    header: {
      appNameSpicy: 'سبايسي',
      appNameMarket: ' ماركت تونس',
    },
    signIn: {
      title: 'تسجيل الدخول',
      subtitle: 'أدخل بياناتك للمتابعة',
      emailPlaceholder: 'البريد الإلكتروني أو الهاتف',
      passwordPlaceholder: '••••••••',
      emptyFieldsError: 'الرجاء إدخال اسم المستخدم وكلمة المرور.',
      authError: 'خطأ: المستخدم غير موجود أو كلمة المرور غير صحيحة.',
      logInButton: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signUpLink: 'إنشاء حساب',
      adminPanelLink: 'لوحة تحكم المسؤول',
    },
    signUp: {
      title: 'إنشاء حساب',
      subtitle: 'إنشاء حساب جديد',
      confirmPassword: 'تأكيد كلمة المرور',
      emptyFieldsError: 'الرجاء ملء جميع الحقول.',
      passwordMismatchError: 'كلمتا المرور غير متطابقتين.',
      userExistsError: 'اسم المستخدم هذا مستخدم بالفعل.',
      successMessage: 'تم إنشاء الحساب بنجاح! جاري إعادة توجيهك لتسجيل الدخول...',
      signUpButton: 'إنشاء حساب',
      hasAccount: 'هل لديك حساب بالفعل؟',
      logInLink: 'تسجيل الدخول',
    },
    home: {
      title: 'عروض اليوم',
      addToCart: 'أضف إلى السلة',
      productAddedToCart: 'تمت إضافة {{productName}} إلى السلة!',
    },
    categories: {
      title: 'تسوق حسب الفئة',
      navigateTo: 'الانتقال إلى {{categoryName}}',
      categoryNames: {
        electronics: 'إلكترونيات',
        books: 'كتب',
        homeAndKitchen: 'المنزل والمطبخ',
        fashion: 'أزياء',
        toysAndGames: 'ألعاب وهوايات',
        beautyAndPersonalCare: 'الجمال والعناية الشخصية',
        sportsAndOutdoors: 'الرياضة والأنشطة الخارجية',
        automotive: 'سيارات',
      },
    },
    orders: {
      title: 'طلباتي',
      emptyMessage: 'قائمة طلباتك فارغة.',
      emptyHint: 'المنتجات التي تضيفها إلى سلتك من الصفحة الرئيسية ستظهر هنا.',
      total: 'المجموع',
      placeOrder: 'إتمام الطلب',
      emptyCartAlert: 'سلة التسوق الخاصة بك فارغة.',
      orderPlacedAlert: 'تم تقديم الطلب بنجاح! رقم الطلب: {{orderId}}',
      decreaseQuantity: 'تقليل الكمية',
      increaseQuantity: 'زيادة الكمية',
      deleteOrder: 'حذف الطلب',
    },
    account: {
      title: 'الحساب',
      disconnect: 'تسجيل الخروج',
      disconnectAriaLabel: 'تسجيل الخروج والعودة إلى صفحة الدخول',
      featureNotImplemented: 'الميزة "{{featureName}}" لم يتم تنفيذها بعد.',
      language: 'اللغة',
      options: {
        editProfile: 'تعديل الملف الشخصي',
        changePassword: 'تغيير كلمة المرور',
        paymentMethods: 'طرق الدفع',
        orderHistory: 'سجل الطلبات',
        notifications: 'الإشعارات',
        privacySettings: 'إعدادات الخصوصية',
      },
    },
    adminVerify: {
      title: 'تحقق المسؤول',
      subtitle: 'الرجاء إدخال رمز التحقق للمتابعة.',
      codeLabel: 'رمز التحقق',
      incorrectCodeError: 'رمز التحقق غير صحيح. الرجاء المحاولة مرة أخرى.',
      verifyButton: 'تحقق',
      backToLogin: 'العودة لتسجيل الدخول',
    },
    adminLayout: {
      titleAdmin: 'لوحة',
      titlePanel: ' التحكم',
      dashboard: 'لوحة المعلومات',
      products: 'المنتجات',
      orders: 'الطلبات',
      orderList: 'قائمة الطلبات',
      users: 'المستخدمون',
      logOut: 'تسجيل الخروج',
    },
    adminDashboard: {
      title: 'لوحة المعلومات',
      subtitle: 'أهلاً بك! إليك ملخص لتطبيقك.',
      totalProductsTitle: 'إجمالي المنتجات',
      totalProductsDesc: 'عدد العناصر المتوفرة في المتجر',
      totalUsersTitle: 'إجمالي المستخدمين',
      totalUsersDesc: 'المستخدمون العاديون والمسؤولون المسجلون',
      totalOrdersTitle: 'إجمالي الطلبات',
      totalOrdersDesc: 'عدد المعاملات المكتملة',
    },
    adminProducts: {
      title: 'إدارة المنتجات',
      subtitle: 'إضافة أو تعديل أو إزالة المنتجات من المتجر.',
      addNewProduct: 'إضافة منتج جديد',
      productNamePlaceholder: 'اسم المنتج',
      pricePlaceholder: 'السعر (مثال: 29.99)',
      imageUrlPlaceholder: 'رابط الصورة',
      addProductButton: 'إضافة المنتج',
      tableHeaderImage: 'صورة',
      tableHeaderName: 'الاسم',
      tableHeaderPrice: 'السعر',
      tableHeaderActions: 'الإجراءات',
      editButton: 'تعديل',
      deleteButton: 'حذف',
      deleteConfirm: 'هل أنت متأكد أنك تريد حذف هذا المنتج؟',
      editModalTitle: 'تعديل المنتج',
      cancelButton: 'إلغاء',
      saveButton: 'حفظ التغييرات',
    },
    adminOrders: {
      title: 'سجل الطلبات',
      subtitle: 'عرض جميع الطلبات المكتملة من العملاء.',
      orderIdLabel: 'طلب رقم',
      itemsLabel: 'العناصر',
      quantityLabel: 'الكمية',
      noOrders: 'لم يتم تقديم أي طلبات بعد.',
    },
    adminList: {
      title: 'قائمة الطلبات',
      subtitle: 'قائمة مفصلة بجميع الطلبات المقدمة.',
      tableHeaderId: 'رقم الطلب',
      tableHeaderDateTime: 'التاريخ والوقت',
      tableHeaderTotal: 'السعر الإجمالي',
      productsInOrder: 'المنتجات في هذا الطلب:',
      noOrders: 'لم يتم تقديم أي طلبات بعد.',
    },
    adminUsers: {
      title: 'إدارة المستخدمين',
      subtitle: 'عرض وإنشاء مستخدمين جدد.',
      registeredUsers: 'المستخدمون المسجلون',
      adminBadge: 'مسؤول',
      noUsersFound: 'لم يتم العثور على مستخدمين في قاعدة البيانات.',
      addNewUser: 'إضافة مستخدم جديد',
      usernamePlaceholder: 'أدخل اسم المستخدم',
      passwordPlaceholder: 'أدخل كلمة المرور',
      provideCredentialsError: 'الرجاء تقديم اسم مستخدم وكلمة مرور.',
      userAddedSuccess: 'تمت إضافة المستخدم بنجاح!',
      addUserButton: 'إضافة مستخدم',
    },
  },
};


// --- TYPES ---
type Language = 'en' | 'fr' | 'ar';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}

// --- CONTEXT ---
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// --- PROVIDER ---
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang && ['en', 'fr', 'ar'].includes(storedLang)) {
        return storedLang as Language;
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  const setLanguage = (lang: Language) => {
      setLanguageState(lang);
  };

  const t = useCallback((key: string, options?: Record<string, string | number>): string => {
    const langTranslations = translations[language];
    let text = key.split('.').reduce((obj: any, k: string) => obj?.[k], langTranslations);

    if (typeof text !== 'string') {
      console.warn(`Translation key "${key}" not found for language "${language}".`);
      // Fallback to English
      const enTranslations = translations.en;
      text = key.split('.').reduce((obj: any, k: string) => obj?.[k], enTranslations);
      if (typeof text !== 'string') {
        return key; // Return the key if not found in English either
      }
    }
    
    if (options) {
      Object.keys(options).forEach(optKey => {
        const regex = new RegExp(`{{${optKey}}}`, 'g');
        text = text.replace(regex, String(options[optKey]));
      });
    }

    return text;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// --- HOOK ---
export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
