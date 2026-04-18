"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Accessibility,
  Mountain,
  Home,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { useSeniorMode } from "./SeniorModeProvider";

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      {/* Mountain */}
      <path
        d="M4 26L12 10L17 18L20 14L28 26H4Z"
        fill="currentColor"
        opacity={0.15}
      />
      <path
        d="M4 26L12 10L17 18L20 14L28 26"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* House */}
      <path
        d="M18 26V20H24V26"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M16 21L21 17L26 21"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { seniorMode, toggleSeniorMode } = useSeniorMode();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const headerBg =
    scrolled || !isHome || mobileOpen
      ? "bg-white/95 backdrop-blur-md shadow-sm"
      : "bg-transparent";

  const textColor =
    scrolled || !isHome || mobileOpen
      ? "text-brand-dark"
      : "text-white";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          headerBg
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                textColor
              )}
            >
              <LogoIcon
                className={cn(
                  scrolled || !isHome
                    ? "text-brand-green"
                    : "text-white"
                )}
              />
              <span className="font-serif text-xl font-bold tracking-wide">
                {BRAND.name}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-[length:var(--font-size-sm)] font-medium transition-colors",
                      active
                        ? scrolled || !isHome
                          ? "text-brand-green bg-brand-green/5"
                          : "text-white bg-white/15"
                        : scrolled || !isHome
                          ? "text-brand-dark/70 hover:text-brand-green hover:bg-brand-green/5"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSeniorMode}
                className={cn(
                  "hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[length:var(--font-size-xs)] font-medium transition-colors",
                  seniorMode
                    ? "bg-brand-green text-white"
                    : scrolled || !isHome
                      ? "text-brand-dark/60 hover:text-brand-green hover:bg-brand-green/5"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                )}
                title={seniorMode ? "关闭大字模式" : "开启大字模式"}
              >
                <Accessibility className="size-4" />
                <span className="hidden md:inline">大字模式</span>
              </button>

              <Link
                href="/host"
                className={cn(
                  "hidden sm:inline-flex rounded-lg px-3 py-1.5 text-[length:var(--font-size-sm)] font-medium transition-colors",
                  scrolled || !isHome
                    ? "text-brand-dark/70 hover:text-brand-green"
                    : "text-white/80 hover:text-white"
                )}
              >
                成为房东
              </Link>

              <Link
                href="/login"
                className={cn(
                  "hidden sm:inline-flex items-center rounded-lg px-4 py-1.5 text-[length:var(--font-size-sm)] font-medium transition-colors",
                  scrolled || !isHome
                    ? "bg-brand-green text-white hover:bg-brand-green-dark"
                    : "bg-white text-brand-green hover:bg-white/90"
                )}
              >
                登录
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                className={cn(
                  "lg:hidden rounded-lg p-2 transition-colors",
                  scrolled || !isHome
                    ? "text-brand-dark hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                )}
                aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
              >
                {mobileOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white",
            mobileOpen ? "max-h-[80vh] border-t border-gray-100" : "max-h-0"
          )}
        >
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-4 py-3 text-[length:var(--font-size-base)] font-medium transition-colors",
                    active
                      ? "bg-brand-green/5 text-brand-green"
                      : "text-brand-dark/70 hover:bg-gray-50 hover:text-brand-green"
                  )}
                >
                  {link.label}
                  <ChevronRight className="size-4 opacity-40" />
                </Link>
              );
            })}

            <div className="my-3 border-t border-gray-100" />

            <button
              type="button"
              onClick={() => {
                toggleSeniorMode();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-[length:var(--font-size-base)] font-medium text-brand-dark/70 hover:bg-gray-50"
            >
              <Accessibility className="size-4" />
              {seniorMode ? "关闭大字模式" : "开启大字模式"}
            </button>

            <Link
              href="/host"
              onClick={closeMobile}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-[length:var(--font-size-base)] font-medium text-brand-dark/70 hover:bg-gray-50 hover:text-brand-green"
            >
              <Home className="size-4" />
              成为房东
            </Link>

            <Link
              href="/login"
              onClick={closeMobile}
              className="mt-2 block rounded-lg bg-brand-green px-4 py-3 text-center text-[length:var(--font-size-base)] font-medium text-white hover:bg-brand-green-dark transition-colors"
            >
              登录
            </Link>
          </nav>
        </div>
      </header>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
    </>
  );
}
