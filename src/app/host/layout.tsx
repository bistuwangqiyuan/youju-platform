"use client";

import {
  LayoutDashboard,
  Home,
  ClipboardList,
  TrendingUp,
  Star,
} from "lucide-react";
import DashboardSidebar, {
  type SidebarItem,
} from "@/components/dashboard/DashboardSidebar";

const sidebarItems: SidebarItem[] = [
  { href: "/host", label: "房东概览", icon: LayoutDashboard },
  { href: "/host/properties", label: "我的房源", icon: Home },
  { href: "/host/orders", label: "订单管理", icon: ClipboardList },
  { href: "/host/revenue", label: "收入统计", icon: TrendingUp },
  { href: "/host/reviews", label: "评价管理", icon: Star },
];

export default function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar items={sidebarItems} title="房东中心" />
      <div className="flex-1 bg-brand-cream overflow-x-hidden">{children}</div>
    </div>
  );
}
