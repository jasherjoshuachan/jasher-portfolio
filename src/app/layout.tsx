import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
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
  metadataBase: new URL("https://jasherchan.truehubsolutions.com"),

  title: "Jasher Joshua Chan | AI Automation Engineer · n8n & Claude",
  description:
    "AI Automation Engineer building production multi-agent systems and end-to-end workflow automation. n8n · Claude · OpenClaw. Operations engineered to run themselves.",

  keywords: [
    "AI Automation Engineer", "Workflow Automation", "n8n", "Claude AI", "Agent Systems",
    "AI Agent Architecture", "Multi-Agent Systems", "Generative AI", "Workflow Engineer",
    "Automation Engineer", "Business Process Automation", "Jasher Chan",
    "Xero Advisor", "QuickBooks ProAdvisor",
  ],

  authors: [{ name: "Jasher Joshua A. Chan" }],

  alternates: {
    canonical: "https://jasherchan.truehubsolutions.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  openGraph: {
    title: "Jasher Joshua Chan | AI Automation Engineer · n8n & Claude",
    description:
      "I build AI-powered systems that run themselves. n8n · Claude · OpenClaw · Agent Systems. Open to Work & Consulting.",
    url: "https://jasherchan.truehubsolutions.com",
    siteName: "Jasher Joshua A. Chan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jasher Joshua Chan — AI Automation Engineer · n8n · Claude · Agent Systems",
      },
    ],
    type: "profile",
    locale: "en_PH",
  },

  twitter: {
    card: "summary_large_image",
    title: "Jasher Joshua Chan | AI Automation Engineer · n8n & Claude",
    description:
      "I build AI-powered systems that run themselves. n8n · Claude · OpenClaw · Agent Systems. Open to Work & Consulting.",
    images: ["/og-image.png"],
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-screen font-sans antialiased bg-bg text-text">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
