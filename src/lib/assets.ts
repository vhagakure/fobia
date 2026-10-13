/** Asset URLs for normal Next.js hosting and the optional static Pages build. */
export function assetPath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (
    process.env.NEXT_PUBLIC_STATIC_IMAGES === "1" &&
    /\.(png|jpe?g)$/i.test(path)
  ) {
    return `${basePath}/optimized${path.replace(/\.(png|jpe?g)$/i, ".webp")}`;
  }
  return `${basePath}${path}`;
}
