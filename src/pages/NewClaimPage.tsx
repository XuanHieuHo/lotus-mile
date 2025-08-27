// src/pages/NewClaimPage.tsx
import { Link, useNavigate } from 'react-router-dom'
import Topbar from '@/components/Topbar'
import Stepper from '@/components/Stepper'
import StepOne from '@/components/StepOne'
import StepTwo from '@/components/StepTwo'
import StepThree from '@/components/StepThree'
import { useNewClaim } from '@/hooks/useNewClaim'
import { useToast } from "@/components/Toast";

export default function NewClaimPage() {
  const nav = useNavigate()
  const {
    step, progress, stepLabel, next, prev,
    form, set, setFile, onDrop,
    canNext1, canNext2, chars,
    submit, submitting, error,
  } = useNewClaim()
  const toast = useToast();

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
        <p className="mt-2 text-slate-500">Fill out the form below to submit a claim for missing miles or points</p>

        <Stepper step={step} progress={progress} rightLabel={stepLabel} />

        <div className="mx-auto mt-6 max-w-3xl rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          {step === 1 && (
            <StepOne
              invoiceNo={form.invoice_no}
              note={form.note}
              chars={chars}
              canNext={canNext1}
              onChangeInvoiceNo={(v) => set('invoice_no', v)}
              onChangeNote={(v) => set('note', v)}
              onNext={next}
              onCancel={() => nav('/claims')}
            />
          )}

          {step === 2 && (
            <StepTwo
              points={form.points}
              file={form.file}
              onChangePoints={(v) => set('points', v)}
              onSelectFile={setFile}
              onDrop={onDrop}
              onPrev={prev}
              onNext={next}
              canNext={canNext2}
            />
          )}

          {step === 3 && (
            <StepThree
              data={form}
              onPrev={prev}
              onSubmit={() =>
                submit({
                  onSuccess: (item) => {
                    toast.success('Claim submitted!', {
                      title: 'Create claim successful',
                      appearance: 'solid',
                      duration: 2000,
                    })
                    nav('/claims', {
                      replace: true,
                      state: {
                        flash: {
                          type: 'success',
                          text: `Created claim #${item.id} successfully.`,
                        },
                      },
                    })
                  },
                  onError: (err) => {
                    const message =
                      err?.response?.data?.message || err?.message || 'Submit claim failed'
                    toast.error(message, {
                      title: 'Submit error',
                      appearance: 'solid',
                    })
                  },
                })
              }
              submitting={submitting}
              error={error}
            />
          )}
        </div>
      </main>
    </div>
  )
}
