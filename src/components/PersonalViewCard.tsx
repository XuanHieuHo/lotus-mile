import type { ProfileData } from '@/api/profile.api'

export default function PersonalViewCard({ data }: { data: ProfileData }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3 text-slate-800">
        <span>👤</span>
        <span className="font-semibold">Personal Information</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-blue-900 text-white text-lg font-bold">
          {data.fullName.split(' ').map(n => n[0]).slice(0,2).join('')}
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">{data.fullName}</div>
          <div className="text-sm text-slate-500">
            Member since {new Date(data.memberSince + '-01').toLocaleString(undefined, { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" value={data.fullName} />
        <Field label="Email Address" value={data.email} />
        <Field label="Phone Number" value={data.phone} />
        <Field label="Date of Birth" value={new Date(data.dob).toLocaleDateString()} />
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 rounded-xl bg-slate-50 px-3 py-2 text-slate-800">{value}</div>
    </div>
  )
}
