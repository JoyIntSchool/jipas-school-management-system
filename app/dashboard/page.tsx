import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'
import LogoutButton from '../../components/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl bg-white p-8 shadow">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">
                JIPAS School Management System
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Administration Dashboard
              </h1>

              <p className="mt-3 text-slate-600">
                Signed in as {user.email}
              </p>
            </div>

            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold text-slate-900">Students</h2>
            <p className="mt-2 text-slate-500">
              Manage student records.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold text-slate-900">Teachers & Staff</h2>
            <p className="mt-2 text-slate-500">
              Manage school personnel.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="font-semibold text-slate-900">Academic Records</h2>
            <p className="mt-2 text-slate-500">
              Manage academic information.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
