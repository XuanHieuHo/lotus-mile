import { Link, useNavigate } from 'react-router-dom'
import Topbar from '@/components/Topbar'
import Stepper from '@/components/Stepper'
import StepOne from '@/components/StepOne'
import StepTwo from '@/components/StepTwo'
import StepThree from '@/components/StepThree'
import { useNewClaim } from '@/hooks/useNewClaim'

export default function NewClaimPage() {
  const nav = useNavigate()
  const {
    step, progress, stepLabel, next, prev,
    form, set, onDrop, removeFile,
    canNext1, canNext2, chars,
  } = useNewClaim()

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />

      <main className="container mx-auto px-4 pb-16 pt-6">
        <div className="mb-3">
          <Link to="/claims" className="inline-flex items-center gap-2 text-sky-800 hover:underline">
            ← Back to Claims
          </Link>
        </div>

        <h1 className="text-4xl font-semibold text-slate-900">Submit New Claim</h1>
        <p className="mt-2 text-slate-500">
          Fill out the form below to submit a claim for missing miles or points
        </p>

        <Stepper step={step} progress={progress} rightLabel={stepLabel} />

        <div className="mx-auto mt-6 max-w-3xl rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          {step === 1 && (
            <StepOne
              claimType={form.claimType}
              description={form.description}
              chars={chars}
              canNext={canNext1}
              onChangeType={(v) => set('claimType', v)}
              onChangeDesc={(v) => set('description', v)}
              onNext={next}
              onCancel={() => nav('/claims')}
            />
          )}

          {step === 2 && (
            <StepTwo
              points={form.points}
              files={form.files}
              onChangePoints={(v) => set('points', v)}
              onDrop={onDrop}
              onRemoveFile={removeFile}
              onPrev={prev}
              onNext={next}
              canNext={canNext2}
            />
          )}

          {step === 3 && (
            <StepThree
              data={form}
              onPrev={prev}
              onSubmit={() => {
                // TODO: call API submit
                nav('/claims/submit-success')
              }}
            />
          )}
        </div>
      </main>
    </div>
  )
}
