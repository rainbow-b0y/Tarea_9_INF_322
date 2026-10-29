import React, { useEffect, useRef } from 'react'

const CancelModal = ({ isOpen, onCancel, onClose }) => {
  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    cancelButtonRef.current?.focus()
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-navy-900/50 px-6'
      role='presentation'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div role='dialog' aria-modal='true' aria-labelledby='cancel-title' aria-describedby='cancel-description' className='w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-2xl lg:max-w-sm lg:p-6'>
        <p className='mb-3 text-3xl' aria-hidden='true'>⚠️</p>
        <h2 id='cancel-title' className='mb-1 font-display font-semibold text-navy-800 lg:text-lg'>¿Anular esta hora?</h2>
        <p id='cancel-description' className='mb-5 text-sm text-gray-500'>Esta acción liberará el cupo y no podrás deshacerla.</p>
        <div className='flex gap-2 lg:gap-3'>
          <button
            type='button'
            ref={cancelButtonRef}
            onClick={onClose}
            className='flex-1 rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
          >
            Volver
          </button>
          <button
            type='button'
            onClick={onCancel}
            className='flex-1 rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'
          >
            Sí, anular
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelModal
