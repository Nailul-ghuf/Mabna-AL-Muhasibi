'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSchedule(formData: FormData) {
  const supabase = await createClient()

  const day = formData.get('day') as string
  const time_start = formData.get('time_start') as string
  const time_end = formData.get('time_end') as string
  const activity_name = formData.get('activity_name') as string
  const location = formData.get('location') as string

  const { error } = await supabase.from('schedules').insert({
    day,
    time_start,
    time_end,
    activity_name,
    location,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/schedules')
  revalidatePath('/jadwal')
  redirect('/admin/schedules')
}

export async function deleteSchedule(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('schedules').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/schedules')
  revalidatePath('/jadwal')
}
