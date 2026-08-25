import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        steel: "var(--steel)",
        line: "var(--line)",
        paper: "var(--paper)",
        white: "var(--white)",
        deep: "var(--deep)",
        "surface-raised": "var(--surface-raised)",
        signal: "var(--signal)",
        "signal-text": "var(--signal-text)",
        "signal-ink": "var(--signal-ink)",
        accent: "var(--accent)",
        danger: "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 6vw, 4.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        h1: [
          "clamp(2rem, 5vw, 2.75rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        h2: ["2rem", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        eyebrow: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "500" },
        ],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
      },
      maxWidth: {
        content: "1200px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
        32: "8rem",
      },
      transitionTimingFunction: {
        takt: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
