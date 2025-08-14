import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto grid min-h-screen place-items-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-100">
          <LoginForm />

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="font-semibold text-blue-700 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
