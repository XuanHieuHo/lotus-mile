import Button from '@/components/Button'
import type { NewClaimForm } from '@/api/claims.api'

type Props = {
  data: NewClaimForm
  onPrev: () => void
  onSubmit: () => void
}

export default function StepThree({ data, onPrev, onSubmit }: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">Step 3: Review and Submit</h2>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Claim Summary</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-500">Claim Type</div>
              <div className="font-semibold text-slate-900">{data.claimType || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Points Requested</div>
              <div className="font-semibold text-emerald-600">
                {data.points !== '' ? `+${data.points} miles` : '-'}
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs text-slate-500">Description</div>
              <div className="whitespace-pre-wrap break-words text-slate-900">
                {data.description || '-'}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <span className="mr-2">ℹ️</span>
          Please review your claim details carefully before submitting. Once submitted, you cannot
          edit the claim information.
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="rounded-xl" onClick={onPrev}>Previous</Button>
          <Button className="rounded-xl" onClick={onSubmit}>Submit Claim</Button>
        </div>
      </div>
    </section>
  )
}
