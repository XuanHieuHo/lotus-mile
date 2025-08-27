// src/components/StepTwo.tsx
import Button from '@/components/Button'
import Input from '@/components/Input'

type Props = {
  points: string
  file: File | null
  onChangePoints: (v: string) => void
  onSelectFile: (f: File | null) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  onPrev: () => void
  onNext: () => void
  canNext: boolean
}

export default function StepTwo({
  points, file, onChangePoints, onSelectFile, onDrop, onPrev, onNext, canNext,
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
              value={points}
              onChange={(e) => onChangePoints(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800">Supporting Document (Optional)</label>
          <p className="text-sm text-slate-500">
            Upload 1 file: PDF/JPG/PNG/GIF/DOC/DOCX, tối đa 5MB.
          </p>

          {/* Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="mt-3 grid h-40 place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50
                       text-center text-slate-500"
          >
            <div>
              <div className="text-2xl">⤴️</div>
              <div className="mt-1">Click to upload file or drag & drop</div>
              <div className="text-xs text-slate-400">Max 1 file, up to 5MB</div>
              <div className="mt-2">
                <label className="inline-block cursor-pointer rounded-xl border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50">
                  Choose file
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,image/*,.doc,.docx"
                    onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* File preview */}
          {file && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                className="text-slate-500 hover:text-slate-700"
                onClick={() => onSelectFile(null)}
              >
                ✕
              </button>
            </div>
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
