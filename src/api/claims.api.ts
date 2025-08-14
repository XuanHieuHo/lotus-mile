export type ClaimStatus = 'Pending' | 'Approved' | 'Rejected'
export type Claim = {
  id: string
  code: string        // CL001...
  type: string        // Missing Miles, Hotel Bonus...
  description: string // sub text
  date: string        // ISO yyyy-mm-dd
  points: number
  status: ClaimStatus
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

