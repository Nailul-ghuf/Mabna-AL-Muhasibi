import { login } from './actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative">
            <div className="absolute top-8 left-8">
                <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-olive)] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Kembali ke Beranda</span>
                </Link>
            </div>

            <div className="w-full max-w-md bg-[var(--foreground)] rounded-xl shadow-lg p-8 border border-[var(--border-color)]">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold font-heading text-[var(--accent-olive)]">Login Admin</h1>
                    <p className="text-[var(--text-secondary)] mt-2">Masuk ke dasbor pengelola</p>
                </div>

                <form action={login} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent transition-all"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-olive)] focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--accent-gold)] text-[#423512] font-bold py-3 px-6 rounded-lg text-center cursor-pointer no-underline border-2 border-transparent transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1"
                    >
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    )
}
