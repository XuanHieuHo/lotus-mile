import { httpAuth } from '@/services/http'

export type ClaimStatus = 'Pending' | 'Approved' | 'Rejected'
export type Claim = {
  id: number
  user_id: number
  invoice_no: string
  claim_date: string         // ISO yyyy-mm-dd
  requested_points: number
  attachment_url: string
  note: string
  status: ClaimStatus
  admin_note: string
  created_at: string         // ISO datetime
}

export type Claims = {
  items: Claim[],
  total: number  // ISO datetime
}


export type ClaimsRequest = {
  status: string
  page: number
  size: number
}

export type ClaimType =
  | 'Missing Miles/Points'
  | 'Hotel Bonus Points'
  | 'Car Rental Miles'
  | 'Credit Card Bonus'
  | 'Partner Points'
  | 'Other'

export type NewClaimStep = 1 | 2 | 3

export interface NewClaimForm {
  claimType: ClaimType | ''
  description: string
  points: number | ''
  files: File[]
}

export const getClaims = async (data: ClaimsRequest) => {
  const res = await httpAuth.get<Claims>('/member/claims', {
    params: data
  })
  return res.data
}

