type Props = {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  onGo: (p: number) => void
}

export default function Pagination({ page, totalPages, onPrev, onNext, onGo }: Props) {
  // tạo dãy số trang gọn gàng (tối đa ~5 nút số)
  const pages = getPages(page, totalPages)

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 disabled:opacity-50 hover:bg-slate-50"
      >
        ‹ Previous
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e-${i}`} className="px-1 text-slate-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onGo(p)}
            className={`h-8 w-8 rounded-lg text-sm ${
              p === page
                ? 'bg-slate-900 text-white'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 disabled:opacity-50 hover:bg-slate-50"
      >
        Next ›
      </button>
    </div>
  )
}

function getPages(page: number, total: number) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (page <= 3) return [1, 2, 3, 4, '...', total] as const
  if (page >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total] as const
  return [1, '...', page - 1, page, page + 1, '...', total] as const
}
