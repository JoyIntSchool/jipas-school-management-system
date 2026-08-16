import Link from "next/link";
import { GraduationCap, ShieldCheck, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-700 p-2 text-white"><GraduationCap size={24} /></div>
            <div>
              <p className="font-bold text-slate-900">JIPAS</p>
              <p className="text-xs text-slate-500">School Management System</p>
            </div>
          </div>
          <Link href="/dashboard" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            Open Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-3xl">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">Fresh V1 Foundation</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            One modern platform for the JIPAS school community.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A clean foundation for student records, academic results, attendance, staff management,
            announcements and school administration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800">
              Enter System <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            [Users, "Student Management", "Profiles, classes, attendance and academic records."],
            [GraduationCap, "Academic Management", "Subjects, assessments, results and report cards."],
            [ShieldCheck, "Administration", "Staff, announcements, reports and system controls."]
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Users;
            return (
              <div className="card p-6" key={title as string}>
                <I className="text-blue-700" size={28} />
                <h2 className="mt-4 text-lg font-bold text-slate-900">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
