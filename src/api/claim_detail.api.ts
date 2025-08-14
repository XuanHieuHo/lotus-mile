export type ClaimStatus = 'Pending' | 'Approved' | 'Rejected'

export type TimelinePoint = {
  label: string
  date: string // ISO or readable
  desc?: string
  by?: string
  color: 'blue' | 'yellow' | 'green' | 'red'
}

export type Attachment = {
  id: string
  name: string
  size: string
  type: 'PDF' | 'PNG' | 'JPG'
  url?: string
}

export interface ClaimDetail {
  id: string            // internal id
  code: string          // CL001
  submittedOn: string
  processedOn?: string
  status: ClaimStatus
  type: string
  pointsRequested: number
  description: string
  timeline: TimelinePoint[]
  adminNote?: { tone: 'info' | 'success' | 'danger'; text: string }
  attachments: Attachment[]
}
