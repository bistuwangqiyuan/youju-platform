"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { destinations } from "@/lib/data";
import { PROPERTY_TYPES, AMENITY_LABELS } from "@/lib/constants";
import { cn, getTierLabel } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  CalendarDays,
  Users,
} from "lucide-react";

const TIERS = [
  { value: "youxiang", label: "悠享", color: "bg-tier-youxiang" },
  { value: "youxuan", label: "悠选", color: "bg-tier-youxuan" },
  { value: "youshi", label: "悠适", color: "bg-tier-youshi" },
  { value: "youjian", label: "悠简", color: "bg-tier-youjian" },
] as const;

const SORT_OPTIONS = [
  { value: "rating", label: "评分最高" },
  { value: "price_asc", label: "价格低→高" },
  { value: "price_desc", label: "价格高→低" },
  { value: "newest", label: "最新上线" },
] as const;

const AMENITY_KEYS = Object.keys(AMENITY_LABELS);

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

interface SearchFiltersProps {
  children: React.ReactNode;
}

export default function SearchFilters({ children }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = {
    destination: searchParams.get("destination") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: searchParams.get("guests") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    propertyType: searchParams.getAll("propertyType"),
    tier: searchParams.getAll("tier"),
    amenities: searchParams.getAll("amenities"),
    sortBy: searchParams.get("sortBy") || "rating",
  };

  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        params.delete(key);
        if (value === null || value === "") continue;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }

      router.push(`/search?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const existing = searchParams.getAll(key);
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      updateParams({ [key]: next.length ? next : null });
    },
    [searchParams, updateParams]
  );

  const clearAll = useCallback(() => {
    router.push("/search");
  }, [router]);

  const activeFilterCount =
    current.propertyType.length +
    current.tier.length +
    current.amenities.length +
    (current.priceMin ? 1 : 0) +
    (current.priceMax ? 1 : 0);

  const filterPanel = (
    <div className="space-y-4">
      {/* Sort */}
      <CollapsibleSection title="排序方式">
        <Select
          value={current.sortBy}
          onChange={(e) => updateParams({ sortBy: e.target.value })}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </CollapsibleSection>

      {/* Price Range */}
      <CollapsibleSection title="月租价格范围">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="最低"
            value={current.priceMin}
            onChange={(e) => updateParams({ priceMin: e.target.value || null })}
            className="w-full"
          />
          <span className="text-muted-foreground shrink-0">—</span>
          <Input
            type="number"
            placeholder="最高"
            value={current.priceMax}
            onChange={(e) => updateParams({ priceMax: e.target.value || null })}
            className="w-full"
          />
        </div>
      </CollapsibleSection>

      {/* Property Type */}
      <CollapsibleSection title="房源类型">
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPES.map((pt) => (
            <label
              key={pt.value}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                current.propertyType.includes(pt.value)
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-border hover:border-primary/40"
              )}
            >
              <input
                type="checkbox"
                checked={current.propertyType.includes(pt.value)}
                onChange={() => toggleArrayParam("propertyType", pt.value)}
                className="sr-only"
              />
              {pt.label}
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Tier */}
      <CollapsibleSection title="房源等级">
        <div className="grid grid-cols-2 gap-2">
          {TIERS.map((t) => (
            <label
              key={t.value}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                current.tier.includes(t.value)
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : "border-border hover:border-primary/40"
              )}
            >
              <input
                type="checkbox"
                checked={current.tier.includes(t.value)}
                onChange={() => toggleArrayParam("tier", t.value)}
                className="sr-only"
              />
              <span
                className={cn("h-2 w-2 rounded-full", t.color)}
              />
              {t.label}
            </label>
          ))}
        </div>
      </CollapsibleSection>

      {/* Amenities */}
      <CollapsibleSection title="设施服务" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {AMENITY_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleArrayParam("amenities", key)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                current.amenities.includes(key)
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:border-primary/40 text-foreground"
              )}
            >
              {AMENITY_LABELS[key]}
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Clear */}
      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearAll} className="w-full">
          <X className="h-3 w-3" />
          清除所有筛选 ({activeFilterCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Top Search Bar */}
      <div className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Select
                value={current.destination}
                onChange={(e) =>
                  updateParams({ destination: e.target.value || null })
                }
                className="pl-9"
              >
                <option value="">全部目的地</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name} · {d.province}
                  </option>
                ))}
              </Select>
            </div>
            <div className="relative flex-1">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                placeholder="入住日期"
                value={current.checkIn}
                onChange={(e) =>
                  updateParams({ checkIn: e.target.value || null })
                }
                className="pl-9"
              />
            </div>
            <div className="relative flex-1">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                placeholder="退房日期"
                value={current.checkOut}
                onChange={(e) =>
                  updateParams({ checkOut: e.target.value || null })
                }
                className="pl-9"
              />
            </div>
            <div className="relative w-full sm:w-32">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="number"
                min={1}
                max={20}
                placeholder="人数"
                value={current.guests}
                onChange={(e) =>
                  updateParams({ guests: e.target.value || null })
                }
                className="pl-9"
              />
            </div>
            <Button className="sm:w-auto">
              <Search className="h-4 w-4" />
              搜索
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden px-4 py-3 border-b border-border bg-white flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          筛选
          {activeFilterCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        {current.tier.map((t) => (
          <Badge key={t} variant="outline" className="text-xs">
            {getTierLabel(t)}
            <button type="button" onClick={() => toggleArrayParam("tier", t)} className="ml-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Mobile Filter Panel */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-border px-4 py-4">
          {filterPanel}
        </div>
      )}

      {/* Content area: sidebar + children */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 space-y-4 pr-6">{filterPanel}</div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </>
  );
}
