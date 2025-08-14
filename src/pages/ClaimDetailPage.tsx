import { Link, useParams } from 'react-router-dom'
import Topbar from '@/components/Topbar'
import { useClaimDetail } from '@/hooks/useClaimDetail'
import StatusBadge from '@/components/StatusBadge'
import DetailCard from '@/components/DetailCard'
import TimelineCard from '@/components/TimelineCard'
import AdminNotesCard from '@/components/AdminNotesCard'
import AttachmentsCard from '@/components/AttachmentsCard'
import HelpCard from '@/components/HelpCard'

export default function ClaimDetailPage() {
  const { code = '' } = useParams()
  const { data, loading } = useClaimDetail(code)

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />

      <main className="container mx-auto px-4 pb-16 pt-6">
        <div className="mb-3">
          <Link to="/claims" className="inline-flex items-center gap-2 text-sky-800 hover:underline">
            ← Back to Claims
          </Link>
        </div>

        {loading && <div className="py-24 text-center text-slate-500">Loading claim…</div>}
        {!loading && !data && <div className="py-24 text-center text-slate-500">Claim not found.</div>}

        {data && (
          <>
            <div className="mb-4 flex items-center gap-3">
              <h1 className="text-3xl font-semibold text-slate-900">Claim {data.code}</h1>
              <StatusBadge status={data.status} />
            </div>
            <div className="mb-6 text-slate-500">
              Submitted on {fmt(data.submittedOn)}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <DetailCard d={data} />

                {data.adminNote && <AdminNotesCard note={data.adminNote} />}

                <AttachmentsCard items={data.attachments} />
              </div>

              <div className="space-y-6">
                <TimelineCard items={data.timeline} />
                <HelpCard />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}
