'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Image as ImageIcon, Settings, LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Jadwal', href: '/admin/schedules', icon: Calendar },
  { name: 'Galeri', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Profil', href: '/admin/profile', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[var(--foreground)] border-r border-[var(--border-color)] flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-[var(--border-color)]">
        <h1 className="text-xl font-bold text-[var(--accent-olive)] font-heading">
          Admin Panel
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">Mabna Al-Muhasibi</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[var(--accent-olive)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--accent-olive)]/10 hover:text-[var(--accent-olive)]'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border-color)]">
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
