import Link from 'next/link'

type Props = {
  title: string
  description: string
  rows: Record<string, unknown>[]
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function ModulePage({
  title,
  description,
  rows,
}: Props) {
  const columns = rows.length
    ? Object.keys(rows[0]).filter(
        (key) => !['id', 'created_at', 'updated_at'].includes(key)
      ).slice(0, 8)
    : []

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-5 py-4 md:px-8">
        <Link
          href="/dashboard"
          className="font-semibold text-blue-700"
        >
          ← Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <h1 className="text-2xl font-black text-slate-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow ring-1 ring-slate-200">
          {rows.length === 0 ? (
            <div className="p-10 text-center text-slate-500">
              No records have been added yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    {columns.map((column) => (
                      <th key={column} className="px-5 py-3">
                        {column.replaceAll('_', ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {rows.map((row, index) => (
                    <tr
                      key={String(row.id ?? index)}
                      className="hover:bg-slate-50"
                    >
                      {columns.map((column) => (
                        <td key={column} className="px-5 py-4">
                          {displayValue(row[column])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
