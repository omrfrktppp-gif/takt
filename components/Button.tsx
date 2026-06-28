import Link from "next/link";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const base =
    "inline-flex items-center justify-center rounded px-[22px] py-[14px] text-sm font-medium transition-colors duration-200 ease-takt";

  const styles =
    variant === "primary"
      ? "bg-ink text-white hover:bg-signal"
      : variant === "light"
        ? "bg-white text-ink hover:bg-signal hover:text-white"
        : "border border-line bg-transparent text-ink hover:border-signal";

  const classes = `${base} ${styles} ${className}`;

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { onClick } = props as ButtonAsButton;
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
