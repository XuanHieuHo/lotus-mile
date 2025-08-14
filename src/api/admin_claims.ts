export type AdminStatus = 'Pending' | 'Approved' | 'Rejected'

export type AdminClaimRow = {
  id: string           // e.g. CLM-2024-001
  submitted: string    // ISO date (yyyy-mm-dd)
  member: string       // email
  type: string         // Flight Delay / Lost Luggage / ...
  status: AdminStatus
  points: number
}

export type DateRange = { from?: string; to?: string } // yyyy-mm-dd
