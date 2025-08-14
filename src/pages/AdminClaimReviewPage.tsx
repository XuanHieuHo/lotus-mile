import { Link, useParams } from 'react-router-dom'
import AdminTopbar from '@/components/AdminTopbar'
import { useAdminClaimReview } from '@/hooks/useAdminClaimReview'
import ClaimInfoCard from '../components/ClaimInfoCard'
import MemberCard from '../components/MemberCard'
import AttachmentsCard from '../components/AttachmentsCard'
import AdminNotes from '../components/AdminNotes'
import ActionsPanel from '../components/ActionsPanel'
import type { ReviewStatus } from '@/api/admin_review_claims.api'

function StatusBadge({ s }: { s: ReviewStatus }) {
  const map = {
    Pending: 'bg-amber-100 text-amber-800',
    Approved: 'bg-emerald-100 text-emerald-800',
    Rejected: 'bg-rose-100 text-rose-800',
  }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${map[s]}`}>{s}</span>
}

export default function AdminClaimReviewPage() {
  const { code = '' } = useParams()
  const { data, loading, submitting, approve, reject } = useAdminClaimReview(code)
  const isPending = data?.status === 'Pending'
  const [note, setNote] = useStateSafe(data?.adminNote ?? '')

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminTopbar />
        <main className="container mx-auto px-4 py-16 text-center text-slate-500">Loading…</main>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminTopbar />
        <main className="container mx-auto px-4 py-16 text-center text-slate-500">Claim not found</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />
      <main className="container mx-auto px-4 pb-16 pt-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/claims" className="text-sky-800 hover:underline">← Back</Link>
            <h1 className="text-2xl font-semibold text-slate-900">Claim Review</h1>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{data.code}</span>
            <StatusBadge s={data.status} />
            <span className="text-sm text-slate-500">Submitted {fmt(data.submittedOn)}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* left column */}
          <div className="space-y-6 lg:col-span-2">
            <ClaimInfoCard c={data} />
            <AttachmentsCard items={data.attachments} />
            {/* Admin Notes: edit nếu pending, ngược lại view */}
            {isPending ? (
              <AdminNotes mode="edit" note={note} setNote={setNote} />
            ) : (
              <AdminNotes mode="view" note={data.adminNote} />
            )}
          </div>

          {/* right column */}
          <div className="space-y-6">
            <MemberCard m={data.member} />
            {isPending ? (
              <ActionsPanel
                disabled={submitting}
                onApprove={() => approve(note)}
                onReject={() => reject(note)}
              />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}

import { useEffect, useState } from 'react'
function useStateSafe<T>(initial: T) {
  const [v, setV] = useState(initial)
  useEffect(() => { setV(initial) }, [initial])
  return [v, setV] as const
}
function fmt(d: string) {
  return new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })
}
