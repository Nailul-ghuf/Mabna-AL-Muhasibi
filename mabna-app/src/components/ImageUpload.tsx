'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { Image as ImageIcon, Loader2, X } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  bucket?: string
}

export default function ImageUpload({ value, onChange, disabled, bucket = 'gallery-images' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true)
      setError(null)
      const file = e.target.files?.[0]
      
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Upload to specified bucket
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      onChange(data.publicUrl)
    } catch (err: any) {
      console.error('Upload failed:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-center w-full">
        {value ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[var(--border-color)] group">
            <Image 
              src={value} 
              alt="Uploaded image" 
              fill 
              className="object-cover"
            />
            <button
              onClick={handleRemove}
              disabled={disabled}
              type="button"
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className={`
            flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-[var(--background)] hover:bg-[var(--foreground)] transition-colors
            ${error ? 'border-red-500' : 'border-[var(--border-color)]'}
          `}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <Loader2 className="w-10 h-10 mb-3 text-[var(--accent-olive)] animate-spin" />
              ) : (
                <ImageIcon className="w-10 h-10 mb-3 text-[var(--text-secondary)]" />
              )}
              <p className="mb-2 text-sm text-[var(--text-secondary)]">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[var(--text-secondary)]">SVG, PNG, JPG or GIF</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleUpload}
              disabled={disabled || isUploading}
            />
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
