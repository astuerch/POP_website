import type { Metadata } from "next";

import { AnimatedSection } from "@/components/animated-section";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionHeading } from "@/components/section-heading";
import { galleryItems } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A responsive placeholder gallery for POP Impact Lab event highlights and future photo stories.",
};

export default function GalleryPage() {
  return (
    <div className="bg-brand-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Gallery"
            title="Responsive placeholders for event highlights"
            description="Use this grid as the future home for POP photos, candid moments, and event recaps once the owner shares the final image library."
          />
        </AnimatedSection>

        <AnimatedSection className="mt-10" delay={0.05}>
          <GalleryGrid items={galleryItems} />
        </AnimatedSection>
      </div>
    </div>
  );
}
