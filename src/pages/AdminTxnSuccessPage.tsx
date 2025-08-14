import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AdminTopbar from '@/components/AdminTopbar'
import { useToast } from '@/components/Toast'
import type { ManualTxnResult } from '@/api/transactions.api'

export default function AdminTxnSuccessPage() {
  const nav = useNavigate()
  const toast = useToast()
  const { state } = useLocation() as { state?: ManualTxnResult }

  useEffect(() => {
    if (state?.id) {
      // hiển thị popup (nếu chưa show từ onSuccess ở hook thì có thể bỏ)
      toast.success('Transaction created', { title: state.id, appearance: 'solid' })
    }
    const t = setTimeout(() => nav('/admin/transactions', { replace: true }), 2000)
    return () => clearTimeout(t)
  }, [state, nav, toast])

  if (!state?.id) {
    // nếu vào trực tiếp trang này không có state, quay lại list
    nav('/admin/transactions', { replace: true })
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />
      <main className="container mx-auto px-4 pt-16">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div>
          <h1 className="text-xl font-semibold text-slate-900">Manual Transaction Added!</h1>
          <p className="mt-1 text-slate-600">Transaction <b>{state.id}</b> has been recorded successfully.</p>

          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Member</span>
              <span className="font-medium text-slate-800">{state.memberEmail}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-slate-500">Points</span>
              <span className="font-medium text-emerald-600">+{state.points.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/admin/transactions"
              className="rounded-xl bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-950"
            >
              Back to Transactions
            </Link>
            <Link
              to="/admin/transactions/new"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Add Another
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-500">You’ll be redirected to Transaction History shortly…</p>
        </div>
      </main>
    </div>
  )
}
