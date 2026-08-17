import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, ShieldCheck, Users } from 'lucide-react'

const features = [
  { icon: Users, title: 'Student Management', text: 'Manage student profiles, admissions, classes, attendance and academic records.' },
  { icon: GraduationCap, title: 'Academic Management', text: 'Handle subjects, assessments, results, assignments and academic progress.' },
  { icon: ShieldCheck, title: 'School Administration', text: 'Manage staff, fees, timetables, notifications and daily school operations.' },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="JIPAS home">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><GraduationCap size={24} /></div>
            <div><p className="font-black tracking-tight">JIPAS</p><p className="text-xs font-medium text-slate-500">School Management System</p></div>
          </Link>
          <Link href="/login" className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800">Staff Login</Link>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-0 h-[520px] bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950" />
        <div className="absolute right-0 top-0 -z-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20">
          <div className="max-w-3xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide ring-1 ring-white/15"><CheckCircle2 size={14} /> Secure school administration platform</span>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">One modern platform for the JIPAS school community.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">A professional workspace for managing students, teachers, academics, attendance, fees and school communication from one secure system.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-blue-800 shadow-xl hover:bg-blue-50">Enter Staff Portal <ArrowRight size={18} /></Link>
              <a href="#features" className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 font-bold text-white hover:bg-white/15">Explore Features</a>
            </div>
          </div>

          <div id="features" className="mt-16 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/70 bg-white p-6 shadow-2xl shadow-slate-950/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon size={25} /></div>
                <h2 className="mt-5 text-lg font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10 md:grid-cols-[1fr_auto]">
          <div><p className="text-sm font-bold text-blue-700">Built for daily school operations</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Everything important, in one place.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">JIPAS keeps core administrative information organized, accessible and protected for authorized staff.</p></div>
          <BookOpen className="hidden text-blue-700 md:block" size={54} strokeWidth={1.5} />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-7 text-center text-xs font-medium text-slate-400">JIPAS School Management System · Secure staff administration</footer>
    </main>
  )
}
