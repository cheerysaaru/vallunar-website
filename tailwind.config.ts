import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#002b52",
        "navy-dark": "#00487d",
        "navy-darker": "#001f3d",
        "mid-blue": "#2f7fb0",
        "mid-blue-hover": "#1e6ba3",
        "light-tint": "#eef5fa",
        "border-light": "#d9e6ef",
        "text-dark": "#0a2a4a",
        "text-muted": "#4a6a82",
        "text-light": "#6b8aa3",
        "surface-white": "#ffffff",
        "surface-light": "#f3f8fb",
        "accent-cyan": "#61a5c2",
        mist: "#e7f2fa",
        "focus-ring": "#2f7fb0",
        "focus-ring-offset": "#ffffff",
        error: "#dc2626",
        "error-bg": "#fef2f2",
        success: "#16a34a",
        "success-bg": "#f0fdf4",
        "whats-app": "#25d366",
      },
      fontFamily: { sans: ["var(--font-inter)", "sans-serif"] },
      boxShadow: { glow: "0 0 36px rgba(97,165,194,.28)" }
    }
  },
  plugins: []
};
export default config;
