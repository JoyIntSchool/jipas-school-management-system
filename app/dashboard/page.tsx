import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'
import LogoutButton from '../../components/LogoutButton'

const modules = [
  ['students', 'Students', 'Manage student records.', '👨‍🎓'],
  ['classes', 'Classes', 'Manage classes.', '🏫'],
  ['teachers', 'Teachers & Staff', 'Manage school personnel.', '👩‍🏫'],
  ['subjects', 'Subjects', 'Manage subjects.', '📚'],
  ['results', 'Academic Results', 'Manage academic results.', '📝'],
  ['attendance', 'Attendance', 'Track student attendance.', '✅'],
  ['timetable', 'Timetable', 'Manage the school timetable.', '🗓️'],
  ['assignments', 'Assignments', 'Manage assignments.', '📋'],
  ['fees', 'Fees', 'Manage school fees.', '💳'],
  ['notifications', 'Notifications', 'Manage school notifications.', '🔔'],
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-50 ring-1 ring-white/15">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                SYSTEM ONLINE
              </div>
              <p className="text-sm font-medium text-blue-100">
                JIPAS School Management System
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Administration Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-blue-100 sm:text-base">
                Everything you need to manage students, staff, academics, attendance and school operations in one place.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-right ring-1 ring-white/10">
                <p className="text-xs text-blue-100">Signed in as</p>
                <p className="mt-1 max-w-[220px] truncate text-sm font-bold">{user.email}</p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        <section className="mb-7 grid gap-4 sm:grid-cols-3">
          <div className="stat-card">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Modules</p>
            <p className="mt-2 text-3xl font-black text-slate-900">10</p>
            <p className="mt-1 text-sm text-slate-500">Core school management areas</p>
          </div>
          <div className="stat-card">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Access</p>
            <p className="mt-2 text-3xl font-black text-emerald-600">Active</p>
            <p className="mt-1 text-sm text-slate-500">Authenticated staff session</p>
          </div>
          <div className="stat-card">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Database</p>
            <p className="mt-2 text-3xl font-black text-blue-700">Connected</p>
            <p className="mt-1 text-sm text-slate-500">Supabase services available</p>
          </div>
        </section>

        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">School Management</h2>
            <p className="mt-1 text-sm text-slate-500">Choose a module to get started.</p>
          </div>
          <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 sm:inline-block">
            10 modules
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map(([slug, title, description, icon]) => (
            <Link
              key={slug}
              href={`/dashboard/${slug}`}
              className="module-card group block"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl ring-1 ring-blue-100">
                  {icon}
                </div>
                <span className="text-lg font-bold text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                  →
                </span>
              </div>
              <h3 className="mt-5 font-extrabold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              <p className="mt-4 text-sm font-bold text-blue-700">Open module</p>
            </Link>
          ))}
        </div>

        <footer className="mt-8 pb-2 text-center text-xs text-slate-400">
          JIPAS School Management System · Secure staff administration
        </footer>
      </div>
    </main>
  )
}
