import { Link } from "react-router-dom";

export function NewClaimCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-900 text-white">
          📝
        </div>
        <span className="text-sm text-emerald-600">↗</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">New Claim</h3>
      <p className="mt-1 text-sm text-slate-500">
        Submit a claim for missing miles or points
      </p>
      <Link
        to="/claims/new"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl
                 bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-950"
      >
        Start Claim
      </Link>
    </div>
  );
}

export function ViewClaimsCard({ active = 0 }: { active?: number }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-100 text-yellow-700">
          🏷️
        </div>
        {active > 0 && (
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
            {active} Active
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">View Claims</h3>
      <p className="mt-1 text-sm text-slate-500">
        Track and manage your submitted claims
      </p>
      <Link
        to="/claims"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl
             border border-slate-300 bg-white text-slate-700
             hover:bg-slate-50 active:bg-slate-100"
      >
        View All Claims
      </Link>
    </div>
  );
}

export function ProfileCard() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-100 text-green-700">
          👤
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
      <p className="mt-1 text-sm text-slate-500">
        Update your account and preferences
      </p>
      <Link
        to="/profile"
        className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl
             border border-slate-300 bg-white text-slate-700
             hover:bg-slate-50 active:bg-slate-100"
      >
        Manage Profile
      </Link>
    </div>
  );
}
