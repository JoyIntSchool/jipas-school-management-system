import { redirect } from 'next/navigation'
import { createClient } from '../../../lib/supabase/server'
import ModulePage from '../../../components/ModulePage'

export default async function Page() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data } = await supabase
    .from('timetable')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <ModulePage
      title="Timetable"
      description="View and manage the school timetable."
      rows={(data ?? []) as Record<string, unknown>[]}
    />
  )
}
