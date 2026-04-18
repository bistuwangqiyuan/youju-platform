import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Destination } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export default function DestinationCard({ destination, className }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative block rounded-xl overflow-hidden",
        "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={destination.cover_image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3 flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
          <div className="text-center">
            <span className="block text-base font-bold text-primary leading-none">
              {destination.overall_score}
            </span>
            <span className="block text-[9px] text-muted-foreground leading-tight">旅居指数</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <div>
            <h3 className="text-xl font-bold text-white">{destination.name}</h3>
            <div className="flex items-center gap-1 text-white/80 text-sm mt-0.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{destination.province}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {destination.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-white/20 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-white/90">
            <span>{destination.property_count}+ 房源</span>
            <span>
              约 {formatPrice(destination.avg_monthly_cost)}/月起
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
