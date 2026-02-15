"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, X } from "lucide-react"

// Data Pengurus
interface Pengurus {
    id: number
    nama: string
    jabatan: string
    asal: string
    jurusan: string
    devisi: string
    foto: string
}

const pengurusUtama: Pengurus[] = [
    // Data akan diambil dari database Supabase
]

const pengurusTambahan: Pengurus[] = [
    // Data akan diambil dari database Supabase
]

export default function ProfilePage() {
    const [showAllPengurus, setShowAllPengurus] = useState(false)
    const [selectedPengurus, setSelectedPengurus] = useState<Pengurus | null>(null)

    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* A. Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-white text-center">
                <div className="absolute inset-0 bg-black z-0">
                    <Image
                        src="/assets/FotoGeneral/gedungMuhasibi.jpg"
                        alt="Gedung Asrama Al Muhasibi"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-gold)]/20 to-transparent z-10"></div>
                <div className="relative z-20 p-4" data-aos="fade-up">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Profil Asrama Al Muhasibi
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                        Mencetak generasi Qur’ani, berilmu, dan berakhlak mulia.
                    </p>
                </div>
            </section>

            {/* Kontainer untuk sisa konten */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                {/* B. Sejarah Singkat */}
                <section id="sejarah" data-aos="fade-up">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-1">
                            <h2 className="text-3xl font-bold text-[var(--accent-olive)]">
                                Sejarah Singkat
                            </h2>
                            <div className="w-24 h-1 bg-[var(--accent-gold)] mt-2 mb-4"></div>
                        </div>
                        <div className="md:col-span-2 text-lg text-[var(--text-secondary)] space-y-4">
                            <p>
                                Mabna Al-Muhasibi merupakan salah satu unit hunian asrama yang berada
                                di bawah naungan Pusat Ma’had al-Jami’ah (MSAA) UIN Maulana Malik Ibrahim
                                Malang. Keberadaannya tidak terlepas dari pengembangan sistem
                                Ma’had al-Jami’ah yang dirancang sebagai model pendidikan terpadu antara
                                tradisi pesantren dan perguruan tinggi. Melalui Ma’had al-Jami’ah,
                                UIN Malang menempatkan asrama sebagai ruang strategis dalam membentuk
                                karakter, spiritualitas, dan kultur akademik mahasiswa secara berkelanjutan.
                            </p>
                            <p>
                                Secara operasional, Mabna Al-Muhasibi mulai difungsikan pada tahun 2019 sebagai
                                bagian dari upaya perluasan dan optimalisasi fasilitas hunian mahasantri.
                                Mabna ini hadir untuk mendukung kebutuhan pembinaan mahasiswa putra dalam
                                lingkungan yang kondusif, religius, dan terarah sesuai dengan visi Ma’had
                                al-Jami’ah. Sebagai bagian integral dari MSAA, Al-Muhasibi menjalankan
                                fungsi pembinaan yang selaras dengan kebijakan, nilai, dan standar
                                pendidikan Ma’had, dengan menekankan keseimbangan antara penguatan akhlak,
                                kedisiplinan, dan pengembangan intelektual mahasiswa.
                            </p>
                        </div>
                    </div>
                </section>

                {/* C. Visi & Misi */}
                <section id="visi-misi" className="bg-[var(--foreground)] p-8 md:p-12 rounded-2xl border border-[var(--border-color)]"
                    data-aos="fade-up">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-3">Visi</h3>
                            <p className="text-xl italic text-[var(--text-secondary)]">
                                "Menjadi Ma’had al-Jami’ah yang unggul dan modern dalam pembinaan serta pembelajaran ilmu-ilmu keislaman,
                                dengan tetap menjaga tradisi pesantren moderat dan menjunjung tinggi akhlak mulia."
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3">Misi</h3>
                            <ul className="space-y-2 list-disc list-inside text-[var(--text-secondary)]">
                                <li>
                                    Menyelenggarakan pembelajaran Al-Qur’an yang membiasakan dan menyenangkan bagi mahasantri.
                                </li>
                                <li>
                                    Melaksanakan pembelajaran ilmu-ilmu keislaman berbasis tradisi pesantren moderat.
                                </li>
                                <li>
                                    Mengembangkan minat dan bakat mahasantri di bidang keagamaan, keilmuan, dan seni.
                                </li>
                                <li>
                                    Mendorong interaksi sosial mahasantri yang berlandaskan akhlak mulia.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* D. Nilai & Motto */}
                <section id="nilai-motto" data-aos="fade-up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-[var(--foreground)] p-6 rounded-lg border border-[var(--border-color)] transition hover:shadow-lg">
                            <h4 className="text-2xl md:text-3xl font-amiri text-[var(--text-primary)] leading-relaxed">كونوا أولي الأبصار</h4>
                            <h2 className="mt-3 text-sm md:text-base italic text-[var(--text-secondary)]">(jadilah kamu orang-orang yang
                                memiliki mata hati);</h2>
                        </div>
                        <div className="bg-[var(--foreground)] p-6 rounded-lg border border-[var(--border-color)] transition hover:shadow-lg">
                            <h4 className="text-2xl md:text-3xl font-amiri text-[var(--text-primary)] leading-relaxed">كونوا أولي النهى</h4>
                            <h2 className="mt-3 text-sm md:text-base italic text-[var(--text-secondary)]">(jadilah kamu orang-orang yang
                                memiliki kecerdasan);</h2>
                        </div>
                        <div className="bg-[var(--foreground)] p-6 rounded-lg border border-[var(--border-color)] transition hover:shadow-lg">
                            <h4 className="text-2xl md:text-3xl font-amiri text-[var(--text-primary)] leading-relaxed">كونوا أولي الألباب</h4>
                            <h2 className="mt-3 text-sm md:text-base italic text-[var(--text-secondary)]">(jadilah kamu orang-orang yang
                                memiliki akal);</h2>
                        </div>
                        <div className="bg-[var(--foreground)] p-6 rounded-lg border border-[var(--border-color)] transition hover:shadow-lg">
                            <h4 className="text-2xl md:text-3xl font-amiri text-[var(--text-primary)] leading-relaxed">وجاهدوا في الله حق جهاده</h4>
                            <h2 className="mt-3 text-sm md:text-base italic text-[var(--text-secondary)]">(dan berjuanglah untuk membela
                                agama Allah dengan kesungguhan).</h2>
                        </div>
                    </div>
                    <blockquote className="mt-8 text-center text-2xl italic text-[var(--text-secondary)]">
                        "Ilmu Diamalkan, Amal Dibimbing Ilmu"
                    </blockquote>
                </section>

                {/* Jargon */}
                <section id="jargon" data-aos="fade-up">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[var(--accent-olive)]">
                            Jargon Al Muhasibi
                        </h2>
                        <p className="mt-2 text-lg text-[var(--text-secondary)]">
                            Muhasibian 🗣
                        </p>
                        <p className="mt-2 text-lg text-[var(--text-secondary)]">
                            "Keep Spirit, and Think Positive... Haa anadza"
                        </p>
                    </div>
                </section>

                {/* E. Struktur Kepengurusan */}
                <section id="pengurus" data-aos="fade-up">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[var(--accent-olive)]">
                            Kepengurusan
                        </h2>
                        <p className="mt-2 text-lg text-[var(--text-secondary)]">
                            Periode 2025 - 2026 (Angkatan 56)
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pengurusUtama.map((p) => (
                            <PengurusCard key={p.id} pengurus={p} onClick={() => setSelectedPengurus(p)} />
                        ))}
                    </div>

                    {showAllPengurus && (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-300">
                            {pengurusTambahan.map((p) => (
                                <PengurusCard key={p.id} pengurus={p} onClick={() => setSelectedPengurus(p)} />
                            ))}
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <button
                            id="tombol-selengkapnya"
                            className="btn btn-primary inline-flex items-center gap-2 bg-[var(--accent-olive)] text-white px-6 py-3 rounded-full hover:bg-[var(--accent-olive)]/90 transition-colors"
                            onClick={() => setShowAllPengurus(!showAllPengurus)}
                        >
                            <span>{showAllPengurus ? "Tampilkan Lebih Sedikit" : "Selengkapnya"}</span>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAllPengurus ? "rotate-180" : ""}`} />
                        </button>
                    </div>
                </section>

                {/* F. Fasilitas Asrama */}
                <section id="fasilitas" data-aos="fade-up">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[var(--accent-olive)]">
                            Fasilitas Asrama
                        </h2>
                        <p className="mt-2 text-lg text-[var(--text-secondary)]">
                            Menunjang kenyamanan belajar dan beribadah.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FasilitasCard
                            title="Masjid & Ruang Ibadah"
                            image="https://placehold.co/600x400/a3a3a3/ffffff?text=Masjid"
                            href="#"
                        />
                        <FasilitasCard
                            title="Kamar Tidur Nyaman"
                            image="https://placehold.co/600x400/a3a3a3/ffffff?text=Kamar"
                            href="#"
                        />
                        <FasilitasCard
                            title="Aula & Ruang Kegiatan"
                            image="https://placehold.co/600x400/a3a3a3/ffffff?text=Aula"
                            href="#"
                        />
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center" data-aos="fade-up">
                    <h2 className="text-2xl font-bold">Jelajahi Lebih Lanjut</h2>

                    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/kegiatan" className="btn bg-[var(--accent-olive)] text-white px-6 py-3 rounded-lg hover:bg-[var(--accent-olive)]/90 transition">
                            Lihat Kegiatan Kami
                        </Link>
                        <Link href="/jadwal" className="btn bg-[var(--accent-olive)] text-white px-6 py-3 rounded-lg hover:bg-[var(--accent-olive)]/90 transition">
                            Cek Jadwal Harian
                        </Link>
                    </div>
                </section>
            </div>

            {/* Modal Pengurus */}
            {selectedPengurus && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] transition-opacity duration-300"
                    onClick={() => setSelectedPengurus(null)}>
                    <div className="bg-[var(--foreground)] w-full max-w-sm md:max-w-3xl rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden transform scale-100 transition-transform duration-300 max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full md:w-1/3 h-64 md:h-auto flex-shrink-0 bg-[var(--background)]">
                            <Image
                                src={selectedPengurus.foto}
                                alt={`Foto ${selectedPengurus.nama}`}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-6 md:p-8 flex flex-col overflow-y-auto flex-1">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold font-heading text-[var(--text-primary)]">
                                    {selectedPengurus.nama}
                                </h2>
                                <p className="text-lg text-[var(--accent-olive)]">{selectedPengurus.jabatan}</p>
                            </div>
                            <div className="mt-6 border-t border-[var(--border-color)] pt-6 text-[var(--text-secondary)] space-y-3">
                                <p>
                                    <strong>Asal:</strong> <span className="ml-2">{selectedPengurus.asal}</span>
                                </p>
                                <p>
                                    <strong>Jurusan:</strong> <span className="ml-2">{selectedPengurus.jurusan}</span>
                                </p>
                                <p>
                                    <strong>Devisi:</strong> <span className="ml-2">{selectedPengurus.devisi}</span>
                                </p>
                            </div>
                            <div className="mt-auto pt-6 text-right">
                                <button
                                    onClick={() => setSelectedPengurus(null)}
                                    className="bg-[var(--accent-olive)] text-white px-4 py-2 rounded hover:bg-[var(--accent-olive)]/90 transition"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function PengurusCard({ pengurus, onClick }: { pengurus: Pengurus; onClick: () => void }) {
    return (
        <div
            className="group block text-center p-4 rounded-lg cursor-pointer bg-[var(--foreground)] border border-[var(--border-color)] transition hover:shadow-lg"
            onClick={onClick}
        >
            <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[var(--accent-gold)] transition-all duration-300 shadow-lg">
                <Image
                    src={pengurus.foto}
                    alt={pengurus.nama}
                    fill
                    className="object-cover"
                />
            </div>
            <h3 className="font-bold text-xl">{pengurus.nama}</h3>
            <p className="text-[var(--accent-olive)] font-semibold">{pengurus.jabatan}</p>
        </div>
    )
}

function FasilitasCard({ title, image, href }: { title: string; image: string; href: string }) {
    return (
        <Link href={href} className="group relative block overflow-hidden rounded-lg aspect-video">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <h4 className="absolute bottom-4 left-4 text-white font-bold text-lg">
                {title}
            </h4>
        </Link>
    )
}
