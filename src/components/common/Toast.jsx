import React, { useEffect } from 'react'

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(onClose, 2600)
    return () => window.clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  return (
    <div role='status' aria-live='polite' className='fixed inset-x-4 bottom-24 z-50 rounded-xl bg-navy-800 px-4 py-3 text-center text-sm font-medium text-white shadow-2xl lg:bottom-6 lg:left-1/2 lg:right-auto lg:w-auto lg:-translate-x-1/2 lg:px-5'>
      {message}
    </div>
  )
}

export default Toast
