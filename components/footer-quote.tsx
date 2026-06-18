"use client";

import { useState, useEffect } from "react";
import { Caveat } from "next/font/google";
import { quotes } from "@/lib/engineering-quotes";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export function FooterQuote() {
  const [mounted, setMounted] = useState(false);
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !quote) {
    return <div className="h-24 w-full" aria-hidden="true" />;
  }

  return (
    <footer
      className={`w-full flex justify-center pb-0 pt-0 transition-opacity duration-1000 ease-in-out ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-2 max-w-lg text-center ${caveat.className}`}
      >
        <p className="text-foreground text-2xl md:text-3xl tracking-wide">
          &quot;{quote.text}&quot;
        </p>
        <span className="text-muted-foreground text-xl font-bold">— {quote.author}</span>
      </div>
    </footer>
  );
}
