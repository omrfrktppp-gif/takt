export function FormSuccessBanner({ message }: { message: string }) {
  return (
    <p
      className="mb-6 rounded border border-signal/30 bg-accent/10 px-4 py-3 text-body text-ink"
      role="status"
    >
      {message}
    </p>
  );
}
