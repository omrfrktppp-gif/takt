type FormProgressProps = {
  percent: number;
  currentStep: number;
  totalSteps: number;
};

export function FormProgress({
  percent,
  currentStep,
  totalSteps,
}: FormProgressProps) {
  return (
    <div className="sticky-below-nav -mx-1 mb-4 border-b border-signal/25 bg-paper/90 px-1 pb-3 pt-1 backdrop-blur-xl">
      <div className="mb-2 flex items-center justify-between gap-4 font-mono text-small text-steel">
        <span>
          {totalSteps > 0
            ? `Adım ${currentStep} / ${totalSteps}`
            : "Başlangıç"}
        </span>
        <span aria-hidden="true" className="text-signal-text">
          {percent}%
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-sm bg-line/80"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={
          totalSteps > 0
            ? `${totalSteps} adımdan ${currentStep}. adım, yüzde ${percent} tamamlandı`
            : `İhtiyaç seçimi, yüzde ${percent} tamamlandı`
        }
        aria-label="Form ilerlemesi"
      >
        <div
          className="h-full bg-signal shadow-[0_0_18px_rgba(31,79,224,0.58)] transition-[width] duration-500 ease-takt motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
