'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl md:grid-cols-[1.05fr_0.95fr]">
          <section className="hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-black ring-1 ring-white/20">
                J
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">JIPAS</p>
              <h1 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">
                School management, made simpler.
              </h1>
              <p className="mt-5 max-w-md leading-7 text-blue-100">
                Manage students, staff, academics, attendance, fees and school communication from one secure platform.
              </p>
            </div>
            <p className="text-xs text-blue-200">JIPAS School Management System</p>
          </section>

          <section className="p-6 sm:p-9 lg:p-12">
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-black text-blue-700 md:hidden">
                J
              </div>
              <p className="text-sm font-semibold text-blue-700">Welcome back</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Staff Login</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to access the JIPAS administration dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700">Password</label>
                  <span className="text-xs font-semibold text-slate-400">Secure access</span>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-700 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-7 text-center text-xs leading-5 text-slate-400">
              Authorized school staff only. Your session is protected by Supabase authentication.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
