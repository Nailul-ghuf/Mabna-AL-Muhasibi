'use client'

import { uploadToGallery } from '../actions'
import ImageUpload from '@/components/ImageUpload'
import { useState } from 'react'
import { ArrowLeft, Save, Loader2, Instagram } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  { 
    value: 'Fasilitas Fisik', 
    label: 'Fasilitas Fisik',
    subs: ['Gedung & Kelas', 'Area Asrama', 'Fasilitas Pendukung']
  },
  { 
    value: 'Kegiatan Mahasantri', 
    label: 'Kegiatan Mahasantri',
    subs: ['Akademik', 'Ekstrakurikuler', 'Kehidupan Asrama', 'Acara Khusus']
  },
  { 
    value: 'Prestasi & Dokumentasi', 
    label: 'Prestasi & Dokumentasi',
    subs: ['Penghargaan', 'Karya Mahasantri', 'Video']
  },
]

export default function CreateGalleryPage() {
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  const currentSubs = CATEGORIES.find(c => c.value === selectedCategory)?.subs || []

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.set('image_url', imageUrl)
    
    const result = await uploadToGallery(formData)
    
    if (result?.error) {
      alert(`Error: ${result.error}`)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/gallery" 
          className="p-2 hover:bg-[var(--foreground)] rounded-full transition-colors text-[var(--text-secondary)]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] font-heading">Tambah Item Galeri</h1>
          <p className="text-sm text-[var(--text-secondary)]">Upload dokumentasi baru ke galeri</p>
        </div>
      </div>

      <div className="bg-[var(--foreground)] rounded-xl border border-[var(--border-color)] p-6 md:p-8">
        <form action={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Judul</label>
                <input 
                  type="text" name="title" required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent outline-none transition-all"
                  placeholder="Contoh: Kajian Rutin Malam Jumat"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Caption (ringkas)</label>
                <input 
                  type="text" name="caption" required
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent outline-none transition-all"
                  placeholder="Deskripsi singkat foto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Kategori</label>
                  <select 
                    name="category" required
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] outline-none"
                  >
                    <option value="">Pilih...</option>
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Sub-kategori</label>
                  <select 
                    name="sub_category"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] outline-none"
                    disabled={currentSubs.length === 0}
                  >
                    <option value="">Pilih...</option>
                    {currentSubs.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Tanggal (opsional)</label>
                <input 
                  type="date" name="event_date"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Deskripsi / Konten</label>
                <textarea 
                  name="content" rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Deskripsi detail (opsional)..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  <span className="flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-500" /> Link Instagram (opsional)</span>
                </label>
                <input 
                  type="url" name="instagram_url"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent outline-none transition-all"
                  placeholder="https://www.instagram.com/p/..."
                />
              </div>
            </div>

            {/* Right column — Photo */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Foto Dokumentasi</label>
                <ImageUpload value={imageUrl} onChange={setImageUrl} bucket="gallery-images" />
                <p className="text-xs text-[var(--text-secondary)] mt-2">
                  Format: JPG, PNG, WEBP. Maks 2MB.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-color)] flex justify-end gap-3">
            <Link href="/admin/gallery" className="btn px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--background)] transition-colors">
              Batal
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting || !imageUrl}
              className="btn btn-primary bg-[var(--accent-gold)] text-[#423512] px-8 py-3 rounded-lg font-bold hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /><span>Menyimpan...</span></>
              ) : (
                <><Save className="w-5 h-5" /><span>Simpan</span></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
