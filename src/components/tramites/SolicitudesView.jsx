import React from 'react'

const StatusBadge = ({ children, variant }) => (
  <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold lg:px-2.5 lg:text-xs ${variant === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-navy-50 text-navy-700'}`}>
    {children}
  </span>
)

const SolicitudesView = ({ onOpenCae }) => (
  <section className='view mx-auto w-full max-w-6xl space-y-3 p-5 lg:space-y-5 lg:p-8'>
    <div className='hidden lg:block'>
      <h2 className='font-display text-2xl font-semibold text-navy-800'>Solicitudes / Postulaciones</h2>
      <p className='mt-1 text-gray-500'>Revisa el estado de tus solicitudes y postulaciones a beneficios.</p>
    </div>
    <p className='mb-1 text-sm text-gray-500 lg:hidden'>Revisa el estado de tus solicitudes y postulaciones a beneficios.</p>
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4'>
      <button
        type='button'
        onClick={onOpenCae}
        className='w-full rounded-2xl bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:p-5'
      >
        <span className='flex items-start justify-between gap-3'>
          <span>
            <span className='block text-sm font-semibold leading-snug text-navy-800 lg:text-base'>Solicitud Monto Asignación<br className='lg:hidden' /> Crédito Aval del Estado</span>
            <span className='mt-1 block text-xs text-gray-400'>Última actualización: 28-08-2026</span>
          </span>
          <StatusBadge variant='pending'>Pendiente</StatusBadge>
        </span>
      </button>
      <article className='w-full rounded-2xl bg-white p-4 text-left opacity-70 shadow-card lg:p-5'>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <h3 className='text-sm font-semibold leading-snug text-navy-800 lg:text-base'>Postulación Beca de Alimentación</h3>
            <p className='mt-1 text-xs text-gray-400'>Proceso 2026 cerrado</p>
          </div>
          <StatusBadge>Aprobada</StatusBadge>
        </div>
      </article>
    </div>
  </section>
)

export default SolicitudesView
