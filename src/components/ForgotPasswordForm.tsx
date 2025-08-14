import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useForgotPassword } from '@/hooks/useForgotPassword'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const { mutate, isPending, error, data } = useForgotPassword()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ email })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-800">Email Address</label>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-xl"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {(error as any)?.response?.data?.message ?? 'Something went wrong'}
        </p>
      )}
      {data && (
        <p className="text-sm text-green-600">{data.message ?? 'Check your inbox for instructions.'}</p>
      )}

      <Button type="submit" disabled={isPending} className="h-12 w-full rounded-xl">
        {isPending ? 'Sending…' : 'Send Reset Instructions'}
      </Button>

      <hr className="my-4" />
    </form>
  )
}
