import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { destinations } from "@/lib/data";
import { formatPrice, getSojourIndexOverall } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "旅居目的地 - 悠居",
  description: "发现中国最适合旅居的城市，覆盖300+城市的旅居宜居指数",
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-green-dark py-20 text-white">
        <div className="bg-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            旅居目的地
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            发现中国最适合旅居的城市，用旅居宜居指数为你科学选址
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {destinations.map((dest) => {
            const overall = getSojourIndexOverall({
              climate: dest.climate_score,
              cost: dest.cost_score,
              medical: dest.medical_score,
              internet: dest.internet_score,
              transport: dest.transport_score,
              community: dest.community_score,
              culture: dest.culture_score,
            });

            return (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={dest.cover_image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Score circle */}
                    <div className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-brand-green/90 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold leading-tight text-white">
                          {overall}
                        </div>
                        <div className="text-[10px] leading-none text-white/80">
                          宜居
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <h2 className="text-2xl font-bold text-white">
                        {dest.name}
                      </h2>
                      <p className="text-sm text-white/80">{dest.province}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {dest.short_description}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {dest.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
                      <span>
                        <span className="font-semibold text-foreground">
                          {dest.property_count}
                        </span>{" "}
                        套房源
                      </span>
                      <span>
                        月均{" "}
                        <span className="font-semibold text-primary">
                          {formatPrice(dest.avg_monthly_cost)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
