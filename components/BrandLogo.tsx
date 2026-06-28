import Image from "next/image";
import { siteConfig } from "@/lib/site";

const LOGO_SRC = siteConfig.logo.src;

type BrandLogoProps = {
  /** Piksel cinsinden kare boyut */
  size?: number;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = 36,
  className = "",
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={siteConfig.logo.alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={85}
      className={`shrink-0 ${className}`}
      priority={priority}
    />
  );
}

export const brandLogo = {
  src: LOGO_SRC,
  alt: siteConfig.logo.alt,
} as const;
