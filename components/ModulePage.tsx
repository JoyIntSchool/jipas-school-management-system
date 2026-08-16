'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Plus, ArrowLeft } from 'lucide-react'
import { createClient } from '../lib/supabase/client'

type Row = Record<string, unknown>

type Props = {
  title: string
  description: string
  rows: Row[]
  table: string
}

type Field = {
  key: string
  label: string
  type?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

function displayValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

const fields: Record<string, Field[]> = {
  staff: [
    { key: 'staff_number', label: 'Staff Number' },
    { key: 'first_name', label: 'First Name', required: true },
    { key: 'last_name', label: 'Last Name', required: true },
    { key: 'phone', label: 'Phone' },
    { key: 'position', label: 'Position' },
    { key: 'department', label: 'Department' },
    {
      key: 'role',
      label: 'Role',
      required: true,
      options: [
        { value: 'teacher', label: 'Teacher' },
        { value: 'staff', label: 'Staff' },
        { value: 'admin', label: 'Admin' },
      ],
    },
  ],

  classes: [
    { key: 'name', label: 'Class Name', required: true },
    { key: 'level', label: 'Level', required: true },
    { key: 'academic_year', label: 'Academic Year', required: true },
  ],

  subjects: [
    { key: 'name', label: 'Subject Name', required: true },
    { key: 'code', label: 'Code' },
  ],

  academic_records: [
    { key: 'student_id', label: 'Student', required: true },
    { key: 'subject_id', label: 'Subject', required: true },
    { key: 'academic_year', label: 'Academic Year', required: true },
    {
      key: 'term',
      label: 'Term',
      required: true,
      options: [
        { value: 'Term 1', label: 'Term 1' },
        { value: 'Term 2', label: 'Term 2' },
        { value: 'Term 3', label: 'Term 3' },
      ],
    },
    { key: 'score', label: 'Score', type: 'number' },
    { key: 'grade', label: 'Grade' },
    { key: 'remarks', label: 'Remarks' },
  ],

  attendance: [
    { key: 'student_id', label: 'Student', required: true },
    { key: 'attendance_date', label: 'Date', type: 'date', required: true },
    {
      key: 'status',
      label: 'Status',
      required: true,
      options: [
        { value: 'Present', label: 'Present' },
        { value: 'Absent', label: 'Absent' },
        { value: 'Late', label: 'Late' },
      ],
    },
    { key: 'remarks', label: 'Remarks' },
  ],

  timetables: [
    { key: 'class_id', label: 'Class', required: true },
    { key: 'subject_id', label: 'Subject', required: true },
    {
      key: 'day',
      label: 'Day',
      required: true,
      options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
        (x) => ({ value: x, label: x })
      ),
    },
    { key: 'start_time', label: 'Start Time', type: 'time', required: true },
    { key: 'end_time', label: 'End Time', type: 'time', required: true },
    { key: 'room', label: 'Room' },
  ],

  assignments: [
    { key: 'subject_id', label: 'Subject' },
    { key: 'class_id', label: 'Class' },
    { key: 'title', label: 'Title', required: true },
    { key: 'description', label: 'Description' },
    { key: 'due_date', label: 'Due Date', type: 'date' },
    {
      key: 'status',
      label: 'Status',
      required: true,
      options: [
        { value: 'Open', label: 'Open' },
        { value: 'Closed', label: 'Closed' },
      ],
    },
  ],

  fees: [
    { key: 'student_id', label: 'Student', required: true },
    { key: 'academic_year', label: 'Academic Year', required: true },
    {
      key: 'term',
      label: 'Term',
      required: true,
      options: [
        { value: 'Term 1', label: 'Term 1' },
        { value: 'Term 2', label: 'Term 2' },
        { value: 'Term 3', label: 'Term 3' },
      ],
    },
    { key: 'amount', label: 'Amount', type: 'number', required: true },
    { key: 'amount_paid', label: 'Amount Paid', type: 'number', required: true },
    {
      key: 'status',
      label: 'Status',
      required: true,
      options: [
        { value: 'Pending', label: 'Pending' },
        { value: 'Partial', label: 'Partial' },
        { value: 'Paid', label: 'Paid' },
      ],
    },
    { key: 'due_date', label: 'Due Date', type: 'date' },
  ],

  notifications: [
    { key: 'title', label: 'Title', required: true },
    { key: 'message', label: 'Message', required: true },
    {
      key: 'audience',
      label: 'Audience',
      required: true,
      options: [
        { value: 'All', label: 'All' },
        { value: 'Students', label: 'Students' },
        { value: 'Teachers', label: 'Teachers' },
        { value: 'Staff', label: 'Staff' },
      ],
    },
  ],
}

export default function ModulePage({
  title,
  description,
  rows,
  table,
}: Props) {
  const supabase = useMemo(() => createClient(), [])
  const config = fields[table] ?? []

  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<Record<string, string>>({})
  const [relationOptions, setRelationOptions] = useState<
    Record<string, { value: string; label: string }[]>
  >({})

  useEffect(() => {
    async function loadRelations() {
      const next: Record<
        string,
        { value: string; label: string }[]
      > = {}

      if (config.some((f) => f.key === 'student_id')) {
        const { data } = await supabase
          .from('students')
          .select('id, admission_number, first_name, last_name')
          .order('first_name')

        next.student_id = (data ?? []).map((student) => ({
          value: student.id,
          label: `${student.admission_number} — ${student.first_name} ${student.last_name}`,
        }))
      }

      if (config.some((f) => f.key === 'subject_id')) {
        const { data } = await supabase
          .from('subjects')
          .select('id, name, code')
          .order('name')

        next.subject_id = (data ?? []).map((subject) => ({
          value: subject.id,
          label: `${subject.name}${
            subject.code ? ` (${subject.code})` : ''
          }`,
        }))
      }

      if (config.some((f) => f.key === 'class_id')) {
        const { data } = await supabase
          .from('classes')
          .select('id, name, level')
          .order('name')

        next.class_id = (data ?? []).map((item) => ({
          value: item.id,
          label: `${item.name}${item.level ? ` — ${item.level}` : ''}`,
        }))
      }

      setRelationOptions(next)
    }

    loadRelations()
  }, [supabase, table])

  function openForm() {
    const initial: Record<string, string> = {}

    config.forEach((field) => {
      if (field.key === 'academic_year') {
        initial[field.key] = '2026/2027'
      } else if (field.key === 'role') {
        initial[field.key] = 'teacher'
      } else if (field.key === 'status') {
        initial[field.key] =
          table === 'attendance'
            ? 'Present'
            : table === 'assignments'
              ? 'Open'
              : table === 'fees'
                ? 'Pending'
                : ''
      } else if (field.key === 'term') {
        initial[field.key] = 'Term 1'
      } else {
        initial[field.key] = field.options?.[0]?.value ?? ''
      }
    })

    setForm(initial)
    setError('')
    setShowForm(true)
  }

  function calculateGrade(value: string) {
    const score = Number(value)

    if (Number.isNaN(score)) return ''
    if (score >= 80) return 'A1'
    if (score >= 70) return 'B2'
    if (score >= 65) return 'B3'
    if (score >= 60) return 'C4'
    if (score >= 55) return 'C5'
    if (score >= 50) return 'C6'
    if (score >= 40) return 'D7'
    if (score >= 35) return 'E8'
    return 'F9'
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSaving(true)
    setError('')

    const payload: Record<string, unknown> = {}

    config.forEach((field) => {
      const value = form[field.key]

      if (value !== undefined && value !== '') {
        payload[field.key] =
          field.type === 'number' ? Number(value) : value
      }
    })

    if (table === 'academic_records' && form.score) {
      payload.grade = calculateGrade(form.score)
    }

    if (table === 'fees') {
      const amount = Number(form.amount || 0)
      const paid = Number(form.amount_paid || 0)

      payload.status =
        paid >= amount && amount > 0
          ? 'Paid'
          : paid > 0
            ? 'Partial'
            : 'Pending'
    }

    const { error } = await supabase.from(table).insert(payload)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    window.location.reload()
  }

  const columns = rows.length
    ? Object.keys(rows[0])
        .filter(
          (key) =>
            !['id', 'created_at', 'updated_at'].includes(key)
        )
        .slice(0, 8)
    : []

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-5 py-4 md:px-8">
        <Link
          href="/dashboard"
          className="flex w-fit items-center gap-2 font-semibold text-blue-700"
        >
          <ArrowLeft size={17} />
          Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-7xl p-5 md:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {title}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>

          <button
            onClick={openForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <Plus size={17} />
            Add Record
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={submit}
            className="mt-6 rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {config.map((field) => {
                const options =
                  field.options ?? relationOptions[field.key]

                const wide =
                  field.key === 'message' ||
                  field.key === 'description' ||
                  field.key === 'remarks'

                return (
                  <div
                    key={field.key}
                    className={wide ? 'md:col-span-2' : ''}
                  >
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      {field.label}
                    </label>

                    {options ? (
                      <select
                        required={field.required}
                        value={form[field.key] ?? ''}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            [field.key]: event.target.value,
                          })
                        }
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                      >
                        <option value="">
                          Select {field.label}
                        </option>

                        {options.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : wide ? (
                      <textarea
                        required={field.required}
                        value={form[field.key] ?? ''}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            [field.key]: event.target.value,
                          })
                        }
                        rows={4}
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                      />
                    ) : (
                      <input
                        required={field.required}
                        type={field.type ?? 'text'}
                        value={form[field.key] ?? ''}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            [field.key]: event.target.value,
                          })
                        }
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {error && (
              <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border px-5 py-3 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                type="submit"
                className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </form>
        )}

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
