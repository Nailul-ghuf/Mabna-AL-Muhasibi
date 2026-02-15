'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Calendar, X, Instagram, ExternalLink, ImageIcon } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string | null
  caption: string | null
  content: string | null
  image_url: string
  category: string
  sub_category: string | null
  event_date: string | null
  instagram_url: string | null
  created_at: string
}

const CATEGORIES = ['Semua', 'Fasilitas Fisik', 'Kegiatan Mahasantri', 'Prestasi & Dokumentasi']

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const filteredItems = items.filter((item) => {
    const matchCategory = activeCategory === 'Semua' || item.category === activeCategory
    const matchSearch =
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-black z-0">
          <Image
            src="/assets/FotoGeneral/gedungMuhasibi.jpg"
            alt="Galeri Asrama Al Muhasibi"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        <div className="relative z-20 p-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Galeri Asrama Al Muhasibi
          </h1>
          <p className="mt-4 text-md md:text-lg max-w-3xl mx-auto">
            Dokumentasi fasilitas, kegiatan, dan prestasi mahasantri.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Filter & Search */}
        <section className="mb-12" data-aos="fade-up">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Cari dokumentasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:outline-none text-[var(--text-primary)]"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                <Search className="h-5 w-5" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-sm rounded-full font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[var(--accent-gold)] text-white'
                      : 'bg-[var(--foreground)] hover:bg-[var(--border-color)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-[var(--foreground)] rounded-2xl overflow-hidden border border-[var(--border-color)] cursor-pointer hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.image_url || `https://placehold.co/800x600/212529/F8F9FA?text=${item.title || 'Galeri'}`}
                    alt={item.title || item.caption || ''}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-medium">
                    {item.category}
                  </div>
                  {/* Instagram badge */}
                  {item.instagram_url && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1.5 rounded-full">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[var(--text-primary)] line-clamp-1">
                    {item.title || item.caption}
                  </h3>
                  {item.caption && item.title && (
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mt-1">{item.caption}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-secondary)]">
                    {item.event_date ? (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    ) : (
                      <span></span>
                    )}
                    {item.sub_category && (
                      <span className="bg-[var(--accent-olive)]/10 text-[var(--accent-olive)] px-2 py-0.5 rounded-full">
                        {item.sub_category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="bg-[var(--foreground)] inline-flex p-6 rounded-full mb-6">
              <ImageIcon className="h-12 w-12 text-[var(--accent-gold)]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Belum Ada Dokumentasi</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
              Galeri akan segera diperbarui. Silakan kembali nanti.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[var(--foreground)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[var(--border-color)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 md:h-96 w-full">
              <Image
                src={selectedItem.image_url || `https://placehold.co/800x600/212529/F8F9FA?text=${selectedItem.title || 'Galeri'}`}
                alt={selectedItem.title || selectedItem.caption || ''}
                fill
                className="object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent-olive)]/10 text-[var(--accent-olive)] font-medium">
                  {selectedItem.category}
                </span>
                {selectedItem.sub_category && (
                  <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] font-medium">
                    {selectedItem.sub_category}
                  </span>
                )}
                {selectedItem.event_date && (
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(selectedItem.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {selectedItem.title || selectedItem.caption}
              </h2>
              {selectedItem.caption && selectedItem.title && (
                <p className="text-[var(--text-secondary)] mt-2 italic">{selectedItem.caption}</p>
              )}
              {selectedItem.content && (
                <p className="text-[var(--text-secondary)] mt-4 leading-relaxed whitespace-pre-line">
                  {selectedItem.content}
                </p>
              )}
              {selectedItem.instagram_url && (
                <a
                  href={selectedItem.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:brightness-110 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  Lihat di Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
