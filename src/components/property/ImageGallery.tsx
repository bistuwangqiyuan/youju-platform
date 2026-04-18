"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [];
  const mainImage = displayImages[0];
  const thumbImages = displayImages.slice(1, 5);

  const navigate = useCallback(
    (dir: -1 | 1) => {
      setActiveIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return displayImages.length - 1;
        if (next >= displayImages.length) return 0;
        return next;
      });
    },
    [displayImages.length]
  );

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  if (!displayImages.length) {
    return (
      <div className="aspect-[16/9] rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
        暂无图片
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[280px] sm:h-[360px] md:h-[420px]">
        {/* Main image */}
        <div
          className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <button
            type="button"
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-foreground rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <Expand className="h-3 w-3" />
            查看全部 {displayImages.length} 张
          </button>
        </div>

        {/* Thumbnails grid */}
        {thumbImages.map((img, i) => (
          <div
            key={i}
            className={cn(
              "relative cursor-pointer group hidden md:block",
              i >= 2 && thumbImages.length <= 2 && "hidden"
            )}
            onClick={() => openLightbox(i + 1)}
          >
            <img
              src={img}
              alt={`${title} ${i + 2}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}

        {/* Fill empty slots if fewer than 4 thumbnails */}
        {Array.from({ length: Math.max(0, 4 - thumbImages.length) }).map(
          (_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden md:block bg-muted"
            />
          )
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-black border-none">
          <DialogTitle className="sr-only">{title} 图片浏览</DialogTitle>
          <div className="relative h-full flex items-center justify-center">
            {/* Close */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-10 text-white/80 text-sm bg-black/40 rounded-full px-3 py-1">
              {activeIndex + 1} / {displayImages.length}
            </div>

            {/* Prev */}
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Image */}
            <img
              src={displayImages[activeIndex]}
              alt={`${title} ${activeIndex + 1}`}
              className="max-h-full max-w-full object-contain px-16"
            />

            {/* Next */}
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={() => navigate(1)}
                className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] px-4 pb-1">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all",
                    i === activeIndex
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  )}
                >
                  <img
                    src={img}
                    alt={`缩略图 ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
