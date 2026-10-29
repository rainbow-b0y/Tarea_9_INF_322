import React, { useEffect, useState } from 'react'

import NavIcon from './NavIcon'

const DrawerAccordion = ({ icon, label, open, onToggle, children }) => (
  <div className='overflow-hidden rounded-xl'>
    <button
      type='button'
      aria-expanded={open}
      onClick={onToggle}
      className='flex w-full items-center justify-between p-3 text-left transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
    >
      <span className='flex items-center gap-3'>
        <NavIcon name={icon} className='h-5 w-5 text-orange-500' />
        <span className='text-sm font-semibold text-navy-800'>{label}</span>
      </span>
      <NavIcon name='chevron' className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className='space-y-1 pb-2 pl-11 pr-3'>{children}</div>}
  </div>
)

const DrawerLink = ({ active, icon, label, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${active ? 'bg-orange-50' : ''}`}
  >
    <NavIcon name={icon} className='h-5 w-5 text-orange-500' />
    <span className='text-sm font-semibold text-navy-800'>{label}</span>
  </button>
)

const DrawerSubLink = ({ children, onClick }) => (
  <button type='button' onClick={onClick} className='w-full rounded-lg py-2 text-left text-sm text-gray-600 transition hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'>
    {children}
  </button>
)

const Drawer = ({ isOpen, currentView, onClose, onNavigate }) => {
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const goTo = (view) => {
    onNavigate(view)
    onClose()
  }

  return (
    <>
      <button
        type='button'
        aria-label='Cerrar menú'
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-navy-900/50 transition-opacity lg:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside
        aria-hidden={!isOpen}
        aria-label='Menú de trámites'
        className={`fixed right-0 top-0 z-40 h-full w-[82%] max-w-xs overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className='flex items-center justify-between bg-navy-800 p-5 text-white'>
          <p className='font-display text-lg font-semibold'>Trámites</p>
          <button type='button' aria-label='Cerrar menú' onClick={onClose} className='flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'>
            <NavIcon name='close' className='h-4 w-4' />
          </button>
        </div>

        <nav className='space-y-2 p-4' aria-label='Navegación de trámites'>
          <DrawerLink active={currentView === 'dashboard'} icon='home' label='Inicio' onClick={() => goTo('dashboard')} />
          <DrawerLink active={currentView === 'socioeconomico'} icon='file' label='Antecedentes Socioeconómicos' onClick={() => goTo('socioeconomico')} />

          <DrawerAccordion icon='edit' label='Declaración' open={openMenu === 'declaracion'} onToggle={() => setOpenMenu(openMenu === 'declaracion' ? null : 'declaracion')}>
            <DrawerSubLink onClick={() => goTo('declaracion')}>Declaración de Antecedentes</DrawerSubLink>
            <DrawerSubLink onClick={() => goTo('declaracion')}>Declaración de Residencia</DrawerSubLink>
          </DrawerAccordion>

          <DrawerAccordion icon='card' label='Solicitudes/Postulaciones' open={openMenu === 'solicitudes'} onToggle={() => setOpenMenu(openMenu === 'solicitudes' ? null : 'solicitudes')}>
            <DrawerSubLink onClick={() => goTo('cae')}>Solicitud Monto Asignación Crédito Aval del Estado</DrawerSubLink>
            <DrawerSubLink onClick={() => goTo('solicitudes')}>Ver todas mis solicitudes</DrawerSubLink>
          </DrawerAccordion>

          <DrawerLink active={currentView === 'tne'} icon='id' label='TNE: primer año y cursos superiores' onClick={() => goTo('tne')} />
          <div className='my-2 h-px bg-gray-100' />
          <DrawerLink active={currentView === 'perfil'} icon='user' label='Mi Perfil' onClick={() => goTo('perfil')} />
        </nav>
      </aside>
    </>
  )
}

export default Drawer
