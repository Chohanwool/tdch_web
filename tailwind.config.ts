import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      colors: {
        ivory: "#f7f5ef",
        ink: "#222018",
        cedar: "#4f3a28",
        moss: "#5b6f4f",
        clay: "#b77e55",
        gold: "#d0ad68"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(34, 32, 24, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
