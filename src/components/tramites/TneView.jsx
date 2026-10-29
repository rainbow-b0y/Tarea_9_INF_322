import React, { useState } from 'react'

const tabContent = {
  primer: {
    description: 'Pasos para obtener tu Tarjeta Nacional Estudiantil por primera vez.',
    marker: ['1', '2', '3'],
    steps: [
      'Carga tu fotografía y documentación en el portal TNE.gob.cl',
      'Espera la validación de matrícula por parte de la universidad.',
      'Retira tu tarjeta física en el punto de atención del Campus.'
    ]
  },
  superior: {
    description: 'Información para estudiantes de cursos superiores.',
    marker: ['✓', '✓', '✓'],
    steps: [
      'Tu TNE se revalida automáticamente al confirmar matrícula.',
      'Retira el sticker de revalidación en el Campus a partir de marzo.',
      'Si perdiste tu tarjeta, solicita el duplicado en Bienestar Estudiantil.'
    ]
  }
}

const TneView = () => {
  const [activeTab, setActiveTab] = useState('primer')
  const content = tabContent[activeTab]

  return (
    <section className='view mx-auto w-full max-w-6xl space-y-4 p-5 lg:space-y-5 lg:p-8'>
      <h2 className='hidden font-display text-2xl font-semibold text-navy-800 lg:block'>TNE · Tarjeta Nacional Estudiantil</h2>
      <div className='flex gap-2 rounded-xl bg-white p-1 shadow-card lg:max-w-sm' role='tablist' aria-label='Tipo de estudiante'>
        <button type='button' role='tab' aria-selected={activeTab === 'primer'} onClick={() => setActiveTab('primer')} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${activeTab === 'primer' ? 'bg-navy-800 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Primer año</button>
        <button type='button' role='tab' aria-selected={activeTab === 'superior'} onClick={() => setActiveTab('superior')} className={`flex-1 rounded-lg py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${activeTab === 'superior' ? 'bg-navy-800 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Cursos superiores</button>
      </div>
      <div role='tabpanel' className='space-y-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0'>
        <p className='text-sm text-gray-500 lg:hidden'>{content.description}</p>
        {content.steps.map((step, index) => (
          <article key={step} className='flex gap-3 rounded-2xl bg-white p-4 shadow-card lg:block lg:p-5'>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white lg:mb-3 lg:h-7 lg:w-7 ${activeTab === 'primer' ? 'bg-orange-500' : 'bg-navy-700'}`} aria-hidden='true'>{content.marker[index]}</span>
            <p className='text-sm text-gray-600'>{step}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TneView
