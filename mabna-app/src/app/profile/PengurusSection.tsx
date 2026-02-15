"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, User } from "lucide-react"

// Types matching database
interface Pengurus {
    id: string
    nama: string
    jabatan: string
    asal: string
    jurusan: string
    devisi: string
    foto: string
    kategori: string
}

export default function PengurusSection({ 
    pengurusUtama, 
    pengurusTambahan 
}: { 
    pengurusUtama: Pengurus[], 
    pengurusTambahan: Pengurus[] 
}) {
    const [showAllPengurus, setShowAllPengurus] = useState(false)
    const [selectedPengurus, setSelectedPengurus] = useState<Pengurus | null>(null)

    return (
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

            {pengurusTambahan.length > 0 && (
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
            )}

             {/* Modal Pengurus */}
             {selectedPengurus && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] transition-opacity duration-300"
                    onClick={() => setSelectedPengurus(null)}>
                    <div className="bg-[var(--foreground)] w-full max-w-sm md:max-w-3xl rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden transform scale-100 transition-transform duration-300 max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full md:w-1/3 h-64 md:h-auto flex-shrink-0 bg-[var(--background)]">
                            {selectedPengurus.foto ? (
                                <Image
                                    src={selectedPengurus.foto}
                                    alt={`Foto ${selectedPengurus.nama}`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                    <User className="w-16 h-16 text-[var(--text-secondary)]" />
                                </div>
                            )}
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
        </section>
    )
}

function PengurusCard({ pengurus, onClick }: { pengurus: Pengurus; onClick: () => void }) {
    return (
        <div
            className="group block text-center p-4 rounded-lg cursor-pointer bg-[var(--foreground)] border border-[var(--border-color)] transition hover:shadow-lg"
            onClick={onClick}
        >
            <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-transparent group-hover:border-[var(--accent-gold)] transition-all duration-300 shadow-lg bg-[var(--background)]">
                {pengurus.foto ? (
                     <Image
                        src={pengurus.foto}
                        alt={pengurus.nama}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                         <User className="w-16 h-16 text-[var(--text-secondary)]" />
                    </div>
                )}
            </div>
            <h3 className="font-bold text-xl">{pengurus.nama}</h3>
            <p className="text-[var(--accent-olive)] font-semibold">{pengurus.jabatan}</p>
        </div>
    )
}
