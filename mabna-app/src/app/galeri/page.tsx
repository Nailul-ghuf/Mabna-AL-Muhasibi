import { createClient } from '@/utils/supabase/server'
import GalleryClient from './GalleryClient'

export const revalidate = 60

export default async function GaleriPage() {
  const supabase = await createClient()

  const { data: items } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  return <GalleryClient items={items || []} />
}
