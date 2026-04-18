"use client";

import { useState } from "react";
import Link from "next/link";
import { Mountain, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND } from "@/lib/constants";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"traveler" | "host">("traveler");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-brand-green/10 mb-4">
            <Mountain className="size-7 text-brand-green" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-dark">
            加入{BRAND.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            开启你的旅居生活
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6 space-y-4">
            {/* Full name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                姓名
              </label>
              <Input id="name" placeholder="请输入真实姓名" autoComplete="name" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="reg-email"
                className="text-sm font-medium text-foreground"
              >
                邮箱
              </label>
              <Input
                id="reg-email"
                type="email"
                placeholder="请输入邮箱地址"
                autoComplete="email"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                手机号
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号码"
                autoComplete="tel"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="reg-password"
                className="text-sm font-medium text-foreground"
              >
                密码
              </label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="至少8位，含字母和数字"
                  autoComplete="new-password"
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

            {/* Confirm password */}
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-foreground"
              >
                确认密码
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="请再次输入密码"
                autoComplete="new-password"
              />
            </div>

            {/* User type */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-foreground">
                我的身份
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 cursor-pointer transition-colors ${
                    userType === "traveler"
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-border hover:border-brand-green/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="traveler"
                    checked={userType === "traveler"}
                    onChange={() => setUserType("traveler")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">🏡 旅居者</span>
                </label>
                <label
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 cursor-pointer transition-colors ${
                    userType === "host"
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-border hover:border-brand-green/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="host"
                    checked={userType === "host"}
                    onChange={() => setUserType("host")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">🔑 我是房东</span>
                </label>
              </div>
            </div>

            {/* Terms agreement */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 size-4 rounded border-border text-brand-green focus:ring-brand-green accent-brand-green"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                我已阅读并同意
                <Link
                  href="/terms"
                  className="text-brand-green hover:underline"
                >
                  《用户协议》
                </Link>
                和
                <Link
                  href="/privacy"
                  className="text-brand-green hover:underline"
                >
                  《隐私政策》
                </Link>
              </span>
            </label>

            {/* Register button */}
            <Button className="w-full" size="lg" disabled={!agreed}>
              注册
            </Button>
          </CardContent>
        </Card>

        {/* Login link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          已有账号?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-green hover:text-brand-green-dark transition-colors"
          >
            登录
          </Link>
        </p>
      </div>
    </div>
  );
}
