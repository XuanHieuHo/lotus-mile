import { useState } from 'react'
import { useToast } from '@/components/Toast'
import { adminReviewClaim } from '@/api/claims.api'

// ViewModel tối thiểu để review (nhận từ màn trước)
export type ReviewClaimVM = {
  id: number
  status: string               // 'PENDING' | 'APPROVED' | 'REJECTED' | ...
  pointsRequested: number      // số điểm/miles đề nghị cộng/trừ
  code?: string                // optional: hiển thị trong toast
  adminNote?: string           // ghi chú gần nhất
}

/**
 * Dùng khi admin duyệt claim.
 * - Không fetch detail: nhận sẵn dữ liệu từ màn gọi.
 * - Chỉ gọi API review (approve/reject), rồi cập nhật local state.
 */
export function useAdminClaimReview(initial: ReviewClaimVM) {
  const [data, setData] = useState<ReviewClaimVM>(initial)
  const [submitting, setSubmitting] = useState(false)
  const toast = useToast()

  async function approve(note?: string, points?: number) {
    setSubmitting(true)
    try {
      const res = await adminReviewClaim({
        id: data.id,
        action: 'approve',                        // 👈 action theo API
        note: note ?? '',
        points: points ?? data.pointsRequested,   // nếu không truyền, dùng mặc định
      })
      // cập nhật local state theo response
      setData(prev => ({
        ...prev,
        status: res.status,
        pointsRequested: res.affected_points ?? prev.pointsRequested,
        adminNote: note ?? prev.adminNote,
      }))
      toast.success('Claim approved', {
        title: data.code || `#${data.id}`,
        appearance: 'solid',
      })
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Approve failed', {
        title: data.code || `#${data.id}`,
        appearance: 'solid',
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function reject(note: string) {
    if (!note?.trim()) {
      toast.error('Admin note is required for rejection', { title: 'Missing note' })
      return
    }
    setSubmitting(true)
    try {
      const res = await adminReviewClaim({
        id: data.id,
        action: 'reject',       // 👈 action theo API
        note,
        points: 0,              // reject thường không cộng điểm
      })
      setData(prev => ({
        ...prev,
        status: res.status,
        adminNote: note,
      }))
      toast.success('Claim rejected', {
        title: data.code || `#${data.id}`,
        appearance: 'solid',
      })
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Reject failed', {
        title: data.code || `#${data.id}`,
        appearance: 'solid',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return { data, submitting, approve, reject }
}
