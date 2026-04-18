import type { Metadata } from "next";
import { MEMBERSHIP_TIERS, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "会员计划 - 悠居",
  description: "加入悠居会员，享受专属旅居权益和折扣",
};

const FAQ = [
  {
    q: "会员权益什么时候生效？",
    a: "开通会员后立即生效，权益覆盖全平台所有房源和服务。",
  },
  {
    q: "可以随时取消会员吗？",
    a: "月付会员可随时取消，取消后当月权益仍有效至到期日。年付会员到期后不再自动续费。",
  },
  {
    q: "预订折扣如何使用？",
    a: "预订时系统自动识别会员等级并折算优惠，无需额外操作。折扣可与平台促销活动叠加使用。",
  },
  {
    q: "家属同享权益怎么算？",
    a: "铂金卡会员可绑定最多2位家属，家属享有与会员相同的预订折扣和社区权益。",
  },
  {
    q: "如何升级或降级会员？",
    a: "在个人中心随时调整会员等级。升级即时生效并按比例补差价，降级在当前周期结束后生效。",
  },
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-green-dark py-20 text-white">
        <div className="bg-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            {BRAND.name}旅居会员
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            解锁专属权益，让每一次旅居都更省心、更省钱
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {MEMBERSHIP_TIERS.map((tier, idx) => {
            const isPopular = idx === 1;
            return (
              <div
                key={tier.id}
                className={`relative overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-shadow hover:shadow-lg ${
                  isPopular
                    ? "border-brand-green shadow-md"
                    : "border-border"
                }`}
              >
                {isPopular && (
                  <div className="bg-brand-green py-2 text-center text-sm font-semibold text-white">
                    最受欢迎
                  </div>
                )}

                <div className="p-8">
                  {/* Tier name */}
                  <div className="mb-1 text-center">
                    <div
                      className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                      style={{ backgroundColor: tier.color + "20", color: tier.color }}
                    >
                      {tier.id === "silver" && "🥈"}
                      {tier.id === "gold" && "🥇"}
                      {tier.id === "platinum" && "💎"}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tier.nameEn}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="my-6 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-muted-foreground">¥</span>
                      <span className="text-4xl font-bold text-foreground">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-muted-foreground">/月</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      年付 ¥{tier.priceYearly}/年
                      <span className="ml-1 text-primary">
                        (省
                        {tier.priceMonthly * 12 - tier.priceYearly}
                        元)
                      </span>
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs text-brand-green">
                          ✓
                        </span>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={isPopular ? "default" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    {isPopular ? "立即开通" : "选择方案"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
          常见问题
        </h2>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 font-semibold text-foreground">{item.q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
