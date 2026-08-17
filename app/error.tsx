'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep production error details out of the UI; the platform can record the digest.
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle size={27} />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-red-600">JIPAS</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Something went wrong</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">The page could not be loaded right now. Please try again. Your account and school data have not been exposed here.</p>
        <button type="button" onClick={() => reset()} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800">
          <RefreshCw size={17} /> Try again
        </button>
      </section>
    </main>
  )
}
