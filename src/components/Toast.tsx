import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

type Variant = 'success' | 'error' | 'info' | 'warning'
type Appearance = 'soft' | 'solid'

type ToastItem = {
  id: string
  title?: string
  message: string
  variant: Variant
  duration?: number
  appearance?: Appearance
}

type ToastApi = {
  show: (msg: string, opts?: Partial<Omit<ToastItem, 'id' | 'message'>>) => void
  success: (msg: string, opts?: Partial<Omit<ToastItem, 'id' | 'message'>>) => void
  error: (msg: string, opts?: Partial<Omit<ToastItem, 'id' | 'message'>>) => void
  info: (msg: string, opts?: Partial<Omit<ToastItem, 'id' | 'message'>>) => void
  warning: (msg: string, opts?: Partial<Omit<ToastItem, 'id' | 'message'>>) => void
}

const ToastCtx = createContext<ToastApi | null>(null)

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showBase = useCallback(
    (message: string, opts?: Partial<Omit<ToastItem, 'id' | 'message'>>) => {
      const id = Math.random().toString(36).slice(2)
      const variant: Variant = opts?.variant ?? 'info'
      const duration = opts?.duration ?? 3500
      const title = opts?.title
      const appearance = opts?.appearance ?? 'soft'
      setItems((prev) => [...prev, { id, message, variant, title, duration, appearance }])
      if (duration > 0) window.setTimeout(() => remove(id), duration)
    },
    [remove]
  )

  const api: ToastApi = useMemo(
    () => ({
      show: showBase,
      success: (m, o) => showBase(m, { ...o, variant: 'success' }),
      error: (m, o) => showBase(m, { ...o, variant: 'error' }),
      info: (m, o) => showBase(m, { ...o, variant: 'info' }),
      warning: (m, o) => showBase(m, { ...o, variant: 'warning' }),
    }),
    [showBase]
  )

  return (
    <ToastCtx.Provider value={api}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3">
          {items.map((t) => (
            <ToastItemView key={t.id} item={t} onClose={() => remove(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastCtx.Provider>
  )
}

function ToastItemView({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const soft: Record<Variant, string> = {
    success: 'bg-emerald-50 ring-1 ring-emerald-200 text-emerald-900',
    error:   'bg-rose-50 ring-1 ring-rose-200 text-rose-900',
    info:    'bg-sky-50 ring-1 ring-sky-200 text-slate-900',
    warning: 'bg-amber-50 ring-1 ring-amber-200 text-amber-900',
  }
  const solid: Record<Variant, string> = {
    success: 'bg-emerald-900 text-emerald-50 ring-1 ring-emerald-800',
    error:   'bg-rose-900 text-rose-50 ring-1 ring-rose-800',
    info:    'bg-slate-900 text-slate-50 ring-1 ring-slate-800',
    warning: 'bg-amber-900 text-amber-50 ring-1 ring-amber-800',
  }
  const style = item.appearance === 'solid' ? solid[item.variant] : soft[item.variant]
  const icons: Record<Variant, string> = {
    success: '✔️',
    error:   '⛔',
    info:    'ℹ️',
    warning: '⚠️',
  }

  return (
    <div className={`pointer-events-auto rounded-2xl p-4 shadow-md ${style}`}>
      <div className="flex items-start gap-3">
        <div className="text-xl leading-none">{icons[item.variant]}</div>
        <div className="flex-1">
          {item.title && <div className="text-sm font-semibold">{item.title}</div>}
          <div className="text-sm/6">{item.message}</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md px-2 text-inherit/80 hover:bg-white/10"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
