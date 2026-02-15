'use client'

import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export default function DeleteButton({ action, label = 'Hapus' }: { action: () => Promise<any>, label?: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={isPending}
      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer disabled:opacity-50"
      title={label}
      onClick={() => {
        if (confirm(`${label}?`)) {
          startTransition(() => action())
        }
      }}
    >
      <Trash2 className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
    </button>
  )
}
