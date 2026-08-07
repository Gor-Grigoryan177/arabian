import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { RecentlyViewedBar } from "@/components/layout/RecentlyViewedBar";
import { OrderModal } from "@/components/shared/OrderModal";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Clarity } from "@/components/analytics/Clarity";
import { Toaster } from "@/components/shared/Toaster";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://arabian-nights.am";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arabian Nights ARM \u2014 Premium Arabic Perfumes in Armenia",
    template: "%s | Arabian Nights ARM",
  },
  description:
    "Authentic Arabic perfumes in Armenia. Lattafa, Afnan, Hayati, Ard Al Zaafaran and more. Premium oriental fragrances delivered fast.",
  keywords: [
    "Arabic perfumes Armenia",
    "Arabic perfume Yerevan",
    "Lattafa Armenia",
    "Hayati perfume Armenia",
    "Premium perfumes Armenia",
  ],
  openGraph: {
    title: "Arabian Nights ARM \u2014 Premium Arabic Perfumes in Armenia",
    description:
      "Authentic Lattafa, Hayati, Afnan & Ard Al Zaafaran perfumes. Fast delivery across Armenia.",
    url: SITE_URL,
    siteName: "Arabian Nights ARM",
    locale: "en_AM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arabian Nights ARM \u2014 Premium Arabic Perfumes in Armenia",
    description: "Authentic Arabic perfumes delivered across Armenia.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  // Concept/portfolio build — flip to { index: true, follow: true } at launch.
  robots: { index: false, follow: false },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Arabian Nights ARM",
  description: "Premium Arabic perfumes retailer in Armenia.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yerevan",
    addressCountry: "AM",
  },
  sameAs: ["https://instagram.com/arabian_nights_arm"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="fixed left-0 top-0 z-[9999] -translate-y-full bg-gold px-4 py-2 text-sm text-black transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pt-[68px]">
          {children}
        </main>
        <Footer />
        <RecentlyViewedBar />
        <ScrollToTopButton />
        <OrderModal />
        <ChatWidget />
        <Clarity />
        <Toaster />
      </body>
    </html>
  );
}
