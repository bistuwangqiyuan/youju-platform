import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  destinations,
  getDestinationBySlug,
  getPropertiesByDestination,
  getPostsByDestination,
} from "@/lib/data";
import { formatPrice, getSojourIndexOverall, getCategoryLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import SojourIndexChart from "@/components/destination/SojourIndexChart";
import PropertyCard from "@/components/shared/PropertyCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: "未找到 - 悠居" };
  return {
    title: `${dest.name}旅居指南 - 悠居`,
    description: dest.short_description,
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const properties = getPropertiesByDestination(dest.id);
  const posts = getPostsByDestination(dest.id);

  const scores = {
    climate: dest.climate_score,
    cost: dest.cost_score,
    medical: dest.medical_score,
    internet: dest.internet_score,
    transport: dest.transport_score,
    community: dest.community_score,
    culture: dest.culture_score,
  };
  const overall = getSojourIndexOverall(scores);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src={dest.cover_image}
          alt={dest.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/destinations"
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
            >
              ← 返回目的地
            </Link>
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
              {dest.name}
            </h1>
            <p className="mt-2 text-lg text-white/80">{dest.province}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Sojourn Index */}
        <section className="mb-12 overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              旅居宜居指数
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              基于7个维度的综合评估
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
            <SojourIndexChart scores={scores} size={320} />

            <div className="flex flex-col items-center gap-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-brand-green bg-brand-green/5">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-green">
                    {overall}
                  </div>
                  <div className="text-xs text-muted-foreground">综合评分</div>
                </div>
              </div>
              <p className="max-w-xs text-center text-sm text-muted-foreground">
                {overall >= 85
                  ? "极佳旅居目的地，各项指标均表现优异"
                  : overall >= 75
                    ? "优秀旅居目的地，综合条件良好"
                    : "良好旅居目的地，部分指标突出"}
              </p>
            </div>
          </div>
        </section>

        {/* Info cards */}
        <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">月均生活成本</div>
            <div className="mt-1 text-2xl font-bold text-primary">
              {formatPrice(dest.avg_monthly_cost)}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">冬季均温</div>
            <div className="mt-1 text-2xl font-bold text-brand-blue">
              {dest.avg_temperature_winter}°C
            </div>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">夏季均温</div>
            <div className="mt-1 text-2xl font-bold text-amber-600">
              {dest.avg_temperature_summer}°C
            </div>
          </div>
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">最佳旅居月份</div>
            <div className="mt-1 text-lg font-semibold text-foreground">
              {dest.best_months.slice(0, 3).join("、")}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="mb-12 rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
            关于{dest.name}
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
            {dest.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {dest.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {dest.gallery_images.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
              城市风光
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dest.gallery_images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/2] overflow-hidden rounded-xl"
                >
                  <Image
                    src={img}
                    alt={`${dest.name}风光 ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Properties */}
        {properties.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {dest.name}的房源
              </h2>
              <span className="text-sm text-muted-foreground">
                共 {dest.property_count} 套
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </section>
        )}

        {/* Community posts */}
        {posts.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
              社区讨论
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="group block rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <Badge variant="outline" className="mb-2 text-xs">
                    {getCategoryLabel(post.category)}
                  </Badge>
                  <h3 className="mb-2 font-semibold text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{post.author_name}</span>
                    <span>·</span>
                    <span>❤ {post.likes_count}</span>
                    <span>💬 {post.comments_count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
