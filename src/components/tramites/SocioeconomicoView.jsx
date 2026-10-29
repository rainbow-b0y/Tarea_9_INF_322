import React from 'react'

const cards = [
  { label: 'Tramo FUAS', value: '30%' },
  { label: 'Quintil socioeconómico', value: 'Quintil II' },
  { label: 'Grupo familiar', value: '4 integrantes' },
  { label: 'Estado', value: 'Vigente 2026', highlighted: true }
]

const SocioeconomicoView = ({ onUpdate }) => (
  <section className='view mx-auto w-full max-w-6xl space-y-4 p-5 lg:space-y-5 lg:p-8'>
    <div className='hidden lg:block'>
      <h2 className='font-display text-2xl font-semibold text-navy-800'>Antecedentes Socioeconómicos</h2>
      <p className='mt-1 max-w-xl text-gray-500'>Esta información se usa para calcular tus beneficios estudiantiles y es visible solo para ti.</p>
    </div>
    <p className='text-sm text-gray-500 lg:hidden'>Esta información se usa para calcular tus beneficios estudiantiles y es visible solo para ti.</p>
    <div className='grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4'>
      {cards.map((card) => (
        <article key={card.label} className='rounded-2xl bg-white p-4 shadow-card lg:p-5'>
          <p className='mb-1 text-xs text-gray-400'>{card.label}</p>
          <p className={`font-display text-lg font-semibold lg:text-xl ${card.highlighted ? 'text-orange-600' : 'text-navy-800'}`}>{card.value}</p>
        </article>
      ))}
    </div>
    <button type='button' onClick={onUpdate} className='w-full rounded-2xl bg-navy-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 lg:w-auto lg:py-3'>
      Actualizar antecedentes
    </button>
  </section>
)

export default SocioeconomicoView
