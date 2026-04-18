"use client";

import Link from "next/link";
import {
  Home,
  CalendarDays,
  Wallet,
  Star,
  ChevronRight,
  Plus,
  Clock,
  User,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "在线房源", value: "3", icon: Home, suffix: "套", trend: "+1" },
  { label: "总预订", value: "28", icon: CalendarDays, suffix: "单", trend: "+3" },
  { label: "本月收入", value: "18,500", icon: Wallet, prefix: "¥", trend: "+12%" },
  { label: "平均评分", value: "4.7", icon: Star, suffix: "/5", trend: "" },
];

const revenueData = [
  { month: "11月", revenue: 12000 },
  { month: "12月", revenue: 15500 },
  { month: "1月", revenue: 18000 },
  { month: "2月", revenue: 22000 },
  { month: "3月", revenue: 16500 },
  { month: "4月", revenue: 18500 },
];

const recentOrders = [
  {
    id: 1,
    guest: "张先生",
    property: "大理古城·洱海畔悠然小院",
    checkIn: "2026-05-01",
    checkOut: "2026-06-01",
    amount: 4200,
    status: "待确认",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 2,
    guest: "李女士",
    property: "大理古城·洱海畔悠然小院",
    checkIn: "2026-04-10",
    checkOut: "2026-05-10",
    amount: 4200,
    status: "进行中",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    guest: "王阿姨",
    property: "西双版纳·热带雨林公寓",
    checkIn: "2026-04-05",
    checkOut: "2026-04-20",
    amount: 2800,
    status: "进行中",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];

const recentReviews = [
  {
    id: 1,
    guest: "赵大爷",
    property: "大理古城·洱海畔悠然小院",
    rating: 5,
    comment: "环境很好，房东非常热情，周边配套齐全，适合长期旅居。下次还会来！",
    date: "2026-04-10",
  },
  {
    id: 2,
    guest: "刘女士",
    property: "西双版纳·热带雨林公寓",
    rating: 4,
    comment: "位置不错，房间干净整洁。WiFi信号可以更好一些，其他都很满意。",
    date: "2026-04-05",
  },
];

export default function HostDashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">房东概览</h1>
          <p className="text-muted-foreground mt-1">
            管理你的房源和订单
          </p>
        </div>
        <Link href="/host/properties/new">
          <Button className="gap-2">
            <Plus className="size-4" />
            发布新房源
          </Button>
        </Link>
      </div>

      {/* Stats */}
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
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix && (
                        <span className="text-sm font-normal text-muted-foreground ml-0.5">
                          {stat.suffix}
                        </span>
                      )}
                    </p>
                    {stat.trend && (
                      <p className="text-xs text-emerald-600 mt-1">
                        {stat.trend} 较上月
                      </p>
                    )}
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

      {/* Revenue chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">收入趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="month" tick={{ fontSize: 13 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `¥${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [`¥${Number(value).toLocaleString()}`, "收入"]}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e7e5e4",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar dataKey="revenue" fill="#2D5F3E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">近期订单</CardTitle>
            <Link href="/host/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-brand-green">
                查看全部 <ChevronRight className="size-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-brand-cream/60 hover:bg-brand-cream transition-colors"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-brand-green/10 shrink-0 mt-0.5">
                  <User className="size-4 text-brand-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-brand-dark">
                      {order.guest}
                    </span>
                    <Badge className={`${order.statusColor} border-0 text-xs`}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {order.property}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" />
                      {order.checkIn} 至 {order.checkOut}
                    </span>
                    <span className="text-sm font-semibold text-brand-dark">
                      ¥{order.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent reviews */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">最新评价</CardTitle>
            <Link href="/host/reviews">
              <Button variant="ghost" size="sm" className="gap-1 text-brand-green">
                查看全部 <ChevronRight className="size-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-xl bg-brand-cream/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-brand-green/10">
                      <User className="size-3.5 text-brand-green" />
                    </div>
                    <span className="font-medium text-sm text-brand-dark">
                      {review.guest}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {review.property}
                </p>
                <p className="text-sm text-brand-dark/80 mt-2 line-clamp-2">
                  {review.comment}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {review.date}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
