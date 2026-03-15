'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxFiles?: number
}

export default function ImageUploader({ value, onChange, maxFiles = 10 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error ?? 'Upload failed')
    }
    const data = await res.json()
    return data.url
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (value.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`)
      return
    }

    setUploading(true)
    try {
      const uploadPromises = acceptedFiles.map(uploadFile)
      const urls = await Promise.all(uploadPromises)
      onChange([...value, ...urls])
      toast.success(`${urls.length} image${urls.length > 1 ? 's' : ''} uploaded`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      toast.error(message)
    } finally {
      setUploading(false)
    }
  }, [value, onChange, maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    disabled: uploading || value.length >= maxFiles,
  })

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
          isDragActive
            ? 'border-brand-coral bg-brand-coral/10'
            : 'border-white/20 hover:border-white/40 hover:bg-white/5',
          (uploading || value.length >= maxFiles) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="text-brand-coral animate-spin" />
            <p className="font-body text-white/60 text-sm">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
              <Upload size={24} className="text-white/40" />
            </div>
            <div>
              <p className="font-body text-white/80 font-medium">
                {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
              </p>
              <p className="font-body text-white/40 text-sm mt-1">
                or click to browse · JPG, PNG, WebP · max 10MB each
              </p>
              <p className="font-body text-white/30 text-xs mt-1">
                {value.length}/{maxFiles} images
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((url, index) => (
            <div
              key={url}
              className={cn(
                'relative aspect-video rounded-xl overflow-hidden group',
                index === 0 && 'col-span-2 row-span-2'
              )}
            >
              <Image
                src={url}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* Cover badge on first image */}
              {index === 0 && (
                <span className="absolute top-2 left-2 badge badge-coral text-xs">
                  Cover photo
                </span>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60
                           flex items-center justify-center opacity-0 group-hover:opacity-100
                           transition-opacity hover:bg-red-600"
              >
                <X size={13} className="text-white" />
              </button>
            </div>
          ))}

          {/* Add more placeholder */}
          {value.length < maxFiles && (
            <div
              {...getRootProps()}
              className="aspect-video rounded-xl border-2 border-dashed border-white/20
                         flex items-center justify-center cursor-pointer
                         hover:border-brand-coral hover:bg-brand-coral/5 transition-all"
            >
              <input {...getInputProps()} />
              <ImageIcon size={20} className="text-white/30" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
