import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, Footer } from "@/components/layout";
import { CustomCursor } from "@/components/animations";
import { AppProvider } from "@/components/providers";
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
  title: "Be Creative Events | Be Memorable - Qatar's Premier Creative Events Agency",
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
  ],
  authors: [{ name: "Be Creative Events" }],
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
        <AppProvider>
          {/* <CustomCursor /> */}
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
