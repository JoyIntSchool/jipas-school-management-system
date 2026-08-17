import Link from 'next/link'
import { ArrowLeft, BarChart3, ClipboardCheck, GraduationCap, Receipt, Users, UserRound } from 'lucide-react'
import { createClient } from '../../../lib/supabase/server'

async function countRows(supabase: Awaited<ReturnType<typeof createClient>>, table: string) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
  return error ? null : count ?? 0
}

export default async function ReportsPage() {
  const supabase = await createClient()
  const [students, parents, attendance, results, fees] = await Promise.all([
    countRows(supabase, 'students'), countRows(supabase, 'parents'), countRows(supabase, 'attendance'), countRows(supabase, 'results'), countRows(supabase, 'fees'),
  ])
  const cards = [
    ['Students', students, Users, 'Total student records'],
    ['Parents', parents, UserRound, 'Registered parent records'],
    ['Attendance', attendance, ClipboardCheck, 'Attendance records'],
    ['Results', results, GraduationCap, 'Academic result records'],
    ['Fees', fees, Receipt, 'Fee/payment records'],
  ] as const
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={16}/> Dashboard</Link>
        <header className="mt-5 rounded-3xl bg-gradient-to-br from-indigo-700 to-slate-950 p-7 text-white shadow-xl">
          <div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><BarChart3 size={28}/></div><div><p className="text-sm font-semibold text-indigo-100">JIPAS Analytics</p><h1 className="text-3xl font-black">Reports & Overview</h1></div></div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-indigo-100">A presentation-ready overview of the school's key operational datasets, sourced directly from the connected database.</p>
        </header>
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(([title, value, Icon, description]) => <div key={title} className="stat-card"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon size={21}/></div><p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">{title}</p><p className="mt-1 text-3xl font-black text-slate-900">{value === null ? '—' : value}</p><p className="mt-1 text-sm text-slate-500">{description}</p></div>)}
        </section>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-black text-slate-900">Operational reporting</h2><p className="mt-2 text-sm leading-6 text-slate-500">Use the dedicated modules to drill into student records, attendance, results, fees and parent relationships. Counts above are live database totals where the corresponding table is available.</p></section>
      </div>
    </main>
  )
}
