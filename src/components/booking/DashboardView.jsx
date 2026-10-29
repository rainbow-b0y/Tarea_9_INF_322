import React from 'react'

import { serviceList } from '../../data/servicesData'

const transactionLinks = [
  { id: 'socioeconomico', icon: '📋', label: 'Antecedentes Socioeconómicos' },
  { id: 'declaracion', icon: '✍️', label: 'Declaración' },
  { id: 'solicitudes', icon: '💳', label: 'Solicitudes / Postulaciones' },
  { id: 'tne', icon: '🪪', label: 'TNE' }
]

const DashboardView = ({ appointment, onNavigate, onRequestCancel, onSelectService }) => (
  <section className='view mx-auto w-full max-w-6xl space-y-6 p-5 lg:space-y-8 lg:p-8'>
    <div className='hidden lg:block'>
      <h2 className='font-display text-2xl font-semibold text-navy-800'>Hola, Joaquín 👋</h2>
      <p className='mt-1 text-gray-500'>¿Qué necesitas agendar hoy?</p>
    </div>

    <button
      type='button'
      onClick={() => onSelectService('psicologia')}
      className='relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-left shadow-card transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 lg:flex lg:items-center lg:justify-between lg:bg-gradient-to-r lg:p-8'
    >
      <span className='relative z-10 block lg:max-w-lg'>
        <span className='mb-2 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white lg:mb-3 lg:px-2.5 lg:py-1 lg:text-xs'>Alta demanda esta semana</span>
        <span className='block font-display text-lg font-semibold leading-snug text-white lg:text-2xl'>Atención Psicológica</span>
        <span className='mt-1 block pr-14 text-sm text-orange-50 lg:mt-2 lg:pr-0 lg:text-base'>Priorizamos horas para estudiantes en período de estrés académico. Agenda con atención inmediata.</span>
        <span className='mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white lg:mt-4 lg:gap-2 lg:rounded-xl lg:bg-white/15 lg:px-4 lg:py-2 lg:text-base'>
          Agendar ahora
          <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m9 18 6-6-6-6' />
          </svg>
        </span>
      </span>
      <span className='absolute -bottom-3 -right-3 text-6xl opacity-25 lg:static lg:relative lg:z-0 lg:text-9xl lg:opacity-20' aria-hidden='true'>🧠</span>
    </button>

    <div id='servicios-section'>
      <h3 className='mb-3 font-display text-base font-semibold text-navy-800 lg:mb-4 lg:text-lg'>Servicios disponibles</h3>
      <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
        {serviceList.map((service) => (
          <button
            type='button'
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className='rounded-2xl bg-white p-4 text-left shadow-card transition active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:p-5 lg:hover:-translate-y-0.5'
          >
            <span className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-xl lg:mb-4 lg:h-11 lg:w-11 lg:text-2xl' aria-hidden='true'>{service.icon}</span>
            <span className='block text-sm font-semibold text-navy-800 lg:text-base'>{service.cardTitle}</span>
            <span className='mt-0.5 block text-xs text-gray-500 lg:mt-1'>{service.description}</span>
          </button>
        ))}
      </div>
    </div>

    <div className='grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-6'>
      <div id='mis-horas' className='scroll-mt-24 lg:col-span-2 lg:scroll-mt-4'>
        <h3 className='mb-3 font-display text-base font-semibold text-navy-800 lg:mb-4 lg:text-lg'>Mis Horas</h3>
        {appointment
          ? (
            <article className='flex flex-col gap-3 rounded-2xl border-l-4 border-orange-500 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between lg:p-5'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-wide text-orange-600'>{appointment.service}</p>
                <h4 className='mt-0.5 font-display font-semibold text-navy-800'>{appointment.specialist}</h4>
                <p className='mt-1 text-sm text-gray-500'>{appointment.date} · {appointment.time}</p>
              </div>
              <div className='flex shrink-0 items-center gap-3'>
                <span className='rounded-full bg-navy-50 px-2 py-1 text-[11px] font-semibold text-navy-700 lg:px-3 lg:py-1.5 lg:text-xs'>{appointment.modality}</span>
                <button
                  type='button'
                  onClick={onRequestCancel}
                  className='whitespace-nowrap rounded-xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'
                >
                  Anular hora
                </button>
              </div>
            </article>
            )
          : (
            <div className='rounded-2xl bg-white p-6 text-center shadow-card lg:p-8'>
              <p className='mb-2 text-3xl' aria-hidden='true'>🗓️</p>
              <p className='text-sm text-gray-500'>No tienes horas próximas agendadas.</p>
            </div>
            )}
      </div>

      <div>
        <h3 className='mb-3 font-display text-base font-semibold text-navy-800 lg:mb-4 lg:text-lg'>Trámites y Beneficios</h3>
        <div className='grid grid-cols-2 gap-3'>
          {transactionLinks.map((link) => (
            <button
              type='button'
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className='rounded-2xl bg-white p-3 text-left shadow-card transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:p-4'
            >
              <span className='mb-2 block text-lg lg:text-xl' aria-hidden='true'>{link.icon}</span>
              <span className='block text-xs font-semibold leading-tight text-navy-800'>{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default DashboardView
