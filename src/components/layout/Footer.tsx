import Link from "next/link";
import { Mail, Phone, MapPin, QrCode } from "lucide-react";
import { BRAND } from "@/lib/constants";

const FOOTER_COLUMNS = [
  {
    title: "旅居房源",
    links: [
      { label: "发现房源", href: "/search" },
      { label: "热门目的地", href: "/destinations" },
      { label: "房源等级", href: "/about#tiers" },
      { label: "旅居指南", href: "/guide" },
    ],
  },
  {
    title: "社区",
    links: [
      { label: "旅居日记", href: "/community?tab=diary" },
      { label: "数字游民", href: "/community?tab=nomad" },
      { label: "银发旅居", href: "/community?tab=silver" },
      { label: "旅居攻略", href: "/community?tab=guide" },
    ],
  },
  {
    title: "关于",
    links: [
      { label: "关于悠居", href: "/about" },
      { label: "成为房东", href: "/host" },
      { label: "会员计划", href: "/membership" },
      { label: "帮助中心", href: "/help" },
    ],
  },
] as const;

function FooterLogo() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-8"
      aria-hidden="true"
    >
      <path
        d="M4 26L12 10L17 18L20 14L28 26H4Z"
        fill="currentColor"
        opacity={0.2}
      />
      <path
        d="M4 26L12 10L17 18L20 14L28 26"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
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

export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-10 py-12 sm:py-16 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-brand-cream">
              <FooterLogo />
              <span className="font-serif text-2xl font-bold">
                {BRAND.name}
              </span>
            </div>
            <p className="font-serif text-lg text-brand-cream/80 tracking-wider">
              {BRAND.slogan}
            </p>
            <p className="max-w-sm text-[length:var(--font-size-sm)] leading-relaxed text-brand-cream/60">
              {BRAND.description}——为银发族、数字游民及旅居爱好者打造的一站式长期旅居民宿平台。
              在这里找到理想的第二居所，体验地道的在地生活。
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[length:var(--font-size-sm)] font-semibold uppercase tracking-wider text-brand-cream/90">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--font-size-sm)] text-brand-cream/60 transition-colors hover:text-brand-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="border-t border-brand-cream/10 py-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 text-[length:var(--font-size-sm)] text-brand-cream/60">
              <Mail className="size-4 shrink-0 text-brand-cream/40" />
              <span>hello@youju.com</span>
            </div>
            <div className="flex items-center gap-3 text-[length:var(--font-size-sm)] text-brand-cream/60">
              <Phone className="size-4 shrink-0 text-brand-cream/40" />
              <span>400-888-YOUJU (9658)</span>
            </div>
            <div className="flex items-center gap-3 text-[length:var(--font-size-sm)] text-brand-cream/60">
              <MapPin className="size-4 shrink-0 text-brand-cream/40" />
              <span>杭州市西湖区</span>
            </div>
            <div className="flex items-center gap-3 text-[length:var(--font-size-sm)] text-brand-cream/60">
              <QrCode className="size-4 shrink-0 text-brand-cream/40" />
              <span>关注悠居公众号</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-brand-cream/10 py-6 sm:flex-row sm:justify-between">
          <p className="text-[length:var(--font-size-xs)] text-brand-cream/40">
            &copy; {new Date().getFullYear()} 悠居科技（杭州）有限公司 版权所有
          </p>
          <div className="flex gap-4 text-[length:var(--font-size-xs)] text-brand-cream/40">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-cream/70"
            >
              隐私政策
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-brand-cream/70"
            >
              用户协议
            </Link>
            <Link
              href="/sitemap"
              className="transition-colors hover:text-brand-cream/70"
            >
              网站地图
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
