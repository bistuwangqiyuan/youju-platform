"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Home } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-green-dark to-brand-green" />
      <div className="absolute inset-0 bg-pattern opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            开启你的旅居生活
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
            无论你是追求安逸晚年的银发族、拥抱自由的数字游民，还是寻找亲子时光的年轻家庭，悠居都能帮你找到理想的第二居所。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary font-semibold text-base hover:bg-brand-cream transition-colors shadow-lg"
            >
              <Search className="h-5 w-5" />
              发现房源
            </Link>
            <Link
              href="/host"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/60 text-white font-semibold text-base hover:bg-white/10 transition-colors"
            >
              <Home className="h-5 w-5" />
              成为房东
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
