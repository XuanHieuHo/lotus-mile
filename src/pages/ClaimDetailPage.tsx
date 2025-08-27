import { Link, useLocation, useParams } from 'react-router-dom'
import Topbar from '@/components/Topbar'
import StatusBadge from '@/components/StatusBadge'
import DetailCard from '@/components/DetailCard'
import TimelineCard from '@/components/TimelineCard'
import AdminNotesCard from '@/components/AdminNotesCard'
import AttachmentsCard from '@/components/AttachmentsCard'
import HelpCard from '@/components/HelpCard'
import type { Claim, ClaimStatus as ApiStatus } from '@/api/claims.api'
// 👇 import đúng type mà các component con yêu cầu
import type { Attachment, TimelinePoint } from '@/api/claim_detail.api'

type BadgeStatus = 'Pending' | 'Approved' | 'Rejected'
type NoteTone = 'info' | 'success' | 'danger'

type LocState = { claim?: Claim }

export default function ClaimDetailPage() {
  const { id = '' } = useParams()
  const location = useLocation()
  const passed: Claim | undefined = (location.state as LocState)?.claim

  if (!passed) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Topbar />
        <main className="container mx-auto px-4 pb-16 pt-6">
          <div className="mb-3">
            <Link to="/claims" className="inline-flex items-center gap-2 text-sky-800 hover:underline">
              ← Back to Claims
            </Link>
          </div>
          <div className="py-24 text-center text-slate-500">
            Claim not found (open from list to see details). ID: {id}
          </div>
        </main>
      </div>
    )
  }

  const badgeStatus = toBadgeStatus(passed.status)
  const submittedOn = toSubmittedOn(passed)
  const adminNoteObj = toAdminNote(passed)
  const attachments = toAttachments(passed)         // ✅ Attachment[]
  const timeline = toTimeline(passed, submittedOn)  // ✅ TimelinePoint[]
  const detailVM = toDetailCardVM(passed, submittedOn)

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />
      <main className="container mx-auto px-4 pb-16 pt-6">
        <div className="mb-3">
          <Link to="/claims" className="inline-flex items-center gap-2 text-sky-800 hover:underline">
            ← Back to Claims
          </Link>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-slate-900">Claim {passed.invoice_no || `CL#${passed.id}`}</h1>
          <StatusBadge status={badgeStatus} />
        </div>
        <div className="mb-6 text-slate-500">Submitted on {fmt(submittedOn)}</div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DetailCard d={detailVM as any} />
            {adminNoteObj && <AdminNotesCard note={adminNoteObj} />}
            <AttachmentsCard items={attachments} />
          </div>

          <div className="space-y-6">
            <TimelineCard items={timeline} />
            <HelpCard />
          </div>
        </div>
      </main>
    </div>
  )
}

// ========== ADAPTERS ==========
function toDetailCardVM(c: Claim, submittedOnISO: string) {
  const safeNum = (x: any): number => {
    const n = Number(x)
    return Number.isFinite(n) ? n : 0
  }

  const code = c.invoice_no?.trim() || `CL#${c.id}`

  const requested = safeNum(c.requested_points)

  return {
    // các key phổ biến thường dùng ở DetailCard – bạn có thể thêm/bớt nếu component cần
    id: c.id,
    code,                         // ex: “VN12345” hoặc “CL#123”
    status: toBadgeStatus(c.status),
    submittedOn: submittedOnISO,  // ISO string

    // text fields
    invoiceNo: c.invoice_no || '-',
    note: c.note || '',
    adminNote: c.admin_note || '',

    // numeric fields – đảm bảo là number
    points: requested,                   // ✅ DetailCard hay dùng d.points.toLocaleString()
    requestedPoints: requested,          // ✅ fallback khác tên (nếu component dùng camelCase)
    requested_points: requested,         // ✅ fallback snake_case (nếu component cũ)

    // optional: show nguyên bản ngày claim
    claim_date: c.claim_date || '',
  }
}
function toBadgeStatus(s: ApiStatus): BadgeStatus {
  switch (s) {
    case 'PENDING': return 'Pending'
    case 'APPROVED': return 'Approved'
    case 'REJECTED': return 'Rejected'
    default: return 'Pending'
  }
}

function toSubmittedOn(c: Claim): string {
  if (c.claim_date) return new Date(c.claim_date).toISOString()
  return new Date().toISOString()
}

function toAdminNote(c: Claim): { tone: NoteTone; text: string } | null {
  const txt = c.admin_note
  if (!txt) return null
  const tone: NoteTone =
    c.status === 'APPROVED' ? 'success' :
    c.status === 'REJECTED' ? 'danger'  :
    'info'
  return { tone, text: txt }
}

// 👇 Map đúng shape Attachment[] theo api/claim_detail.api (size: string)
function toAttachments(c: Claim): Attachment[] {
  if (!c.attachment_url) return []
  const name = filenameFromURL(c.attachment_url)
  return [{
    id: `att-${c.id}-1`,
    name,
    url: c.attachment_url,
    size: '-',                        // component yêu cầu string
    type: mapExtToUnion(name),        // ← chỉ trả "PDF" | "PNG" | "JPG"
  }]
}

function mapExtToUnion(name: string): 'PDF' | 'PNG' | 'JPG' {
  const ext = (/\.(\w+)$/i.exec(name)?.[1] || '').toLowerCase()
  if (ext === 'pdf') return 'PDF'
  if (ext === 'jpg' || ext === 'jpeg') return 'JPG'
  // gom nhóm các định dạng ảnh khác về PNG
  return 'PNG' // png, gif, webp, svg, không rõ... đều quy về PNG để khớp union type
}

// 👇 Map đúng union color: "blue" | "yellow" | "green" | "red"
function toTimeline(c: Claim, submittedOn: string): TimelinePoint[] {
  const points: TimelinePoint[] = [{ label: 'Submitted', date: submittedOn, color: 'blue' }]
  if (c.status === 'PENDING') {
    points.push({ label: 'Pending Review', date: submittedOn, color: 'yellow' })
  } else if (c.status === 'APPROVED') {
    points.push({ label: 'Approved', date: submittedOn, color: 'green' })
  } else if (c.status === 'REJECTED') {
    points.push({ label: 'Rejected', date: submittedOn, color: 'red' })
  }
  return points
}

// ========== UTILS ==========
function filenameFromURL(u: string) {
  try {
    const url = new URL(u)
    return decodeURIComponent(url.pathname.split('/').pop() || 'attachment')
  } catch {
    return u.split('/').pop() || 'attachment'
  }
}
function fmt(d: string) {
  return new Date(d).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}
