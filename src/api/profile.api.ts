export interface ProfileData {
  id: string
  fullName: string
  email: string
  phone: string
  dob: string // yyyy-mm-dd
  memberSince: string // yyyy-mm
  tier: 'Gold' | 'Silver' | 'Platinum'
  tierProgress: number // 0..100
  nextTierMilesNeeded: number
  availableMiles: number
  benefits: string[]
}
