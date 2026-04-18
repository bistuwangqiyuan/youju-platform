import { Suspense } from "react";
import Link from "next/link";
import { searchProperties, destinations } from "@/lib/data";
import {
  formatPrice,
  getTierLabel,
  getTierStars,
  getPropertyTypeLabel,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SearchFilters from "@/components/search/SearchFilters";
import { Star, MapPin, Bed, Bath, Users, Wifi, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "搜索房源 - 悠居",
  description: "发现全国300+城市的旅居民宿房源",
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getStringArray(
  value: string | string[] | undefined
): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  return [value];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const filters = {
    destination: typeof params.destination === "string" ? params.destination : undefined,
    priceMin: typeof params.priceMin === "string" ? Number(params.priceMin) : undefined,
    priceMax: typeof params.priceMax === "string" ? Number(params.priceMax) : undefined,
    guests: typeof params.guests === "string" ? Number(params.guests) : undefined,
    propertyType: getStringArray(params.propertyType),
    tier: getStringArray(params.tier),
    sortBy: typeof params.sortBy === "string" ? params.sortBy : undefined,
  };

  const results = searchProperties(filters);

  const destName = filters.destination
    ? destinations.find(
        (d) => d.slug === filters.destination || d.id.includes(filters.destination!)
      )?.name
    : undefined;

  return (
    <div className="min-h-screen bg-brand-cream/30">
      <Suspense>
        <SearchFilters>
          {/* Result count */}
          <div className="mb-5 flex items-center justify-between">
            <h1 className="text-lg font-semibold">
              {destName ? `${destName}的房源` : "全部房源"}
              <span className="ml-2 text-muted-foreground font-normal text-base">
                共 {results.length} 套
              </span>
            </h1>
          </div>

          {/* Results grid */}
          {results.length === 0 ? (
            <div className="text-center py-20">
              <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
              <h2 className="text-lg font-medium mb-2">没有找到匹配的房源</h2>
              <p className="text-muted-foreground text-sm">
                试试调整筛选条件或选择其他目的地
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((property) => {
                const tierStars = getTierStars(property.tier);
                return (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="group block"
                  >
                    <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={property.cover_image}
                          alt={property.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge
                            className="text-[10px] px-2 py-0.5 font-semibold"
                            style={{
                              backgroundColor: `var(--color-tier-${property.tier})`,
                              color: "white",
                            }}
                          >
                            {getTierLabel(property.tier)}
                            <span className="ml-0.5">
                              {"★".repeat(tierStars)}
                            </span>
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge
                            variant="outline"
                            className="bg-white/90 backdrop-blur-sm text-[10px] px-2"
                          >
                            {getPropertyTypeLabel(property.property_type)}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {property.title}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{property.address}</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Bed className="h-3 w-3" />
                            {property.bedrooms}室
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="h-3 w-3" />
                            {property.bathrooms}卫
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {property.max_guests}人
                          </span>
                          <span className="flex items-center gap-1">
                            <Wifi className="h-3 w-3" />
                            {property.internet_speed_mbps}M
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-semibold">
                              {property.rating_overall.toFixed(1)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({property.review_count})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-bold text-primary">
                              {formatPrice(property.price_monthly)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              /月
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </SearchFilters>
      </Suspense>
    </div>
  );
}
