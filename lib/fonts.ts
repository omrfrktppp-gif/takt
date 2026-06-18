import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

export const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600"],
});

export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
