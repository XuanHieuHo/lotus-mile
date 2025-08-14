import { useMemo, useState } from 'react'
import type { AdminTransaction, TxnDateRange, TxnSource } from '@/api/transactions.api'

// ---- MOCK DATA (thay bằng API thật) ----
const DATA: AdminTransaction[] = [
  { id: 'TXN-2024-001234', at: '2024-01-15T21:30:00', memberEmail: 'john.doe@example.com',  source: 'Manual',   points:  5000, createdBy: 'admin@airline.com' },
  { id: 'TXN-2024-001235', at: '2024-01-15T19:15:00', memberEmail: 'jane.smith@example.com', source: 'SessionM', points:  2500, createdBy: 'system' },
  { id: 'TXN-2024-001236', at: '2024-01-14T23:45:00', memberEmail: 'mike.johnson@example.com', source: 'Manual', points: 10000, createdBy: 'admin@airline.com' },
  { id: 'TXN-2024-001237', at: '2024-01-14T18:20:00', memberEmail: 'sarah.wilson@example.com', source: 'SessionM', points: 1500, createdBy: 'system' },
  { id: 'TXN-2024-001238', at: '2024-01-13T16:30:00', memberEmail: 'david.brown@example.com', source: 'Manual',  points:  7500, createdBy: 'admin@airline.com' },
]

export function useAdminTransactions() {
  // filters
  const [q, setQ] = useState('')
  const [source, setSource] = useState<'All' | TxnSource>('All')
  const [range, setRange] = useState<TxnDateRange>({})

  // pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const resetPage = () => setPage(1)

  const filtered = useMemo(() => {
    const txt = q.trim().toLowerCase()
    const inRange = (d: string) => {
      const t = new Date(d).getTime()
      if (range.from && t < new Date(range.from).getTime()) return false
      if (range.to && t > new Date(range.to).getTime() + 24 * 3600 * 1000 - 1) return false
      return true
    }
    return DATA.filter(
      (r) =>
        (source === 'All' || r.source === source) &&
        inRange(r.at) &&
        (txt === '' ||
          r.id.toLowerCase().includes(txt) ||
          r.memberEmail.toLowerCase().includes(txt))
    )
  }, [q, source, range])

  // slice page
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, total)
  const items = filtered.slice(startIndex, endIndex)

  // actions
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1))
  const prevPage = () => setPage((p) => Math.max(1, p - 1))
  const goTo = (p: number) => setPage(Math.max(1, Math.min(totalPages, p)))

  // TODO: nối API thật bằng React Query:
  // useQuery({ queryKey: ['admin-txns', { q, source, range, page, pageSize }], queryFn: ... })

  return {
    // data
    items, total,

    // filter state
    q, setQ: (v: string) => { setQ(v); resetPage() },
    source, setSource: (v: 'All' | TxnSource) => { setSource(v); resetPage() },
    range, setRange: (v: TxnDateRange) => { setRange(v); resetPage() },

    // pagination
    page: currentPage, totalPages, startIndex, endIndex,
    nextPage, prevPage, goTo, pageSize, setPageSize,
  }
}
