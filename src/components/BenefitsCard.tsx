import type { ProfileData } from '@/api/profile.api'
export default function BenefitsCard({ data }: { data: ProfileData }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 flex items-center gap-2 text-slate-800">
        <span>📋</span><span className="font-semibold">Your Benefits</span>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {data.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-600">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
