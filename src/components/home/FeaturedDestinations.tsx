"use client";

import { motion } from "framer-motion";
import DestinationCard from "@/components/shared/DestinationCard";
import { destinations } from "@/lib/data/destinations";

export default function FeaturedDestinations() {
  return (
    <section className="py-16 sm:py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            热门旅居目的地
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            精选中国最适合旅居的城市
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <DestinationCard destination={dest} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
