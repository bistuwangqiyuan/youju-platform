import type { Property } from "@/lib/types";
import { UNSPLASH_INTERIOR_IDS, unsplashImage, unsplashImages } from "@/lib/unsplash";

const COVER_ROTATION = UNSPLASH_INTERIOR_IDS.slice(0, 8);

function makeImages(base: string[]): string[] {
  return unsplashImages(base, { w: 800, h: 600 });
}

export const properties: Property[] = [
  // === 大理 (15 properties) ===
  {
    id: "prop-dali-001",
    host_id: "host-001",
    destination_id: "dest-dali",
    title: "苍山脚下独栋白族院落 · 带花园和独立工作间",
    description:
      "位于大理古城北门外，步行10分钟即达古城。传统白族三坊一照壁建筑改造，保留原始建筑韵味的同时增添现代舒适设施。独立院落配备花园、茶室和专属工作间，300Mbps光纤网络。适合需要安静创作环境的数字游民和作家。",
    short_description: "白族院落改造，独立花园+工作间，300M光纤",
    property_type: "courtyard",
    cover_image: unsplashImage("1600585154340-be6161a56a0c", { w: 800, h: 600 }),
    images: makeImages([
      "1600585154340-be6161a56a0c",
      "1502672260266-1c1ef2d93688",
      "1512917774080-9991f1c4c750",
      "1586023492125-27b2c045efd7",
      "1600210492486-724fe5c67fb0",
    ]),
    address: "大理古城北门外才村路18号",
    latitude: 25.6165,
    longitude: 100.1576,
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    area_sqm: 120,
    price_weekly: 1960,
    price_monthly: 5600,
    price_quarterly: 14560,
    amenities: ["wifi", "kitchen", "workspace", "garden", "ac", "washer", "teahouse"],
    rating_living: 4.8,
    rating_internet: 4.9,
    rating_surroundings: 4.5,
    rating_safety: 4.6,
    rating_community: 4.7,
    rating_overall: 4.7,
    review_count: 34,
    tier: "youxuan",
    is_available: true,
    min_stay_days: 7,
    internet_speed_mbps: 300,
    has_kitchen: true,
    has_workspace: true,
    has_parking: true,
    has_elevator: false,
    is_accessible: false,
    host_name: "李云飞",
    host_avatar: unsplashImage("1507003211169-0a1dd7228f2d", { w: 100, h: 100, faceCrop: true }),
    host_verified: true,
    created_at: "2024-03-15",
  },
  {
    id: "prop-dali-002",
    host_id: "host-002",
    destination_id: "dest-dali",
    title: "洱海边现代公寓 · 全景落地窗观海日出",
    description: "位于大理市下关区洱海畔，270度全景落地窗，每天在洱海日出中醒来。精装修现代风格，配备人体工学办公桌椅，200Mbps光纤。楼下步行5分钟即达海边栈道，适合追求高品质生活的远程工作者。小区内有泳池和健身房。",
    short_description: "洱海全景公寓，日出观海，人体工学办公",
    property_type: "apartment",
    cover_image: unsplashImage("1600607687939-ce8a6c25118c", { w: 800, h: 600 }),
    images: makeImages([
      "1600607687939-ce8a6c25118c",
      "1600585154340-be6161a56a0c",
      "1502672260266-1c1ef2d93688",
      "1586023492125-27b2c045efd7",
    ]),
    address: "大理市下关区洱海天域小区12栋",
    latitude: 25.5865,
    longitude: 100.2276,
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    area_sqm: 65,
    price_weekly: 1680,
    price_monthly: 4800,
    price_quarterly: 12480,
    amenities: ["wifi", "kitchen", "workspace", "ac", "washer", "tv", "pool", "gym", "balcony"],
    rating_living: 4.9,
    rating_internet: 4.7,
    rating_surroundings: 4.9,
    rating_safety: 4.8,
    rating_community: 4.3,
    rating_overall: 4.7,
    review_count: 28,
    tier: "youxuan",
    is_available: true,
    min_stay_days: 7,
    internet_speed_mbps: 200,
    has_kitchen: true,
    has_workspace: true,
    has_parking: true,
    has_elevator: true,
    is_accessible: true,
    host_name: "张晓萌",
    host_avatar: unsplashImage("1438761681033-6461ffad8d80", { w: 100, h: 100, faceCrop: true }),
    host_verified: true,
    created_at: "2024-02-10",
  },
  {
    id: "prop-dali-003",
    host_id: "host-003",
    destination_id: "dest-dali",
    title: "古城内文艺loft · 独立书房+屋顶露台",
    description: "大理古城人民路核心地段，独栋loft设计。一楼为开放式客厅和厨房，二楼为卧室和独立书房，屋顶露台可远眺苍山。楼下就是大理最热闹的咖啡馆和独立书店聚集区，步行可达所有古城设施。",
    short_description: "古城核心文艺loft，屋顶远眺苍山",
    property_type: "studio",
    cover_image: unsplashImage("1512917774080-9991f1c4c750", { w: 800, h: 600 }),
    images: makeImages([
      "1512917774080-9991f1c4c750",
      "1586023492125-27b2c045efd7",
      "1600585154340-be6161a56a0c",
    ]),
    address: "大理古城人民路下段128号",
    latitude: 25.6025,
    longitude: 100.1676,
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    area_sqm: 55,
    price_weekly: 1260,
    price_monthly: 3600,
    price_quarterly: 9360,
    amenities: ["wifi", "kitchen", "workspace", "ac", "washer", "balcony", "library"],
    rating_living: 4.5,
    rating_internet: 4.6,
    rating_surroundings: 4.9,
    rating_safety: 4.4,
    rating_community: 4.8,
    rating_overall: 4.6,
    review_count: 42,
    tier: "youshi",
    is_available: true,
    min_stay_days: 7,
    internet_speed_mbps: 150,
    has_kitchen: true,
    has_workspace: true,
    has_parking: false,
    has_elevator: false,
    is_accessible: false,
    host_name: "陈雨涵",
    host_avatar: unsplashImage("1494790108377-be9c29b29330", { w: 100, h: 100, faceCrop: true }),
    host_verified: true,
    created_at: "2024-01-20",
  },
  {
    id: "prop-dali-004", host_id: "host-004", destination_id: "dest-dali",
    title: "喜洲古镇田园别墅 · 稻田景观+私家菜园", description: "位于大理喜洲古镇外围，被金黄稻田环绕的独栋别墅。三间卧室适合家庭或朋友同行。配备私家菜园，可体验种菜乐趣。距离喜洲古镇步行15分钟，感受原汁原味的白族田园生活。", short_description: "喜洲稻田别墅，私家菜园，田园生活体验",
    property_type: "villa", cover_image: unsplashImage("1600210492486-724fe5c67fb0", { w: 800, h: 600 }),
    images: makeImages(["1600210492486-724fe5c67fb0", "1600585154340-be6161a56a0c", "1502672260266-1c1ef2d93688"]),
    address: "大理喜洲镇周城村23号", latitude: 25.7365, longitude: 100.1376,
    bedrooms: 3, bathrooms: 2, max_guests: 6, area_sqm: 180,
    price_weekly: 2800, price_monthly: 8000, price_quarterly: 20800,
    amenities: ["wifi", "kitchen", "workspace", "parking", "garden", "ac", "washer", "balcony"],
    rating_living: 4.9, rating_internet: 4.2, rating_surroundings: 4.8, rating_safety: 4.5, rating_community: 4.3, rating_overall: 4.6, review_count: 18,
    tier: "youxuan", is_available: true, min_stay_days: 14, internet_speed_mbps: 100,
    has_kitchen: true, has_workspace: true, has_parking: true, has_elevator: false, is_accessible: false,
    host_name: "赵明远", host_avatar: unsplashImage("1472099645785-5658abf4ff4e", { w: 100, h: 100, faceCrop: true }), host_verified: true, created_at: "2024-04-01",
  },
  {
    id: "prop-dali-005", host_id: "host-005", destination_id: "dest-dali",
    title: "才村码头湖景公寓 · 温馨一居室月租优选", description: "大理才村码头旁的温馨公寓，阳台直面洱海。一室一厅一厨一卫，配备齐全家电。楼下有菜市场和超市，生活便利。适合预算有限但追求品质的独行旅居者。", short_description: "才村码头湖景一居，生活便利月租优选",
    property_type: "apartment", cover_image: unsplashImage("1586023492125-27b2c045efd7", { w: 800, h: 600 }),
    images: makeImages(["1512917774080-9991f1c4c750", "1586023492125-27b2c045efd7"]),
    address: "大理市才村码头翠雅苑5栋", latitude: 25.6265, longitude: 100.1876,
    bedrooms: 1, bathrooms: 1, max_guests: 2, area_sqm: 45,
    price_weekly: 840, price_monthly: 2400, price_quarterly: 6240,
    amenities: ["wifi", "kitchen", "ac", "washer", "tv", "balcony"],
    rating_living: 4.2, rating_internet: 4.3, rating_surroundings: 4.6, rating_safety: 4.3, rating_community: 4.1, rating_overall: 4.3, review_count: 56,
    tier: "youshi", is_available: true, min_stay_days: 7, internet_speed_mbps: 100,
    has_kitchen: true, has_workspace: false, has_parking: false, has_elevator: true, is_accessible: true,
    host_name: "王小林", host_avatar: unsplashImage("1500648767791-00dcc994a43e", { w: 100, h: 100, faceCrop: true }), host_verified: true, created_at: "2024-02-28",
  },
  // Dali properties 6-15 (compact format)
  ...generateBatchProperties("dest-dali", "大理", 6, 15, [
    { title: "大理大学旁学区公寓 · 安静办公首选", type: "apartment" as const, price: 2200, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 50, lat: 25.5965, lng: 100.2076 },
    { title: "双廊临海独栋民宿 · 玉几岛日落", type: "house" as const, price: 6800, tier: "youxuan" as const, beds: 2, baths: 2, guests: 4, area: 100, lat: 25.9365, lng: 100.1876 },
    { title: "苍山半山森林木屋 · 隐居山林", type: "house" as const, price: 4200, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 60, lat: 25.6565, lng: 100.1076 },
    { title: "银桥花海旁花园洋房 · 亲子首选", type: "house" as const, price: 7500, tier: "youxuan" as const, beds: 3, baths: 2, guests: 6, area: 150, lat: 25.6465, lng: 100.1376 },
    { title: "古城南门精品公寓 · 拎包入住", type: "apartment" as const, price: 2800, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 48, lat: 25.5925, lng: 100.1676 },
    { title: "海舌公园旁湿地小院", type: "courtyard" as const, price: 5200, tier: "youxuan" as const, beds: 2, baths: 1, guests: 4, area: 90, lat: 25.7065, lng: 100.1476 },
    { title: "下关新城精装两居 · 配套最全", type: "apartment" as const, price: 3200, tier: "youshi" as const, beds: 2, baths: 1, guests: 4, area: 85, lat: 25.5765, lng: 100.2276 },
    { title: "挖色镇海景农家院 · 传统白族生活", type: "farmhouse" as const, price: 3500, tier: "youshi" as const, beds: 2, baths: 1, guests: 4, area: 110, lat: 25.8265, lng: 100.2776 },
    { title: "大理悠享海景套房 · 五星级体验", type: "villa" as const, price: 15000, tier: "youxiang" as const, beds: 3, baths: 3, guests: 6, area: 200, lat: 25.6065, lng: 100.2276 },
    { title: "凤阳邑古村改造院落 · 艺术驻留", type: "courtyard" as const, price: 4000, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 70, lat: 25.6265, lng: 100.1276 },
  ]),
  // === 西双版纳 (12 properties) ===
  {
    id: "prop-xsbn-001", host_id: "host-101", destination_id: "dest-xsbn",
    title: "景洪市中心康养公寓 · 银发旅居之选", description: "位于景洪市中心繁华地段，步行即达农贸市场、医院和公园。精装两居室，配备无障碍设施和紧急呼叫按钮。小区环境清幽，绿化率高，设有太极广场和棋牌室。距离西双版纳州人民医院仅800米，为银发旅居者提供安心保障。", short_description: "景洪市中心康养公寓，无障碍设施，近医院",
    property_type: "apartment", cover_image: unsplashImage("1600585154340-be6161a56a0c", { w: 800, h: 600 }),
    images: makeImages([
      "1600585154340-be6161a56a0c",
      "1502672260266-1c1ef2d93688",
      "1586023492125-27b2c045efd7",
    ]),
    address: "景洪市勐泐大道金版纳小区8栋", latitude: 22.0117, longitude: 100.7875,
    bedrooms: 2, bathrooms: 1, max_guests: 3, area_sqm: 85,
    price_weekly: 1400, price_monthly: 4000, price_quarterly: 10400,
    amenities: ["wifi", "kitchen", "ac", "washer", "tv", "elevator", "accessible", "medical", "security"],
    rating_living: 4.6, rating_internet: 4.2, rating_surroundings: 4.5, rating_safety: 4.8, rating_community: 4.7, rating_overall: 4.6, review_count: 45,
    tier: "youxuan", is_available: true, min_stay_days: 14, internet_speed_mbps: 100,
    has_kitchen: true, has_workspace: false, has_parking: true, has_elevator: true, is_accessible: true,
    host_name: "刘阿姨", host_avatar: unsplashImage("1544005313-94ddf0286df2", { w: 100, h: 100, faceCrop: true }), host_verified: true, created_at: "2024-01-15",
  },
  ...generateBatchProperties("dest-xsbn", "西双版纳", 2, 12, [
    { title: "告庄西双景傣式别墅 · 东南亚风情", type: "villa" as const, price: 8500, tier: "youxiang" as const, beds: 3, baths: 2, guests: 6, area: 160, lat: 21.9917, lng: 100.8075 },
    { title: "曼听公园旁花园公寓 · 鸟语花香", type: "apartment" as const, price: 3500, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 55, lat: 21.9817, lng: 100.7975 },
    { title: "勐仑植物园旁生态民宿 · 雨林深呼吸", type: "house" as const, price: 4200, tier: "youxuan" as const, beds: 2, baths: 1, guests: 4, area: 90, lat: 21.9217, lng: 101.2575 },
    { title: "嘎洒江边温泉度假屋 · 康养首选", type: "villa" as const, price: 12000, tier: "youxiang" as const, beds: 2, baths: 2, guests: 4, area: 130, lat: 22.0317, lng: 100.7575 },
    { title: "景洪经济型月租公寓 · 高性价比", type: "apartment" as const, price: 1800, tier: "youjian" as const, beds: 1, baths: 1, guests: 2, area: 40, lat: 22.0017, lng: 100.7675 },
    { title: "勐海普洱茶山小院 · 品茗养心", type: "farmhouse" as const, price: 3800, tier: "youshi" as const, beds: 2, baths: 1, guests: 4, area: 100, lat: 21.9617, lng: 100.4575 },
    { title: "澜沧江畔景观大平层 · 江景环绕", type: "apartment" as const, price: 5500, tier: "youxuan" as const, beds: 2, baths: 2, guests: 4, area: 110, lat: 22.0217, lng: 100.7975 },
    { title: "橄榄坝傣族竹楼体验 · 民族风情", type: "farmhouse" as const, price: 2500, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 50, lat: 21.8517, lng: 101.0075 },
    { title: "景洪泰式SPA养生公寓 · 身心放松", type: "apartment" as const, price: 6000, tier: "youxuan" as const, beds: 1, baths: 1, guests: 2, area: 70, lat: 22.0117, lng: 100.8075 },
    { title: "万达度假区精装套房 · 一站式生活", type: "apartment" as const, price: 4500, tier: "youxuan" as const, beds: 2, baths: 1, guests: 3, area: 80, lat: 21.9517, lng: 100.7375 },
    { title: "基诺山寨森林木屋 · 返璞归真", type: "house" as const, price: 2800, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 45, lat: 22.0617, lng: 100.9375 },
  ]),
  // === 海南 (13 properties) ===
  {
    id: "prop-hainan-001", host_id: "host-201", destination_id: "dest-hainan",
    title: "三亚湾海景大平层 · 270度无敌海景", description: "三亚湾路一线海景房，客厅和主卧均享270度海景。精装修，配备全套家电和厨具。小区自带泳池、健身房和花园，步行3分钟到沙滩。距三亚中心医院10分钟车程，适合追求高品质冬季旅居的银发群体和家庭。", short_description: "三亚湾一线海景，270度观海，泳池花园",
    property_type: "apartment", cover_image: unsplashImage("1519046904884-53103b34b206", { w: 800, h: 600 }),
    images: makeImages([
      "1519046904884-53103b34b206",
      "1600607687939-ce8a6c25118c",
      "1600585154340-be6161a56a0c",
      "1502672260266-1c1ef2d93688",
    ]),
    address: "三亚市三亚湾路凤凰水城12栋", latitude: 18.2628, longitude: 109.4619,
    bedrooms: 2, bathrooms: 2, max_guests: 4, area_sqm: 120,
    price_weekly: 3500, price_monthly: 10000, price_quarterly: 26000,
    amenities: ["wifi", "kitchen", "ac", "washer", "tv", "pool", "gym", "balcony", "security", "elevator", "accessible"],
    rating_living: 4.8, rating_internet: 4.5, rating_surroundings: 4.9, rating_safety: 4.7, rating_community: 4.4, rating_overall: 4.7, review_count: 52,
    tier: "youxiang", is_available: true, min_stay_days: 14, internet_speed_mbps: 200,
    has_kitchen: true, has_workspace: true, has_parking: true, has_elevator: true, is_accessible: true,
    host_name: "黄大伟", host_avatar: unsplashImage("1560250097-0b93528c311a", { w: 100, h: 100, faceCrop: true }), host_verified: true, created_at: "2024-01-10",
  },
  ...generateBatchProperties("dest-hainan", "海南", 2, 13, [
    { title: "万宁日月湾冲浪小屋 · 运动旅居", type: "house" as const, price: 4500, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 55, lat: 18.7128, lng: 110.3019 },
    { title: "陵水清水湾度假别墅 · 私家泳池", type: "villa" as const, price: 18000, tier: "youxiang" as const, beds: 4, baths: 3, guests: 8, area: 250, lat: 18.4228, lng: 110.0419 },
    { title: "海口观澜湖温泉公寓 · 温泉养生", type: "apartment" as const, price: 5000, tier: "youxuan" as const, beds: 1, baths: 1, guests: 2, area: 65, lat: 19.9528, lng: 110.3619 },
    { title: "三亚亚龙湾高端套房 · 五星配套", type: "apartment" as const, price: 15000, tier: "youxiang" as const, beds: 2, baths: 2, guests: 4, area: 100, lat: 18.1928, lng: 109.6419 },
    { title: "文昌椰林海边小屋 · 质朴海岛生活", type: "house" as const, price: 2500, tier: "youjian" as const, beds: 1, baths: 1, guests: 2, area: 50, lat: 19.5528, lng: 110.7619 },
    { title: "澄迈老城康养社区 · 银发乐园", type: "apartment" as const, price: 3500, tier: "youxuan" as const, beds: 2, baths: 1, guests: 3, area: 85, lat: 19.9828, lng: 110.0419 },
    { title: "博鳌亚洲论坛旁精装公寓", type: "apartment" as const, price: 4200, tier: "youxuan" as const, beds: 1, baths: 1, guests: 2, area: 60, lat: 19.1528, lng: 110.5819 },
    { title: "保亭七仙岭温泉别墅 · 山间温泉", type: "villa" as const, price: 12000, tier: "youxiang" as const, beds: 3, baths: 2, guests: 6, area: 180, lat: 18.6328, lng: 109.6919 },
    { title: "三亚崖州湾经济月租房 · 高性价比", type: "apartment" as const, price: 2200, tier: "youjian" as const, beds: 1, baths: 1, guests: 2, area: 45, lat: 18.3128, lng: 109.1619 },
    { title: "海口骑楼老街文化公寓 · 历史底蕴", type: "apartment" as const, price: 3000, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 55, lat: 20.0428, lng: 110.3519 },
    { title: "万宁兴隆热带花园洋房 · 家庭首选", type: "house" as const, price: 6500, tier: "youxuan" as const, beds: 3, baths: 2, guests: 6, area: 140, lat: 18.7428, lng: 110.1919 },
    { title: "琼海田园小别墅 · 瓜菜飘香", type: "villa" as const, price: 5500, tier: "youxuan" as const, beds: 2, baths: 1, guests: 4, area: 100, lat: 19.2528, lng: 110.4719 },
  ]),
  // === 成都 (10 properties) ===
  {
    id: "prop-cd-001", host_id: "host-301", destination_id: "dest-chengdu",
    title: "高新区科技园精装公寓 · 共享办公3分钟", description: "位于成都高新区天府软件园旁，步行3分钟可达WeWork和多家共享办公空间。精装修一居室，500Mbps光纤，人体工学升降桌+Herman Miller座椅。楼下有星巴克、便利店和各类餐饮，生活极为便利。适合需要高效办公环境的远程工作者。", short_description: "高新区科技园旁，500M光纤+人体工学办公",
    property_type: "apartment", cover_image: unsplashImage("1586023492125-27b2c045efd7", { w: 800, h: 600 }),
    images: makeImages(["1586023492125-27b2c045efd7", "1600607687939-ce8a6c25118c", "1502672260266-1c1ef2d93688"]),
    address: "成都市高新区天府三街凯德天府6栋", latitude: 30.5428, longitude: 104.0668,
    bedrooms: 1, bathrooms: 1, max_guests: 2, area_sqm: 55,
    price_weekly: 1680, price_monthly: 4800, price_quarterly: 12480,
    amenities: ["wifi", "kitchen", "workspace", "ac", "washer", "tv", "gym", "elevator", "security"],
    rating_living: 4.7, rating_internet: 5.0, rating_surroundings: 4.6, rating_safety: 4.8, rating_community: 4.5, rating_overall: 4.7, review_count: 38,
    tier: "youxuan", is_available: true, min_stay_days: 7, internet_speed_mbps: 500,
    has_kitchen: true, has_workspace: true, has_parking: true, has_elevator: true, is_accessible: true,
    host_name: "周鹏", host_avatar: unsplashImage("1506794778202-cad84cf45f1d", { w: 100, h: 100, faceCrop: true }), host_verified: true, created_at: "2024-03-01",
  },
  ...generateBatchProperties("dest-chengdu", "成都", 2, 10, [
    { title: "宽窄巷子旁中式院落 · 闹中取静", type: "courtyard" as const, price: 7000, tier: "youxuan" as const, beds: 2, baths: 1, guests: 4, area: 100, lat: 30.6728, lng: 104.0568 },
    { title: "春熙路太古里现代公寓 · 潮流中心", type: "apartment" as const, price: 5500, tier: "youxuan" as const, beds: 1, baths: 1, guests: 2, area: 60, lat: 30.6528, lng: 104.0868 },
    { title: "都江堰青城山脚下民宿 · 道法自然", type: "house" as const, price: 4800, tier: "youxuan" as const, beds: 2, baths: 1, guests: 4, area: 90, lat: 30.9928, lng: 103.5668 },
    { title: "天府新区科学城公寓 · 未来城市", type: "apartment" as const, price: 3200, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 50, lat: 30.4228, lng: 104.0768 },
    { title: "锦里附近川西小院 · 火锅底料的味道", type: "courtyard" as const, price: 5800, tier: "youxuan" as const, beds: 2, baths: 1, guests: 4, area: 85, lat: 30.6428, lng: 104.0468 },
    { title: "人民公园旁老成都公寓 · 鹤鸣茶社步行可达", type: "apartment" as const, price: 2800, tier: "youshi" as const, beds: 1, baths: 1, guests: 2, area: 50, lat: 30.6628, lng: 104.0568 },
    { title: "武侯区高品质两居 · 地铁直达全城", type: "apartment" as const, price: 3500, tier: "youshi" as const, beds: 2, baths: 1, guests: 3, area: 75, lat: 30.6328, lng: 104.0468 },
    { title: "龙泉驿桃花故里小别墅 · 四季花开", type: "villa" as const, price: 6500, tier: "youxuan" as const, beds: 3, baths: 2, guests: 6, area: 150, lat: 30.5828, lng: 104.2668 },
    { title: "金牛区经济月租房 · 背包客最爱", type: "apartment" as const, price: 1800, tier: "youjian" as const, beds: 1, baths: 1, guests: 1, area: 35, lat: 30.6928, lng: 104.0368 },
  ]),
];

function generateBatchProperties(
  destId: string,
  destName: string,
  startIdx: number,
  count: number,
  configs: Array<{
    title: string;
    type: Property["property_type"];
    price: number;
    tier: Property["tier"];
    beds: number;
    baths: number;
    guests: number;
    area: number;
    lat: number;
    lng: number;
  }>
): Property[] {
  const destPrefix = destId.split("-")[1];
  const coverImages = [...COVER_ROTATION];
  const hostNames = ["王强", "李娜", "张伟", "刘芳", "陈磊", "杨丽", "赵刚", "孙静", "周明", "吴婷", "郑华", "马丽"];
  const hostAvatars = [
    "1507003211169-0a1dd7228f2d", "1438761681033-6461ffad8d80", "1494790108377-be9c29b29330",
    "1472099645785-5658abf4ff4e", "1500648767791-00dcc994a43e", "1544005313-94ddf0286df2",
    "1560250097-0b93528c311a", "1506794778202-cad84cf45f1d",
  ];
  const defaultAmenities = ["wifi", "kitchen", "ac", "washer", "tv"];

  return configs.map((cfg, i) => {
    const idx = startIdx + i;
    const imgIdx = (idx - 1) % coverImages.length;
    const hostIdx = (idx - 1) % hostNames.length;
    const avatarIdx = (idx - 1) % hostAvatars.length;
    const weekly = cfg.price;
    const monthly = Math.round(weekly * 4 * 0.8);
    const quarterly = Math.round(monthly * 3 * 0.78);
    const rLiving = 3.8 + Math.random() * 1.2;
    const rInternet = 3.5 + Math.random() * 1.5;
    const rSurr = 3.8 + Math.random() * 1.2;
    const rSafe = 3.8 + Math.random() * 1.2;
    const rComm = 3.5 + Math.random() * 1.5;
    const round1 = (n: number) => Math.round(n * 10) / 10;

    return {
      id: `prop-${destPrefix}-${String(idx).padStart(3, "0")}`,
      host_id: `host-${destPrefix}-${idx}`,
      destination_id: destId,
      title: cfg.title,
      description: `${destName}优质旅居房源，${cfg.title}。精心打造的居住空间，适合中长期旅居生活。配备齐全的生活设施，让旅居如同回家。`,
      short_description: cfg.title.split("·")[1]?.trim() || cfg.title,
      property_type: cfg.type,
      cover_image: unsplashImage(coverImages[imgIdx], { w: 800, h: 600 }),
      images: makeImages([
        coverImages[imgIdx],
        coverImages[(imgIdx + 1) % coverImages.length],
        coverImages[(imgIdx + 2) % coverImages.length],
      ]),
      address: `${destName}市中心区域`,
      latitude: cfg.lat,
      longitude: cfg.lng,
      bedrooms: cfg.beds,
      bathrooms: cfg.baths,
      max_guests: cfg.guests,
      area_sqm: cfg.area,
      price_weekly: weekly,
      price_monthly: monthly,
      price_quarterly: quarterly,
      amenities: [...defaultAmenities, ...(cfg.beds > 1 ? ["parking"] : []), ...(cfg.area > 80 ? ["garden", "balcony"] : ["balcony"])],
      rating_living: round1(rLiving),
      rating_internet: round1(rInternet),
      rating_surroundings: round1(rSurr),
      rating_safety: round1(rSafe),
      rating_community: round1(rComm),
      rating_overall: round1((rLiving * 0.25 + rInternet * 0.2 + rSurr * 0.2 + rSafe * 0.2 + rComm * 0.15)),
      review_count: 5 + Math.floor(Math.random() * 50),
      tier: cfg.tier,
      is_available: true,
      min_stay_days: cfg.tier === "youxiang" ? 14 : 7,
      internet_speed_mbps: cfg.type === "apartment" ? 200 : 100,
      has_kitchen: true,
      has_workspace: cfg.type !== "farmhouse",
      has_parking: cfg.area > 60,
      has_elevator: cfg.type === "apartment",
      is_accessible: cfg.type === "apartment",
      host_name: hostNames[hostIdx],
      host_avatar: unsplashImage(hostAvatars[avatarIdx], { w: 100, h: 100, faceCrop: true }),
      host_verified: true,
      created_at: `2024-0${1 + (idx % 6)}-${10 + (idx % 20)}`,
    };
  });
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertiesByDestination(destinationId: string): Property[] {
  return properties.filter((p) => p.destination_id === destinationId);
}

export function searchProperties(filters: {
  destination?: string;
  priceMax?: number;
  priceMin?: number;
  guests?: number;
  tier?: string[];
  propertyType?: string[];
  sortBy?: string;
}): Property[] {
  let results = [...properties];

  if (filters.destination) {
    const dest = filters.destination;
    results = results.filter((p) => p.destination_id === `dest-${dest}` || p.destination_id.includes(dest));
  }
  if (filters.priceMin) {
    results = results.filter((p) => p.price_monthly >= filters.priceMin!);
  }
  if (filters.priceMax) {
    results = results.filter((p) => p.price_monthly <= filters.priceMax!);
  }
  if (filters.guests) {
    results = results.filter((p) => p.max_guests >= filters.guests!);
  }
  if (filters.tier?.length) {
    results = results.filter((p) => filters.tier!.includes(p.tier));
  }
  if (filters.propertyType?.length) {
    results = results.filter((p) => filters.propertyType!.includes(p.property_type));
  }

  switch (filters.sortBy) {
    case "price_asc":
      results.sort((a, b) => a.price_monthly - b.price_monthly);
      break;
    case "price_desc":
      results.sort((a, b) => b.price_monthly - a.price_monthly);
      break;
    case "rating":
      results.sort((a, b) => b.rating_overall - a.rating_overall);
      break;
    default:
      results.sort((a, b) => b.rating_overall - a.rating_overall);
  }

  return results;
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.rating_overall >= 4.6).slice(0, 8);
}
