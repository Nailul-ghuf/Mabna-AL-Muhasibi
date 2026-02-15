import { createClient } from '@/utils/supabase/server'
import EditGalleryForm from './form'
import { notFound } from 'next/navigation'

export default async function EditGalleryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()
  
  const { data: item } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!item) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-heading">Edit Item Galeri</h1>
          <p className="text-[var(--text-secondary)]">Perbarui informasi item galeri</p>
        </div>
      </div>
      
      <EditGalleryForm item={item} />
    </div>
  )
}
