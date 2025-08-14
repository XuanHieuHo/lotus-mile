import { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import type { ProfileData } from '@/api/profile.api'

type Props = {
  data: ProfileData
  onSave: (p: Partial<ProfileData> & { currentPassword?: string; newPassword?: string }) => void
  onCancel: () => void
}

export default function PersonalEditCard({ data, onSave, onCancel }: Props) {
  const [fullName, setFullName] = useState(data.fullName)
  const [email, setEmail] = useState(data.email)
  const [phone, setPhone] = useState(data.phone)
  const [dob, setDob] = useState(data.dob)

  // password
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const canSavePwd = newPassword ? newPassword === confirm && currentPassword.length >= 6 : true

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3 text-slate-800">
        <span>👤</span>
        <span className="font-semibold">Personal Information</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-blue-900 text-white text-lg font-bold">
          {fullName.split(' ').map(n => n[0]).slice(0,2).join('')}
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-900">{fullName}</div>
          <div className="text-sm text-slate-500">
            Member since {new Date(data.memberSince + '-01').toLocaleString(undefined, { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Info fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full Name">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Email Address">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Phone Number">
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-xl" />
        </FormField>
        <FormField label="Date of Birth">
          <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-11 rounded-xl" />
        </FormField>
      </div>

      <hr className="my-5" />

      {/* Change password */}
      <div>
        <div className="text-sm font-semibold text-slate-800">Change Password (Optional)</div>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <Input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="h-11 rounded-xl"
          />
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="h-11 rounded-xl"
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
        {!canSavePwd && (
          <p className="mt-2 text-sm text-rose-600">Passwords do not match or current password is invalid.</p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button
          className="rounded-xl"
          disabled={!canSavePwd}
          onClick={() =>
            onSave({ fullName, email, phone, dob, ...(newPassword ? { currentPassword, newPassword } : {}) })
          }
        >
          Save Changes
        </Button>
        <Button variant="outline" className="rounded-xl" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-slate-500">{label}</div>
      {children}
    </label>
  )
}
