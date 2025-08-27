import Topbar from '@/components/Topbar'
import Button from '@/components/Button'
import { NewClaimCard, ViewClaimsCard, ProfileCard } from '@/components/DashboardCards'
import ActivityList from '@/components/ActivityList'
import { useDashboard } from '@/hooks/useDashboard'
import { useProfile } from '@/hooks/useProfile'
import { useClaims } from '@/hooks/useClaims'

export default function DashboardPage() {
  const { activeClaims, activities } = useDashboard()
  const {data} = useProfile()
  const {items} = useClaims()

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />

      <main className="container mx-auto px-4 pb-16 pt-8">
        {/* Hero */}
        <section className="relative rounded-3xl bg-white/60 p-6 shadow-sm ring-1 ring-slate-100">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome back, {data.email}!</h1>
          <p className="mt-1 text-slate-500">Manage your loyalty account and track your rewards</p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-amber-600">
            <span>⭐</span> <span>{data.tier}</span>
          </div>

          {/* Balance badge (right) */}
          <div className="absolute right-6 top-6 hidden rounded-2xl bg-white/80 p-4 text-right shadow-sm ring-1 ring-slate-100 md:block">
            <div className="text-sm font-medium text-amber-500">Current Balance</div>
            <div className="text-4xl font-extrabold text-slate-900">{data.total_miles.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Miles</div>
          </div>
        </section>

        {/* Cards */}
        <section className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NewClaimCard />
          <ViewClaimsCard active={activeClaims} />
          <ProfileCard />
        </section>

        {/* Recent Activity */}
        <section className="mt-8">
          <ActivityList items={items} />
        </section>
      </main>

      {/* Floating help (demo) */}
      <Button variant="outline" className="fixed bottom-6 right-6 rounded-full px-4 py-3">
        ?
      </Button>
    </div>
  )
}
