import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  School,
  Users,
} from 'lucide-react'
import { createClient } from '../../lib/supabase/server'
import LogoutButton from '../../components/LogoutButton'

const modules = [
  ['students', 'Students', 'Manage student records and admissions.', Users],
  ['classes', 'Classes', 'Organize classes and academic years.', School],
  ['teachers', 'Teachers & Staff', 'Manage school personnel and roles.', Users],
  ['subjects', 'Subjects', 'Maintain the school subject catalogue.', BookOpen],
  ['results', 'Academic Results', 'Manage scores, grades and remarks.', GraduationCap],
  ['attendance', 'Attendance', 'Track daily student attendance.', ClipboardCheck],
  ['timetable', 'Timetable', 'Manage classes, rooms and schedules.', CalendarDays],
  ['assignments', 'Assignments', 'Create and track school assignments.', ClipboardList],
  ['fees', 'Fees', 'Track billing, payments and balances.', Receipt],
  ['notifications', 'Notifications', 'Send and manage school notices.', Bell],
] as const

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-6 text-white shadow-xl sm:p-8">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-blue-50 ring-1 ring-white/15">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.12)]" />
                SYSTEM ONLINE
              </div>
              <p className="text-sm font-semibold text-blue-100">JIPAS School Management System</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Administration Dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                A single workspace for students, staff, academics, attendance, finance and school communication.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-right ring-1 ring-white/10 backdrop-blur-sm">
                <p className="text-xs text-blue-100">Signed in as</p>
                <p className="mt-1 max-w-[220px] truncate text-sm font-bold">{user.email}</p>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="stat-card flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><LayoutDashboard size={21} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Modules</p><p className="mt-1 text-2xl font-black text-slate-900">10</p></div></div>
          <div className="stat-card flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Users size={21} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Access</p><p className="mt-1 text-2xl font-black text-emerald-600">Active</p></div></div>
          <div className="stat-card flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><School size={21} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Database</p><p className="mt-1 text-2xl font-black text-indigo-600">Connected</p></div></div>
        </section>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div><p className="text-sm font-semibold text-blue-700">Workspace</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">School Management</h2><p className="mt-1 text-sm text-slate-500">Select a service to manage school operations.</p></div>
          <span className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-200 sm:inline-block">10 modules</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map(([slug, title, description, Icon]) => (
            <Link key={slug} href={`/dashboard/${slug}`} className="module-card group block">
              <div className="flex items-start justify-between gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition group-hover:bg-blue-700 group-hover:text-white"><Icon size={22} strokeWidth={2.2} /></div><ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" size={19} /></div>
              <h3 className="mt-5 font-extrabold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p><p className="mt-4 text-sm font-bold text-blue-700">Open module</p>
            </Link>
          ))}
        </div>

        <footer className="mt-9 pb-2 text-center text-xs text-slate-400">JIPAS School Management System · Secure staff administration</footer>
      </div>
    </main>
  )
}
