import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { communityPosts, getPostsByCategory } from "@/lib/data";
import { getCategoryLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "旅居社区 - 悠居",
  description: "分享你的旅居故事，发现旅居生活的更多可能",
};

const CATEGORIES = [
  { value: "all", label: "全部" },
  { value: "silver", label: "银发康养" },
  { value: "nomad", label: "数字游民" },
  { value: "family", label: "亲子旅居" },
  { value: "guide", label: "旅居攻略" },
  { value: "story", label: "旅居故事" },
];

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CommunityPage({ searchParams }: PageProps) {
  const { category = "all" } = await searchParams;
  const posts = category === "all" ? communityPosts : getPostsByCategory(category);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-green-dark py-20 text-white">
        <div className="bg-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            旅居社区
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            分享你的旅居故事，发现旅居生活的更多可能
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={
                cat.value === "all"
                  ? "/community"
                  : `/community?category=${cat.value}`
              }
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                category === cat.value
                  ? "bg-brand-green text-white"
                  : "bg-white text-muted-foreground hover:bg-brand-green/10 hover:text-brand-green"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white py-20 text-center">
            <p className="text-lg text-muted-foreground">
              暂无相关内容，来发布第一篇吧
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-5">
                    {/* Author */}
                    <div className="mb-3 flex items-center gap-2">
                      <Image
                        src={post.author_avatar}
                        alt={post.author_name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {post.author_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.created_at}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>

                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.content.slice(0, 120)}...
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 border-t border-border pt-3 text-sm text-muted-foreground">
                      <span>❤ {post.likes_count}</span>
                      <span>💬 {post.comments_count}</span>
                      <span className="ml-auto">
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(post.category)}
                        </Badge>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
