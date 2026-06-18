import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded px-[22px] py-[14px] text-sm font-medium transition-colors duration-200 ease-takt";

  const styles =
    variant === "primary"
      ? "bg-ink text-white hover:bg-signal"
      : variant === "light"
        ? "bg-white text-ink hover:bg-signal hover:text-white"
        : "border border-line bg-transparent text-ink hover:border-signal";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
