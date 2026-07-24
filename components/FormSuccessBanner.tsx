export function FormSuccessBanner({ message }: { message: string }) {
  return (
    <p className="form-success" role="status">
      {message}
    </p>
  );
}
