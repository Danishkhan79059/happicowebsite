import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "Happico - Modern Digital Solutions & Workflow Platform",
    template: "%s | Happico",
  },
  description:
    "Happico is the all-in-one modern platform engineered to empower growth, automate operations, and deliver delightful customer experiences.",
  keywords: [
    "Happico",
    "Customer Experience",
    "Workflow Automation",
    "SaaS Platform",
    "Modern Web Solutions",
    "Enterprise Software",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${poppins.className} antialiased min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-500 selection:text-white`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}