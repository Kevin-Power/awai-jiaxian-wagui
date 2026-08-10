export type MenuCategory = "wagui" | "zongzi" | "soup" | "side";

export type MenuItem = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  badge?: string;
  popular?: boolean;
};

export const SHOP = {
  name: "阿歪小吃店",
  nameShort: "阿歪碗粿",
  nameFull: "阿歪小吃店（甲仙碗粿肉粽）",
  tagline: "傳承數十年 · 碗粿、肉粽、魚焿",
  phone: "07-331-6779",
  phoneTel: "+88673316779",
  email: "s6967391@gmail.com",
  instagram: "a_wai_127",
  instagramUrl: "https://www.instagram.com/a_wai_127/",
  address: "高雄市前鎮區復興三路127號",
  mrt: "捷運獅甲站步行約 5 分鐘；三多商圈站約 10 分鐘",
  landmark: "勞工公園一帶",
  hours: [
    { days: "營業時間", time: "06:30 – 15:00" },
    { days: "公休", time: "週四、週五（不定期店休見 IG）" },
  ],
  story:
    "一家傳承數十年的在地小吃店。碗粿、肉粽、魚焿——堅持傳統工法，維持老一輩的味道，讓每一口都充滿懷舊風味。官方帳號 @a_wai_127 會公布店休與季節活動，來店前記得追蹤一下。",
  note: "參考價，實際以現場公告為準。碗粿中午前常售完。",
  tips: [
    "營業 06:30–15:00；週四、五多為公休，臨時店休請看 Instagram @a_wai_127。",
    "招牌碗粿熱銷，中午前常完售——想吃請早。",
    "內用、外帶人潮都不少；每桌備有蒜泥、辣醬等醬料。",
    "點羹類可選擇搭配的麵條；炸魚可乾吃或泡進羹湯。",
  ],
} as const;

export const MENU: MenuItem[] = [
  {
    id: "w-plain",
    name: "碗粿（不加蛋）",
    nameEn: "Wa-gui",
    description:
      "招牌古早味碗粿，軟嫩綿密。在地人氣最高，中午前易售完。",
    price: 30,
    category: "wagui",
    image: "/images/wagui.jpg",
    badge: "招牌",
    popular: true,
  },
  {
    id: "w-egg",
    name: "碗粿（加蛋）",
    nameEn: "Wa-gui with Egg",
    description: "碗粿加蛋，層次更豐富。一口軟嫩懷舊味。",
    price: 35,
    category: "wagui",
    image: "/images/wagui.jpg",
    popular: true,
  },
  {
    id: "z-peanut",
    name: "花生粽",
    nameEn: "Peanut Zongzi",
    description: "南部風味肉粽，花生香氣足，配蒜泥更對味。",
    price: 40,
    category: "zongzi",
    image: "/images/zongzi.jpg",
    badge: "經典",
    popular: true,
  },
  {
    id: "z-classic",
    name: "肉粽",
    nameEn: "Meat Zongzi",
    description: "傳統工法包製，香氣四溢，早餐外帶方便。",
    price: 40,
    category: "zongzi",
    image: "/images/zongzi.jpg",
  },
  {
    id: "s-fish",
    name: "魚焿／魚羹",
    nameEn: "Fish Thick Soup",
    description: "店家主打之一，堅持傳統工法，搭配麵條或米粉。",
    price: 55,
    category: "soup",
    image: "/images/hero.jpg",
    badge: "主打",
  },
  {
    id: "s-combo",
    name: "綜合羹",
    nameEn: "Combo Thick Soup",
    description: "羹湯搭配炸魚等配料，份量扎實，可泡魚塊同吃。",
    price: 65,
    category: "soup",
    image: "/images/hero.jpg",
    popular: true,
  },
  {
    id: "s-pork",
    name: "肉羹／肉羹米粉",
    nameEn: "Pork Thick Soup",
    description: "薄芡清甜、味道偏清淡；可加蒜泥、辣醬調味。",
    price: 50,
    category: "soup",
    image: "/images/shop.jpg",
  },
  {
    id: "x-fish",
    name: "單點炸魚",
    nameEn: "Fried Fish",
    description:
      "在地必點。外酥內軟、魚肉鮮嫩；乾吃或泡羹湯都好吃。",
    price: 65,
    category: "side",
    image: "/images/shop.jpg",
    badge: "必點",
    popular: true,
  },
];

export const REVIEWS = [
  {
    name: "官方簡介",
    area: "@a_wai_127",
    text: "傳承數十年的在地小吃店，碗粿、肉粽、魚焿堅持傳統工法，維持老一輩的味道。",
    stars: 5,
  },
  {
    name: "食客",
    area: "前鎮",
    text: "碗粿不加蛋就很划算又好吃，炸魚來就是必點。勞工公園附近早餐首選。",
    stars: 5,
  },
  {
    name: "街坊",
    area: "高雄",
    text: "木頭裝潢很有味道，店家親切。中午前碗粿常賣完，建議早點來。",
    stars: 5,
  },
] as const;

export const CATEGORY_LABEL: Record<MenuCategory, string> = {
  wagui: "碗粿",
  zongzi: "肉粽",
  soup: "羹湯／魚焿",
  side: "炸魚小食",
};
