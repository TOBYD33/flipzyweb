import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./landing/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        flipzy: {
          purple: "#5E0CC8",
          mint: "#03FB89",
          ink: "#130727",
          fog: "#f6f3ff"
        }
      },
      boxShadow: {
        glow: "0 0 80px rgba(94, 12, 200, 0.35)",
        card: "0 12px 40px rgba(19, 7, 39, 0.08)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 20% 15%, rgba(94, 12, 200, 0.40), transparent 35%), radial-gradient(circle at 80% 30%, rgba(3, 251, 137, 0.28), transparent 30%), linear-gradient(135deg, #f8f4ff 0%, #ffffff 45%, #ecfffa 100%)"
      }
    }
  },
  plugins: []
};

export default config;
