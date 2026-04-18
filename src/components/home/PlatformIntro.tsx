"use client";

import { motion } from "framer-motion";
import { Shield, TrendingDown, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "旅居专属标准",
    description: "五维评价体系，为旅居场景而生",
    detail:
      "从居住品质、网络速度、周边环境、安全保障到社区氛围，全方位评估每一套房源，让旅居者安心选择。",
  },
  {
    icon: TrendingDown,
    title: "周月租阶梯定价",
    description: "住越久越便宜，最高优惠35%",
    detail:
      "创新的阶梯式定价模式，周租灵活体验、月租安心旅居、季租深度生活，时间越长优惠越大。",
  },
  {
    icon: Users,
    title: "旅居者社区",
    description: "在旅途中找到志同道合的朋友",
    detail:
      "银发康养、数字游民、亲子旅居……找到你的旅居同好，分享攻略、互助生活、结交挚友。",
  },
];

export default function PlatformIntro() {
  return (
    <section className="py-16 sm:py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            为什么选择悠居
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            专为旅居场景打造的一站式服务平台
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">
                  {feature.description}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
