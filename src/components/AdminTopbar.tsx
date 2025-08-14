import { Link, NavLink } from 'react-router-dom'

export default function AdminTopbar() {
  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm ring-1 ring-slate-200"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/admin/claims" className="flex items-center gap-2 font-semibold text-slate-900">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-900 text-white">✈️</div>
          <span>LoyaltyAdmin</span>
        </Link>

        {/* Tabs */}
        <nav className="hidden items-center gap-2 md:flex">
          {[
            { to: '/admin/claims', label: 'Claims' },
            { to: '/admin/transactions', label: 'Transactions' },
          ].map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-1.5 text-sm',
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100',
                ].join(' ')
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-full border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
            title="Settings"
          >
            ⚙️
          </button>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white">A</div>
            <span className="hidden text-sm text-slate-800 md:inline">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}
