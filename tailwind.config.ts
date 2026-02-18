import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dragon: {
          900: "#0a0a0f", // Deep void
          800: "#12121a", // Dark slate
          700: "#1a1a2e", // Dragon blue-dark
          600: "#252542", // Dragon blue
          500: "#363663", // Accent
          400: "#ff6b35", // Fire orange
          300: "#ff8c42", // Fire light
          200: "#ffd93d", // Gold
          100: "#fff5e6", // Warm white
        },
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
