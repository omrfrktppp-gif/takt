import Image from "next/image";

const LOGO_SRC = "/logo.webp";

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
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`shrink-0 rounded-sm ${className}`}
      priority={priority}
    />
  );
}

export const brandLogo = {
  src: LOGO_SRC,
  alt: "Takt",
} as const;
