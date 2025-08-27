// src/pages/admin/AdminClaimReviewPage.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AdminTopbar from '@/components/AdminTopbar'
import ClaimInfoCard from '../components/ClaimInfoCard'
import AttachmentsCard from '../components/AttachmentsCard'
import AdminNotes from '../components/AdminNotes'
import ActionsPanel from '@/components/ActionsPanel'
import type { Claim, ClaimStatus } from '@/api/claims.api'
import type { Attachment } from '@/api/claim_detail.api'
import { useAdminClaimReview } from '@/hooks/useAdminClaimReview'

function StatusBadge({ s }: { s: ClaimStatus }) {
  const map: Record<ClaimStatus, string> = {
    PENDING: 'bg-amber-100 text-amber-800',
    APPROVED: 'bg-emerald-100 text-emerald-800',
    REJECTED: 'bg-rose-100 text-rose-800',
  }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${map[s]}`}>{s}</span>
}

type LocState = { claim?: Claim }

export default function AdminClaimReviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const passed = (location.state as LocState)?.claim as Claim

  if (!passed) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminTopbar />
        <main className="container mx-auto px-4 py-16 text-center text-slate-500">Claim not found</main>
      </div>
    )
  }

  const { submitting, approve, reject } = useAdminClaimReview({
    id: passed.id,
    status: passed.status,
    pointsRequested: passed.requested_points,
    code: passed.invoice_no,
    adminNote: passed.admin_note ?? '',
  })

  const isPending = passed.status === 'PENDING'
  const [note, setNote] = useStateSafe(passed.admin_note ?? '')
  const attachments: Attachment[] = toAttachments(passed)

  async function handleApprove() {
    try {
      await approve(note, passed.requested_points)
      // ✅ Thành công → điều hướng về trang quản lý
      navigate('/admin/claims', {
        replace: true,
        state: {
          flash: { type: 'success', text: `Approved claim ${passed.invoice_no || `#${passed.id}`}` },
        },
      })
    } catch { /* đã toast trong hook, không điều hướng */ }
  }

  async function handleReject() {
    try {
      await reject(note)
      // ✅ Thành công → điều hướng về trang quản lý
      navigate('/admin/claims', {
        replace: true,
        state: {
          flash: { type: 'success', text: `Rejected claim ${passed.invoice_no || `#${passed.id}`}` },
        },
      })
    } catch { /* đã toast trong hook, không điều hướng */ }
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
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{passed.id}</span>
            <StatusBadge s={passed.status} />
            <span className="text-sm text-slate-500">Submitted {ymd(passed.claim_date || passed.created_at)}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            <ClaimInfoCard c={passed} />
            <AttachmentsCard items={attachments} />
            {isPending ? (
              <AdminNotes mode="edit" note={note} setNote={setNote} />
            ) : (
              <AdminNotes mode="view" note={passed.admin_note} />
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {isPending ? (
              <ActionsPanel
                disabled={submitting}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  )
}

function useStateSafe<T>(initial: T) {
  const [v, setV] = useState(initial)
  useEffect(() => { setV(initial) }, [initial])
  return [v, setV] as const
}

// YYYY-MM-DD (cắt chuỗi)
function ymd(s?: string | null) {
  return s ? String(s).slice(0, 10) : '-'
}

function toAttachments(c: Claim): Attachment[] {
  if (!c.attachment_url) return []
  const name = filenameFromURL(c.attachment_url)
  return [{
    id: `att-${c.id}-1`,
    name,
    url: c.attachment_url,
    size: '-',                      // string
    type: mapExtToUnion(name),      // 'PDF'|'PNG'|'JPG'
  }]
}
function filenameFromURL(u: string) {
  try {
    const url = new URL(u)
    return decodeURIComponent(url.pathname.split('/').pop() || 'attachment')
  } catch {
    return u.split('/').pop() || 'attachment'
  }
}
function mapExtToUnion(name: string): 'PDF' | 'PNG' | 'JPG' {
  const ext = (/\.(\w+)$/i.exec(name)?.[1] || '').toLowerCase()
  if (ext === 'pdf') return 'PDF'
  if (ext === 'jpg' || ext === 'jpeg') return 'JPG'
  return 'PNG'
}
