import { useEffect, useMemo, useState } from 'react'
import { getProfile, type ProfileData } from '@/api/profile.api'

const DEFAULTS: ProfileData = {
  id: 'u_1',
  name: 'Michael Chen',
  email: 'michael.chen@email.com',
  phone: '+1 (555) 345-6789',
  birthday: '1982-11-08',
  memberSince: '2020-06',
  tier: 'Gold',
  tierProgress: 73,
  nextTierMilesNeeded: 27500,
  total_miles: 99,
  availableMiles: 72500,
  benefits: ['50% bonus miles', 'Lounge access', 'Priority boarding', 'Free upgrades'],
}


type State =
  | { status: 'idle' | 'loading'; data: ProfileData; error: null }
  | { status: 'success'; data: ProfileData; error: null }
  | { status: 'error'; data: ProfileData; error: string }

  // helper lấy 2 ký tự đầu
function getInitials(nameOrEmail: string): string {
  if (!nameOrEmail) return '??'
  const s = nameOrEmail.trim()
  const parts = s.split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return s.slice(0, 2).toUpperCase()
}

export function useProfile() {
  const [state, setState] = useState<State>({ status: 'idle', data: DEFAULTS, error: null })
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    let cancelled = false
    setState(prev => ({ ...prev, status: 'loading', error: null }))

    ;(async () => {
      try {
        // API file hiện tại trả về các key: id, name, email, dbirthdayob, memberSince, tier, ...
        const api: any = await getProfile()

        if (cancelled) return

        // Map "tối thiểu" ngay trong hook (không tạo normalize/adapter riêng)
        const merged: ProfileData = {
          ...DEFAULTS,
          id: api?.id ?? DEFAULTS.id,
          name: api?.name ?? DEFAULTS.name,            // name -> fullName
          email: api?.email ?? DEFAULTS.email,
          phone: DEFAULTS.phone,                                // API không có phone -> giữ default
          birthday: api?.birthday ?? DEFAULTS.birthday,               // dbirthdayob (BE typo) -> dob
          memberSince: api?.memberSince ?? DEFAULTS.memberSince,
          tier: api?.tier ?? DEFAULTS.tier,
          tierProgress:
            typeof api?.tierProgress === 'number' ? api.tierProgress : DEFAULTS.tierProgress,
          nextTierMilesNeeded:
            typeof api?.nextTierMilesNeeded === 'number' ? api.nextTierMilesNeeded : DEFAULTS.nextTierMilesNeeded,
          availableMiles:
            typeof api?.availableMiles === 'number' ? api.availableMiles : DEFAULTS.availableMiles,
          benefits: Array.isArray(api?.benefits) ? api.benefits : DEFAULTS.benefits,
          total_miles:
            typeof api?.total_miles === 'number' ? api.total_miles : DEFAULTS.total_miles,
        }

        setState({ status: 'success', data: merged, error: null })
      } catch (err: any) {
        if (cancelled) return
        setState(prev => ({
          status: 'error',
          data: prev.data ?? DEFAULTS, // vẫn hiển thị bằng default nếu lỗi
          error: err?.message ?? 'Failed to fetch profile',
        }))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  function save(partial: Partial<ProfileData>) {
    // Hiện tại chỉ update local, chưa gọi API update
    setState(prev => ({ ...prev, data: { ...prev.data, ...partial } }))
    setEditing(false)
  }
  function cancel() { setEditing(false) }

  const initials = useMemo(
    () => getInitials(state.data.email || state.data.name),
    [state.data.email, state.data.name]
  )

  const progress = useMemo(() => state.data.tierProgress, [state.data.tierProgress])

  return {
    data: state.data,
    initials,
    loading: state.status === 'loading',
    error: state.status === 'error' ? state.error : null,
    editing,
    setEditing,
    save,
    cancel,
    progress,
  }
}
