export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-52 rounded-3xl bg-slate-200" />
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="h-24 rounded-2xl bg-white ring-1 ring-slate-200" />
          <div className="h-24 rounded-2xl bg-white ring-1 ring-slate-200" />
          <div className="h-24 rounded-2xl bg-white ring-1 ring-slate-200" />
        </div>
        <div className="mt-8 h-8 w-64 rounded bg-slate-200" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-48 rounded-2xl bg-white ring-1 ring-slate-200" />)}
        </div>
      </div>
    </main>
  )
}
