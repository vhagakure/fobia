import type { CSSProperties } from "react";
import { event } from "@/lib/event";
import { CroppedArtwork } from "./cropped-artwork";
export function PartnerLogos({ priority = false }: { priority?: boolean }) {
  return (
    <div className="partners-row">
      {event.partners.map((partner) => (
        <div
          className="partner-logo"
          key={partner.name}
          style={
            {
              "--logo-ratio": partner.crop.width / partner.crop.height,
            } as CSSProperties
          }
        >
          <CroppedArtwork
            src={partner.src}
            alt={partner.name}
            crop={partner.crop}
            priority={priority}
          />
        </div>
      ))}
    </div>
  );
}
