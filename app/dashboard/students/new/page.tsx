'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '../../../../lib/supabase/client'

export default function NewStudentPage() {
  const router = useRouter()
  const supabase = createClient()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    admission_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    phone: '',
    email: '',
    address: '',
    guardian_name: '',
    guardian_phone: '',
    guardian_email: '',
    status: 'Active',
  })

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('students')
      .insert({
        admission_number: form.admission_number,
        first_name: form.first_name,
        middle_name: form.middle_name || null,
        last_name: form.last_name,
        gender: form.gender || null,
        date_of_birth: form.date_of_birth || null,
        phone: form.phone || null,
        email: form.email || null,
        address: form.address || null,
        guardian_name: form.guardian_name || null,
        guardian_phone: form.guardian_phone || null,
        guardian_email: form.guardian_email || null,
        status: form.status,
      })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/dashboard/students')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white px-5 py-4 md:px-8">
        <Link
          href="/dashboard/students"
          className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-700"
        >
          <ArrowLeft size={17} />
          Students
        </Link>
      </header>

      <div className="mx-auto max-w-4xl p-5 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900">
            Add Student
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Register a new student in the JIPAS school system.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Admission Number *
              </label>

              <input
                required
                value={form.admission_number}
                onChange={(e) =>
                  updateField('admission_number', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="JIPAS/2026/001"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                First Name *
              </label>

              <input
                required
                value={form.first_name}
                onChange={(e) =>
                  updateField('first_name', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Middle Name
              </label>

              <input
                value={form.middle_name}
                onChange={(e) =>
                  updateField('middle_name', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Last Name *
              </label>

              <input
                required
                value={form.last_name}
                onChange={(e) =>
                  updateField('last_name', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Gender
              </label>

              <select
                value={form.gender}
                onChange={(e) =>
                  updateField('gender', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Date of Birth
              </label>

              <input
                type="date"
                value={form.date_of_birth}
                onChange={(e) =>
                  updateField('date_of_birth', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Phone
              </label>

              <input
                value={form.phone}
                onChange={(e) =>
                  updateField('phone', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="024..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  updateField('email', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold">
                Address
              </label>

              <textarea
                value={form.address}
                onChange={(e) =>
                  updateField('address', e.target.value)
                }
                rows={3}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div className="md:col-span-2">
              <h2 className="border-b pb-3 text-lg font-bold">
                Guardian Information
              </h2>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Guardian Name
              </label>

              <input
                value={form.guardian_name}
                onChange={(e) =>
                  updateField('guardian_name', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Guardian Phone
              </label>

              <input
                value={form.guardian_phone}
                onChange={(e) =>
                  updateField('guardian_phone', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Guardian Email
              </label>

              <input
                type="email"
                value={form.guardian_email}
                onChange={(e) =>
                  updateField('guardian_email', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField('status', e.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
                <option value="Transferred">Transferred</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/students"
              className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving student...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
