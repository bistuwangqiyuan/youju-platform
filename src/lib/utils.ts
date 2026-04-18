import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return num.toLocaleString("zh-CN");
}

export function calculateStayPrice(
  weeklyPrice: number,
  monthlyPrice: number,
  quarterlyPrice: number,
  days: number
): { total: number; pricePerDay: number; pricingType: string; savings: number } {
  const dailyFromWeekly = weeklyPrice / 7;

  if (days >= 90) {
    const total = Math.round((quarterlyPrice / 90) * days);
    const pricePerDay = Math.round(quarterlyPrice / 90);
    const savings = Math.round(dailyFromWeekly * days - total);
    return { total, pricePerDay, pricingType: "季租", savings };
  }
  if (days >= 30) {
    const total = Math.round((monthlyPrice / 30) * days);
    const pricePerDay = Math.round(monthlyPrice / 30);
    const savings = Math.round(dailyFromWeekly * days - total);
    return { total, pricePerDay, pricingType: "月租", savings };
  }
  const total = Math.round(dailyFromWeekly * days);
  return { total, pricePerDay: Math.round(dailyFromWeekly), pricingType: "周租", savings: 0 };
}

export function getWeightedRating(ratings: {
  living: number;
  internet: number;
  surroundings: number;
  safety: number;
  community: number;
}): number {
  return Number(
    (
      ratings.living * 0.25 +
      ratings.internet * 0.2 +
      ratings.surroundings * 0.2 +
      ratings.safety * 0.2 +
      ratings.community * 0.15
    ).toFixed(1)
  );
}

export function getSojourIndexOverall(index: {
  climate: number;
  cost: number;
  medical: number;
  internet: number;
  transport: number;
  community: number;
  culture: number;
}): number {
  return Math.round(
    index.climate * 0.2 +
      index.cost * 0.2 +
      index.medical * 0.15 +
      index.internet * 0.15 +
      index.transport * 0.1 +
      index.community * 0.1 +
      index.culture * 0.1
  );
}

export function getTierLabel(tier: string): string {
  const labels: Record<string, string> = {
    youxiang: "悠享",
    youxuan: "悠选",
    youshi: "悠适",
    youjian: "悠简",
  };
  return labels[tier] || tier;
}

export function getTierStars(tier: string): number {
  const stars: Record<string, number> = {
    youxiang: 5,
    youxuan: 4,
    youshi: 3,
    youjian: 2,
  };
  return stars[tier] || 3;
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    silver: "银发康养",
    nomad: "数字游民",
    family: "亲子旅居",
    wellness: "康养疗休",
    guide: "旅居攻略",
    story: "旅居故事",
  };
  return labels[category] || category;
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: "公寓",
    house: "独栋",
    villa: "别墅",
    studio: "工作室",
    farmhouse: "农家院",
    courtyard: "四合院",
  };
  return labels[type] || type;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function daysBetween(start: string | Date, end: string | Date): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}
