export const BRAND = {
  name: "悠居",
  nameEn: "YouJu",
  slogan: "住进生活，居于山水",
  description: "中国首个旅居民宿线上平台",
  mission: "让旅居成为一种可及的生活方式",
  vision: "成为中国旅居生活方式的第一入口",
} as const;

export const STATS = {
  cities: 300,
  properties: 50000,
  users: 5000000,
  satisfaction: 4.8,
} as const;

export const AMENITY_ICONS: Record<string, string> = {
  wifi: "Wifi",
  kitchen: "CookingPot",
  workspace: "Monitor",
  parking: "Car",
  elevator: "ArrowUpDown",
  accessible: "Accessibility",
  ac: "AirVent",
  heating: "Flame",
  washer: "WashingMachine",
  tv: "Tv",
  pool: "Waves",
  gym: "Dumbbell",
  garden: "TreePine",
  balcony: "Sunset",
  security: "Shield",
  medical: "Heart",
  hotspring: "Droplets",
  teahouse: "Coffee",
  library: "BookOpen",
  yoga: "Flower",
};

export const AMENITY_LABELS: Record<string, string> = {
  wifi: "高速WiFi",
  kitchen: "独立厨房",
  workspace: "办公桌椅",
  parking: "免费停车",
  elevator: "电梯",
  accessible: "无障碍设施",
  ac: "空调",
  heating: "暖气",
  washer: "洗衣机",
  tv: "电视",
  pool: "泳池",
  gym: "健身房",
  garden: "花园",
  balcony: "阳台/露台",
  security: "24h安保",
  medical: "医疗配套",
  hotspring: "温泉",
  teahouse: "茶室",
  library: "书房",
  yoga: "瑜伽室",
};

export const PROPERTY_TYPES = [
  { value: "apartment", label: "公寓" },
  { value: "house", label: "独栋" },
  { value: "villa", label: "别墅" },
  { value: "studio", label: "工作室" },
  { value: "farmhouse", label: "农家院" },
  { value: "courtyard", label: "四合院" },
] as const;

export const STAY_TYPES = [
  { value: "weekly", label: "周租 (7天+)", discount: "基准价" },
  { value: "monthly", label: "月租 (30天+)", discount: "减20%" },
  { value: "quarterly", label: "季租 (90天+)", discount: "减35%" },
] as const;

export const RATING_DIMENSIONS = [
  { key: "living", label: "居住品质", weight: 0.25 },
  { key: "internet", label: "网络办公", weight: 0.2 },
  { key: "surroundings", label: "周边配套", weight: 0.2 },
  { key: "safety", label: "安全服务", weight: 0.2 },
  { key: "community", label: "社区氛围", weight: 0.15 },
] as const;

export const SOJOURN_DIMENSIONS = [
  { key: "climate", label: "气候舒适度", weight: 0.2 },
  { key: "cost", label: "生活成本", weight: 0.2 },
  { key: "medical", label: "医疗资源", weight: 0.15 },
  { key: "internet", label: "网络质量", weight: 0.15 },
  { key: "transport", label: "交通便利度", weight: 0.1 },
  { key: "community", label: "社群活跃度", weight: 0.1 },
  { key: "culture", label: "文化体验", weight: 0.1 },
] as const;

export const MEMBERSHIP_TIERS = [
  {
    id: "silver",
    name: "银卡",
    nameEn: "Silver",
    priceMonthly: 29,
    priceYearly: 299,
    discount: 3,
    color: "#C0C0C0",
    features: [
      "预订折扣 3%",
      "专属客服通道",
      "优先入住权",
      "旅居攻略专享",
      "生日旅居礼包",
    ],
  },
  {
    id: "gold",
    name: "金卡",
    nameEn: "Gold",
    priceMonthly: 99,
    priceYearly: 999,
    discount: 5,
    color: "#FFD700",
    features: [
      "预订折扣 5%",
      "免押金入住",
      "免费取消 (入住前3天)",
      "社群VIP标识",
      "每月1次免费管家服务",
      "旅居保险赠送",
    ],
  },
  {
    id: "platinum",
    name: "铂金卡",
    nameEn: "Platinum",
    priceMonthly: 399,
    priceYearly: 3999,
    discount: 8,
    color: "#E5E4E2",
    features: [
      "预订折扣 8%",
      "专属旅居管家",
      "医疗绿色通道",
      "专属旅居活动",
      "免费接站服务",
      "优先新房源体验",
      "年度旅居报告",
      "家属同享权益",
    ],
  },
] as const;

export const NAV_LINKS = [
  { href: "/search", label: "发现房源" },
  { href: "/destinations", label: "旅居目的地" },
  { href: "/community", label: "旅居社区" },
  { href: "/membership", label: "会员" },
  { href: "/about", label: "关于悠居" },
] as const;
