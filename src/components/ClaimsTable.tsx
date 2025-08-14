import type { Claim } from "@/api/claims.api";
import { Link } from "react-router-dom";

function StatusPill({ s }: { s: Claim["status"] }) {
  const map = {
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-rose-100 text-rose-700",
  } as const;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${map[s]}`}>
      {s}
    </span>
  );
}

export default function ClaimsTable({ rows }: { rows: Claim[] }) {
  return (
    <div className="rounded-3xl bg-white p-0 shadow-sm ring-1 ring-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full whitespace-nowrap">
          <thead>
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-3">Claim ID</th>
              <th className="px-6 py-3">Type &amp; Description</th>
              <th className="px-6 py-3">Date Submitted</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Points</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((c) => (
              <tr key={c.id} className="text-sm">
                <td className="px-6 py-4">
                  <div
                    className="font-semibold text-sky-700"
                  >
                    {c.code}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{c.type}</div>
                  <div className="text-slate-500">{c.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 text-slate-700">
                    <span>📅</span>
                    <span>{new Date(c.date).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusPill s={c.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="text-emerald-600 font-medium">
                    +{c.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">miles</div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/claims/${c.code}`}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    👁️ View
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  No claims found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
