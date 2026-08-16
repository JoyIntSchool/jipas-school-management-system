import { redirect } from 'next/navigation'
import { createClient } from '../../../lib/supabase/server'
import ModulePage from '../../../components/ModulePage'

export default async function Page() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data } = await supabase
    .from('assignments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <ModulePage
      title="Assignments"
      description="Manage academic assignments."
      rows={(data ?? []) as Record<string, unknown>[]}
    />
  )
}
