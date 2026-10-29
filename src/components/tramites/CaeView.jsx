import React from 'react'

const ProgressStep = ({ active, children }) => (
  <li className='flex items-center gap-3'>
    <span className={`h-3 w-3 rounded-full ${active ? 'bg-orange-500' : 'bg-gray-200'}`} aria-hidden='true' />
    <span className={`text-sm ${active ? 'font-semibold text-navy-800' : 'text-gray-400'}`}>{children}</span>
  </li>
)

const CaeView = ({ amount, isSent, onAmountChange, onSent }) => {
  const sendRequest = () => {
    if (isSent || !amount.trim()) return
    onSent()
  }

  return (
    <section className='view mx-auto w-full max-w-6xl space-y-4 p-5 lg:space-y-5 lg:p-8'>
      <h2 className='hidden font-display text-2xl font-semibold text-navy-800 lg:block'>Crédito Aval del Estado</h2>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6'>
        <div className='space-y-3 rounded-2xl bg-white p-4 shadow-card lg:space-y-4 lg:p-6'>
          <h3 className='font-display font-semibold text-navy-800 lg:hidden'>Crédito Aval del Estado</h3>
          <p className='text-sm leading-relaxed text-gray-500'>Solicita el monto de asignación asociado a tu Crédito con Aval del Estado (CAE) para el año académico vigente.</p>
          <label htmlFor='cae-amount' className='block text-xs font-semibold uppercase text-gray-400'>Monto solicitado (arancel anual)</label>
          <input
            id='cae-amount'
            type='text'
            inputMode='numeric'
            value={amount}
            disabled={isSent}
            onChange={(event) => onAmountChange(event.target.value)}
            className='w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-navy-800 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:bg-gray-50 disabled:text-gray-500'
          />
          <div className='flex items-center gap-2 pt-1'>
            <span className='h-2.5 w-2.5 rounded-full bg-orange-500' aria-hidden='true' />
            <span className='text-sm text-gray-500'>Estado actual: <span className='font-semibold text-navy-800'>{isSent ? 'En revisión' : 'Borrador'}</span></span>
          </div>
          <button
            type='button'
            disabled={isSent || !amount.trim()}
            onClick={sendRequest}
            className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 lg:rounded-xl lg:py-3 ${isSent ? 'cursor-default bg-navy-100 text-navy-500' : amount.trim() ? 'bg-orange-500 text-white hover:bg-orange-600' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
          >
            {isSent ? 'Solicitud enviada ✔' : 'Enviar solicitud'}
          </button>
        </div>
        <div className='rounded-2xl bg-white p-4 shadow-card lg:p-6'>
          <h3 className='mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400'>Estado de la solicitud</h3>
          <ol className='space-y-4'>
            <ProgressStep active>Postulada</ProgressStep>
            <ProgressStep active={isSent}>En revisión</ProgressStep>
            <ProgressStep>Resuelta</ProgressStep>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default CaeView
