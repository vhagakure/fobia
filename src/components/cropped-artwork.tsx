import Image from "next/image";
import { assetPath } from "@/lib/assets";
import type { CSSProperties } from "react";
export type ArtworkCrop = {
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
};
/** Non-destructive viewport crop: original pixels, logos and proportions are preserved. */
export function CroppedArtwork({
  src,
  alt,
  crop,
  className = "",
  priority = false,
  multiply = false,
  sizes = "(max-width: 700px) 90vw, 1100px",
}: {
  src: string;
  alt: string;
  crop: ArtworkCrop;
  className?: string;
  priority?: boolean;
  multiply?: boolean;
  sizes?: string;
}) {
  if (!src) return null;
  const style: CSSProperties = {
    aspectRatio: `${crop.width} / ${crop.height}`,
    mixBlendMode: multiply ? "multiply" : undefined,
  };
  return (
    <div className={`cropped-artwork ${className}`} style={style}>
      <Image
        src={assetPath(src)}
        alt={alt}
        width={crop.sourceWidth}
        height={crop.sourceHeight}
        priority={priority}
        sizes={sizes}
        style={{
          width: `${(crop.sourceWidth / crop.width) * 100}%`,
          height: "auto",
          maxWidth: "none",
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </div>
  );
}
