import { httpAuth } from '@/services/http'

export interface ProfileData {
  id: string
  name: string
  email: string
  phone: string
  birthday: string // yyyy-mm-dd
  memberSince: string // yyyy-mm
  tier: 'Gold' | 'Silver' | 'Platinum'
  tierProgress: number // 0..100
  nextTierMilesNeeded: number
  availableMiles: number
  benefits: string[]
}

export const getProfile = async () => {
  const res = await httpAuth.get<ProfileData>('/member/profile')
  return res.data
}