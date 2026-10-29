import React from 'react'

const getInitials = (name) => name
  .split(' ')
  .slice(-2)
  .map((part) => part[0])
  .join('')

const SpecialistsView = ({ service, onSelectSpecialist }) => (
  <section className='view mx-auto w-full max-w-6xl space-y-3 p-5 lg:space-y-5 lg:p-8'>
    <div className='hidden lg:block'>
      <h2 className='font-display text-2xl font-semibold text-navy-800'>{service.title}</h2>
      <p className='mt-1 text-gray-500'>Elige un profesional para ver sus horarios disponibles.</p>
    </div>
    <p className='-mt-1 mb-2 text-sm text-gray-500 lg:hidden'>Elige un profesional para ver sus horarios disponibles.</p>

    <div className='space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid-cols-3'>
      {service.specialists.map((specialist) => (
        <article key={specialist.id} className='rounded-2xl bg-white p-4 shadow-card lg:flex lg:flex-col lg:p-5'>
          <div className='flex items-start gap-3'>
            <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display font-semibold text-white lg:h-12 lg:w-12' aria-hidden='true'>
              {getInitials(specialist.name)}
            </div>
            <div className='min-w-0'>
              <h3 className='truncate text-sm font-semibold text-navy-800'>{specialist.name}</h3>
              <p className='text-xs text-gray-500'>{specialist.specialty}</p>
              <p className='mt-0.5 text-xs text-gray-400'>{specialist.modality}</p>
            </div>
          </div>
          <p className='mt-3 w-fit rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600 lg:mt-4 lg:px-3 lg:py-1.5 lg:text-xs'>
            <span aria-hidden='true'>🟠 </span>{specialist.availabilityLabel} · Próxima hora: {specialist.tag}
          </p>
          <button
            type='button'
            onClick={() => onSelectSpecialist(specialist)}
            className='mt-3 w-full rounded-xl bg-navy-800 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 lg:mt-4'
          >
            Reservar
          </button>
        </article>
      ))}
    </div>
  </section>
)

export default SpecialistsView
