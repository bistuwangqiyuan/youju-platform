import type { Metadata } from "next";
import { BRAND, STATS } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于悠居 - 悠居",
  description: "了解悠居的品牌故事、使命愿景和团队",
};

const VALUES = [
  {
    title: "信任优先",
    description: "通过严格的房源认证和真实评价体系，建立旅居者与房东之间的信任桥梁",
    icon: "🤝",
  },
  {
    title: "用户至上",
    description: "深入理解银发族、数字游民等不同用户群体的核心需求，提供个性化服务",
    icon: "💗",
  },
  {
    title: "生态共赢",
    description: "连接旅居者、房东、服务商，构建可持续发展的旅居生态系统",
    icon: "🌿",
  },
  {
    title: "技术驱动",
    description: "用AI和数据赋能旅居决策，让选择更科学、体验更智能",
    icon: "⚡",
  },
  {
    title: "长期主义",
    description: "不追求短期流量，专注于打造经得起时间检验的旅居生活方式品牌",
    icon: "🎯",
  },
];

const TIMELINE = [
  { year: "2024 Q1", event: "项目启动，完成市场调研和商业模式验证" },
  { year: "2024 Q2", event: "MVP上线，首批覆盖10个重点旅居城市" },
  { year: "2024 Q3", event: "引入旅居宜居指数体系，建立房源认证标准" },
  { year: "2024 Q4", event: "用户突破10万，签约优质房源5000套" },
  { year: "2025 Q1", event: "推出会员体系和旅居管家服务" },
  { year: "2025 Q2", event: "完成A轮融资，拓展至50个城市" },
  { year: "2025 Q3", event: "上线社区功能，打造旅居生活方式平台" },
  { year: "2026", event: "目标覆盖300+城市，服务500万旅居用户" },
];

const TEAM = [
  { name: "创始人 & CEO", desc: "前OTA行业高管，10年旅游行业经验" },
  { name: "CTO", desc: "前大厂技术总监，专注平台架构和AI应用" },
  { name: "COO", desc: "前民宿连锁品牌运营负责人，深谙旅居行业" },
  { name: "CPO", desc: "前互联网产品VP，用户体验和增长专家" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-green-dark py-24 text-white">
        <div className="bg-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            关于{BRAND.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/90">
            {BRAND.description}
          </p>
          <p className="mt-3 font-serif text-2xl italic text-white/70">
            「{BRAND.slogan}」
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-2xl">
              🎯
            </div>
            <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
              我们的使命
            </h2>
            <p className="text-xl font-medium text-primary">{BRAND.mission}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              我们相信，旅居不应该是少数人的奢侈，而应该是每个人可及的生活方式选择。通过技术创新和生态建设，我们致力于降低旅居门槛，让更多人能够自由地选择在哪里生活。
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-2xl">
              🌟
            </div>
            <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">
              我们的愿景
            </h2>
            <p className="text-xl font-medium text-brand-blue">{BRAND.vision}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              从房源预订到社区连接，从旅居指南到管家服务，我们正在构建一个完整的旅居生活方式平台，让每一位旅居者都能在异乡找到归属感。
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold text-foreground">
            核心价值观
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border bg-brand-cream p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{v.icon}</div>
                <h3 className="mb-2 font-semibold text-foreground">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-foreground">
          平台数据
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary">
              {STATS.cities}+
            </div>
            <div className="mt-1 text-muted-foreground">覆盖城市</div>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-brand-brown">
              {formatNumber(STATS.properties)}+
            </div>
            <div className="mt-1 text-muted-foreground">认证房源</div>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-brand-blue">
              {formatNumber(STATS.users)}+
            </div>
            <div className="mt-1 text-muted-foreground">注册用户</div>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-amber-600">
              {STATS.satisfaction}
            </div>
            <div className="mt-1 text-muted-foreground">用户满意度</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold text-foreground">
            发展历程
          </h2>
          <div className="relative">
            <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border md:left-1/2 md:-ml-px" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 md:gap-0 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div className="relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-brand-green bg-white md:absolute md:left-1/2 md:-ml-2" />
                  <div
                    className={`flex-1 rounded-xl border border-border bg-brand-cream p-4 shadow-sm md:w-[calc(50%-2rem)] ${
                      i % 2 === 0
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="text-sm font-semibold text-primary">
                      {item.year}
                    </div>
                    <div className="mt-1 text-foreground">{item.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-foreground">
          核心团队
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="rounded-xl border border-border bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-green/20 to-brand-blue/20 text-3xl text-muted-foreground">
                👤
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-green to-brand-green-dark py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-3xl font-bold">
            开启你的旅居之旅
          </h2>
          <p className="mt-4 text-lg text-white/80">
            加入{BRAND.name}，在300+城市中找到你的第二居所
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/destinations">
              <Button
                size="lg"
                className="bg-white text-brand-green hover:bg-white/90"
              >
                探索目的地
              </Button>
            </Link>
            <Link href="/membership">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
              >
                了解会员
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
