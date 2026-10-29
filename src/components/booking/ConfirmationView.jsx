import React from 'react'

const Detail = ({ label, children }) => (
  <div>
    <dt className='text-xs text-gray-400'>{label}</dt>
    <dd className='font-semibold text-navy-800'>{children}</dd>
  </div>
)

const ConfirmationView = ({ booking, onGoHome }) => {
  const place = booking.modalidad === 'Presencial'
    ? 'Campus Central, Sala 204'
    : 'Enlace disponible en la plataforma'

  return (
    <section className='view mx-auto w-full max-w-6xl p-5 lg:p-8'>
      <div className='lg:mx-auto lg:max-w-xl'>
        <div className='mb-6 mt-4 flex flex-col items-center text-center lg:mb-8'>
          <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500'>
            <svg className='h-8 w-8 text-white' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' d='m5 13 4 4L19 7' />
            </svg>
          </div>
          <h2 className='font-display text-xl font-semibold text-navy-800 lg:text-2xl'>¡Hora reservada con éxito!</h2>
          <p className='mt-1 text-sm text-gray-500 lg:mt-2 lg:max-w-sm lg:text-base'>Este comprobante queda disponible en la plataforma, en la sección “Mis Horas”. No enviamos correos ni SMS.</p>
        </div>

        <div className='space-y-4 rounded-2xl bg-white p-5 shadow-card lg:space-y-5 lg:p-6'>
          <div className='flex items-center justify-between border-b border-gray-100 pb-3 lg:pb-4'>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>Comprobante de reserva</p>
            <p className='rounded-full bg-navy-50 px-2 py-1 text-xs font-semibold text-navy-700 lg:px-2.5'>N° 2026-0817</p>
          </div>
          <dl className='grid grid-cols-2 gap-x-4 gap-y-3 text-sm lg:gap-y-4'>
            <Detail label='Profesional'>{booking.especialista.name}</Detail>
            <Detail label='Servicio'>{booking.servicio.title}</Detail>
            <Detail label='Fecha'>{booking.fecha.fullLabel}</Detail>
            <Detail label='Hora'>{booking.hora}</Detail>
            <Detail label='Modalidad'>{booking.modalidad}</Detail>
            <Detail label='Lugar'>{place}</Detail>
          </dl>
        </div>

        <button
          type='button'
          onClick={onGoHome}
          className='mt-6 w-full rounded-2xl bg-navy-800 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'
        >
          Volver al inicio
        </button>
      </div>
    </section>
  )
}

export default ConfirmationView
