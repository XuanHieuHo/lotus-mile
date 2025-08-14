import { Link } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";
import StatusPill from "../components/StatusPill";
import { useAdminClaims } from "@/hooks/useAdminClaims";
import Pagination from "@/components/Pagination"; // tái dùng component bạn đã có

export default function AdminClaimsPage() {
  const {
    q,
    setQ,
    status,
    setStatus,
    range,
    setRange,
    items,
    total,
    page,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    goTo,
  } = useAdminClaims();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminTopbar />

      <main className="container mx-auto px-4 pb-16 pt-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Claims Management
        </h1>

        {/* filter bar */}
        <div className="mt-4 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <input
              placeholder="Search by member email or claim ID…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-10 text-sm text-slate-800 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              🔎
            </span>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
              <span>⚙️</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="bg-transparent text-sm text-slate-700 focus:outline-none"
                title="Status"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Date range (demo đơn giản) */}
            <div
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2"
              title="Date Range"
            >
              <span className="text-slate-600">📅</span>
              <input
                type="date"
                value={range.from ?? ""}
                onChange={(e) => setRange({ ...range, from: e.target.value })}
                className="bg-transparent text-sm text-slate-800 focus:outline-none"
                aria-label="From date"
              />
              <span className="select-none text-slate-400">–</span>
              <input
                type="date"
                value={range.to ?? ""}
                onChange={(e) => setRange({ ...range, to: e.target.value })}
                className="bg-transparent text-sm text-slate-800 focus:outline-none"
                aria-label="To date"
              />
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Showing {total === 0 ? 0 : startIndex + 1}–{endIndex} of {total}{" "}
          claims
        </p>

        {/* table */}
        <div className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Claim ID</th>
                <th className="px-5 py-3 font-medium">Submitted Date</th>
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Type</th>
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
                    {new Date(r.submitted).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{r.member}</td>
                  <td className="px-5 py-4 text-slate-700">{r.type}</td>
                  <td className="px-5 py-4">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    {r.points.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/claims/${r.id}/review`}
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
        <div className="mt-4 flex items-center justify-end">
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
  );
}
