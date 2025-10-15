
import { useCallback, useState, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileDropZoneProps {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: string[]
  maxSize?: number // in bytes
  existingFiles?: File[]
}

const FileDropZone = ({ 
  onFilesChange, 
  maxFiles = 3, 
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 5 * 1024 * 1024, // 5MB
  existingFiles = []
}: FileDropZoneProps) => {
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
        setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`)
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload images only.')
      } else {
        setError('File upload failed. Please try again.')
      }
      return
    }

    // Get current files from ref to avoid stale closures
    const currentFiles = currentFilesRef.current
    const currentFileCount = currentFiles.length

    // Guard: Prevent adding files if we're already at max capacity
    if (currentFileCount >= maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. Please remove some files first.`)
      return
    }

    // Guard: Calculate how many files we can actually add
    const availableSlots = maxFiles - currentFileCount
    const filesToAdd = acceptedFiles.slice(0, availableSlots)
    
    if (filesToAdd.length < acceptedFiles.length) {
      setError(`Only ${filesToAdd.length} of ${acceptedFiles.length} files were added. Maximum ${maxFiles} files allowed.`)
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

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: true,
    noClick: false,
    noKeyboard: false
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

  return (
    <div className="flex flex-col gap-4">
      {/* STYLING AREA 1: Drop Zone Container */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${isDragActive && !isDragReject 
            ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isDragReject 
            ? 'border-red-400 bg-red-50 dark:bg-red-900/20' 
            : ''
          }
          glassy
        `}
      >
        <input {...getInputProps()} />
        
        {/* STYLING AREA 2: Drop Zone Content */}
        <div className="flex flex-col items-center gap-3">
          {isDragActive ? (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-orange-500"></i>
              <p className="text-lg font-medium text-orange-600 dark:text-orange-400">
                Drop your images here...
              </p>
            </>
          ) : (
            <>
              <i className="fa-solid fa-camera text-3xl text-gray-400"></i>
              <div>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  Drag & drop images here, or click to select
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {acceptedFileTypes.join(', ').toUpperCase()} • Max {maxFiles} files • {maxSize / (1024 * 1024)}MB each
                </p>
              </div>
            </>
          )}
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

      {/* STYLING AREA 4: Preview Grid */}
      {existingFiles.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected Images ({existingFiles.length}/{maxFiles})
          </h4>
          
          {/* STYLING AREA 5: Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {existingFiles.map((file, index) => (
              <div key={`${file.name}-${file.size}-${index}`} className="relative group">
                {/* STYLING AREA 6: Individual Image Cards */}
                <div className="relative aspect-square size-16 md:size-32 bg-gray-100/10 dark:bg-gray-800/10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
                      className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 size-6 md:size-8 transition-all duration-200 transform scale-75 group-hover:scale-100"
                      aria-label={`Remove ${file.name}`}
                    >
                      <i className="fa-solid fa-trash text-sm"></i>
                    </button>
                  </div>
                </div>
                
                {/* STYLING AREA 8: File Name */}
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate" title={file.name}>
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileDropZone