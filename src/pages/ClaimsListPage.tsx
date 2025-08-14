import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { useClaims } from "@/hooks/useClaims";
import ClaimsTable from "@/components/ClaimsTable";
import Topbar from "@/components/Topbar";
import Pagination from "@/components/Pagination";

export default function ClaimsListPage() {
  const {
    q, setQ, status, setStatus, time, setTime,
    total, items,
    page, totalPages,
    nextPage, prevPage, goTo,
  } = useClaims()

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />

      <main className="container mx-auto px-4 pb-16 pt-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">My Claims</h1>
            <p className="mt-1 text-slate-500">Track and manage your submitted loyalty program claims</p>
          </div>
          <Button className="h-10 rounded-xl">
            <Link to="/claims/new">+ New Claim</Link>
          </Button>
        </div>

        {/* Filters (giữ nguyên input search + selects) */}
        <div className="mt-6 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <input
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-10 text-sm
                           text-slate-800 placeholder:text-slate-500
                           focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-sm"
                placeholder="Search claims by ID, type, or description..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">🔎</span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                title="Status"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                value={time}
                onChange={(e) => setTime(e.target.value as any)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                title="Time"
              >
                <option value="All">All Time</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>

              <button
                onClick={() => { setQ(''); setStatus('All'); setTime('All') }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                title="Clear filters"
              >
                ⟳ <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4">
          <ClaimsTable rows={items} />
        </div>

        {/* Pagination bar */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <div>
            Page {page} of {totalPages}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={prevPage}
            onNext={nextPage}
            onGo={goTo}
          />
        </div>
      </main>
    </div>
  )
}

