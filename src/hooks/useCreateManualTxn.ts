import { useMutation } from '@tanstack/react-query'
import type { ManualTxnInput, ManualTxnResult } from '@/api/transactions.api'
// TODO: thay bằng http.post('/admin/transactions/manual', payload)
async function createManualTxnApi(payload: ManualTxnInput): Promise<ManualTxnResult> {
  await new Promise((r) => setTimeout(r, 600)); // fake latency

  // validations mẫu (server sẽ kiểm tra lại)
  if (!payload.memberEmail.includes('@')) {
    const err: any = new Error('Member email is not valid')
    err.response = { data: { message: 'Member email is not valid' } }
    throw err
  }
  if (payload.points <= 0 || payload.points > 100_000) {
    const err: any = new Error('Points must be 1–100,000')
    err.response = { data: { message: 'Points must be 1–100,000' } }
    throw err
  }
  if (!payload.reason.trim()) {
    const err: any = new Error('Reason is required')
    err.response = { data: { message: 'Reason is required' } }
    throw err
  }

  // mock success
  const idSuffix = Math.floor(Math.random() * 9000 + 1000)
  return {
    id: `TXN-2024-00${idSuffix}`,
    at: new Date().toISOString(),
    memberEmail: payload.memberEmail,
    points: payload.points,
    createdBy: 'admin@airline.com',
  }
}

export function useCreateManualTxn() {
  return useMutation<ManualTxnResult, any, ManualTxnInput>({
    mutationFn: createManualTxnApi,
  })
}
