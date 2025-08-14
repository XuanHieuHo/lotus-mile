type Props = {
  disabled?: boolean
  onApprove: () => void
  onReject: () => void
}

export default function ActionsPanel({ disabled, onApprove, onReject }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="space-y-3">
        <button
          disabled={disabled}
          onClick={onApprove}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          ✅ Approve Claim
        </button>
        <button
          disabled={disabled}
          onClick={onReject}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
        >
          ⛔ Reject Claim
        </button>
      </div>
    </div>
  )
}
