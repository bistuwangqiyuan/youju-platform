import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/data";
import { getCategoryLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) return { title: "未找到 - 悠居" };
  return {
    title: `${post.title} - 旅居社区 - 悠居`,
    description: post.content.slice(0, 160),
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  const paragraphs = post.content.split("\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Back */}
        <Link href="/community">
          <Button variant="ghost" className="mb-6 -ml-2 text-muted-foreground">
            ← 返回社区
          </Button>
        </Link>

        <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {/* Header */}
          <div className="p-8 pb-0">
            {/* Author */}
            <div className="mb-6 flex items-center gap-3">
              <Image
                src={post.author_avatar}
                alt={post.author_name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-foreground">
                  {post.author_name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {post.created_at}
                </div>
              </div>
              <Badge className="ml-auto" variant="outline">
                {getCategoryLabel(post.category)}
              </Badge>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-tight text-foreground">
              {post.title}
            </h1>
          </div>

          {/* Cover image */}
          <div className="relative mt-6 aspect-[16/9] overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose-youju space-y-4">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="leading-relaxed text-foreground/90"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Engagement */}
            <div className="mt-6 flex items-center gap-6 border-t border-border pt-6 text-muted-foreground">
              <span className="flex items-center gap-2 text-lg">
                <span className="text-red-400">❤</span>
                <span className="font-medium text-foreground">
                  {post.likes_count}
                </span>
                <span className="text-sm">赞</span>
              </span>
              <span className="flex items-center gap-2 text-lg">
                <span>💬</span>
                <span className="font-medium text-foreground">
                  {post.comments_count}
                </span>
                <span className="text-sm">评论</span>
              </span>
              <span className="ml-auto text-sm">
                目的地：
                <Link
                  href={`/destinations`}
                  className="font-medium text-primary hover:underline"
                >
                  {post.destination_name}
                </Link>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
