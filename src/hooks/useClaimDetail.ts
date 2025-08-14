import { useEffect, useState } from 'react'
import type { ClaimDetail } from '@/api/claim_detail.api'

// mock theo 3 trạng thái
const MOCK: Record<string, ClaimDetail> = {
  CL001: {
    id: '1',
    code: 'CL001',
    submittedOn: '2024-12-08',
    status: 'Pending',
    type: 'Missing Miles',
    pointsRequested: 2500,
    description:
      'Flight JFK to LAX - AA1234 on December 8th, 2024. Miles were not automatically credited to my account after the flight. Booking reference: ABC123XYZ. Seat 14A, Economy class.',
    timeline: [
      { label: 'Claim Submitted', date: '2024-12-08', desc: 'Claim submitted with supporting documents', color: 'blue' },
      { label: 'Under Review', date: '2024-12-09', desc: 'Claim is being reviewed by our verification team', by: 'System', color: 'yellow' },
    ],
    attachments: [
      { id: 'a1', name: 'boarding-pass-AA1234.pdf', size: '240 KB', type: 'PDF' },
      { id: 'a2', name: 'booking-confirmation.png', size: '520 KB', type: 'PNG' },
    ],
  },
  CL002: {
    id: '2',
    code: 'CL002',
    submittedOn: '2024-12-08',
    processedOn: '2024-12-10',
    status: 'Approved',
    type: 'Missing Miles',
    pointsRequested: 2500,
    description:
      'Flight JFK to LAX - AA1234 on December 8th, 2024. Miles were not automatically credited to my account after the flight. Booking reference: ABC123XYZ. Seat 14A, Economy class.',
    timeline: [
      { label: 'Claim Submitted', date: '2024-12-08', desc: 'Claim submitted with\nsupporting documents', color: 'blue' },
      { label: 'Under Review', date: '2024-12-09', desc: 'Claim is being reviewed by our verification team', by: 'System', color: 'yellow' },
      { label: 'Approved', date: '2024-12-10', desc: 'Claim approved and miles credited', by: 'Admin Team', color: 'green' },
    ],
    adminNote: { tone: 'success', text: 'Verified and approved. Miles have been credited to your account.' },
    attachments: [
      { id: 'a1', name: 'boarding-pass-AA1234.pdf', size: '240 KB', type: 'PDF' },
      { id: 'a2', name: 'booking-confirmation.png', size: '520 KB', type: 'PNG' },
    ],
  },
  CL003: {
    id: '3',
    code: 'CL003',
    submittedOn: '2024-12-08',
    status: 'Rejected',
    type: 'Missing Miles',
    pointsRequested: 2500,
    description:
      'Flight JFK to LAX - AA1234 on December 8th, 2024. Miles were not automatically credited to my account after the flight. Booking reference: ABC123XYZ. Seat 14A, Economy class.',
    timeline: [
      { label: 'Claim Submitted', date: '2024-12-08', desc: 'Claim submitted with\nsupporting documents', color: 'blue' },
      { label: 'Under Review', date: '2024-12-09', desc: 'Claim is being reviewed by our verification team', by: 'System', color: 'yellow' },
      { label: 'Rejected', date: '2024-12-10', desc: 'Claim rejected due to verification issues', by: 'Admin Team', color: 'red' },
    ],
    adminNote: {
      tone: 'danger',
      text: 'Unable to verify flight details. The provided booking reference does not match our records for the specified flight date. Please submit a new claim with the correct booking confirmation or boarding pass.',
    },
    attachments: [
      { id: 'a1', name: 'boarding-pass-AA1234.pdf', size: '240 KB', type: 'PDF' },
    ],
  },
}

export function useClaimDetail(code: string) {
  const [data, setData] = useState<ClaimDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    // giả lập fetch
    setLoading(true)
    setTimeout(() => {
      if (!mounted) return
      setData(MOCK[code] ?? null)
      setLoading(false)
    }, 250)
    return () => { mounted = false }
  }, [code])

  return { data, loading }
}
