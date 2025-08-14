// src/app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import { ToastProvider } from '@/components/Toast'

export default function Providers({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient())
  return (
  <QueryClientProvider client={client}>
     <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
  )
}
