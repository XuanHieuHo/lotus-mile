import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

const variants = {
  primary:
    'text-white shadow ' +
    'bg-gradient-to-r from-sky-600 to-blue-800 hover:from-sky-500 hover:to-blue-700 ' +
    'focus-visible:ring-blue-600',
  outline:
    'border bg-white text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-300',
  ghost: 'text-gray-700 hover:bg-gray-100',
}

export default forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  )
})
