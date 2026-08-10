import { images } from "@/assets/images";

export type MenuCategory = "wagui" | "zongzi" | "soup" | "side";

export type MenuItem = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  priceLarge?: number;
  category: MenuCategory;
  image: string;
  badge?: string;
  popular?: boolean;
};

export const SHOP = {
  name: "阿歪小吃店",
  nameShort: "阿歪碗粿",
  nameFull: "阿歪小吃店（甲仙碗粿肉粽）",
  tagline: "傳承數十年 · 碗粿、肉粽、魚羹",
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
    "一家傳承數十年的在地小吃店。碗粿、肉粽、魚羹——堅持傳統工法，維持老一輩的味道，讓每一口都充滿懷舊風味。官方帳號 @a_wai_127 會公布店休與季節活動，來店前記得追蹤一下。",
  note: "價目依店內菜單看板。羹湯可選米粉、麵或米粉麵（分以下 4 種）。",
  tips: [
    "營業 06:30–15:00；週四、五多為公休，臨時店休請看 Instagram @a_wai_127。",
    "招牌碗粿熱銷，中午前常完售——想吃請早。",
    "羹湯可選小／大碗，並搭配米粉、麵或米粉麵。",
    "桌邊備有醬料；單點炸魚可乾吃或泡進羹湯。",
  ],
  /** 羹類可搭配的主食 */
  soupNoodles: ["米粉", "麵", "米粉麵"] as const,
} as const;

export const MENU: MenuItem[] = [
  {
    id: "w-plain",
    name: "碗粿",
    nameEn: "Wagui",
    description: "招牌古早味碗粿，軟嫩綿密，有瘦肉與菜脯。店內看板 NT$ 35。",
    price: 35,
    category: "wagui",
    image: images.wagui,
    badge: "招牌",
    popular: true,
  },
  {
    id: "z-meat",
    name: "肉粽",
    nameEn: "Meat Zongzi",
    description: "傳統工法包製，香氣四溢。可加撒花生粉。店內看板 NT$ 55。",
    price: 55,
    category: "zongzi",
    image: images.zongzi,
    badge: "招牌",
    popular: true,
  },
  {
    id: "z-peanut",
    name: "花生粽",
    nameEn: "Peanut Zongzi",
    description: "南部風味，花生香氣足，配蒜泥更對味。店內看板 NT$ 45。",
    price: 45,
    category: "zongzi",
    image: images.zongzi,
  },
  {
    id: "s-meat",
    name: "肉羹",
    nameEn: "Meat Soup",
    description: "清甜南部羹湯。小 NT$ 70、大 NT$ 90。可選米粉、麵、米粉麵。",
    price: 70,
    priceLarge: 90,
    category: "soup",
    image: images.hero,
  },
  {
    id: "s-fish",
    name: "魚羹",
    nameEn: "Fish Soup",
    description: "店家主打魚羹。小 NT$ 70、大 NT$ 90。可選米粉、麵、米粉麵。",
    price: 70,
    priceLarge: 90,
    category: "soup",
    image: images.hero,
    popular: true,
  },
  {
    id: "s-combo",
    name: "綜合羹",
    nameEn: "Combo Soup",
    description: "肉羹＋魚羹綜合。小 NT$ 75、大 NT$ 95。可選米粉、麵、米粉麵。",
    price: 75,
    priceLarge: 95,
    category: "soup",
    image: images.hero,
  },
  {
    id: "s-fish-fry",
    name: "單點炸魚",
    nameEn: "Fried Fish",
    description: "在地必點。外酥內軟；乾吃或泡羹湯。店內看板 NT$ 75。",
    price: 75,
    category: "side",
    image: images.hero,
  },
];

export const REVIEWS = [
  {
    name: "在地老饕",
    text: "傳承數十年的在地小吃店，碗粿、肉粽、魚羹堅持傳統工法，維持老一輩的味道。",
    stars: 5,
  },
  {
    name: "捷運族",
    text: "碗粿 35 元很實在，炸魚來就是必點。勞工公園附近早餐首選。",
    stars: 5,
  },
  {
    name: "早餐常客",
    text: "羹湯有小大碗可選，配米粉或麵。中午前碗粿常賣完，建議早點來。",
    stars: 4,
  },
] as const;

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  wagui: "碗粿",
  zongzi: "肉粽",
  soup: "羹湯",
  side: "湯品／炸魚",
};
