type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "paper" | "white" | "ink";
  narrow?: boolean;
};

export function Section({
  children,
  className = "",
  id,
  variant = "paper",
  narrow = false,
}: SectionProps) {
  const bg =
    variant === "white"
      ? "bg-white"
      : variant === "ink"
        ? "bg-ink text-white"
        : "bg-paper";

  return (
    <section
      id={id}
      className={`px-5 py-12 sm:px-6 md:py-20 lg:py-28 ${bg} ${className}`}
    >
      <div
        className={`mx-auto w-full ${narrow ? "max-w-3xl" : "max-w-content"}`}
      >
        {children}
      </div>
    </section>
  );
}
