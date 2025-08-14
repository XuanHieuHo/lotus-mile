import { useMemo, useState } from 'react'
import type { ClaimType, NewClaimForm, NewClaimStep } from '@/api/claims.api'

export const CLAIM_TYPES: ClaimType[] = [
  'Missing Miles/Points',
  'Hotel Bonus Points',
  'Car Rental Miles',
  'Credit Card Bonus',
  'Partner Points',
  'Other',
]

export function useNewClaim() {
  const [step, setStep] = useState<NewClaimStep>(1)
  const [form, setForm] = useState<NewClaimForm>({
    claimType: '',
    description: '',
    points: '',
    files: [],
  })

  const chars = form.description.length
  const canNext1 = !!form.claimType && form.description.trim().length > 0
  const canNext2 = form.points !== '' // có thể thêm validate > 0

  const progress = useMemo(() => (step === 1 ? 33 : step === 2 ? 66 : 100), [step])
  const stepLabel = step === 1 ? 'Claim Details' : step === 2 ? 'Points & Files' : 'Review & Submit'

  function next() { setStep((s) => (Math.min(3, (s + 1)) as NewClaimStep)) }
  function prev() { setStep((s) => (Math.max(1, (s - 1)) as NewClaimStep)) }

  function set<K extends keyof NewClaimForm>(key: K, value: NewClaimForm[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addFiles(list: File[]) {
    setForm((f) => ({ ...f, files: [...f.files, ...list].slice(0, 5) }))
  }
  function removeFile(idx: number) {
    setForm((f) => ({ ...f, files: f.files.filter((_, i) => i !== idx) }))
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const list = Array.from(e.dataTransfer.files).slice(0, 5)
    addFiles(list)
  }

  return {
    step, setStep, progress, stepLabel, next, prev,
    form, set, addFiles, removeFile, onDrop,
    canNext1, canNext2, chars,
  }
}
