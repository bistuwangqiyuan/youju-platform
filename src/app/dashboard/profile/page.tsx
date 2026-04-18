"use client";

import { useState } from "react";
import { Camera, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const destinationOptions = [
  "云南", "海南", "广西", "四川", "福建", "浙江", "贵州", "广东",
];

const travelStyleTags = [
  "康养疗休", "文化体验", "田园生活", "海滨度假", "山居隐逸", "数字游民", "亲子旅居", "美食探索",
];

export default function ProfilePage() {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    "云南",
    "海南",
  ]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([
    "康养疗休",
    "田园生活",
  ]);
  const [budget, setBudget] = useState("3000-5000");

  const toggleDestination = (dest: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-dark">个人资料</h1>
        <p className="text-muted-foreground mt-1">管理你的个人信息和旅居偏好</p>
      </div>

      {/* Avatar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="size-24 text-2xl">
                <AvatarFallback className="bg-brand-green/10 text-brand-green text-2xl font-bold">
                  旅
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="size-6" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark">上传头像</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                支持 JPG、PNG 格式，建议尺寸 200×200px
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                选择图片
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic info */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="profile-name"
                className="text-sm font-medium text-foreground"
              >
                姓名
              </label>
              <Input id="profile-name" defaultValue="旅居者" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="profile-phone"
                className="text-sm font-medium text-foreground"
              >
                手机号
              </label>
              <Input
                id="profile-phone"
                type="tel"
                defaultValue="138****8888"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="profile-email"
              className="text-sm font-medium text-foreground"
            >
              邮箱
            </label>
            <Input
              id="profile-email"
              type="email"
              defaultValue="traveler@example.com"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="profile-bio"
              className="text-sm font-medium text-foreground"
            >
              个人简介
            </label>
            <textarea
              id="profile-bio"
              rows={4}
              defaultValue="热爱旅行和生活，喜欢在不同城市慢慢生活，感受当地文化。退休后开始了旅居生活，目前已经在大理、三亚等地旅居过。"
              className="flex w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Travel preferences */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">旅居偏好</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Favorite destinations */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              偏好目的地
            </label>
            <div className="flex flex-wrap gap-2">
              {destinationOptions.map((dest) => {
                const selected = selectedDestinations.includes(dest);
                return (
                  <button
                    key={dest}
                    onClick={() => toggleDestination(dest)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? "bg-brand-green text-white"
                        : "bg-white border border-border text-muted-foreground hover:border-brand-green/40 hover:text-brand-green"
                    }`}
                  >
                    {dest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Travel style */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              旅居风格
            </label>
            <div className="flex flex-wrap gap-2">
              {travelStyleTags.map((style) => {
                const selected = selectedStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selected
                        ? "bg-brand-green text-white"
                        : "bg-white border border-border text-muted-foreground hover:border-brand-green/40 hover:text-brand-green"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget range */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              月预算范围
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["2000以下", "2000-3000", "3000-5000", "5000以上"].map(
                (range) => (
                  <button
                    key={range}
                    onClick={() => setBudget(range)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      budget === range
                        ? "bg-brand-green text-white"
                        : "bg-white border border-border text-muted-foreground hover:border-brand-green/40"
                    }`}
                  >
                    ¥{range}
                  </button>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end pb-8">
        <Button size="lg" className="gap-2 px-8">
          <Save className="size-4" />
          保存
        </Button>
      </div>
    </div>
  );
}
