import Button from '@/components/Button'
import type { ClaimType } from '@/api/claims.api'
import { CLAIM_TYPES } from '@/hooks/useNewClaim'

type Props = {
  claimType: ClaimType | ''
  description: string
  chars: number
  canNext: boolean
  onChangeType: (v: ClaimType | '') => void
  onChangeDesc: (v: string) => void
  onNext: () => void
  onCancel: () => void
}

export default function StepOne({
  claimType, description, chars, canNext, onChangeType, onChangeDesc, onNext, onCancel,
}: Props) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">Step 1: Claim Information</h2>

      <div className="mt-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Claim Type <span className="text-rose-500">*</span>
          </label>
          <p className="text-sm text-slate-500">Select the type of claim</p>

          <div className="relative mt-2">
            <select
              value={claimType}
              onChange={(e) => onChangeType(e.target.value as ClaimType | '')}
              className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-3 text-slate-800 shadow-sm
                         focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="" disabled>— Choose a type —</option>
              {CLAIM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Description <span className="text-rose-500">*</span>
          </label>
          <p className="text-sm text-slate-500">
            Please provide detailed information about your claim. Include flight numbers, dates,
            booking references, or any other relevant details...
          </p>
          <textarea
            value={description}
            onChange={(e) => onChangeDesc(e.target.value.slice(0, 500))}
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
