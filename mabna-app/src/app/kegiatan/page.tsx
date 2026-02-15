"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Calendar, MapPin } from "lucide-react"

// Tipe data Kegiatan
interface Kegiatan {
    id: number
    title: string
    category: string
    description: string
    date: string
    location: string
    image: string
}

// Data kosong — nanti diambil dari Supabase
const kegiatanData: Kegiatan[] = [
    // Data akan diambil dari database Supabase
]

// Kategori filter
const categories = ["Semua", "Kajian Ilmiah", "Tahsin & Tahfidz", "Pengabdian", "Lainnya"]

export default function KegiatanPage() {
    const [activeCategory, setActiveCategory] = useState("Semua")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredKegiatan = kegiatanData.filter((k) => {
        const matchCategory = activeCategory === "Semua" || k.category === activeCategory
        const matchSearch = k.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            k.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCategory && matchSearch
    })

    return (
        <div className="flex flex-col">
            {/* A. Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center text-white text-center">
                <div className="absolute inset-0 bg-black z-0">
                    <Image
                        src="/assets/FotoGeneral/gedungMuhasibi.jpg"
                        alt="Suasana Kegiatan Asrama"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <div className="relative z-20 p-4" data-aos="fade-up">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Kegiatan Asrama Al Muhasibi
                    </h1>
                    <p className="mt-4 text-md md:text-lg max-w-3xl mx-auto">
                        Mengembangkan pribadi yang berilmu, berakhlak, dan bermanfaat
                        melalui beragam kegiatan pembinaan, keilmuan, dan pengabdian.
                    </p>
                </div>
            </section>

            {/* Kontainer Konten */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                {/* B. Filter & Search */}
                <section id="filter-kegiatan" className="mb-12" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Cari kegiatan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent-gold)] focus:outline-none text-[var(--text-primary)]"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                                <Search className="h-5 w-5" />
                            </div>
                        </div>
                        {/* Tombol Filter */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 text-sm rounded-full font-semibold transition-colors ${activeCategory === cat
                                        ? "bg-[var(--accent-gold)] text-white"
                                        : "bg-[var(--foreground)] hover:bg-[var(--border-color)]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* C. Daftar Kegiatan */}
                <section id="daftar-kegiatan">
                    {filteredKegiatan.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredKegiatan.map((kegiatan, index) => (
                                <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} delay={index * 100} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20" data-aos="fade-up">
                            <div className="bg-[var(--foreground)] inline-flex p-6 rounded-full mb-6">
                                <Calendar className="h-12 w-12 text-[var(--accent-gold)]" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Belum Ada Kegiatan</h3>
                            <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                                Data kegiatan akan segera ditampilkan setelah terhubung dengan database.
                                Silakan kembali nanti untuk melihat pembaruan.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

function KegiatanCard({ kegiatan, delay }: { kegiatan: Kegiatan; delay: number }) {
    return (
        <div
            className="card-program bg-[var(--foreground)] rounded-2xl overflow-hidden border border-[var(--border-color)] flex flex-col"
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            <Link href="#" className="block overflow-hidden">
                <div className="relative h-48 w-full">
                    <Image
                        src={kegiatan.image}
                        alt={kegiatan.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                </div>
            </Link>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-[var(--accent-gold)] font-semibold">
                    {kegiatan.category}
                </p>
                <h3 className="text-xl font-bold mt-2 mb-3">
                    {kegiatan.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow">
                    {kegiatan.description}
                </p>
                <div className="mt-4 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] space-y-1">
                    <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <strong>Tanggal:</strong> {kegiatan.date}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <strong>Lokasi:</strong> {kegiatan.location}
                    </p>
                </div>
                <Link href="#" className="mt-4 text-center btn btn-primary w-full">
                    Selengkapnya
                </Link>
            </div>
        </div>
    )
}
