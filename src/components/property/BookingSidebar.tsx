"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Property } from "@/lib/types";
import {
  formatPrice,
  calculateStayPrice,
  daysBetween,
} from "@/lib/utils";
import {
  CalendarDays,
  Users,
  ShieldCheck,
  Minus,
  Plus,
  Info,
} from "lucide-react";

interface BookingSidebarProps {
  property: Property;
}

export default function BookingSidebar({ property }: BookingSidebarProps) {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const pricing = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    const days = daysBetween(checkIn, checkOut);
    if (days <= 0) return null;
    return calculateStayPrice(
      property.price_weekly,
      property.price_monthly,
      property.price_quarterly,
      days
    );
  }, [checkIn, checkOut, property]);

  const serviceFeeRate = 0.08;
  const serviceFee = pricing ? Math.round(pricing.total * serviceFeeRate) : 0;
  const totalWithFee = pricing ? pricing.total + serviceFee : 0;
  const stayDays = checkIn && checkOut ? daysBetween(checkIn, checkOut) : 0;

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-lg space-y-5">
          {/* Header price */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(property.price_monthly)}
              </span>
              <span className="text-sm text-muted-foreground">/月</span>
            </div>
            <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
              <span>{formatPrice(property.price_weekly)}/周</span>
              <span>{formatPrice(property.price_quarterly)}/季</span>
            </div>
          </div>

          <Separator />

          {/* Date inputs */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                入住
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="pl-8 text-sm h-9"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                退房
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="pl-8 text-sm h-9"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              入住人数
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-sm font-medium w-16 text-center">
                {guests} 人
              </span>
              <button
                type="button"
                onClick={() =>
                  setGuests((g) => Math.min(property.max_guests, g + 1))
                }
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
              <span className="text-xs text-muted-foreground">
                最多{property.max_guests}人
              </span>
            </div>
          </div>

          {/* Price breakdown */}
          {pricing && stayDays > 0 && (
            <>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatPrice(pricing.pricePerDay)}/天 × {stayDays}天
                    <span className="ml-1 text-xs text-primary font-medium">
                      ({pricing.pricingType})
                    </span>
                  </span>
                  <span>{formatPrice(pricing.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">服务费 (8%)</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                {pricing.savings > 0 && (
                  <div className="flex justify-between text-primary">
                    <span className="flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      长住优惠
                    </span>
                    <span>-{formatPrice(pricing.savings)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>总计</span>
                  <span>{formatPrice(totalWithFee)}</span>
                </div>
              </div>
            </>
          )}

          {/* CTA */}
          <Button size="lg" className="w-full text-base">
            预订
          </Button>

          {/* Trust info */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-brand-cream rounded-lg p-3">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">先住后付</p>
              <p className="mt-0.5">
                银卡及以上会员享受先入住后付款，入住满意再付全款
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">
                {formatPrice(property.price_monthly)}
              </span>
              <span className="text-xs text-muted-foreground">/月起</span>
            </div>
            {pricing && stayDays > 0 && (
              <p className="text-xs text-muted-foreground">
                {stayDays}天共 {formatPrice(totalWithFee)}
              </p>
            )}
          </div>
          <Button size="lg" className="px-8">
            预订
          </Button>
        </div>
      </div>
    </>
  );
}
