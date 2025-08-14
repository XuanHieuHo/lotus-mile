import Topbar from '@/components/Topbar'
import Button from '@/components/Button'
import { useProfile } from '@/hooks/useProfile'
import PersonalViewCard from '@/components/PersonalViewCard'
import PersonalEditCard from '@/components/PersonalEditCard'
import MembershipCard from '@/components/MembershipCard'
import MilesCard from '@/components/MilesCard'
import BenefitsCard from '@/components/BenefitsCard'

export default function ProfilePage() {
  const { data, editing, setEditing, save, cancel } = useProfile()

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />

      <main className="container mx-auto px-4 pb-16 pt-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
            <p className="mt-1 text-slate-500">Manage your account information and preferences</p>
          </div>

          {!editing && (
            <Button className="rounded-xl" onClick={() => setEditing(true)}>
              ✏️ Edit Profile
            </Button>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {editing ? (
              <PersonalEditCard data={data} onSave={save} onCancel={cancel} />
            ) : (
              <PersonalViewCard data={data} />
            )}
          </div>

          <div className="space-y-6">
            <MembershipCard data={data} />
            <MilesCard data={data} />
            <BenefitsCard data={data} />
          </div>
        </div>
      </main>
    </div>
  )
}
