'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPengurus(formData: FormData) {
  const supabase = await createClient()

  const nama = formData.get('nama') as string
  const jabatan = formData.get('jabatan') as string
  const asal = formData.get('asal') as string
  const jurusan = formData.get('jurusan') as string
  const devisi = formData.get('devisi') as string
  const foto = formData.get('foto') as string
  const kategori = formData.get('kategori') as string || 'TAMBAHAN'

  const { error } = await supabase.from('pengurus').insert({
    nama,
    jabatan,
    asal,
    jurusan,
    devisi,
    foto,
    kategori
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/profile')
  revalidatePath('/profile')
  redirect('/admin/profile')
}

export async function deletePengurus(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('pengurus').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/profile')
  revalidatePath('/profile')
}
