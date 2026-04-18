"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar, Clock, Users } from "lucide-react";
import { destinations } from "@/lib/data/destinations";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("zh-CN")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 300, suffix: "+", label: "覆盖城市" },
  { value: 50000, suffix: "+", label: "在线房源" },
  { value: 500, suffix: "万+", label: "注册用户" },
  { value: 4.8, suffix: "", label: "用户满意度", decimals: 1 },
];

const durationOptions = [
  { value: "week", label: "周租" },
  { value: "month", label: "月租" },
  { value: "quarter", label: "季租" },
];

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("month");
  const [guests, setGuests] = useState("2");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-wide">
            悠居
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-serif tracking-[0.2em]">
            住进生活，居于山水
          </p>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-lg mx-auto">
            中国首个旅居民宿平台 · 为长期旅居场景而生
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="lg:col-span-2 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-12 pl-9 pr-3 rounded-lg border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              >
                <option value="">选择目的地</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name} · {d.province}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full h-12 pl-9 pr-3 rounded-lg border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="入住日期"
              />
            </div>

            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-12 pl-9 pr-3 rounded-lg border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              >
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative sm:col-span-2 lg:col-span-1">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full h-12 pl-9 pr-3 rounded-lg border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}位旅居者
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="mt-3 w-full sm:w-auto sm:min-w-[180px] h-12 px-8 rounded-lg bg-primary text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors mx-auto">
            <Search className="h-4 w-4" />
            搜索旅居房源
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                />
              </div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
