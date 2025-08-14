import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string }

export default forwardRef<HTMLInputElement, Props>(function Input(
  { className, label, id, ...props },
  ref
) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900',
          'placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30',
          className
        )}
        {...props}
      />
    </label>
  )
})
