import type { ProfileData } from '@/api/profile.api'

export default function MembershipCard({ data }: { data: ProfileData }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3 text-slate-800">
        <span>🏆</span>
        <span className="font-semibold">Membership Status</span>
      </div>

      <div className="rounded-2xl bg-amber-50 p-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-amber-800">{data.tier}</div>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">Current</span>
        </div>
        <div className="mt-1 text-sm text-amber-800">{data.availableMiles.toLocaleString()} miles earned</div>
      </div>

      <div className="mt-5 text-sm font-medium text-slate-700">Progress to next tier</div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-sky-800" style={{ width: `${data.tierProgress}%` }} />
      </div>
      <div className="mt-2 text-xs text-slate-500">{data.nextTierMilesNeeded.toLocaleString()} miles needed</div>
    </div>
  )
}
