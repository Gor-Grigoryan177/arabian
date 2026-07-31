import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0a0907",
        deep: "#110e09",
        surface: "#161410",
        surface2: "#1e1b17",
        border: "#2a2620",
        gold: {
          DEFAULT: "#c8a96e",
          light: "#e2c99a",
          dim: "#7a6540",
        },
        beige: "#f0e8da",
        warmwhite: "#faf6f0",
        muted: "#7a7168",
        ink: "#e8e0d4",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.4,0,0.2,1) both",
        shimmer: "shimmer 3s linear infinite",
        ticker: "ticker-scroll 22s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
