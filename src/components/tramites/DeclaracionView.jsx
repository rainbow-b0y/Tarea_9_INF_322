import React, { useState } from 'react'

const DeclaracionView = ({ isSigned, onSigned }) => {
  const [accepted, setAccepted] = useState(false)

  const signDeclaration = () => {
    if (!accepted || isSigned) return
    onSigned()
  }

  return (
    <section className='view mx-auto w-full max-w-6xl space-y-4 p-5 lg:space-y-5 lg:p-8'>
      <h2 className='hidden font-display text-2xl font-semibold text-navy-800 lg:block'>Declaración</h2>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6'>
        <article className='rounded-2xl bg-white p-4 shadow-card lg:p-6'>
          <h3 className='mb-2 font-display font-semibold text-navy-800'>Declaración Jurada Simple</h3>
          <p className='text-sm leading-relaxed text-gray-500'>Declaro que la información socioeconómica y personal entregada a la universidad es fidedigna y podrá ser verificada por la institución. Esta declaración se firma únicamente de forma electrónica dentro de la plataforma.</p>
        </article>
        <div className='space-y-4 rounded-2xl bg-white p-4 shadow-card lg:p-6'>
          <label className={`flex items-start gap-3 ${isSigned ? 'cursor-default opacity-70' : 'cursor-pointer'}`}>
            <input
              type='checkbox'
              checked={accepted}
              disabled={isSigned}
              onChange={(event) => setAccepted(event.target.checked)}
              className='mt-0.5 h-5 w-5 shrink-0 accent-orange-500'
            />
            <span className='text-sm text-gray-600'>Declaro que la información entregada es verídica y actualizada.</span>
          </label>
          {!isSigned && (
            <button
              type='button'
              disabled={!accepted}
              onClick={signDeclaration}
              className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${accepted ? 'bg-orange-500 text-white hover:bg-orange-600' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
            >
              Firmar declaración electrónica
            </button>
          )}
          {isSigned && <p className='text-center text-sm font-semibold text-orange-600' role='status'>✔ Declaración firmada el 01-09-2026</p>}
        </div>
      </div>
    </section>
  )
}

export default DeclaracionView
