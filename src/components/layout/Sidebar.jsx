import React, { useState } from 'react'

import NavIcon from './NavIcon'

const SidebarButton = ({ active, icon, children, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${active ? 'bg-white/10 text-white' : 'text-navy-100'}`}
  >
    <NavIcon name={icon} />
    <span>{children}</span>
  </button>
)

const Accordion = ({ icon, label, open, onToggle, children }) => (
  <div>
    <button
      type='button'
      aria-expanded={open}
      onClick={onToggle}
      className='flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-navy-100 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
    >
      <span className='flex items-center gap-3'>
        <NavIcon name={icon} />
        {label}
      </span>
      <NavIcon name='chevron' className={`h-4 w-4 text-navy-300 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className='space-y-1 py-1 pl-11 pr-2'>{children}</div>}
  </div>
)

const SubnavButton = ({ children, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className='w-full rounded-lg py-1.5 text-left text-sm leading-snug text-navy-200 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
  >
    {children}
  </button>
)

const Sidebar = ({ currentView, onNavigate }) => {
  const [openMenu, setOpenMenu] = useState(null)
  const toggleMenu = (menu) => setOpenMenu((current) => current === menu ? null : menu)

  return (
    <aside className='hidden h-screen w-72 shrink-0 flex-col overflow-y-auto bg-navy-800 text-white lg:flex'>
      <div className='border-b border-white/10 p-6'>
        <p className='font-display text-xl font-bold'>SIREB</p>
        <p className='mt-0.5 text-xs text-navy-200'>Sistema de Reservas · Campus Central</p>
      </div>

      <nav className='flex-1 space-y-1 p-3' aria-label='Navegación principal'>
        <SidebarButton active={currentView === 'dashboard'} icon='home' onClick={() => onNavigate('dashboard')}>
          Inicio
        </SidebarButton>

        <p className='px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-navy-300'>Agendamiento</p>
        <SidebarButton active={currentView === 'specialists' || currentView === 'calendar'} icon='calendar' onClick={() => onNavigate('specialists')}>
          Agendar Hora
        </SidebarButton>
        <SidebarButton active={currentView === 'confirmation'} icon='clock' onClick={() => onNavigate('confirmation')}>
          Mis Horas
        </SidebarButton>

        <p className='px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-navy-300'>Trámites y Beneficios</p>
        <SidebarButton active={currentView === 'socioeconomico'} icon='file' onClick={() => onNavigate('socioeconomico')}>
          Antecedentes Socioeconómicos
        </SidebarButton>

        <Accordion icon='edit' label='Declaración' open={openMenu === 'declaracion'} onToggle={() => toggleMenu('declaracion')}>
          <SubnavButton onClick={() => onNavigate('declaracion')}>Declaración de Antecedentes</SubnavButton>
          <SubnavButton onClick={() => onNavigate('declaracion')}>Declaración de Residencia</SubnavButton>
        </Accordion>

        <Accordion icon='card' label='Solicitudes/Postulaciones' open={openMenu === 'solicitudes'} onToggle={() => toggleMenu('solicitudes')}>
          <SubnavButton onClick={() => onNavigate('cae')}>Solicitud Monto Asignación Crédito Aval del Estado</SubnavButton>
          <SubnavButton onClick={() => onNavigate('solicitudes')}>Ver todas mis solicitudes</SubnavButton>
        </Accordion>

        <SidebarButton active={currentView === 'tne'} icon='id' onClick={() => onNavigate('tne')}>
          TNE
        </SidebarButton>
      </nav>

      <button
        type='button'
        onClick={() => onNavigate('perfil')}
        className={`m-3 mt-auto flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${currentView === 'perfil' ? 'bg-white/10' : 'bg-white/5'}`}
      >
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 font-display text-sm font-semibold'>JP</span>
        <span className='min-w-0'>
          <span className='block truncate text-sm font-semibold'>Joaquín Pérez</span>
          <span className='block truncate text-xs text-navy-300'>Ver perfil</span>
        </span>
      </button>
    </aside>
  )
}

export default Sidebar
