"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
];

export const translations = {
  en: {
    navigation: {
      buy: "Buy",
      rent: "Rent",
      projects: "Projects",
      teams: "Teams",
      areas: "Areas",
      services: "Services",
      blogs: "Blogs",
      more: "More"
    },
    services: {
      propertyManagement: "Property Management",
      listYourProperty: "List Your Property",
      mortgages: "Mortgages",
      conveyancing: "Conveyancing",
      shortTermRentals: "Short Term Rentals",
      propertySnagging: "Property Snagging",
      partnerProgram: "Partner Program"
    },
    hero: {
      title: "Luxury Living",
      subtitle: "Reimagined",
      description: "EMBRACE A JOURNEY OF PURE SOPHISTICATION"
    },
    search: {
      location: "Location",
      type: "Type",
      bedrooms: "Bedrooms"
    },
    featured: {
      title: "FEATURED PROJECTS",
      headline: "Luxury Unveiled, Comfort and Sophistication",
      description: "Discover a curated selection of Dubai's most exquisite properties, epitomizing luxury, elegance, and unparalleled design.",
      viewAll: "View All Projects"
    },
    communities: {
      title: "COMMUNITIES",
      headline: "Discover Dubai's Finest",
      description: "Explore the diverse tapestry of Dubai's most sought-after areas and communities. From serene waterfront retreats to bustling urban hubs, our curated selection showcases the essence of luxury living in each locale."
    },
    partners: {
      title: "Partners with Dubai's leading developers"
    },
    solutions: {
      headline: {
        part1: "Dubai real estate solutions",
        part2: "focused around",
        part3: "excellent customer service"
      },
      connect: {
        title: "Connect with a Specialist",
        description: "Access our dedicated team of over 400+ expert agents ready to assist you."
      },
      list: {
        title: "List Your Property",
        description: "Achieve optimal value by listing your property with our expert marketing strategies."
      },
      download: {
        title: "Download Report",
        description: "Download the latest Comprehensive Dubai Real Estate Market Report Q1 2025"
      },
      explore: {
        title: "Explore Dubai Projects",
        description: "Browse and find your ideal property from our extensive portfolio of Dubai projects."
      }
    },
    footer: {
      newsletter: {
        title: "Stay Connected with",
        subtitle: "Luxury",
        description: "Receive our exceptional real estate listings and exclusive market insights delivered straight to your inbox.",
        placeholder: "Enter your email address",
        button: "Subscribe"
      },
      sitemap: "Sitemap",
      contact: "Contact",
      followUs: "Follow Us",
      aboutUs: "About Us",
      description: "Dubai's premier luxury real estate destination, connecting discerning clients with exceptional properties.",
      companyName: "Rafaz",
      companySlogan: "Real Estate",
      tagline: "Dubai's NO 1 Luxury Real Estate"
    },
    property: {
      title: "FEATURED PROPERTIES",
      headline: "Handpicked Luxury Listings in Dubai",
      description: "Step into a realm of unparalleled sophistication with our featured properties. Explore these exclusive gems and envision your next luxurious retreat with Rafaz Real Estate.",
      viewAll: "VIEW ALL PROPERTIES"
    },
    blog: {
      title: "INSIGHTS & INSPIRATION",
      headline: "Unveiling Dubai's Luxurious Real Estate Landscape",
      description: "Dive into our curated collection of articles, designed to enlighten, inspire, and guide you through Dubai's dynamic real estate market.",
      viewAll: "VIEW ALL BLOGS"
    },
    callToAction: {
      subtitle: "JOIN THE ELITE",
      title: "Elevate Your Real Estate Journey",
      description: "Ready to embark on a luxurious real estate experience tailored just for you? Take the first step towards unparalleled living.",
      button: "CONTACT US"
    },
    map: {
      title: "Explore Our",
      subtitle: "Featured Projects",
      description: "Discover luxury properties across Dubai's most prestigious locations",
      loading: "Loading Map...",
      properties: "Luxury Properties",
      loadInteractive: "Load Interactive Map",
      stats: {
        properties: "Properties",
        communities: "Communities",
        yearsExperience: "Years Experience",
        happyClients: "Happy Clients"
      }
    },
    team: {
      title: "Our",
      titleHighlight: "Luxury",
      titleSuffix: "Team",
      subtitle: "Meet the exceptional professionals who make luxury real estate dreams come true",
      location: "in Dubai",
      meetExperts: "Meet Our",
      meetExpertsHighlight: "Experts",
      expertsDescription: "Dedicated professionals committed to delivering exceptional real estate experiences",
      loading: "Loading our luxury team...",
      yearsExp: "Years Exp",
      specialties: "Specialties",
      ctaTitle: "Ready to Start Your",
      ctaTitleHighlight: "Luxury Journey",
      ctaTitleSuffix: "?",
      ctaDescription: "Connect with our expert team and discover the perfect property that matches your dreams",
      getInTouch: "Get In Touch",
      browseProperties: "Browse Properties",
      about: "About",
      experience: "Experience",
      nationality: "Nationality",
      verification: "Verification",
      verified: "✓ KYC Verified",
      languages: "Languages",
      specialtiesModal: "Specialties",
      whatsapp: "WhatsApp",
      call: "Call",
      email: "Email"
    },
    legal: {
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      cookiePolicy: "Cookie Policy",
      disclaimer: "Disclaimer"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      clear: "Clear",
      viewMore: "View More",
      learnMore: "Learn More",
      getStarted: "Get Started",
      contactUs: "Contact Us"
    }
  },
  ar: {
    navigation: {
      buy: "شراء",
      rent: "إيجار",
      projects: "المشاريع",
      teams: "الفرق",
      areas: "المناطق",
      services: "الخدمات",
      blogs: "المدونات",
      more: "المزيد"
    },
    services: {
      propertyManagement: "إدارة العقارات",
      listYourProperty: "أدرج عقارك",
      mortgages: "الرهون العقارية",
      conveyancing: "التوثيق القانوني",
      shortTermRentals: "الإيجار قصير المدى",
      propertySnagging: "فحص العقارات",
      partnerProgram: "برنامج الشراكة"
    },
    hero: {
      title: "العيش الفاخر",
      subtitle: "مُعاد تصوره",
      description: "اختبر رحلة من الأناقة الخالصة"
    },
    search: {
      location: "الموقع",
      type: "النوع",
      bedrooms: "الغرف"
    },
    featured: {
      title: "المشاريع المميزة",
      headline: "الفخامة مكشوفة، الراحة والأناقة",
      description: "اكتشف مجموعة مختارة من أكثر العقارات روعة في دبي، تجسد الفخامة والأناقة والتصميم الذي لا مثيل له.",
      viewAll: "عرض جميع المشاريع"
    },
    communities: {
      title: "المجتمعات",
      headline: "اكتشف أجود ما في دبي",
      description: "استكشف النسيج المتنوع لأكثر المناطق والمجتمعات طلباً في دبي. من ملاذات الواجهة البحرية الهادئة إلى المراكز الحضرية النابضة بالحياة، مجموعتنا المختارة تعرض جوهر العيش الفاخر في كل مكان."
    },
    partners: {
      title: "شركاء مع مطوري دبي الرائدين"
    },
    solutions: {
      headline: {
        part1: "حلول العقارات في دبي",
        part2: "تركز حول",
        part3: "خدمة عملاء ممتازة"
      },
      connect: {
        title: "تواصل مع خبير",
        description: "الوصول إلى فريقنا المخصص من أكثر من 400+ وكيل خبير جاهز لمساعدتك."
      },
      list: {
        title: "أدرج عقارك",
        description: "تحقق من القيمة المثلى من خلال إدراج عقارك مع استراتيجيات التسويق المتخصصة لدينا."
      },
      download: {
        title: "تحميل التقرير",
        description: "تحميل أحدث تقرير شامل لسوق العقارات في دبي للربع الأول 2025"
      },
      explore: {
        title: "استكشف مشاريع دبي",
        description: "تصفح وابحث عن عقارك المثالي من محفظتنا الواسعة من مشاريع دبي."
      }
    },
    footer: {
      newsletter: {
        title: "ابق على تواصل مع",
        subtitle: "الفخامة",
        description: "احصل على قوائم العقارات الاستثنائية ورؤى السوق الحصرية مباشرة في صندوق الوارد الخاص بك.",
        placeholder: "أدخل عنوان بريدك الإلكتروني",
        button: "اشتراك"
      },
      sitemap: "خريطة الموقع",
      contact: "اتصل بنا",
      followUs: "تابعنا",
      aboutUs: "معلومات عنا",
      description: "وجهة العقارات الفاخرة الرائدة في دبي، تربط العملاء المميزين بعقارات استثنائية.",
      companyName: "ذا أفينيو",
      companySlogan: "العقارات",
      tagline: "أفضل عقارات فاخرة في دبي"
    },
    property: {
      title: "العقارات المميزة",
      headline: "قائمة العقارات الفاخرة المختارة بعناية في دبي",
      description: "ادخل إلى عالم من الأناقة التي لا مثيل لها مع عقاراتنا المميزة. استكشف هذه الجواهر الحصرية وتخيل ملاذك الفاخر التالي مع ذا أفينيو العقارية.",
      viewAll: "عرض جميع العقارات"
    },
    blog: {
      title: "الرؤى والإلهام",
      headline: "كشف المشهد العقاري الفاخر في دبي",
      description: "اغمر نفسك في مجموعتنا المنتقاة من المقالات، المصممة لإلهامك وإرشادك من خلال السوق العقاري الديناميكي في دبي.",
      viewAll: "عرض جميع المدونات"
    },
    callToAction: {
      subtitle: "انضم إلى النخبة",
      title: "ارتق برحلتك العقارية",
      description: "هل أنت مستعد للانطلاق في تجربة عقارية فاخرة مصممة خصيصاً لك؟ اتخذ الخطوة الأولى نحو عيش لا مثيل له.",
      button: "اتصل بنا"
    },
    map: {
      title: "استكشف",
      subtitle: "مشاريعنا المميزة",
      description: "اكتشف العقارات الفاخرة في أكثر المواقع المرموقة في دبي",
      loading: "جارٍ تحميل الخريطة...",
      properties: "عقارات فاخرة",
      loadInteractive: "تحميل الخريطة التفاعلية",
      stats: {
        properties: "العقارات",
        communities: "المجتمعات",
        yearsExperience: "سنوات من الخبرة",
        happyClients: "عملاء سعداء"
      }
    },
    team: {
      title: "فريقنا",
      titleHighlight: "الفاخر",
      titleSuffix: "",
      subtitle: "تعرف على المحترفين الاستثنائيين الذين يحققون أحلام العقارات الفاخرة",
      location: "في دبي",
      meetExperts: "تعرف على",
      meetExpertsHighlight: "خبرائنا",
      expertsDescription: "محترفون مخصصون ملتزمون بتقديم تجارب عقارية استثنائية",
      loading: "جارٍ تحميل فريقنا الفاخر...",
      yearsExp: "سنوات خبرة",
      specialties: "التخصصات",
      ctaTitle: "هل أنت مستعد لبدء",
      ctaTitleHighlight: "رحلتك الفاخرة",
      ctaTitleSuffix: "؟",
      ctaDescription: "تواصل مع فريقنا الخبير واكتشف العقار المثالي الذي يطابق أحلامك",
      getInTouch: "تواصل معنا",
      browseProperties: "تصفح العقارات",
      about: "حول",
      experience: "الخبرة",
      nationality: "الجنسية",
      verification: "التحقق",
      verified: "✓ تم التحقق من KYC",
      languages: "اللغات",
      specialtiesModal: "التخصصات",
      whatsapp: "واتساب",
      call: "اتصال",
      email: "بريد إلكتروني"
    },
    legal: {
      privacyPolicy: "سياسة الخصوصية",
      termsConditions: "الشروط والأحكام",
      cookiePolicy: "سياسة ملفات تعريف الارتباط",
      disclaimer: "إخلاء المسؤولية"
    },
    common: {
      loading: "جارٍ التحميل...",
      error: "خطأ",
      success: "نجح",
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      clear: "مسح",
      viewMore: "عرض المزيد",
      learnMore: "اعرف المزيد",
      getStarted: "ابدأ الآن",
      contactUs: "اتصل بنا"
    }
  },
  fr: {
    navigation: {
      buy: "Acheter",
      rent: "Louer",
      projects: "Projets",
      teams: "Équipes",
      areas: "Zones",
      services: "Services",
      blogs: "Blogs",
      more: "Plus"
    },
    services: {
      propertyManagement: "Gestion Immobilière",
      listYourProperty: "Listez Votre Propriété",
      mortgages: "Hypothèques",
      conveyancing: "Notarisation",
      shortTermRentals: "Locations Court Terme",
      propertySnagging: "Inspection Immobilière",
      partnerProgram: "Programme Partenaire"
    },
    hero: {
      title: "Vie de Luxe",
      subtitle: "Réinventée",
      description: "EMBRASSEZ UN VOYAGE DE SOPHISTICATION PURE"
    },
    search: {
      location: "Emplacement",
      type: "Type",
      bedrooms: "Chambres"
    },
    featured: {
      title: "PROJETS EN VEDETTE",
      headline: "Luxe Dévoilé, Confort et Sophistication",
      description: "Découvrez une sélection curée des propriétés les plus exquises de Dubaï, incarnant le luxe, l'élégance et un design incomparable.",
      viewAll: "Voir Tous les Projets"
    },
    communities: {
      title: "COMMUNAUTÉS",
      headline: "Découvrez le Meilleur de Dubaï",
      description: "Explorez la tapisserie diverse des zones et communautés les plus recherchées de Dubaï. Des retraites tranquilles au bord de l'eau aux centres urbains animés, notre sélection curée met en valeur l'essence de la vie de luxe dans chaque lieu."
    },
    footer: {
      newsletter: {
        title: "Restez Connecté avec",
        subtitle: "le Luxe",
        description: "Recevez nos annonces immobilières exceptionnelles et nos informations exclusives sur le marché directement dans votre boîte de réception.",
        placeholder: "Entrez votre adresse e-mail",
        button: "S'abonner"
      },
      sitemap: "Plan du Site",
      contact: "Contact",
      followUs: "Suivez-nous",
      aboutUs: "À Propos",
      description: "Destination immobilière de luxe de premier plan à Dubaï, connectant des clients exigeants avec des propriétés exceptionnelles.",
      companyName: "Rafaz",
      companySlogan: "Immobilier",
      tagline: "N°1 Immobilier de Luxe à Dubaï"
    },
    property: {
      title: "PROPRIÉTÉS EN VEDETTE",
      headline: "Sélection de Luxe Cuvée à Dubaï",
      description: "Entrez dans un royaume de sophistication sans pareil avec nos propriétés en vedette. Explorez ces joyaux exclusifs et imaginez votre prochaine retraite luxueuse avec Rafaz Real Estate.",
      viewAll: "VOIR TOUTES LES PROPRIÉTÉS"
    },
    blog: {
      title: "PERSPECTIVES & INSPIRATION",
      headline: "Dévoiler le Paysage Immobilier Luxueux de Dubaï",
      description: "Plongez dans notre collection curée d'articles, conçus pour éclairer, inspirer et vous guider à travers le marché immobilier dynamique de Dubaï.",
      viewAll: "VOIR TOUS LES BLOGS"
    },
    callToAction: {
      subtitle: "REJOIGNEZ L'ÉLITE",
      title: "Élevez Votre Parcours Immobilier",
      description: "Prêt à vous lancer dans une expérience immobilière luxueuse taillée sur mesure pour vous ? Faites le premier pas vers un mode de vie incomparable.",
      button: "NOUS CONTACTER"
    },
    map: {
      title: "Explorez Nos",
      subtitle: "Projets en Vedette",
      description: "Découvrez des propriétés de luxe dans les emplacements les plus prestigieux de Dubaï",
      loading: "Chargement de la Carte...",
      properties: "Propriétés de Luxe",
      loadInteractive: "Charger la Carte Interactive",
      stats: {
        properties: "Propriétés",
        communities: "Communautés",
        yearsExperience: "Années d'Expérience",
        happyClients: "Clients Satisfaits"
      }
    },
    team: {
      title: "Notre",
      titleHighlight: "Équipe de Luxe",
      titleSuffix: "",
      subtitle: "Rencontrez les professionnels exceptionnels qui réalisent les rêves immobiliers de luxe",
      location: "à Dubaï",
      meetExperts: "Rencontrez Nos",
      meetExpertsHighlight: "Experts",
      expertsDescription: "Professionnels dédiés engagés à offrir des expériences immobilières exceptionnelles",
      loading: "Chargement de notre équipe de luxe...",
      yearsExp: "Années d'Exp",
      specialties: "Spécialités",
      ctaTitle: "Prêt à Commencer Votre",
      ctaTitleHighlight: "Voyage de Luxe",
      ctaTitleSuffix: "?",
      ctaDescription: "Connectez-vous avec notre équipe d'experts et découvrez la propriété parfaite qui correspond à vos rêves",
      getInTouch: "Nous Contacter",
      browseProperties: "Parcourir les Propriétés",
      about: "À Propos",
      experience: "Expérience",
      nationality: "Nationalité",
      verification: "Vérification",
      verified: "✓ KYC Vérifié",
      languages: "Langues",
      specialtiesModal: "Spécialités",
      whatsapp: "WhatsApp",
      call: "Appeler",
      email: "Email"
    },
    legal: {
      privacyPolicy: "Politique de Confidentialité",
      termsConditions: "Conditions Générales",
      cookiePolicy: "Politique des Cookies",
      disclaimer: "Avertissement"
    },
    common: {
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      submit: "Soumettre",
      cancel: "Annuler",
      save: "Enregistrer",
      edit: "Modifier",
      delete: "Supprimer",
      search: "Rechercher",
      filter: "Filtrer",
      clear: "Effacer",
      viewMore: "Voir Plus",
      learnMore: "En Savoir Plus",
      getStarted: "Commencer",
      contactUs: "Nous Contacter"
    }
  },
  ru: {
    navigation: {
      buy: "Купить",
      rent: "Арендовать",
      projects: "Проекты",
      teams: "Команды",
      areas: "Районы",
      services: "Услуги",
      blogs: "Блоги",
      more: "Больше"
    },
    services: {
      propertyManagement: "Управление Недвижимостью",
      listYourProperty: "Разместить Вашу Недвижимость",
      mortgages: "Ипотека",
      conveyancing: "Юридическое Оформление",
      shortTermRentals: "Краткосрочная Аренда",
      propertySnagging: "Проверка Недвижимости",
      partnerProgram: "Партнерская Программа"
    },
    hero: {
      title: "Роскошная Жизнь",
      subtitle: "Переосмысленная",
      description: "ОТКРОЙТЕ ПУТЕШЕСТВИЕ ЧИСТОЙ ИЗЫСКАННОСТИ"
    },
    search: {
      location: "Местоположение",
      type: "Тип",
      bedrooms: "Спальни"
    },
    featured: {
      title: "РЕКОМЕНДУЕМЫЕ ПРОЕКТЫ",
      headline: "Роскошь Раскрыта, Комфорт и Изысканность",
      description: "Откройте для себя тщательно отобранную коллекцию самых изысканных объектов недвижимости Дубая, воплощающих роскошь, элегантность и непревзойденный дизайн.",
      viewAll: "Показать Все Проекты"
    },
    communities: {
      title: "СООБЩЕСТВА",
      headline: "Откройте Лучшее в Дубае",
      description: "Исследуйте разнообразную ткань самых востребованных районов и сообществ Дубая. От спокойных прибрежных убежищ до оживленных городских центров, наша кураторская подборка демонстрирует суть роскошной жизни в каждом месте."
    },
    footer: {
      newsletter: {
        title: "Оставайтесь на Связи с",
        subtitle: "Роскошью",
        description: "Получайте наши исключительные объявления о недвижимости и эксклюзивную аналитику рынка прямо в ваш почтовый ящик.",
        placeholder: "Введите ваш email адрес",
        button: "Подписаться"
      },
      sitemap: "Карта Сайта",
      contact: "Контакты",
      followUs: "Следите за Нами",
      aboutUs: "О Нас",
      description: "Ведущее направление роскошной недвижимости в Дубае, соединяющее взыскательных клиентов с исключительными объектами.",
      companyName: "Rafaz",
      companySlogan: "Недвижимость",
      tagline: "Недвижимость №1 в Дубае"
    },
    property: {
      title: "РЕКОМЕНДУЕМЫЕ ОБЪЕКТЫ",
      headline: "Отборные Роскошные Объекты в Дубае",
      description: "Войдите в царство непревзойденной изысканности с нашими рекомендуемыми объектами. Исследуйте эти эксклюзивные жемчужины и представьте себе ваше следующее роскошное убежище с Rafaz Real Estate.",
      viewAll: "ПОСМОТРЕТЬ ВСЕ ОБЪЕКТЫ"
    },
    blog: {
      title: "ИНСАЙТЫ И ВДОХНОВЕНИЕ",
      headline: "Раскрытие Роскошного Недвижимого Ландшафта Дубая",
      description: "Погрузитесь в нашу кураторскую коллекцию статей, разработанных для просвещения, вдохновения и руководства через динамичный рынок недвижимости Дубая.",
      viewAll: "ПОСМОТРЕТЬ ВСЕ БЛОГИ"
    },
    callToAction: {
      subtitle: "ПРИСОЕДИНЯЙТЕСЬ К ЭЛИТЕ",
      title: "Поднимите Ваше Путешествие в Недвижимости",
      description: "Готовы отправиться в роскошный опыт недвижимости, созданный специально для вас? Сделайте первый шаг к непревзойденной жизни.",
      button: "СВЯЗАТЬСЯ С НАМИ"
    },
    map: {
      title: "Исследуйте Наши",
      subtitle: "Рекомендуемые Проекты",
      description: "Откройте для себя роскошные объекты в самых престижных местах Дубая",
      loading: "Загрузка Карты...",
      properties: "Роскошные Объекты",
      loadInteractive: "Загрузить Интерактивную Карту",
      stats: {
        properties: "Объекты",
        communities: "Сообщества",
        yearsExperience: "Лет Опыта",
        happyClients: "Довольных Клиентов"
      }
    },
    team: {
      title: "Наша",
      titleHighlight: "Роскошная",
      titleSuffix: "Команда",
      subtitle: "Познакомьтесь с исключительными профессионалами, которые воплощают мечты о роскошной недвижимости",
      location: "в Дубае",
      meetExperts: "Познакомьтесь с Нашими",
      meetExpertsHighlight: "Экспертами",
      expertsDescription: "Преданные профессионалы, стремящиеся предоставлять исключительный опыт в сфере недвижимости",
      loading: "Загрузка нашей роскошной команды...",
      yearsExp: "Лет Опыта",
      specialties: "Специализации",
      ctaTitle: "Готовы Начать Ваше",
      ctaTitleHighlight: "Роскошное Путешествие",
      ctaTitleSuffix: "?",
      ctaDescription: "Свяжитесь с нашей экспертной командой и откройте для себя идеальную недвижимость, соответствующую вашим мечтам",
      getInTouch: "Связаться с Нами",
      browseProperties: "Просмотреть Недвижимость",
      about: "О",
      experience: "Опыт",
      nationality: "Национальность",
      verification: "Верификация",
      verified: "✓ KYC Подтверждено",
      languages: "Языки",
      specialtiesModal: "Специализации",
      whatsapp: "WhatsApp",
      call: "Позвонить",
      email: "Email"
    },
    legal: {
      privacyPolicy: "Политика Конфиденциальности",
      termsConditions: "Условия и Положения",
      cookiePolicy: "Политика Cookie",
      disclaimer: "Отказ от Ответственности"
    },
    common: {
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успех",
      submit: "Отправить",
      cancel: "Отмена",
      save: "Сохранить",
      edit: "Редактировать",
      delete: "Удалить",
      search: "Поиск",
      filter: "Фильтр",
      clear: "Очистить",
      viewMore: "Показать Больше",
      learnMore: "Узнать Больше",
      getStarted: "Начать",
      contactUs: "Связаться с Нами"
    }
  },
  zh: {
    navigation: {
      buy: "购买",
      rent: "租赁",
      projects: "项目",
      teams: "团队",
      areas: "区域",
      services: "服务",
      blogs: "博客",
      more: "更多"
    },
    services: {
      propertyManagement: "物业管理",
      listYourProperty: "列出您的房产",
      mortgages: "抵押贷款",
      conveyancing: "法律转让",
      shortTermRentals: "短期租赁",
      propertySnagging: "房产检查",
      partnerProgram: "合作伙伴计划"
    },
    hero: {
      title: "奢华生活",
      subtitle: "重新构想",
      description: "拥抱纯粹精致的旅程"
    },
    search: {
      location: "位置",
      type: "类型",
      bedrooms: "卧室"
    },
    featured: {
      title: "精选项目",
      headline: "奢华展现，舒适与精致",
      description: "探索迪拜最精美房产的精选系列，体现奢华、优雅和无与伦比的设计。",
      viewAll: "查看所有项目"
    },
    communities: {
      title: "社区",
      headline: "发现迪拜最佳",
      description: "探索迪拜最受欢迎地区和社区的多样化景观。从宁静的海滨度假胜地到繁华的都市中心，我们精心策划的选择展现了每个地方的奢华生活精髓。"
    },
    partners: {
      title: "与迪拜领先开发商合作"
    },
    solutions: {
      headline: {
        part1: "迪拜房地产解决方案",
        part2: "专注于",
        part3: "卓越的客户服务"
      },
      connect: {
        title: "联系专家",
        description: "访问我们超过400+专业代理的专门团队，随时为您提供帮助。"
      },
      list: {
        title: "列出您的房产",
        description: "通过我们的专业营销策略列出您的房产，实现最佳价值。"
      },
      download: {
        title: "下载报告",
        description: "下载最新的2025年第一季度迪拜房地产市场综合报告"
      },
      explore: {
        title: "探索迪拜项目",
        description: "浏览并从我们广泛的迪拜项目组合中找到您的理想房产。"
      }
    },
    footer: {
      newsletter: {
        title: "与奢华保持联系",
        subtitle: "奢华",
        description: "直接在您的收件箱中接收我们卓越的房产列表和独家市场洞察。",
        placeholder: "输入您的电子邮件地址",
        button: "订阅"
      },
      sitemap: "网站地图",
      contact: "联系我们",
      followUs: "关注我们",
      aboutUs: "关于我们",
      description: "迪拜领先的豪华房地产目的地，将有眼光的客户与卓越的房产连接起来。",
      companyName: "Rafaz",
      companySlogan: "房地产",
      tagline: "迪拜第一豪华房地产"
    },
    property: {
      title: "精选房产",
      headline: "迪拜精选豪华房源",
      description: "步入我们精选房产的无与伦比的精致境界。探索这些独家瑰宝，想象您与Rafaz房地产的下一个豪华度假胜地。",
      viewAll: "查看所有房产"
    },
    blog: {
      title: "洞察与灵感",
      headline: "揭示迪拜豪华房地产景观",
      description: "深入了解我们精心策划的文章集，旨在启发、激励并指导您了解迪拜充满活力的房地产市场。",
      viewAll: "查看所有博客"
    },
    callToAction: {
      subtitle: "加入精英",
      title: "提升您的房地产之旅",
      description: "准备好开始专为您量身定制的豪华房地产体验了吗？迈出通往无与伦比生活的第一步。",
      button: "联系我们"
    },
    map: {
      title: "探索我们的",
      subtitle: "精选项目",
      description: "在迪拜最负盛名的地点发现豪华房产",
      loading: "加载地图中...",
      properties: "豪华房产",
      loadInteractive: "加载交互式地图",
      stats: {
        properties: "房产",
        communities: "社区",
        yearsExperience: "年经验",
        happyClients: "满意客户"
      }
    },
    team: {
      title: "我们的",
      titleHighlight: "豪华",
      titleSuffix: "团队",
      subtitle: "认识实现豪华房地产梦想的杰出专业人士",
      location: "在迪拜",
      meetExperts: "认识我们的",
      meetExpertsHighlight: "专家",
      expertsDescription: "致力于提供卓越房地产体验的专业人士",
      loading: "正在加载我们的豪华团队...",
      yearsExp: "年经验",
      specialties: "专业领域",
      ctaTitle: "准备好开始您的",
      ctaTitleHighlight: "豪华之旅",
      ctaTitleSuffix: "了吗？",
      ctaDescription: "与我们的专家团队联系，发现与您梦想相匹配的完美房产",
      getInTouch: "联系我们",
      browseProperties: "浏览房产",
      about: "关于",
      experience: "经验",
      nationality: "国籍",
      verification: "验证",
      verified: "✓ KYC已验证",
      languages: "语言",
      specialtiesModal: "专业领域",
      whatsapp: "WhatsApp",
      call: "致电",
      email: "邮件"
    },
    legal: {
      privacyPolicy: "隐私政策",
      termsConditions: "条款和条件",
      cookiePolicy: "Cookie政策",
      disclaimer: "免责声明"
    },
    common: {
      loading: "加载中...",
      error: "错误",
      success: "成功",
      submit: "提交",
      cancel: "取消",
      save: "保存",
      edit: "编辑",
      delete: "删除",
      search: "搜索",
      filter: "筛选",
      clear: "清除",
      viewMore: "查看更多",
      learnMore: "了解更多",
      getStarted: "开始",
      contactUs: "联系我们"
    }
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  t: (key: string) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) {
        setCurrentLanguage(lang);
        document.documentElement.dir = lang.dir;
        document.documentElement.lang = lang.code;
      }
    }
  }, []);

  // Update document direction and language when language changes
  useEffect(() => {
    document.documentElement.dir = currentLanguage.dir;
    document.documentElement.lang = currentLanguage.code;
    localStorage.setItem('preferred-language', currentLanguage.code);
  }, [currentLanguage]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage.code as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const handleSetCurrentLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage: handleSetCurrentLanguage,
        t,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
