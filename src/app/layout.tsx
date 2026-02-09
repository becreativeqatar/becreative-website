import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/layout";
import { CustomCursor } from "@/components/animations";
import { AppProvider } from "@/components/providers";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const codecPro = localFont({
  src: [
    {
      path: "./fonts/Codec-Pro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Codec-Pro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Codec-Pro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Codec-Pro-Extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Codec-Pro-Heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-codec-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Be Creative Events | Be Memorable - Qatar's Premier Creative Events Agency",
    template: "%s | Be Creative Events",
  },
  description:
    "Be Creative Events is Qatar's premier creative events agency specializing in immersive event management, destination creation, brand activation, and cultural storytelling. Celebrating Brands for the Love of Qatar.",
  keywords: [
    "event management Qatar",
    "creative events agency",
    "brand activation",
    "destination creation",
    "corporate events",
    "festivals",
    "Doha events",
    "Qatar Tourism",
    "immersive experiences",
    "event planning Doha",
    "branding agency Qatar",
    "media production Qatar",
  ],
  authors: [{ name: "Be Creative Events" }],
  creator: "Be Creative Events",
  publisher: "Be Creative Events",
  metadataBase: new URL("https://bce.qa"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Be Creative Events | Be Memorable",
    description:
      "Qatar's premier creative events agency. Celebrating Brands for the Love of Qatar.",
    url: "https://bce.qa",
    siteName: "Be Creative Events",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be Creative Events | Be Memorable",
    description:
      "Qatar's premier creative events agency. Celebrating Brands for the Love of Qatar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${codecPro.variable} font-sans antialiased`}
      >
        <OrganizationSchema />
        <LocalBusinessSchema />
        <AppProvider>
          <CustomCursor />
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-red-spark focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
