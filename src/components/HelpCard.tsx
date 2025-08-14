export default function HelpCard() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 text-sm font-semibold text-slate-800">Need Help?</div>
      <div className="space-y-3">
        <button className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          Contact Support
        </button>
        <button className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          Submit Similar Claim
        </button>
        <button className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
          View FAQ
        </button>
      </div>
    </div>
  )
}
