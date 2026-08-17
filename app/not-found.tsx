import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
          <GraduationCap size={28} />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-blue-700">JIPAS</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">The page you requested does not exist or may have moved. Return to the JIPAS home page to continue.</p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800">
          <ArrowLeft size={17} /> Back to home
        </Link>
      </section>
    </main>
  )
}
