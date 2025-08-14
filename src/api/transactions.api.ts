export type TxnSource = 'Manual' | 'SessionM' | 'System'

export type AdminTransaction = {
  id: string               // TXN-2024-001234
  at: string               // ISO datetime: 2024-01-15T21:30:00Z (hoặc local)
  memberEmail: string
  source: TxnSource
  points: number           // + (credit) / - (debit)
  createdBy: string        // email / "system"
}

export type TxnDateRange = { from?: string; to?: string } // yyyy-mm-dd

export type ManualTxnInput = {
  memberEmail: string
  points: number     // positive integer, <= 100_000
  reason: string
}

export type ManualTxnResult = {
  id: string         // TXN-2024-001999
  at: string         // ISO datetime
  memberEmail: string
  points: number
  createdBy: string
}
