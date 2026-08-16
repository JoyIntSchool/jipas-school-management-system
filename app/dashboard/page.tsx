import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../lib/supabase/server'
import LogoutButton from '../../components/LogoutButton'

const modules = [
  ['students', 'Students', 'Manage student records.'],
  ['classes', 'Classes', 'Manage classes.'],
  ['teachers', 'Teachers & Staff', 'Manage school personnel.'],
  ['subjects', 'Subjects', 'Manage subjects.'],
  ['results', 'Academic Results', 'Manage academic results.'],
  ['attendance', 'Attendance', 'Track student attendance.'],
  ['timetable', 'Timetable', 'Manage the school timetable.'],
  ['assignments', 'Assignments', 'Manage assignments.'],
  ['fees', 'Fees', 'Manage school fees.'],
  ['notifications', 'Notifications', 'Manage school notifications.'],
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              <p className="text-sm font-medium text-slate-500">
                JIPAS School Management System
              </p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">
                Administration Dashboard
              </h1>
              <p className="mt-2 text-slate-600">
                Signed in as {user.email}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(([slug, title, description]) => (
            <Link
              key={slug}
              href={`/dashboard/${slug}`}
              className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <h2 className="font-bold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
              <p className="mt-4 text-sm font-semibold text-blue-700">
                Open module →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
