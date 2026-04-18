"use client";

import { useState } from "react";
import Link from "next/link";
import { Mountain, MessageCircle, Smartphone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BRAND } from "@/lib/constants";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 pt-16 pb-12">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-brand-green/10 mb-4">
            <Mountain className="size-7 text-brand-green" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-dark">
            欢迎回到{BRAND.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{BRAND.slogan}</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6 space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                邮箱地址
              </label>
              <Input
                id="email"
                type="email"
                placeholder="请输入邮箱"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  密码
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-brand-green hover:text-brand-green-dark transition-colors"
                >
                  忘记密码?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login button */}
            <Button className="w-full" size="lg">
              登录
            </Button>

            {/* Divider */}
            <div className="relative flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground shrink-0">或</span>
              <Separator className="flex-1" />
            </div>

            {/* Social logins */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2" size="lg">
                <MessageCircle className="size-5 text-green-600" />
                微信登录
              </Button>
              <Button variant="outline" className="w-full gap-2" size="lg">
                <Smartphone className="size-5 text-brand-blue" />
                手机号登录
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          还没有账号?{" "}
          <Link
            href="/register"
            className="font-medium text-brand-green hover:text-brand-green-dark transition-colors"
          >
            注册
          </Link>
        </p>
      </div>
    </div>
  );
}
