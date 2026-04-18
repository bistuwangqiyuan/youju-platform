"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { getFeaturedPosts } from "@/lib/data/community";
import { getCategoryLabel, cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  silver: "bg-amber-100 text-amber-800",
  nomad: "bg-blue-100 text-blue-800",
  family: "bg-green-100 text-green-800",
  wellness: "bg-purple-100 text-purple-800",
  guide: "bg-orange-100 text-orange-800",
  story: "bg-rose-100 text-rose-800",
};

const posts = getFeaturedPosts().slice(0, 3);

export default function SojourStories() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            旅居者说
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            来自真实旅居者的生活故事与经验分享
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                href={`/community/${post.id}`}
                className="group block rounded-xl overflow-hidden bg-card border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className={cn(
                      "absolute top-3 left-3 px-2.5 py-1 text-xs font-medium rounded-full",
                      categoryColors[post.category] || "bg-gray-100 text-gray-700"
                    )}
                  >
                    {getCategoryLabel(post.category)}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={post.author_avatar}
                        alt={post.author_name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {post.author_name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {post.destination_name}
                    </span>
                  </div>

                  <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.content.slice(0, 120)}…
                  </p>

                  <div className="flex items-center gap-4 text-muted-foreground text-xs pt-2 border-t border-border">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      {post.likes_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {post.comments_count}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
