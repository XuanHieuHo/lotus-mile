export type Activity = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  miles: number
  status: 'Approved' | 'Completed' | 'Pending' | 'Rejected'
}
