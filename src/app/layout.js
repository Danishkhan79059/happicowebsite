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
  metadataBase: new URL("https://buzzoraa.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="theme-color" content="#6366f1" />
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