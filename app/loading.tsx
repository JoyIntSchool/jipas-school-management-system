export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white">J</div>
        <h1 className="mt-5 text-lg font-black text-slate-900">JIPAS</h1>
        <p className="mt-1 text-sm text-slate-500">Loading your workspace…</p>
        <div className="mx-auto mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
        </div>
      </div>
    </main>
  )
}
