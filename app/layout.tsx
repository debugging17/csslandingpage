import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloudstream Trinity | Digital Health Audit",
  description: "Discover if your digital foundation is cracking. Get a comprehensive system audit covering development, security, and user experience.",
  keywords: ["digital audit", "system health", "security audit", "UX audit", "code quality", "web development"],
  authors: [{ name: "Cloudstream Systems" }],
  openGraph: {
    title: "Cloudstream Trinity | Digital Health Audit",
    description: "Chaos to Order. Transform your digital foundation with Clean Code, Zero-Trust Security, and Frictionless UX.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloudstream Trinity | Digital Health Audit",
    description: "Is your digital foundation cracking? Get your system audit now.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
        className={`${inter.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
