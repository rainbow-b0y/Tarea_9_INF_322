import React from 'react'

import NavIcon from './NavIcon'

const transactionViews = ['socioeconomico', 'declaracion', 'solicitudes', 'cae', 'tne']

const BottomButton = ({ active, icon, label, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`flex w-16 flex-col items-center gap-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${active ? 'text-orange-500' : 'text-gray-400'}`}
  >
    <NavIcon name={icon} />
    <span className='text-[10px] font-semibold'>{label}</span>
  </button>
)

const BottomNav = ({ currentView, onNavigate, onOpenDrawer }) => (
  <nav className='safe-bottom fixed inset-x-0 bottom-0 z-20 flex h-[68px] items-center justify-around border-t border-gray-100 bg-white px-2 lg:hidden' aria-label='Navegación móvil'>
    <BottomButton active={currentView === 'dashboard'} icon='home' label='Inicio' onClick={() => onNavigate('dashboard')} />
    <BottomButton active={transactionViews.includes(currentView)} icon='file' label='Trámites' onClick={onOpenDrawer} />
    <BottomButton active={['specialists', 'calendar', 'confirmation'].includes(currentView)} icon='calendar' label='Mis Horas' onClick={() => onNavigate('confirmation')} />
    <BottomButton active={currentView === 'perfil'} icon='user' label='Perfil' onClick={() => onNavigate('perfil')} />
  </nav>
)

export default BottomNav
