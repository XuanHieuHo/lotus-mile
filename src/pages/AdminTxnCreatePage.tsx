// src/features/admin/transactions/create/pages/AdminTxnCreatePage.tsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminTopbar from '@/components/AdminTopbar'
import { useCreateManualTxn } from '@/hooks/useCreateManualTxn'
import { useToast } from '@/components/Toast'

export default function AdminTxnCreatePage() {
  const nav = useNavigate()
  const toast = useToast()
  const { mutate, data, isPending, isSuccess, isError, error } = useCreateManualTxn()

  const [memberEmail, setEmail] = useState('')
  const [points, setPoints] = useState('') // string để nhập mượt
  const [reason, setReason] = useState('')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const p = Number(points)
    // gửi đi — server vẫn sẽ validate lại
    mutate({ memberEmail, points: Number.isFinite(p) ? p : 0, reason })
  }

  // Thành công: popup + điều hướng sang trang success (trang success sẽ tự redirect về list sau ~2s)
  useEffect(() => {
    if (!isSuccess || !data) return
    toast.success('Transaction created successfully', { title: data.id, appearance: 'solid' })
    nav('/admin/transactions/success', { state: data, replace: true })
  }, [isSuccess, data, toast, nav])

  // Thất bại: popup lỗi, KHÔNG rời trang
  useEffect(() => {
    if (!isError) return
    const msg =
      (error as any)?.response?.data?.message ||
      (error as any)?.message ||
      'Create transaction failed'
    toast.error(msg, { title: 'Create failed', appearance: 'solid' })
  }, [isError, error, toast])

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />

      <main className="container mx-auto px-4 pb-20 pt-6">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <Link to="/admin/transactions" className="text-sky-800 hover:underline">
            ← Back
          </Link>
          <h1 className="text-2xl font-semibold text-slate-900">
            Add Manual Transaction
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="max-w-3xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <span>🧾</span> <span>Transaction Details</span>
          </div>

          {/* Member Email */}
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Member Email <span className="text-rose-600">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter member email address"
              value={memberEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-9 text-sm text-slate-800
                         placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">📧</span>
          </div>
          <p className="mb-4 text-xs text-slate-500">
            System will validate if this member exists
          </p>

          {/* Points */}
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Points to Add <span className="text-rose-600">*</span>
          </label>
          <input
            inputMode="numeric"
            placeholder="Enter points amount"
            value={points}
            onChange={(e) => setPoints(e.target.value.replace(/[^\d]/g, ''))}
            className="mb-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800
                       placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
          <p className="mb-4 text-xs text-slate-500">
            Maximum 100,000 points per transaction
          </p>

          {/* Reason */}
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Reason <span className="text-rose-600">*</span>
          </label>
          <textarea
            placeholder="Please provide a detailed reason for this manual transaction..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mb-2 h-28 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800
                       placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
          <p className="text-xs text-slate-500">
            This information will be logged for audit purposes
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-950 disabled:opacity-60"
            >
              {isPending ? 'Adding…' : 'Add Transaction'}
            </button>
            <Link
              to="/admin/transactions"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Notes box */}
        <div className="mt-6 max-w-3xl rounded-3xl bg-sky-50 p-5 ring-1 ring-sky-100">
          <div className="font-semibold text-slate-800">Important Notes</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>All manual transactions are logged and tracked for audit purposes</li>
            <li>Points will be immediately added to the member&apos;s account</li>
            <li>Member will receive an email notification about the points addition</li>
            <li>This action cannot be undone through the interface</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
