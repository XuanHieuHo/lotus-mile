import { useMemo } from 'react'
import type { Activity } from '@/api/activity.api'

export function useDashboard() {
  const name = 'Sarah'
  const tier = 'Gold Member'
  const balance = 47500

  const activities: Activity[] = useMemo(
    () => [
      {
        id: '1',
        title: 'JFK to LAX - AA1234',
        date: '2024-12-08',
        miles: 2500,
        status: 'Completed',
      },
      {
        id: '2',
        title: 'Missing miles credit',
        date: '2024-12-05',
        miles: 1250,
        status: 'Approved',
      },
      {
        id: '3',
        title: 'LAX to SFO - UA5678',
        date: '2024-12-01',
        miles: 750,
        status: 'Pending',
      },
      {
        id: '4',
        title: 'Hotel stay at Marriott',
        date: '2024-11-28',
        miles: 3000,
        status: 'Rejected',
      }
    ],
    []
  )

  return {
    name,
    tier,
    balance,
    activeClaims: 3,
    activities,
  }
}
