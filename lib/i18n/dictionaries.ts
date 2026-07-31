export type Locale = "en" | "am" | "ru";

export const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "am", label: "ՀԱՅ", name: "Հայերեն" },
  { code: "ru", label: "РУ", name: "Русский" },
];

export interface Dictionary {
  nav: { home: string; shop: string; about: string; contact: string };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleEm: string;
    titleLine2: string;
    subtitle: string;
    shopCta: string;
    quizCta: string;
    scroll: string;
  };
  stats: { fragrances: string; brands: string; authentic: string };
  sections: {
    topRated: string;
    bestSellers: string;
    justArrived: string;
    newArrivals: string;
    browse: string;
    shopByCategory: string;
    ourPromise: string;
    whyChooseUs: string;
    fragranceFinder: string;
    findYourScent: string;
    viewAll: string;
    shopNew: string;
  };
  common: { search: string; wishlist: string; orderNow: string; order: string };
}

const en: Dictionary = {
  nav: { home: "Home", shop: "Shop", about: "About", contact: "Contact" },
  hero: {
    eyebrow: "Authentic · Premium · Oriental",
    titleLine1: "Discover your",
    titleEm: "signature",
    titleLine2: "Arabic fragrance",
    subtitle:
      "Premium oriental perfumes, delivered across Armenia. Lattafa, Hayati, Afnan and more — authentic, direct from the source.",
    shopCta: "Shop Perfumes",
    quizCta: "Find Your Scent",
    scroll: "Scroll",
  },
  stats: {
    fragrances: "Fragrances",
    brands: "Luxury Brands",
    authentic: "Authentic",
  },
  sections: {
    topRated: "Top Rated",
    bestSellers: "Best Sellers",
    justArrived: "Just Arrived",
    newArrivals: "New Arrivals",
    browse: "Browse",
    shopByCategory: "Shop by Category",
    ourPromise: "Our Promise",
    whyChooseUs: "Why Choose Us",
    fragranceFinder: "Fragrance Finder",
    findYourScent: "Find Your Perfect Scent",
    viewAll: "View All",
    shopNew: "Shop New",
  },
  common: {
    search: "Search",
    wishlist: "Wishlist",
    orderNow: "Order Now",
    order: "Order",
  },
};

const am: Dictionary = {
  nav: { home: "Գլխավոր", shop: "Խանութ", about: "Մեր մասին", contact: "Կապ" },
  hero: {
    eyebrow: "Բնօրինակ · Պրեմիում · Արևելյան",
    titleLine1: "Բացահայտեք ձեր",
    titleEm: "ստորագրային",
    titleLine2: "արաբական բույրը",
    subtitle:
      "Պրեմիում արևելյան օծանելիքներ՝ առաքումով ամբողջ Հայաստանում։ Lattafa, Hayati, Afnan և այլն՝ բնօրինակ, ուղիղ արտադրողից։",
    shopCta: "Գնել օծանելիք",
    quizCta: "Գտնել ձեր բույրը",
    scroll: "Ոլորել",
  },
  stats: {
    fragrances: "Բույրեր",
    brands: "Լյուքս ապրանքանիշ",
    authentic: "Բնօրինակ",
  },
  sections: {
    topRated: "Լավագույնները",
    bestSellers: "Ամենավաճառվողները",
    justArrived: "Նոր ստացված",
    newArrivals: "Նոր ժամանումներ",
    browse: "Դիտել",
    shopByCategory: "Ըստ կատեգորիայի",
    ourPromise: "Մեր խոստումը",
    whyChooseUs: "Ինչու՞ մենք",
    fragranceFinder: "Բույրի ընտրություն",
    findYourScent: "Գտեք ձեր կատարյալ բույրը",
    viewAll: "Տեսնել բոլորը",
    shopNew: "Գնել նորերը",
  },
  common: {
    search: "Որոնում",
    wishlist: "Ցանկություններ",
    orderNow: "Պատվիրել հիմա",
    order: "Պատվիրել",
  },
};

const ru: Dictionary = {
  nav: {
    home: "Главная",
    shop: "Магазин",
    about: "О нас",
    contact: "Контакты",
  },
  hero: {
    eyebrow: "Оригинал · Премиум · Восточный",
    titleLine1: "Откройте свой",
    titleEm: "фирменный",
    titleLine2: "арабский аромат",
    subtitle:
      "Премиальная восточная парфюмерия с доставкой по всей Армении. Lattafa, Hayati, Afnan и другие — оригинал, напрямую от производителя.",
    shopCta: "Купить парфюм",
    quizCta: "Подобрать аромат",
    scroll: "Листайте",
  },
  stats: {
    fragrances: "Ароматов",
    brands: "Люкс-бренда",
    authentic: "Оригинал",
  },
  sections: {
    topRated: "Лучшее",
    bestSellers: "Хиты продаж",
    justArrived: "Только поступили",
    newArrivals: "Новинки",
    browse: "Обзор",
    shopByCategory: "По категориям",
    ourPromise: "Наше обещание",
    whyChooseUs: "Почему мы",
    fragranceFinder: "Подбор аромата",
    findYourScent: "Найдите свой идеальный аромат",
    viewAll: "Смотреть все",
    shopNew: "Купить новинки",
  },
  common: {
    search: "Поиск",
    wishlist: "Избранное",
    orderNow: "Заказать",
    order: "Заказать",
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, am, ru };
