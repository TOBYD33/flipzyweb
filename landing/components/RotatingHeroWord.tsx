"use client";

import { useEffect, useState } from "react";

const words = ["Marketplace", "Jiji", "LinkedIn", "Deals"] as const;

export function RotatingHeroWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  const word = words[index];

  return (
    <span key={word} className="hero-word-flip inline-flex items-baseline">
      <span>{word}</span>
      <span className="text-flipzy-purple">.</span>
    </span>
  );
}
