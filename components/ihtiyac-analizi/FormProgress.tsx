type FormProgressProps = {
  percent: number;
};

export function FormProgress({ percent }: FormProgressProps) {
  return (
    <div className="sticky top-16 z-10 -mx-1 mb-6 rounded bg-paper/95 px-1 pb-2 pt-1 backdrop-blur">
      <div className="mb-2 flex items-center justify-between font-mono text-small text-steel">
        <span>İlerleme</span>
        <span>{percent}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-signal transition-all duration-300 ease-takt"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
