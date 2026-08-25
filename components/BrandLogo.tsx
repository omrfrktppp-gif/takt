import Image from "next/image";
import { siteConfig } from "@/lib/site";

const LOGO_SRC = siteConfig.logo.src;

type BrandLogoProps = {
  /** Piksel cinsinden kare boyut */
  size?: number;
  className?: string;
  priority?: boolean;
  variant?: "light" | "signal";
};

export function BrandLogo({
  size = 36,
  className = "",
  priority = false,
  variant = "light",
}: BrandLogoProps) {
  const src =
    variant === "signal" ? siteConfig.logo.signalSrc : siteConfig.logo.src;

  return (
    <Image
      src={src}
      alt={siteConfig.logo.alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 ${className}`}
      priority={priority}
    />
  );
}

export const brandLogo = {
  src: LOGO_SRC,
  signalSrc: siteConfig.logo.signalSrc,
  alt: siteConfig.logo.alt,
} as const;
