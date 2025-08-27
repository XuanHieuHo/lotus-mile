import { Link } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";
import { useAdminClaims } from "@/hooks/useAdminClaims";
import { StatusPill } from "@/components/ClaimsTable";


export default function AdminClaimsPage() {
  const {
    // filter duy nhất khi call API
    status, setStatus,

    // data
    items, loading, error,

    // pagination (server-side)
    page, pageSize, setPageSize,
    startIndex, endIndex,
    hasNext, canPrev,
    nextPage, prevPage, goTo,
  } = useAdminClaims();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />

      <main className="container mx-auto px-4 pb-16 pt-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Claims Management
        </h1>

        {/* filter bar */}
        <div className="mt-6 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                title="Status"
              >
                <option value="All">All Status</option>
                {/* hook dùng status UPPERCASE theo API: PENDING/APPROVED/REJECTED */}
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <label className="ml-4 text-sm text-slate-600">Page size</label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                title="Page size"
              >
                {[5, 10, 20, 50].map((n) => (
                  <option key={n} value={n}>{n}/page</option>
                ))}
              </select>

              <button
                onClick={() => { setStatus('All'); goTo(1); }}
                className="ml-2 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                title="Clear filters"
              >
                ⟳ <span>Clear</span>
              </button>
            </div>

            {/* State nhỏ gọn bên phải */}
            <div className="text-sm text-slate-500">
              {loading && <span>Loading…</span>}
              {!loading && error && <span className="text-rose-600">Error: {error}</span>}
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="mt-3 text-sm text-slate-500">
          {loading
            ? 'Loading…'
            : items.length === 0
              ? 'No claims to display'
              : <>Showing {startIndex}–{endIndex}</>}
        </p>

        {/* table */}
        <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Claim ID</th>
                <th className="px-5 py-3 font-medium">Submitted Date</th>
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Invoice Number</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Points</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {r.id}
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {new Date(r.claim_date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{r.user_id}</td>
                  <td className="px-5 py-4 text-slate-700">{r.invoice_no}</td>
                  <td className="px-5 py-4">
                    <StatusPill s={r.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {r.requested_points.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/claims/${r.id}/review`}
                      state={{ claim: r }}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      👁️ View
                    </Link>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <span>Page {page}</span>
            <div className="inline-flex overflow-hidden rounded-xl border border-slate-300">
              <button
                onClick={prevPage}
                disabled={!canPrev || loading}
                className={`px-3 py-2 ${(!canPrev || loading) ? 'cursor-not-allowed text-slate-400 bg-slate-100' : 'hover:bg-slate-50'}`}
                title="Previous page"
              >
                ← Prev
              </button>
              <button
                onClick={nextPage}
                disabled={!hasNext || loading}
                className={`border-l border-slate-300 px-3 py-2 ${(!hasNext || loading) ? 'cursor-not-allowed text-slate-400 bg-slate-100' : 'hover:bg-slate-50'}`}
                title="Next page"
              >
                Next →
              </button>
            </div>
          </div>

          {/* (Optional) Quick jump */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              const v = Number(fd.get('p') || 1);
              if (Number.isFinite(v) && v >= 1) goTo(v);
            }}
            className="hidden items-center gap-2 md:flex"
          >
            <label className="text-slate-500">Go to page</label>
            <input
              name="p"
              type="number"
              min={1}
              className="w-20 rounded-lg border border-slate-300 bg-white px-2 py-1"
              placeholder="1"
            />
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-3 py-1 hover:bg-slate-50"
            >
              Go
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
