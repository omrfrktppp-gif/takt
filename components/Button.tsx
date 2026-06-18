import Link from "next/link";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick: () => void;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  href,
  onClick,
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

  const classes = `${base} ${styles} ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
