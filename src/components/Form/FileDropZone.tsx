
import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'

interface FileDropZoneProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: string[]
  maxSize?: number // in bytes
  existingFiles?: File[]
}

const FileDropZone = React.memo(({
  onFilesChange,
  maxFiles = 3,
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 5 * 1024 * 1024, // 5MB
  existingFiles = []
}: FileDropZoneProps) => {
  const { t } = useTranslation()
  const [error, setError] = useState<string | null>(null)
  const currentFilesRef = useRef<File[]>(existingFiles)

  // Keep the ref in sync with the prop
  useEffect(() => {
    currentFilesRef.current = existingFiles
  }, [existingFiles])

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Clear previous errors
    setError(null)

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(`${t('file_upload.file_too_large')} ${maxSize / (1024 * 1024)}${t('file_upload.mb_each')}`)
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError(t('file_upload.invalid_file_type'))
      } else {
        setError(t('file_upload.upload_failed'))
      }
      return
    }

    // Get current files from ref to avoid stale closures
    const currentFiles = currentFilesRef.current
    const currentFileCount = currentFiles.length

    // Guard: Prevent adding files if we're already at max capacity
    if (currentFileCount >= maxFiles) {
      setError(`${t('file_upload.max_files')} ${maxFiles} ${t('file_upload.max_files_allowed')}`)
      return
    }

    // Guard: Calculate how many files we can actually add
    const availableSlots = maxFiles - currentFileCount
    const filesToAdd = acceptedFiles.slice(0, availableSlots)

    if (filesToAdd.length < acceptedFiles.length) {
      setError(`${filesToAdd.length} ${t('file_upload.files_added')} ${t('file_upload.max_files')} ${maxFiles} ${t('file_upload.max_files_allowed')}`)
    }

    // Guard: Only add files if we have slots available
    if (filesToAdd.length > 0) {
      // Create a new array with existing files + new files
      const allFiles = [...currentFiles, ...filesToAdd]

      // Final guard: Ensure we never exceed maxFiles
      const finalFiles = allFiles.slice(0, maxFiles)

      // Debug logging
      console.log('FileDropZone - Adding files:', {
        currentFileCount,
        acceptedFiles: acceptedFiles.length,
        filesToAdd: filesToAdd.length,
        finalFiles: finalFiles.length,
        maxFiles
      })

      onFilesChange(finalFiles)
    }
  }, [onFilesChange, maxFiles, maxSize]) // Removed existingFiles from dependencies

  // Check if all slots are filled
  const isFull = existingFiles.length >= maxFiles

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: true,
    noClick: isFull, // Disable click when full
    noKeyboard: isFull, // Disable keyboard when full
    disabled: isFull // Disable dropzone when full
  })

  const removeFile = useCallback((index: number) => {
    // Get current files from ref to avoid stale closures
    const currentFiles = currentFilesRef.current

    // Guard: Ensure index is valid
    if (index < 0 || index >= currentFiles.length) {
      console.warn('Invalid file index for removal:', index)
      return
    }

    // Create new array without the file at the specified index
    const newFiles = currentFiles.filter((_, i) => i !== index)

    // Guard: Ensure we don't end up with negative length
    const finalFiles = newFiles.length >= 0 ? newFiles : []

    console.log('FileDropZone - Removing file:', {
      index,
      currentFiles: currentFiles.length,
      finalFiles: finalFiles.length
    })

    onFilesChange(finalFiles)
    setError(null)
  }, [onFilesChange]) // Removed existingFiles from dependencies

  // Memoize the preview section to prevent unnecessary re-renders
  const previewSection = useMemo(() => {
    if (existingFiles.length === 0) return null

    return (
      <div className="flex flex-col gap-3">
        <h4 className="text-sm ">
          {t('file_upload.selected_images')} ({existingFiles.length}/{maxFiles})
        </h4>

        {/* STYLING AREA 5: Image Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          {existingFiles.map((file, index) => (
            <div key={`${file.name}-${file.size}-${index}`} className="relative group">
              {/* STYLING AREA 6: Individual Image Cards */}
              <div className="relative aspect-square size-16 bg-gray-100/10 dark:bg-gray-800/10 rounded-lg overflow-hidden">
                {/* Image Preview */}
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="size-full object-cover"
                />

                {/* STYLING AREA 7: Remove Button Overlay */}
                <div className="absolute inset-0 bg-black/30 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="bg-pink-500/30 hover:bg-pink-600/60 text-white p-2 size-full transition-all cursor-pointer"
                    aria-label={`${t('accessibility.remove_file')} ${file.name}`}
                  >
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }, [existingFiles, maxFiles, removeFile])

  return (
    <div className="flex flex-col gap-4">
      {/* STYLING AREA 1: Drop Zone Container */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center glassy clickable
          ${isFull
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 cursor-default'
            : isDragActive && !isDragReject
            ? 'border-emerald-600 bg-orange-50 dark:bg-orange-900/20 cursor-pointer'
            : 'border-gray-300 hover:border-gray-400 cursor-pointer'
          }
          ${isDragReject
            ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
            : ''
          }
         
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">

          {/* STYLING AREA 2: Drop Zone Content */}
          <div className="flex flex-col items-center gap-3">
            {isFull ? (
              <>
                <i className="fa-solid fa-circle-check text-4xl text-emerald-600"></i>
                <div>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {t('file_upload.all_done')}
                  </p>
                  <p className="text-sm text-green-500 dark:text-green-400">
                    {maxFiles} {t('file_upload.images_uploaded')}
                  </p>
                </div>
              </>
            ) : isDragActive ? (
              <>
                <i className="fa-solid fa-cloud-arrow-up text-3xl text-emerald-600"></i>
                <p className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
                  {t('file_upload.drop_images')}
                </p>
              </>
            ) : (
              <>
                <i className="fa-solid fa-camera text-4xl"></i>
                <div>
                  <p className="text-lg font-bold">
                    {t('file_upload.upload_images')}
                  </p>
                  <p className="text-sm">
                    {t('file_upload.max_files')} {maxFiles} {t('file_upload.files_added')} • {maxSize / (1024 * 1024)}{t('file_upload.mb_each')}
                  </p>
                </div>
              </>
            )}
          </div>



          {/* STYLING AREA 4: Preview Grid */}
          {previewSection}
        </div>

      </div>

      {/* STYLING AREA 3: Error Messages */}
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <i className="fa-solid fa-exclamation-triangle"></i>
            {error}
          </p>
        </div>
      )}


    </div>
  )
})

FileDropZone.displayName = 'FileDropZone'

export default FileDropZone