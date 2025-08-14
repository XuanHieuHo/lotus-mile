type Props =
  | { mode: 'edit'; note: string; setNote: (v: string) => void }
  | { mode: 'view'; note?: string }

export default function AdminNotes(props: Props) {
  const isEdit = props.mode === 'edit'
  const note = isEdit ? props.note : props.note ?? ''

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-2 text-sm font-semibold text-slate-800">Admin Notes</div>
      {isEdit ? (
        <>
          <label className="mb-1 block text-xs text-slate-500">
            Notes <span className="text-rose-600">(required for rejection)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => (props as any).setNote(e.target.value)}
            placeholder="Add your review notes here..."
            className="h-24 w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-800">{note || '—'}</div>
      )}
    </div>
  )
}
