import { Link } from 'react-router-dom'
import AdminTopbar from '@/components/AdminTopbar'
import Pagination from '@/components/Pagination'   // tái dùng component bạn đã có
import { useAdminTransactions } from '@/hooks/useAdminTransactions'
import SourcePill from '../components/SourcePill'

export default function AdminTransactionsPage() {
  const {
    items, total,
    q, setQ,
    source, setSource,
    range, setRange,
    page, totalPages, startIndex, endIndex,
    prevPage, nextPage, goTo,
  } = useAdminTransactions()

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />

      <main className="container mx-auto px-4 pb-16 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Transaction History</h1>

          <Link
            to="/admin/transactions/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-950"
          >
            ＋ Add Transaction
          </Link>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <input
              placeholder="Search by member email or transaction ID..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-10 text-sm text-slate-800 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">🔎</span>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {/* Source */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
              <span className="text-slate-600">⚙️</span>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="bg-transparent text-sm text-slate-800 focus:outline-none"
                title="Source"
              >
                <option value="All">All Sources</option>
                <option value="Manual">Manual</option>
                <option value="SessionM">SessionM</option>
                <option value="System">System</option>
              </select>
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
              <span className="text-slate-600">📅</span>
              <input
                type="date"
                value={range.from ?? ''}
                onChange={(e) => setRange({ ...range, from: e.target.value })}
                className="bg-transparent text-sm text-slate-800 focus:outline-none"
                aria-label="From"
              />
              <span className="text-slate-400">–</span>
              <input
                type="date"
                value={range.to ?? ''}
                onChange={(e) => setRange({ ...range, to: e.target.value })}
                className="bg-transparent text-sm text-slate-800 focus:outline-none"
                aria-label="To"
              />
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Showing {total === 0 ? 0 : startIndex + 1}–{endIndex} of {total} transactions
        </p>

        {/* Table */}
        <div className="mt-3 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Transaction ID</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Points</th>
                <th className="px-5 py-3 font-medium">Created By</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="odd:bg-white even:bg-white">
                  <td className="px-5 py-4 font-medium text-slate-800">{r.id}</td>
                  <td className="px-5 py-4 text-slate-700">{fmtDate(r.at)}</td>
                  <td className="px-5 py-4 text-slate-700">{r.memberEmail}</td>
                  <td className="px-5 py-4"><SourcePill s={r.source} /></td>
                  <td className="px-5 py-4 font-medium">
                    <span className={r.points >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {r.points >= 0 ? '+' : ''}
                      {r.points.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{r.createdBy}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-500">No results</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-end">
          <Pagination page={page} totalPages={totalPages} onPrev={prevPage} onNext={nextPage} onGo={goTo} />
        </div>

        {/* Footer nhỏ */}
        <footer className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2024 Airline Loyalty Program. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  const date = d.toLocaleDateString()
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  return `${time} ${date}`
}
