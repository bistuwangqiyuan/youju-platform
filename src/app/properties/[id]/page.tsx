import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPropertyById,
  getPropertiesByDestination,
  getReviewsByPropertyId,
} from "@/lib/data";
import {
  formatPrice,
  getTierLabel,
  getTierStars,
  getPropertyTypeLabel,
  getWeightedRating,
} from "@/lib/utils";
import { AMENITY_LABELS, AMENITY_ICONS, RATING_DIMENSIONS, STAY_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ImageGallery from "@/components/property/ImageGallery";
import RatingRadar from "@/components/property/RatingRadar";
import BookingSidebar from "@/components/property/BookingSidebar";
import ReviewList from "@/components/property/ReviewList";
import {
  Star,
  MapPin,
  Bed,
  Bath,
  Users,
  Wifi,
  Maximize,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(id);
  if (!property) return { title: "房源未找到 - 悠居" };
  return {
    title: `${property.title} - 悠居`,
    description: property.short_description,
    openGraph: {
      title: property.title,
      description: property.short_description,
      images: [property.cover_image],
    },
  };
}

const AMENITY_ICON_MAP: Record<string, React.ReactNode> = {};

function AmenityIcon({ name }: { name: string }) {
  return (
    <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
      <CheckCircle className="h-3 w-3 text-primary" />
    </div>
  );
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  const reviews = getReviewsByPropertyId(property.id);
  const similarProperties = getPropertiesByDestination(property.destination_id)
    .filter((p) => p.id !== property.id)
    .slice(0, 4);

  const tierStars = getTierStars(property.tier);
  const weightedRating = getWeightedRating({
    living: property.rating_living,
    internet: property.rating_internet,
    surroundings: property.rating_surroundings,
    safety: property.rating_safety,
    community: property.rating_community,
  });

  const weeklyDaily = Math.round(property.price_weekly / 7);
  const monthlyDaily = Math.round(property.price_monthly / 30);
  const quarterlyDaily = Math.round(property.price_quarterly / 90);
  const monthlySavings = Math.round(
    ((weeklyDaily - monthlyDaily) / weeklyDaily) * 100
  );
  const quarterlySavings = Math.round(
    ((weeklyDaily - quarterlyDaily) / weeklyDaily) * 100
  );

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            首页
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/search" className="hover:text-primary transition-colors">
            搜索房源
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px]">
            {property.title}
          </span>
        </nav>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <ImageGallery images={property.images} title={property.title} />
      </div>

      {/* Main content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="lg:flex gap-8">
          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Title section */}
            <section>
              <div className="flex items-start gap-3 flex-wrap">
                <Badge
                  className="text-xs px-2.5 py-0.5 font-semibold shrink-0"
                  style={{
                    backgroundColor: `var(--color-tier-${property.tier})`,
                    color: "white",
                  }}
                >
                  {getTierLabel(property.tier)} {"★".repeat(tierStars)}
                </Badge>
                <Badge variant="outline" className="text-xs shrink-0">
                  {getPropertyTypeLabel(property.property_type)}
                </Badge>
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight font-serif">
                {property.title}
              </h1>
              <div className="mt-3 flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.address}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-foreground">
                    {property.rating_overall.toFixed(1)}
                  </span>
                  ({property.review_count}条评价)
                </span>
              </div>

              {/* Quick specs */}
              <div className="mt-4 flex items-center gap-4 sm:gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-sm">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bedrooms}间卧室</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bathrooms}间卫生间</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>最多{property.max_guests}人</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Maximize className="h-4 w-4 text-muted-foreground" />
                  <span>{property.area_sqm}㎡</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <span>{property.internet_speed_mbps}Mbps</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Host info */}
            <section className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                <img
                  src={property.host_avatar}
                  alt={property.host_name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{property.host_name}</span>
                  {property.host_verified && (
                    <Badge className="text-[10px] px-1.5 py-0 gap-0.5">
                      <ShieldCheck className="h-3 w-3" />
                      已认证
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">房东</p>
              </div>
            </section>

            <Separator />

            {/* Description */}
            <section>
              <h2 className="text-lg font-semibold mb-3">房源介绍</h2>
              <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                {property.description}
              </p>
            </section>

            <Separator />

            {/* Amenities */}
            <section>
              <h2 className="text-lg font-semibold mb-4">设施服务</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {property.amenities.map((key) => (
                  <div
                    key={key}
                    className="flex items-center gap-2.5 rounded-xl border border-border p-3 text-sm"
                  >
                    <AmenityIcon name={key} />
                    <span>{AMENITY_LABELS[key] || key}</span>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Rating radar */}
            <section>
              <h2 className="text-lg font-semibold mb-4">五维评分</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <RatingRadar
                  ratings={{
                    living: property.rating_living,
                    internet: property.rating_internet,
                    surroundings: property.rating_surroundings,
                    safety: property.rating_safety,
                    community: property.rating_community,
                  }}
                />
                <div className="flex-1 space-y-3 w-full">
                  {RATING_DIMENSIONS.map((dim) => {
                    const key = `rating_${dim.key}` as keyof typeof property;
                    const value = property[key] as number;
                    return (
                      <div key={dim.key} className="flex items-center gap-3">
                        <span className="text-sm w-20 shrink-0 text-muted-foreground">
                          {dim.label}
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${(value / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold w-8 text-right">
                          {value.toFixed(1)}
                        </span>
                      </div>
                    );
                  })}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">综合加权</span>
                    <span className="text-lg font-bold text-primary">
                      {weightedRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Pricing section */}
            <section>
              <h2 className="text-lg font-semibold mb-4">价格方案</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Weekly */}
                <div className="rounded-2xl border border-border p-5 text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    {STAY_TYPES[0].label}
                  </div>
                  <div className="text-2xl font-bold">
                    {formatPrice(property.price_weekly)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    约{formatPrice(weeklyDaily)}/天
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    基准价
                  </Badge>
                </div>
                {/* Monthly */}
                <div className="rounded-2xl border-2 border-primary p-5 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="text-xs">推荐</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {STAY_TYPES[1].label}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(property.price_monthly)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    约{formatPrice(monthlyDaily)}/天
                  </div>
                  <Badge className="mt-2 text-xs bg-primary/10 text-primary border-0">
                    省{monthlySavings}%
                  </Badge>
                </div>
                {/* Quarterly */}
                <div className="rounded-2xl border border-border p-5 text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    {STAY_TYPES[2].label}
                  </div>
                  <div className="text-2xl font-bold">
                    {formatPrice(property.price_quarterly)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    约{formatPrice(quarterlyDaily)}/天
                  </div>
                  <Badge className="mt-2 text-xs bg-primary/10 text-primary border-0">
                    省{quarterlySavings}%
                  </Badge>
                </div>
              </div>
            </section>

            <Separator />

            {/* Reviews */}
            <section>
              <h2 className="text-lg font-semibold mb-4">
                住客评价
                <span className="ml-2 text-muted-foreground font-normal text-base">
                  ({reviews.length})
                </span>
              </h2>
              <ReviewList reviews={reviews} />
            </section>

            <Separator />

            {/* Similar properties */}
            {similarProperties.length > 0 && (
              <section className="pb-8">
                <h2 className="text-lg font-semibold mb-4">相似房源推荐</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {similarProperties.map((p) => (
                    <Link
                      key={p.id}
                      href={`/properties/${p.id}`}
                      className="group block"
                    >
                      <div className="rounded-xl border border-border overflow-hidden bg-white hover:shadow-md transition-shadow">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={p.cover_image}
                            alt={p.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 space-y-1">
                          <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {p.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-0.5">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {p.rating_overall.toFixed(1)}
                            </span>
                            <span className="font-semibold text-primary">
                              {formatPrice(p.price_monthly)}/月
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-full lg:w-[380px] shrink-0">
            <BookingSidebar property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
