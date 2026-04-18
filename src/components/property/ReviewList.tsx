import type { Review } from "@/lib/types";
import { RATING_DIMENSIONS } from "@/lib/constants";
import { getCategoryLabel, getWeightedRating } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageSquare } from "lucide-react";

interface ReviewListProps {
  reviews: Review[];
}

function ReviewScoreSummary({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  const avgByDim = RATING_DIMENSIONS.map((dim) => {
    const key = `rating_${dim.key}` as keyof Review;
    const avg =
      reviews.reduce((sum, r) => sum + (r[key] as number), 0) / reviews.length;
    return { ...dim, avg: Number(avg.toFixed(1)) };
  });

  const overallAvg =
    reviews.reduce((sum, r) => sum + r.rating_overall, 0) / reviews.length;

  return (
    <div className="bg-brand-cream rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold text-primary">
          {overallAvg.toFixed(1)}
        </div>
        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(overallAvg)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {reviews.length} 条评价
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {avgByDim.map((dim) => (
          <div key={dim.key} className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {dim.avg}
            </div>
            <div className="text-xs text-muted-foreground">{dim.label}</div>
            <div className="mt-1 h-1.5 rounded-full bg-white overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(dim.avg / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const stayTypeVariant = review.stay_type as
    | "silver"
    | "nomad"
    | "family"
    | "wellness";

  const stayWeeks = Math.round(review.stay_duration_days / 7);
  const stayLabel =
    review.stay_duration_days >= 30
      ? `住了${Math.round(review.stay_duration_days / 30)}个月`
      : `住了${stayWeeks}周`;

  return (
    <div className="py-5 border-b border-border last:border-b-0">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={review.user_avatar} alt={review.user_name} />
          <AvatarFallback>{review.user_name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm">{review.user_name}</span>
            <Badge variant={stayTypeVariant} className="text-[10px] px-2 py-0">
              {getCategoryLabel(review.stay_type)}
            </Badge>
            <span className="text-xs text-muted-foreground">{stayLabel}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(review.rating_overall)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {review.rating_overall.toFixed(1)}
            </span>
          </div>
        </div>
        <time className="text-xs text-muted-foreground shrink-0">
          {review.created_at}
        </time>
      </div>

      <p className="mt-3 text-sm text-foreground/90 leading-relaxed">
        {review.content}
      </p>

      {/* Mini dimension scores */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {RATING_DIMENSIONS.map((dim) => {
          const key = `rating_${dim.key}` as keyof Review;
          const val = review[key] as number;
          return (
            <span key={dim.key} className="text-xs text-muted-foreground">
              {dim.label}{" "}
              <span className="font-medium text-foreground">{val.toFixed(1)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>暂无评价</p>
      </div>
    );
  }

  return (
    <div>
      <ReviewScoreSummary reviews={reviews} />
      <div>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
