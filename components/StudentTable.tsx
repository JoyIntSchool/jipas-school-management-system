'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

type Student = {
  id: string
  admission_number: string
  first_name: string
  middle_name: string | null
  last_name: string
  gender: string | null
  status: string | null
  class_id: string | null
}

export default function StudentTable({
  students,
}: {
  students: Student[]
}) {
  const [search, setSearch] = useState('')

  const filteredStudents = students.filter((student) => {
    const text = [
      student.admission_number,
      student.first_name,
      student.middle_name,
      student.last_name,
      student.gender,
      student.status,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return text.includes(search.toLowerCase())
  })

  return (
    <div className="card mt-6 overflow-hidden">
      <div className="border-b p-4">
        <div className="flex max-w-md items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2">
          <Search size={17} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search students..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Admission No.</th>
              <th className="px-5 py-3">Student</th>
              <th className="px-5 py-3">Class</th>
              <th className="px-5 py-3">Gender</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium">
                    {student.admission_number}
                  </td>

                  <td className="px-5 py-4">
                    {student.first_name}{' '}
                    {student.middle_name
                      ? `${student.middle_name} `
                      : ''}
                    {student.last_name}
                  </td>

                  <td className="px-5 py-4">
                    {student.class_id || 'Not assigned'}
                  </td>

                  <td className="px-5 py-4">
                    {student.gender || '—'}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                      {student.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-slate-500"
                >
                  {search
                    ? 'No students match your search.'
                    : 'No students have been registered yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
