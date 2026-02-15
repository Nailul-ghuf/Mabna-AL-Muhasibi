import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, User } from 'lucide-react'
import Image from 'next/image'
import DeleteButton from '@/components/DeleteButton'
import { deletePengurus } from './actions'

export default async function ProfileAdminPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch pengurus data
    const { data: pengurusList } = await supabase
        .from('pengurus')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] font-heading">Kelola Profil Pengurus</h1>
                    <p className="text-[var(--text-secondary)]">Manajemen data pengurus asrama</p>
                </div>
                <Link
                    href="/admin/profile/create"
                    className="btn btn-primary inline-flex items-center gap-2 bg-[var(--accent-gold)] text-[#423512] px-4 py-2 rounded-lg font-medium hover:brightness-110 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Pengurus</span>
                </Link>
            </div>

            <div className="bg-[var(--foreground)] rounded-xl border border-[var(--border-color)] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[var(--background)] border-b border-[var(--border-color)]">
                        <tr>
                            <th className="p-4 font-medium text-[var(--text-secondary)] w-20">Foto</th>
                            <th className="p-4 font-medium text-[var(--text-secondary)]">Nama & Jabatan</th>
                            <th className="p-4 font-medium text-[var(--text-secondary)]">Detail</th>
                            <th className="p-4 font-medium text-[var(--text-secondary)] w-32 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {pengurusList?.map((p) => (
                            <tr key={p.id} className="hover:bg-[var(--background)]/50 transition-colors">
                                <td className="p-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--background)] border border-[var(--border-color)]">
                                        {p.foto ? (
                                            <Image
                                                src={p.foto}
                                                alt={p.nama}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <User className="w-6 h-6 text-[var(--text-secondary)]" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <h3 className="font-semibold text-[var(--text-primary)]">{p.nama}</h3>
                                    <p className="text-sm text-[var(--accent-olive)]">{p.jabatan}</p>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-secondary)] mt-1 inline-block">
                                        {p.kategori}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-[var(--text-secondary)]">
                                    <p>Asal: {p.asal}</p>
                                    <p>Jurusan: {p.jurusan}</p>
                                    <p>Devisi: {p.devisi}</p>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <DeleteButton action={deletePengurus.bind(null, p.id)} label="Hapus pengurus ini" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                         {(!pengurusList || pengurusList.length === 0) && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-[var(--text-secondary)]">
                                    Belum ada data pengurus.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
