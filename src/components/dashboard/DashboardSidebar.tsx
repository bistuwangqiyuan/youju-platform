"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

export interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  title: string;
}

export default function DashboardSidebar({
  items,
  title,
}: DashboardSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = (
    <nav className="flex flex-col gap-0.5 px-3">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-brand-green/10 text-brand-green"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile FAB toggle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center justify-center size-14 rounded-full bg-brand-green text-white shadow-lg hover:bg-brand-green-dark transition-colors active:scale-95"
        aria-label="打开导航菜单"
      >
        <Menu className="size-6" />
      </button>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-visibility",
          open ? "visible" : "invisible pointer-events-none"
        )}
        aria-modal={open}
        role="dialog"
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={cn(
            "absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-brand-green">
                {BRAND.name}
              </span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{title}</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="关闭菜单"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">{navLinks}</div>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-white">
        <div className="px-6 h-16 flex flex-col justify-center border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="font-serif text-lg font-bold text-brand-green">
              {BRAND.name}
            </span>
          </Link>
          <p className="text-xs text-muted-foreground -mt-0.5">{title}</p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">{navLinks}</div>
      </aside>
    </>
  );
}
