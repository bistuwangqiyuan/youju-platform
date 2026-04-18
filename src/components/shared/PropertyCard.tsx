"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin, Users, BedDouble, Home } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatPrice, getTierLabel, getPropertyTypeLabel, cn } from "@/lib/utils";

const tierColors: Record<string, string> = {
  youxiang: "bg-tier-youxiang text-white",
  youxuan: "bg-tier-youxuan text-white",
  youshi: "bg-tier-youshi text-white",
  youjian: "bg-tier-youjian text-white",
};

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < full
              ? "fill-amber-400 text-amber-400"
              : i === full && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "fill-muted text-muted"
          )}
        />
      ))}
    </span>
  );
}

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={`/properties/${property.id}`}
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.cover_image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <span
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-md shadow-sm",
            tierColors[property.tier] || "bg-gray-500 text-white"
          )}
        >
          {getTierLabel(property.tier)}
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors",
            liked
              ? "bg-red-500/90 text-white"
              : "bg-white/70 text-gray-600 hover:bg-white hover:text-red-500"
          )}
          aria-label={liked ? "取消收藏" : "收藏"}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        </button>
      </div>

      <div className="p-4 space-y-2.5">
        <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {property.destination?.name ?? ""} {property.address}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <RatingStars rating={property.rating_overall} />
          <span className="font-medium text-foreground">{property.rating_overall}</span>
          <span className="text-muted-foreground">({property.review_count}条评价)</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            {getPropertyTypeLabel(property.property_type)}
          </span>
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" />
            {property.bedrooms}居室
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {property.max_guests}人
          </span>
        </div>

        <div className="pt-2 border-t border-border flex items-baseline justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatPrice(property.price_monthly)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">/月租</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {formatPrice(property.price_weekly)}/周
          </span>
        </div>
      </div>
    </Link>
  );
}
