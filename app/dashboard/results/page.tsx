import { redirect } from 'next/navigation'
import { createClient } from '../../../lib/supabase/server'
import ModulePage from '../../../components/ModulePage'

export default async function Page() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data } = await supabase
    .from('academic_records')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <ModulePage
      title="Academic Results"
      description="Manage student academic results."
      rows={(data ?? []) as Record<string, unknown>[]}
      table="academic_records"
    />
  )
}
