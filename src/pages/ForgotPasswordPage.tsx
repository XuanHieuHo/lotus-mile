import { Link } from 'react-router-dom'
import ForgotPasswordForm from '@/components/ForgotPasswordForm'

function AppMark() {
  return (
    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#0b3b68] text-white text-lg font-bold">
      LH
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto max-w-2xl p-6">
        <AppMark />
        <h1 className="text-center text-3xl font-semibold text-slate-900">Forgot Password?</h1>
        <p className="mt-1 text-center text-slate-500">
          No worries! Enter your email address and we'll send you reset instructions
        </p>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-700">
            <span className="text-xl">✉️</span>
            <span className="font-semibold">Reset Your Password</span>
          </div>
          <p className="mb-6 text-center text-sm text-slate-500">
            Enter the email address associated with your LoyaltyHub account
          </p>

          <ForgotPasswordForm />

          <div className="mt-2">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-sky-800 hover:underline">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
