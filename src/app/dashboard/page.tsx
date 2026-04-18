"use client";

import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Heart,
  MessageSquare,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "旅居天数", value: 45, icon: CalendarDays, suffix: "天" },
  { label: "去过的城市", value: 3, icon: MapPin, suffix: "个" },
  { label: "收藏房源", value: 12, icon: Heart, suffix: "套" },
  { label: "社区帖子", value: 5, icon: MessageSquare, suffix: "篇" },
];

const recentBookings = [
  {
    id: 1,
    property: "大理古城·洱海畔悠然小院",
    destination: "云南大理",
    checkIn: "2026-05-01",
    checkOut: "2026-06-01",
    status: "已确认",
    statusColor: "bg-blue-100 text-blue-700",
    price: 4200,
  },
  {
    id: 2,
    property: "西双版纳·热带雨林公寓",
    destination: "云南西双版纳",
    checkIn: "2026-03-10",
    checkOut: "2026-03-25",
    status: "已完成",
    statusColor: "bg-gray-100 text-gray-600",
    price: 2800,
  },
  {
    id: 3,
    property: "三亚湾·海景悠居套房",
    destination: "海南三亚",
    checkIn: "2026-07-15",
    checkOut: "2026-08-15",
    status: "待确认",
    statusColor: "bg-amber-100 text-amber-700",
    price: 6500,
  },
];

const favoriteProperties = [
  {
    id: 1,
    title: "丽江古城·纳西风情院落",
    location: "云南丽江",
    price: 3800,
    rating: 4.9,
  },
  {
    id: 2,
    title: "桂林阳朔·漓江山水民宿",
    location: "广西桂林",
    price: 2600,
    rating: 4.8,
  },
  {
    id: 3,
    title: "厦门曾厝垵·文艺海景房",
    location: "福建厦门",
    price: 3200,
    rating: 4.7,
  },
  {
    id: 4,
    title: "成都宽窄巷·茶香小院",
    location: "四川成都",
    price: 2900,
    rating: 4.8,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">
          你好，旅居者 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          欢迎回来，继续探索你的下一段旅居之旅
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-brand-dark mt-1">
                      {stat.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {stat.suffix}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center size-10 rounded-xl bg-brand-green/10">
                    <Icon className="size-5 text-brand-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent bookings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">近期预订</CardTitle>
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm" className="gap-1 text-brand-green">
              查看全部 <ChevronRight className="size-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-brand-cream/60 hover:bg-brand-cream transition-colors"
            >
              <div className="flex items-center justify-center size-12 rounded-lg bg-brand-green/10 shrink-0">
                <MapPin className="size-5 text-brand-green" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-brand-dark truncate">
                  {booking.property}
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>
                    {booking.checkIn} 至 {booking.checkOut}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <Badge
                  className={`${booking.statusColor} border-0 text-xs`}
                >
                  {booking.status}
                </Badge>
                <span className="font-semibold text-brand-dark">
                  ¥{booking.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Favorite properties */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">收藏房源</CardTitle>
          <Link href="/dashboard/favorites">
            <Button variant="ghost" size="sm" className="gap-1 text-brand-green">
              查看全部 <ChevronRight className="size-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteProperties.map((property) => (
              <div
                key={property.id}
                className="flex gap-4 p-4 rounded-xl bg-brand-cream/60 hover:bg-brand-cream transition-colors"
              >
                <div className="flex items-center justify-center size-16 rounded-lg bg-brand-green/10 shrink-0">
                  <Heart className="size-6 text-brand-green" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-brand-dark truncate">
                    {property.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {property.location}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-semibold text-brand-green">
                      ¥{property.price.toLocaleString()}/月
                    </span>
                    <span className="text-xs text-amber-600">
                      ★ {property.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
