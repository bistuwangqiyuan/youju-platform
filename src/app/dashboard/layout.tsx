"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  User,
  Compass,
} from "lucide-react";
import DashboardSidebar, {
  type SidebarItem,
} from "@/components/dashboard/DashboardSidebar";

const sidebarItems: SidebarItem[] = [
  { href: "/dashboard", label: "概览", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "我的预订", icon: CalendarDays },
  { href: "/dashboard/favorites", label: "收藏列表", icon: Heart },
  { href: "/dashboard/profile", label: "个人资料", icon: User },
  { href: "/dashboard/preferences", label: "旅居偏好", icon: Compass },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar items={sidebarItems} title="旅居者中心" />
      <div className="flex-1 bg-brand-cream overflow-x-hidden">{children}</div>
    </div>
  );
}
