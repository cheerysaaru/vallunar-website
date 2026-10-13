import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#012A4A",
        deep: "#013A63",
        blue: "#014F86",
        cyan: "#61A5C2",
        mist: "#A9D6E5",
        line: "#2A6F97",
        paper: "#F3F8FA"
      },
      fontFamily: { sans: ["var(--font-dm-sans)", "sans-serif"] },
      boxShadow: { glow: "0 0 36px rgba(97,165,194,.28)" }
    }
  },
  plugins: []
};
export default config;
