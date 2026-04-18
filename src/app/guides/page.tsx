import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { communityPosts, destinations } from "@/lib/data";
import { getCategoryLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "旅居指南 - 悠居",
  description: "实用旅居攻略，帮你做好旅居前的一切准备",
};

interface PageProps {
  searchParams: Promise<{ destination?: string }>;
}

export default async function GuidesPage({ searchParams }: PageProps) {
  const { destination } = await searchParams;

  const guidePosts = communityPosts.filter(
    (p) => p.category === "guide" || p.category === "wellness"
  );

  const filtered = destination
    ? guidePosts.filter((p) => p.destination_id === destination)
    : guidePosts;

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-brand-green-dark py-20 text-white">
        <div className="bg-pattern absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            旅居指南
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            实用攻略与经验分享，帮你做好旅居前的一切准备
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Destination filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/guides"
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              !destination
                ? "bg-brand-green text-white"
                : "bg-white text-muted-foreground hover:bg-brand-green/10 hover:text-brand-green"
            }`}
          >
            全部城市
          </Link>
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/guides?destination=${dest.id}`}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                destination === dest.id
                  ? "bg-brand-green text-white"
                  : "bg-white text-muted-foreground hover:bg-brand-green/10 hover:text-brand-green"
              }`}
            >
              {dest.name}
            </Link>
          ))}
        </div>

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white py-20 text-center">
            <p className="text-lg text-muted-foreground">
              该目的地暂无攻略，敬请期待
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                        {post.destination_name}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {getCategoryLabel(post.category)}
                    </Badge>
                    <h3 className="mb-2 text-lg font-semibold leading-tight text-foreground group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.content.slice(0, 100)}...
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{post.author_name}</span>
                      <span>·</span>
                      <span>❤ {post.likes_count}</span>
                      <span>💬 {post.comments_count}</span>
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
