import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Jasher Chan | AI Automation Engineer",
  description:
    "AI Automation Engineer building agent systems with clear approval boundaries and proof of completion.",
  authors: [{ name: "Jasher Joshua A. Chan" }],
  openGraph: {
    title: "Jasher Chan | AI Automation Engineer",
    description:
      "Systems built around intent, approval, action, and receipt.",
    siteName: "Jasher Chan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jasher Chan, AI Automation Engineer",
      },
    ],
    type: "profile",
    locale: "en_PH",
  },

  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
