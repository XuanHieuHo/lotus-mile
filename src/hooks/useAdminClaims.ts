import { useMemo, useState } from 'react'
import type { AdminClaimRow, AdminStatus, DateRange } from '@/api/admin_claims'

// mock; thay bằng useQuery gọi API thật khi cần
const DATA: AdminClaimRow[] = [
  { id: 'CLM-2024-001', submitted: '2024-01-15', member: 'john.doe@example.com',  type: 'Flight Delay',         status: 'Pending',  points:  5000 },
  { id: 'CLM-2024-002', submitted: '2024-01-14', member: 'jane.smith@example.com', type: 'Lost Luggage',        status: 'Approved', points: 10000 },
  { id: 'CLM-2024-003', submitted: '2024-01-13', member: 'mike.johnson@example.com',type: 'Hotel Stay',         status: 'Rejected', points:  2500 },
  { id: 'CLM-2024-004', submitted: '2024-01-12', member: 'sarah.wilson@example.com',type: 'Car Rental',         status: 'Pending',  points:  3000 },
  { id: 'CLM-2024-005', submitted: '2024-01-11', member: 'david.brown@example.com', type: 'Flight Cancellation', status: 'Approved', points: 15000 },
  { id: 'CLM-2024-006', submitted: '2024-01-10', member: 'lucy.gray@example.com',   type: 'Hotel Stay',          status: 'Approved', points:  2800 },
  { id: 'CLM-2024-007', submitted: '2024-01-09', member: 'sam.wu@example.com',      type: 'Car Rental',          status: 'Rejected', points:   950 },
];

export function useAdminClaims() {
  // filters
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'All' | AdminStatus>('All')
  const [range, setRange] = useState<DateRange>({})

  // pagination
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const resetPage = () => setPage(1)

  // filter + search + date range
  const filtered = useMemo(() => {
    const inRange = (d: string) => {
      if (!range.from && !range.to) return true
      const x = new Date(d).getTime()
      if (range.from && x < new Date(range.from).getTime()) return false
      if (range.to && x > new Date(range.to).getTime()) return false
      return true
    }
    const text = q.trim().toLowerCase()
    return DATA.filter(r =>
      (status === 'All' || r.status === status) &&
      inRange(r.submitted) &&
      (text === '' ||
        r.id.toLowerCase().includes(text) ||
        r.member.toLowerCase().includes(text))
    )
  }, [q, status, range])

  // slice page
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, total)
  const items = filtered.slice(startIndex, endIndex)

  // pagination actions
  const nextPage = () => setPage(p => Math.min(totalPages, p + 1))
  const prevPage = () => setPage(p => Math.max(1, p - 1))
  const goTo     = (p: number) => setPage(Math.max(1, Math.min(totalPages, p)))

  // public API
  return {
    // data
    items, total,

    // filters
    q, setQ: (v: string) => { setQ(v); resetPage() },
    status, setStatus: (v: 'All' | AdminStatus) => { setStatus(v); resetPage() },
    range, setRange: (v: DateRange) => { setRange(v); resetPage() },

    // pagination
    page: currentPage, pageSize, setPageSize, totalPages, startIndex, endIndex,
    nextPage, prevPage, goTo,
  }
}
