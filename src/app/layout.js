import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CurtainIntro from "@/components/CurtainIntro";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "Buzzoraa - Social Engagement & Go-to-Market (GTM) SaaS Platform",
    template: "%s | Buzzoraa",
  },
  description:
    "Buzzoraa is a Social Engagement & Go-to-Market (GTM) SaaS platform designed to turn conversations into growth. Engage. Amplify. Grow.",
  keywords: [
    "Buzzoraa",
    "Social Engagement",
    "Go-to-Market SaaS",
    "GTM Platform",
    "Community Activation",
    "Content Amplification",
    "Social Networking Platforms",
    "Turn Conversations into Growth",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://buzzoraa.com"),
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Buzzoraa - Social Engagement & Go-to-Market (GTM) SaaS Platform",
    description:
      "Buzzoraa is a Social Engagement & Go-to-Market (GTM) SaaS platform designed to turn conversations into growth. Engage. Amplify. Grow.",
    url: "https://buzzoraa.com",
    siteName: "Buzzoraa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logohome.png",
        width: 1200,
        height: 630,
        alt: "Buzzoraa - Social Engagement & GTM SaaS Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buzzoraa - Social Engagement & Go-to-Market (GTM) SaaS Platform",
    description:
      "Buzzoraa is a Social Engagement & Go-to-Market (GTM) SaaS platform designed to turn conversations into growth.",
    images: ["/logohome.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://buzzoraa.com/#organization",
      "name": "Buzzoraa",
      "url": "https://buzzoraa.com",
      "logo": "https://buzzoraa.com/logohome.png",
    },
    {
      "@type": "WebSite",
      "@id": "https://buzzoraa.com/#website",
      "url": "https://buzzoraa.com",
      "name": "Buzzoraa",
      "publisher": {
        "@id": "https://buzzoraa.com/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "name": "Buzzoraa",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description":
        "Buzzoraa is a Social Engagement & Go-to-Market (GTM) SaaS platform designed to turn conversations into growth.",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="theme-color" content="#6366f1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.className} antialiased min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-500 selection:text-white`}>
        <CurtainIntro />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}