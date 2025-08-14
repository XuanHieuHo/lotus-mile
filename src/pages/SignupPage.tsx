import RegisterForm from '@/components/RegisterForm'

function PlaneHeading() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-slate-900">Join LoyaltyHub</h1>
      <p className="mt-1 text-center text-slate-500">
        Create your account and start earning miles with every flight
      </p>

      <div className="mt-6 rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-100">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-sky-50">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-blue-700">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9L2 14v2l8-2.5V19l-2 1.5V22l3-1 3 1v-1.5L13 19v-5.5l8 2.5Z" />
          </svg>
        </div>
        <h2 className="text-center text-lg font-semibold text-slate-800">Create Your Account</h2>
        <p className="mt-1 text-center text-sm text-slate-500">
          Fill in your details to get started with your loyalty journey
        </p>

        <div className="mt-6">
          <RegisterForm />
        </div>

        <hr className="mt-6" />
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-700 hover:underline">Sign in here</a>
        </p>
      </div>
    </>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto max-w-3xl p-4">
        <PlaneHeading />
      </div>
    </div>
  )
}
