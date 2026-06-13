import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        panel: "#1a1a1a",
        surface: "#222222",
        orange: "#e8600c",
        amber: "#f5b301",
        paper: "#f5f5f5",
        soft: "#eeeeee",
        lead: "#5a5a5a",
        ghost: "#d8d8d8",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        label: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter-tight)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        orange: "0 16px 40px -10px rgba(232,96,12,.3)",
        heavy: "0 30px 70px -15px rgba(0,0,0,.5)",
      },
    },
  },
  plugins: [],
};

export default config;
