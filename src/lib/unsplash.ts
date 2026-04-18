/**
 * Unsplash photo slugs verified reachable on images.unsplash.com (HTTP 200).
 * Replaces deprecated/invalid IDs that return 404 and break next/image + <img>.
 */
export const UNSPLASH_INTERIOR_IDS = [
  "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c",
  "1600210492486-724fe5c67fb0",
  "1586023492125-27b2c045efd7",
  "1502672260266-1c1ef2d93688",
  "1512917774080-9991f1c4c750",
  "1519046904884-53103b34b206",
  "1507525428034-b723cf961d3e",
  "1476514525535-07fb3b4ae5f1",
  "1528164344705-47542687000d",
  "1583417319070-4a69db38a482",
  "1518509562904-e7ef99cdcc86",
  "1494548162494-384bba4ab999",
  "1506905925346-21bda4d32df4",
  "1501785888041-af3ef285b470",
  "1540979388789-6cee28a1cdc9",
] as const;

export function unsplashImage(
  photoId: string,
  options: { w: number; h?: number; faceCrop?: boolean } = { w: 800 }
): string {
  const { w, h, faceCrop } = options;
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: "85",
  });
  if (h != null) params.set("h", String(h));
  if (faceCrop) params.set("crop", "faces");
  return `https://images.unsplash.com/photo-${photoId}?${params.toString()}`;
}

export function unsplashImages(
  ids: string[],
  options: { w: number; h?: number } = { w: 800, h: 600 }
): string[] {
  return ids.map((id) => unsplashImage(id, options));
}
