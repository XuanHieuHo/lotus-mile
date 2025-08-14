import { useEffect, useState } from 'react'
import type { ReviewClaim, ReviewStatus } from '@/api/admin_review_claims.api'
import { useToast } from '@/components/Toast'

// ---- MOCK (thay bằng API thật) ----
const MOCK: Record<string, ReviewClaim> = {
  'CLM-2024-001': {
    code: 'CLM-2024-001',
    submittedOn: '2024-01-15',
    status: 'Pending',
    type: 'Flight Delay',
    pointsRequested: 5000,
    description:
      'Flight AA1234 from LAX to JFK was delayed by 4 hours due to weather conditions. Requesting compensation for missed connection and additional expenses.',
    attachments: [
      { id: 'a1', name: 'boarding_pass.pdf', size: '245 KB', type: 'PDF' },
      { id: 'a2', name: 'delay_notification.png', size: '128 KB', type: 'PNG' },
      { id: 'a3', name: 'hotel_receipt.jpg', size: '89 KB', type: 'JPG' },
    ],
    member: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      tier: 'Gold',
      memberSince: '2018-03-15',
    },
  },
};

export function useAdminClaimReview(code: string) {
  const [data, setData] = useState<ReviewClaim | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  // fetch detail
  useEffect(() => {
    let mounted = true
    setLoading(true)
    // TODO: http.get(`/admin/claims/${code}`)
    setTimeout(() => {
      if (!mounted) return
      setData(MOCK[code] ?? null)
      setLoading(false)
    }, 250)
    return () => { mounted = false }
  }, [code])

  async function approve(note?: string) {
    if (!data) return
    setSubmitting(true)
    try {
      // TODO: await http.post(`/admin/claims/${data.code}/approve`, { note })
      await new Promise(r => setTimeout(r, 500))
      const updated = { ...data, status: 'Approved' as ReviewStatus, adminNote: note ?? data.adminNote }
      setData(updated)
      toast.success('Claim approved', { title: data.code, appearance: 'solid' })
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Approve failed', { title: data.code, appearance: 'solid' })
    } finally {
      setSubmitting(false)
    }
  }

  async function reject(note: string) {
    if (!data) return
    if (!note?.trim()) {
      toast.error('Admin note is required for rejection', { title: 'Missing note' })
      return
    }
    setSubmitting(true)
    try {
      // TODO: await http.post(`/admin/claims/${data.code}/reject`, { note })
      await new Promise(r => setTimeout(r, 500))
      const updated = { ...data, status: 'Rejected' as ReviewStatus, adminNote: note }
      setData(updated)
      toast.success('Claim rejected', { title: data.code, appearance: 'solid' })
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Reject failed', { title: data.code, appearance: 'solid' })
    } finally {
      setSubmitting(false)
    }
  }

  return { data, loading, submitting, approve, reject }
}
