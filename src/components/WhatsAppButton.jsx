"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <aside
      aria-label="Floating support"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <a
        href="https://wa.me/919876543210?text=Hello%20Happico%20Team%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with Happico Support on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-white text-transparent" />
        <span className="hidden sm:inline">Chat with us</span>
      </a>
    </aside>
  );
}
