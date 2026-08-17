import Link from 'next/link'
import { ArrowLeft, UserRound, UsersRound } from 'lucide-react'
import { createClient } from '../../../lib/supabase/server'

export default async function ParentsPage() {
  const supabase = await createClient()
  const { count, error } = await supabase.from('parents').select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700"><ArrowLeft size={16}/> Dashboard</Link>
        <header className="mt-5 rounded-3xl bg-gradient-to-br from-blue-700 to-slate-950 p-7 text-white shadow-xl">
          <div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10"><UserRound size={28}/></div><div><p className="text-sm font-semibold text-blue-100">JIPAS Community</p><h1 className="text-3xl font-black">Parents & Guardians</h1></div></div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100">Manage parent profiles and connect guardians to their students. The directory is backed by the JIPAS parent relationship data.</p>
        </header>
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="stat-card"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered parents</p><p className="mt-2 text-3xl font-black text-slate-900">{error ? '—' : count ?? 0}</p><p className="mt-1 text-sm text-slate-500">Current parent records</p></div>
          <div className="stat-card"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Relationships</p><p className="mt-2 text-3xl font-black text-blue-700">Connected</p><p className="mt-1 text-sm text-slate-500">Parent-to-student mapping</p></div>
          <div className="stat-card"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Directory</p><p className="mt-2 text-3xl font-black text-emerald-600">Ready</p><p className="mt-1 text-sm text-slate-500">Secure staff access</p></div>
        </section>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3"><UsersRound className="text-blue-700"/><div><h2 className="font-black text-slate-900">Parent management</h2><p className="text-sm text-slate-500">Parent records are stored separately from authentication credentials and linked to students through the relationship table.</p></div></div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">Use this area as the central parent directory. Student profiles can be linked to one or more guardians without exposing authentication secrets.</div>
        </section>
      </div>
    </main>
  )
}
