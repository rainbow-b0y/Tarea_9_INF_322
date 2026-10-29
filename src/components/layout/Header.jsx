import React from 'react'

import NavIcon from './NavIcon'
import { viewMeta } from './viewMeta'

const Header = ({ currentView, titleOverride, canGoBack, onBack, onOpenDrawer }) => {
  const meta = viewMeta[currentView] || viewMeta.dashboard

  return (
    <header className='safe-top sticky top-0 z-20 bg-navy-800 px-5 pb-4 text-white lg:hidden'>
      <div className='flex items-center justify-between gap-3'>
        {canGoBack && (
          <button
            type='button'
            aria-label='Volver a la vista anterior'
            onClick={onBack}
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
          >
            <NavIcon name='back' />
          </button>
        )}

        <div className='min-w-0 flex-1'>
          <p className='text-[11px] font-medium uppercase tracking-wide text-navy-200'>SIREB · Sistema de Reservas</p>
          <h1 className='truncate font-display text-xl font-semibold leading-tight'>{titleOverride || meta.mobileTitle}</h1>
        </div>

        <button
          type='button'
          aria-label='Abrir menú de trámites'
          onClick={onOpenDrawer}
          className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
        >
          <NavIcon name='menu' />
        </button>
      </div>
      {meta.subtitle && <p className='mt-1 text-sm text-navy-200'>{meta.subtitle}</p>}
    </header>
  )
}

export default Header
