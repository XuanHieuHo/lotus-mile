import type { Attachment } from "./claim_detail.api"

export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected'


export type ReviewMember = {
  name: string
  email: string
  tier: 'Gold' | 'Silver' | 'Platinum'
  memberSince: string // yyyy-mm-dd
}

export type ReviewClaim = {
  code: string          // CLM-2024-001
  submittedOn: string   // yyyy-mm-dd
  status: ReviewStatus
  type: string          // Flight Delay ...
  pointsRequested: number
  description: string
  attachments: Attachment[]
  member: ReviewMember
  adminNote?: string    // filled when approved/rejected
}
