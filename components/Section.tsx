type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "paper" | "white" | "ink";
};

export function Section({
  children,
  className = "",
  id,
  variant = "paper",
}: SectionProps) {
  const bg =
    variant === "white"
      ? "bg-white"
      : variant === "ink"
        ? "bg-ink text-white"
        : "bg-paper";

  return (
    <section id={id} className={`px-6 py-16 md:py-24 lg:py-32 ${bg} ${className}`}>
      <div className="mx-auto max-w-content">{children}</div>
    </section>
  );
}
