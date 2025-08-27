// src/components/StepOne.tsx
import Button from '@/components/Button'

type Props = {
  invoiceNo: string
  note: string
  chars: number
  canNext: boolean
  onChangeInvoiceNo: (v: string) => void
  onChangeNote: (v: string) => void
  onNext: () => void
  onCancel: () => void
}

export default function StepOne({
  invoiceNo, note, chars, canNext,
  onChangeInvoiceNo, onChangeNote,
  onNext, onCancel,
}: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">Step 1: Claim Information</h2>

      <div className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Invoice No <span className="text-rose-500">*</span>
          </label>
          <input
            value={invoiceNo}
            onChange={(e) => onChangeInvoiceNo(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-slate-800 shadow-sm
                       focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="e.g., VN12345"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Note (optional)
          </label>
          <p className="text-sm text-slate-500">
            Thêm thông tin chi tiết: số chuyến bay, ngày giờ, mã đặt chỗ, v.v.
          </p>
          <textarea
            value={note}
            onChange={(e) => onChangeNote(e.target.value.slice(0, 500))}
            rows={6}
            className="mt-2 w-full resize-y rounded-2xl border border-slate-300 bg-white p-4 text-slate-800 shadow-sm
                       placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            placeholder="Add details here…"
          />
          <div className="mt-1 text-right text-xs text-slate-500">{chars}/500 characters</div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" className="rounded-xl" onClick={onCancel}>Cancel</Button>
          <Button className="rounded-xl" onClick={onNext} disabled={!canNext}>Next Step</Button>
        </div>
      </div>
    </section>
  )
}
