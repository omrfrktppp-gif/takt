type EyebrowProps = {
  children: React.ReactNode;
};

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="mb-4 flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.08em] text-steel">
      <span className="inline-block h-4 w-0.5 bg-signal" aria-hidden="true" />
      {children}
    </p>
  );
}
