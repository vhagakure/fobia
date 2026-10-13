import type { Metadata } from "next";
import { event } from "@/lib/event";
import { assetPath } from "@/lib/assets";
import localFont from "next/font/local";
const posterFont = localFont({
  src: "../../node_modules/@fontsource/bodoni-moda/files/bodoni-moda-latin-900-normal.woff2",
  weight: "900",
  display: "swap",
  variable: "--font-poster",
  adjustFontFallback: "Times New Roman",
});
import "./globals.css";
const title = "FOBIA PIETRASOLE | Halloween 31 Oct 2026";
const description =
  "Una notte dentro le tue paure. NOH Experience e Halloween Party a Pietrasole, 31 ottobre 2026.";
export const metadata: Metadata = {
  ...(event.siteUrl
    ? {
        metadataBase: new URL(event.siteUrl),
        alternates: { canonical: event.siteUrl },
      }
    : {}),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "it_IT",
    siteName: event.name,
    ...(event.siteUrl ? { url: event.siteUrl } : {}),
    ...(event.artwork.social
      ? {
          images: [
            {
              url: assetPath(event.artwork.social),
              width: 1080,
              height: 1350,
              alt: event.name,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(event.artwork.social
      ? { images: [assetPath(event.artwork.social)] }
      : {}),
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={posterFont.variable}>
      <body>{children}</body>
    </html>
  );
}
