import Button from '@/components/Button'
import Input from '@/components/Input'

type Props = {
  points: number | ''
  files: File[]
  onChangePoints: (v: number | '') => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onRemoveFile: (idx: number) => void
  onPrev: () => void
  onNext: () => void
  canNext: boolean
}

export default function StepTwo({
  points, files, onChangePoints, onDrop, onRemoveFile, onPrev, onNext, canNext,
}: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">Step 2: Points and Documentation</h2>

      <div className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Points/Miles Requested <span className="text-rose-500">*</span>
          </label>
          <div className="mt-2 max-w-xs">
            <Input
              type="number"
              min={0}
              value={points as number | undefined}
              onChange={(e) => onChangePoints(e.target.value === '' ? '' : Number(e.target.value))}
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800">Supporting Documents (Optional)</label>
          <p className="text-sm text-slate-500">
            Upload receipts, boarding passes, confirmation emails, or other supporting documents. Max 5 files, 5MB each.
          </p>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="mt-3 grid h-40 place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50
                       text-center text-slate-500"
          >
            <div>
              <div className="text-2xl">⤴️</div>
              <div className="mt-1">Click to upload files or drag and drop</div>
              <div className="text-xs text-slate-400">PDF, JPG, PNG, GIF, DOC, DOCX up to 5MB each</div>
            </div>
          </div>

          {files.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {files.map((f, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                  <span className="truncate">{f.name}</span>
                  <button type="button" className="text-slate-500 hover:text-slate-700" onClick={() => onRemoveFile(i)}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="rounded-xl" onClick={onPrev}>Previous</Button>
          <Button className="rounded-xl" onClick={onNext} disabled={!canNext}>Next Step</Button>
        </div>
      </div>
    </section>
  )
}
