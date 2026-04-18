"use client";

import { useState } from "react";
import { MapPin, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BookingStatus = "待确认" | "已确认" | "进行中" | "已完成" | "已取消";

interface Booking {
  id: number;
  property: string;
  destination: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  price: number;
  status: BookingStatus;
}

const statusStyles: Record<BookingStatus, string> = {
  待确认: "bg-amber-100 text-amber-700",
  已确认: "bg-blue-100 text-blue-700",
  进行中: "bg-emerald-100 text-emerald-700",
  已完成: "bg-gray-100 text-gray-600",
  已取消: "bg-red-100 text-red-600",
};

const tabs: { label: string; filter: BookingStatus | "全部" }[] = [
  { label: "全部", filter: "全部" },
  { label: "待确认", filter: "待确认" },
  { label: "进行中", filter: "进行中" },
  { label: "已完成", filter: "已完成" },
  { label: "已取消", filter: "已取消" },
];

const bookings: Booking[] = [
  {
    id: 1,
    property: "大理古城·洱海畔悠然小院",
    destination: "云南大理",
    image: "🏔️",
    checkIn: "2026-05-01",
    checkOut: "2026-06-01",
    nights: 31,
    price: 4200,
    status: "已确认",
  },
  {
    id: 2,
    property: "三亚湾·海景悠居套房",
    destination: "海南三亚",
    image: "🏖️",
    checkIn: "2026-07-15",
    checkOut: "2026-08-15",
    nights: 31,
    price: 6500,
    status: "待确认",
  },
  {
    id: 3,
    property: "西双版纳·热带雨林公寓",
    destination: "云南西双版纳",
    image: "🌴",
    checkIn: "2026-03-10",
    checkOut: "2026-03-25",
    nights: 15,
    price: 2800,
    status: "已完成",
  },
  {
    id: 4,
    property: "丽江古城·纳西风情院落",
    destination: "云南丽江",
    image: "🏡",
    checkIn: "2026-04-01",
    checkOut: "2026-05-01",
    nights: 30,
    price: 3800,
    status: "进行中",
  },
  {
    id: 5,
    property: "青岛崂山·海滨疗养公寓",
    destination: "山东青岛",
    image: "⛵",
    checkIn: "2026-02-20",
    checkOut: "2026-03-05",
    nights: 13,
    price: 2100,
    status: "已取消",
  },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus | "全部">("全部");

  const filtered =
    activeTab === "全部"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">我的预订</h1>
        <p className="text-muted-foreground mt-1">管理你的全部旅居预订</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.filter}
            onClick={() => setActiveTab(tab.filter)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.filter
                ? "bg-brand-green text-white"
                : "bg-white text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <CalendarDays className="size-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">暂无该状态的预订</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Image placeholder */}
                  <div className="sm:w-40 h-32 sm:h-auto bg-gradient-to-br from-brand-green/10 to-brand-green/5 flex items-center justify-center shrink-0">
                    <span className="text-4xl">{booking.image}</span>
                  </div>

                  {/* Booking details */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-brand-dark">
                          {booking.property}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                          <MapPin className="size-3.5" />
                          {booking.destination}
                        </div>
                      </div>
                      <Badge
                        className={`${statusStyles[booking.status]} border-0 shrink-0`}
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="size-3.5" />
                        <span>
                          {booking.checkIn}
                          <ArrowRight className="size-3 inline mx-1" />
                          {booking.checkOut}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        共 {booking.nights} 晚
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          总价
                        </span>
                        <p className="text-lg font-bold text-brand-dark">
                          ¥{booking.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === "待确认" && (
                          <Button variant="outline" size="sm">
                            取消预订
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
