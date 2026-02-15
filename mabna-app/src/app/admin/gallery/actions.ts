'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function uploadToGallery(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const caption = formData.get('caption') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const sub_category = formData.get('sub_category') as string
  const event_date = formData.get('event_date') as string
  const instagram_url = formData.get('instagram_url') as string
  const image_url = formData.get('image_url') as string

  const { error } = await supabase.from('gallery').insert({
    title,
    caption,
    content,
    category,
    sub_category: sub_category || null,
    event_date: event_date || null,
    instagram_url: instagram_url || null,
    image_url,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/galeri')
  redirect('/admin/gallery')
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const caption = formData.get('caption') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string
  const sub_category = formData.get('sub_category') as string
  const event_date = formData.get('event_date') as string
  const instagram_url = formData.get('instagram_url') as string
  const image_url = formData.get('image_url') as string

  const { error } = await supabase
    .from('gallery')
    .update({
      title,
      caption,
      content,
      category,
      sub_category: sub_category || null,
      event_date: event_date || null,
      instagram_url: instagram_url || null,
      image_url,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/galeri')
  redirect('/admin/gallery')
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('gallery').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/galeri')
}
