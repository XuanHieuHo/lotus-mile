import { Link, NavLink } from "react-router-dom";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-slate-800"
        >
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-900 text-white">
            ✈️
          </div>
          <span>LoyaltyHub</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/claims", label: "Claims" },
            { to: "/profile", label: "Profile" },
          ].map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
            title="Toggle theme"
          >
            ☀︎ / 🌙
          </button>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-900 text-white">
              SJ
            </div>
            <span className="hidden text-sm font-medium text-slate-800 md:inline">
              Sarah Johnson
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
