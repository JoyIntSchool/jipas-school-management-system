'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

type Role = 'Student' | 'Parent' | 'Staff'

const roles: Role[] = ['Student', 'Parent', 'Staff']

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [role, setRole] = useState<Role>('Staff')
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
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-black ring-1 ring-white/20">J</div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">JIPAS</p>
              <h1 className="mt-4 text-4xl font-black leading-tight lg:text-5xl">School management, made simpler.</h1>
              <p className="mt-5 max-w-md leading-7 text-blue-100">A secure school community platform for students, parents and staff.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs font-bold text-blue-50">
                {roles.map((item) => <div key={item} className="rounded-xl bg-white/10 px-3 py-3 ring-1 ring-white/10">{item}</div>)}
              </div>
            </div>
            <p className="text-xs text-blue-200">JIPAS School Management System</p>
          </section>

          <section className="p-6 sm:p-9 lg:p-12">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-black text-blue-700 md:hidden">J</div>
              <p className="text-sm font-semibold text-blue-700">Welcome back</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">JIPAS Login</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Choose your portal, then sign in securely.</p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1.5" role="tablist" aria-label="JIPAS portal">
              {roles.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={role === item}
                  onClick={() => { setRole(item); setError('') }}
                  className={`rounded-xl px-2 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${role === item ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mb-5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Selected portal</p>
                <p className="text-sm font-black text-slate-900">{role} {role === 'Staff' ? 'Login' : 'Portal'}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">Secure</span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">Username / Email</label>
                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="admin@example.com" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-bold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-semibold text-blue-700 hover:underline">Forgot password?</button>
                </div>
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" placeholder="••••••••" />
              </div>

              {error && <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm font-medium text-red-700">{error}</div>}

              <button type="submit" disabled={loading} className="w-full rounded-xl bg-blue-700 px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Signing in…' : `Sign in as ${role}`}
              </button>
            </form>

            {role === 'Staff' && <p className="mt-5 text-center text-xs font-semibold text-slate-500">Demo teacher: <span className="text-slate-700">teacher / teacher123</span></p>}
            <p className="mt-4 text-center text-xs leading-5 text-slate-400">Your session is protected by Supabase authentication.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
