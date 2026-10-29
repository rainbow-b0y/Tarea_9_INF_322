import React from 'react'

import NavIcon from './NavIcon'
import { viewMeta } from './viewMeta'

const DesktopHeader = ({ currentView, canGoBack, onBack }) => {
  const meta = viewMeta[currentView] || viewMeta.dashboard

  return (
    <header className='hidden h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-8 lg:flex'>
      <div className='flex items-center gap-3'>
        {canGoBack && (
          <button
            type='button'
            aria-label='Volver a la vista anterior'
            onClick={onBack}
            className='flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 text-navy-700 transition hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
          >
            <NavIcon name='back' className='h-4 w-4' />
          </button>
        )}
        <h1 className='font-display text-lg font-semibold text-navy-800'>{meta.desktopTitle}</h1>
      </div>

      <div className='flex items-center gap-4'>
        <label className='flex w-64 items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5'>
          <span className='sr-only'>Buscar en SIREB</span>
          <NavIcon name='search' className='h-4 w-4 text-gray-400' />
          <input
            type='search'
            placeholder='Buscar en SIREB...'
            className='w-full bg-transparent text-sm outline-none placeholder:text-gray-400'
          />
        </label>
        <button
          type='button'
          aria-label='Ver notificaciones'
          className='relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-navy-700 transition hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
        >
          <NavIcon name='bell' />
          <span className='absolute right-2 top-1.5 h-2 w-2 rounded-full bg-orange-500' />
        </button>
        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-semibold text-white' aria-label='Usuario Joaquín Pérez'>
          JP
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
