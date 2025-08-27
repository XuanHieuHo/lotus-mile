// src/hooks/useNewClaim.ts
import { useMemo, useState } from 'react'
import { newClaims } from '@/api/claims.api'
import type { NewClaimForm as ApiNewClaimForm, ClaimStatus, NewClaimStep } from '@/api/claims.api'

// helper: YYYY-MM-DD theo Asia/Ho_Chi_Minh
function nowYMD(tz = 'Asia/Ho_Chi_Minh') {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date())
}

type NewClaimFormUI = {
  invoice_no: string
  claim_date: string   // auto
  note: string
  points: string
  file: File | null
}

type SubmitOpts = {
  onSuccess?: (item: { id: number; status: ClaimStatus }) => void
  onError?: (err: any) => void
  onFinally?: () => void
}

export function useNewClaim() {
  const [step, setStep] = useState<NewClaimStep>(1)
  const [form, setForm] = useState<NewClaimFormUI>({
    invoice_no: '',
    claim_date: nowYMD(),
    note: '',
    points: '',
    file: null,
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ id: number; status: ClaimStatus } | null>(null)

  const toPositiveInt = (s: string) => {
    const n = Number(s)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : NaN
  }

  const chars = form.note.length
  const canNext1 = form.invoice_no.trim() !== '' // claim_date auto
  const canNext2 = toPositiveInt(form.points) > 0 // (tuỳ yêu cầu có bắt buộc file hay không)

  const progress = useMemo(() => (step === 1 ? 33 : step === 2 ? 66 : 100), [step])
  const stepLabel = step === 1 ? 'Claim Details' : step === 2 ? 'Points & File' : 'Review & Submit'

  function next() { setStep(s => Math.min(3, s + 1) as NewClaimStep) }
  function prev() { setStep(s => Math.max(1, s - 1) as NewClaimStep) }

  function set<K extends keyof NewClaimFormUI>(key: K, value: NewClaimFormUI[K]) {
    setForm(f => ({ ...f, [key]: value }))
  }
  function setFile(file: File | null) { setForm(f => ({ ...f, file })) }
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setFile(e.dataTransfer.files?.[0] ?? null)
  }

  async function submit(opts?: SubmitOpts) {
  setSubmitting(true)
  setError(null)
  setResult(null)

  try {
    if (!canNext1 || !canNext2) {
      throw new Error('Vui lòng nhập Invoice No và Points > 0')
    }

    const today = nowYMD()
    if (form.claim_date !== today) {
      setForm(f => ({ ...f, claim_date: today }))
    }

    const payload: ApiNewClaimForm = {
      invoice_no: form.invoice_no.trim(),
      claim_date: today,
      requested_points: toPositiveInt(form.points),
      note: form.note.trim(),
      attachment: form.file,
    }

    const res = await newClaims(payload)

    // ---- GUARD NHIỀU SHAPE KHÁC NHAU ----
    // Có dự án trả: { item: {...} }, có nơi trả: {...}, có nơi: { data: { item: {...} } }
    const raw: any = res
    const item =
      raw?.item ??
      raw?.data?.item ??
      (raw && typeof raw === 'object' && 'id' in raw ? raw : undefined)

    if (!item?.id) {
      // Log để debug Network tab nếu cần
      // console.debug('Create claim response:', res)
      throw new Error('Create claim thành công nhưng thiếu id trong response')
    }

    const normalized = {
      id: typeof item.id === 'string' ? parseInt(item.id, 10) : item.id,
      status: (item.status ?? 'PENDING') as ClaimStatus,
    }

    setResult(normalized)
    setStep(3)

    // ✅ chỉ gọi khi chắc chắn có id
    opts?.onSuccess?.(normalized)
  } catch (e: any) {
    setError(e?.response?.data?.message ?? e?.message ?? 'Submit claim failed')
    opts?.onError?.(e)
  } finally {
    setSubmitting(false)
    opts?.onFinally?.()
  }
}

  return {
    step, setStep, progress, stepLabel, next, prev,
    form, set, setFile, onDrop,
    canNext1, canNext2, chars,
    submit, submitting, error, result,
  }
}
