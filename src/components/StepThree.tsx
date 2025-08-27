// src/components/StepThree.tsx
import Button from '@/components/Button'

type ReviewData = {
  invoice_no: string
  claim_date: string   // from hook (auto now)
  note: string
  points: string
  file: File | null
}

type Props = {
  data: ReviewData
  onPrev: () => void
  onSubmit: () => void
  submitting?: boolean
  error?: string | null
}

export default function StepThree({ data, onPrev, onSubmit, submitting, error }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">Step 3: Review and Submit</h2>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Claim Summary</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-500">Invoice No</div>
              <div className="font-semibold text-slate-900">{data.invoice_no || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Claim Date</div>
              <div className="font-semibold text-slate-900">{data.claim_date}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Points Requested</div>
              <div className="font-semibold text-emerald-600">
                {data.points !== '' ? `+${data.points} miles` : '-'}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Attachment</div>
              <div className="font-semibold text-slate-900">{data.file ? data.file.name : '-'}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs text-slate-500">Note</div>
              <div className="whitespace-pre-wrap break-words text-slate-900">
                {data.note || '-'}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span className="mr-2">ℹ️</span>
          Claim date sẽ được đặt bằng thời điểm hiện tại khi bạn nhấn Submit.
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="rounded-xl" onClick={onPrev} disabled={submitting}>Previous</Button>
          <Button className="rounded-xl" onClick={onSubmit} disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Claim'}
          </Button>
        </div>
      </div>
    </section>
  )
}
