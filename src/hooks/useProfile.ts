import { useState } from 'react'
import type { ProfileData } from '@/api/profile.api'

const MOCK: ProfileData = {
  id: 'u_1',
  fullName: 'Michael Chen',
  email: 'michael.chen@email.com',
  phone: '+1 (555) 345-6789',
  dob: '1982-11-08',
  memberSince: '2020-06',
  tier: 'Gold',
  tierProgress: 73,
  nextTierMilesNeeded: 27500,
  availableMiles: 72500,
  benefits: ['50% bonus miles', 'Lounge access', 'Priority boarding', 'Free upgrades'],
}

export function useProfile() {
  const [data, setData] = useState<ProfileData>(MOCK)
  const [editing, setEditing] = useState(false)

  function save(partial: Partial<ProfileData>) {
    setData(prev => ({ ...prev, ...partial }))
    setEditing(false)
  }
  function cancel() { setEditing(false) }

  return { data, editing, setEditing, save, cancel }
}
