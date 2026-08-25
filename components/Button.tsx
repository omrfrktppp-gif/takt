import { ArrowRight, LoaderCircle } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "signal";
  className?: string;
  showArrow?: boolean;
  loading?: boolean;
  loadingLabel?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  htmlType?: "button" | "submit";
  disabled?: boolean;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    className = "",
    showArrow = variant === "primary" || variant === "signal",
    loading = false,
    loadingLabel = "Yükleniyor…",
  } = props;
  const base =
    "group relative isolate inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded border px-[22px] py-[14px] text-sm font-semibold transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-takt active:scale-[0.98] focus-visible:outline-ink motion-reduce:transition-none";

  const styles =
    variant === "primary"
      ? "border-line bg-surface-raised text-ink hover:border-signal hover:bg-white"
      : variant === "signal"
        ? "border-signal bg-signal text-signal-ink shadow-[0_10px_30px_rgba(31,79,224,0.2)] hover:bg-[var(--signal-strong)] hover:shadow-[0_14px_36px_rgba(31,79,224,0.28)]"
      : variant === "light"
        ? "border-ink bg-ink text-deep hover:border-signal hover:bg-signal hover:text-ink"
        : variant === "ghost"
          ? "border-transparent bg-transparent text-ink hover:border-line hover:bg-white"
          : "border-line bg-transparent text-ink hover:border-signal hover:bg-signal/10";

  const classes = `${base} ${styles} ${loading ? "cursor-wait opacity-70" : ""} ${className}`;
  const content = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current opacity-45 transition-transform duration-300 ease-takt motion-reduce:transition-none group-hover:scale-x-100"
      />
      {loading ? (
        <LoaderCircle
          aria-hidden="true"
          className="size-4 animate-spin motion-reduce:animate-none"
          strokeWidth={1.8}
        />
      ) : null}
      <span>{loading ? loadingLabel : children}</span>
      {showArrow && !loading ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 ease-takt motion-reduce:transition-none group-hover:translate-x-1"
          strokeWidth={1.8}
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, onClick } = props;
    return (
      <LocaleLink href={href} className={classes} onClick={onClick}>
        {content}
      </LocaleLink>
    );
  }

  const {
    onClick,
    htmlType = "button",
    disabled = false,
  } = props as ButtonAsButton;
  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
