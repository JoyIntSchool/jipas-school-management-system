import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { createClient } from '../../../lib/supabase/server'
import StudentTable from '../../../components/StudentTable'

export default async function StudentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: students, error } = await supabase
    .from('students')
    .select(
      'id, admission_number, first_name, middle_name, last_name, gender, status, class_id'
    )
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b bg-white px-5 py-4 md:px-8">
          <Link
            href="/dashboard"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-700"
          >
            <ArrowLeft size={17} />
            Dashboard
          </Link>
        </header>

        <div className="mx-auto max-w-7xl p-5 md:p-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            Unable to load students: {error.message}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-5 py-4 md:px-8">
        <Link
          href="/dashboard"
          className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-700"
        >
          <ArrowLeft size={17} />
          Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-black">Students</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage registered JIPAS students.
            </p>
          </div>

          <Link
            href="/dashboard/students/new"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <UserPlus size={17} />
            Add Student
          </Link>
        </div>

        <StudentTable students={students ?? []} />
      </div>
    </main>
  )
}
