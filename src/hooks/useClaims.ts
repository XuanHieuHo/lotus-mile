import { useMemo, useState } from 'react'
import type { Claim, ClaimStatus } from '@/api/claims.api'

const MOCK: Claim[] = [
  { id: '1', code: 'CL001', type: 'Missing Miles', description: 'Flight JFK to LAX - AA1234 missing miles credit', date: '2024-12-08', points: 2500, status: 'Pending' },
  { id: '2', code: 'CL002', type: 'Hotel Bonus', description: 'Marriott stay bonus points not credited', date: '2024-12-05', points: 1250, status: 'Approved' },
  { id: '3', code: 'CL003', type: 'Car Rental', description: 'Hertz rental missing partner miles', date: '2024-12-01', points: 750, status: 'Rejected' },
  { id: '4', code: 'CL004', type: 'Credit Card', description: 'Purchase bonus miles adjustment', date: '2024-11-28', points: 3200, status: 'Approved' },
  { id: '5', code: 'CL005', type: 'Missing Miles', description: 'International flight segments not credited', date: '2024-11-25', points: 4500, status: 'Pending' },
  { id: '6', code: 'CL006', type: 'Hotel Bonus', description: 'Hilton stay elite bonus missing', date: '2024-11-22', points: 1800, status: 'Approved' },
  { id: '7', code: 'CL007', type: 'Flight Credit', description: 'Upgrade miles not deducted properly', date: '2024-11-20', points: 800, status: 'Pending' },
  { id: '8', code: 'CL008', type: 'Partner Points', description: 'Restaurant dining miles missing', date: '2024-11-18', points: 450, status: 'Approved' },
  { id: '9', code: 'CL009', type: 'Missing Miles', description: 'Codeshare flight miles not credited', date: '2024-11-15', points: 2100, status: 'Rejected' },
  { id: '10', code: 'CL010', type: 'Credit Card', description: 'Annual fee waiver request', date: '2024-11-12', points: 0, status: 'Pending' },
  // thêm vài item cho đủ 12-15 để thấy phân trang
  { id: '11', code: 'CL011', type: 'Hotel Bonus', description: 'IHG points delay', date: '2024-11-10', points: 600, status: 'Approved' },
  { id: '12', code: 'CL012', type: 'Car Rental', description: 'Avis partner miles not posted', date: '2024-11-06', points: 500, status: 'Pending' },
];

export function useClaims() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'All' | ClaimStatus>('All')
  const [time, setTime] = useState<'All' | '30d' | '90d' | '1y'>('All')

  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // reset về trang 1 khi thay filter/search
  function resetPage() { setPage(1) }

  const filtered = useMemo(() => {
    const now = new Date()
    const filterTime = (d: string) => {
      if (time === 'All') return true
      const dt = new Date(d)
      const diff = (now.getTime() - dt.getTime()) / (1000 * 3600 * 24)
      if (time === '30d') return diff <= 30
      if (time === '90d') return diff <= 90
      return diff <= 365
    }
    return MOCK.filter(c =>
      (status === 'All' || c.status === status) &&
      filterTime(c.date) &&
      (q === '' ||
        c.code.toLowerCase().includes(q.toLowerCase()) ||
        c.type.toLowerCase().includes(q.toLowerCase()) ||
        c.description.toLowerCase().includes(q.toLowerCase()))
    )
  }, [q, status, time])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const items = filtered.slice(startIndex, endIndex)

  function nextPage() { setPage(p => Math.min(totalPages, p + 1)) }
  function prevPage() { setPage(p => Math.max(1, p - 1)) }
  function goTo(p: number) { setPage(Math.min(totalPages, Math.max(1, p))) }

  return {
    // filters
    q, setQ: (v: string) => { setQ(v); resetPage() },
    status, setStatus: (v: any) => { setStatus(v); resetPage() },
    time, setTime: (v: any) => { setTime(v); resetPage() },

    // data
    items, total,

    // pagination
    page: currentPage,
    pageSize, setPageSize,
    totalPages,
    startIndex, endIndex: Math.min(endIndex, total),
    nextPage, prevPage, goTo,
  }
}

