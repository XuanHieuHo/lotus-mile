export default function Stepper({ step, progress, rightLabel }: {
  step: number
  progress: number
  rightLabel: string
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Step {step} of 3</span>
        <span>{rightLabel}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-sky-800 transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
