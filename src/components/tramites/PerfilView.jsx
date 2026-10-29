import React from 'react'

const institutionalData = [
  ['RUT', '19.xxx.xxx-x'],
  ['Campus', 'Campus Central'],
  ['Año de ingreso', '2024']
]

const PerfilView = () => (
  <section className='view mx-auto w-full max-w-6xl space-y-4 p-5 lg:p-8'>
    <div className='space-y-4 lg:max-w-2xl lg:space-y-5'>
      <h2 className='hidden font-display text-2xl font-semibold text-navy-800 lg:block'>Mi Perfil</h2>
      <div className='flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card lg:p-6'>
        <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display text-lg font-semibold text-white lg:h-16 lg:w-16 lg:text-xl' aria-hidden='true'>JP</div>
        <div>
          <h3 className='font-display font-semibold text-navy-800 lg:text-lg'>Joaquín Pérez</h3>
          <p className='text-xs text-gray-400 lg:text-sm'>Ingeniería Civil Informática</p>
        </div>
      </div>
      <dl className='divide-y divide-gray-100 rounded-2xl bg-white shadow-card'>
        {institutionalData.map(([label, value]) => (
          <div key={label} className='flex items-center justify-between gap-4 p-4'>
            <dt className='text-sm text-gray-500'>{label}</dt>
            <dd className='text-right text-sm font-semibold text-navy-800'>{value}</dd>
          </div>
        ))}
      </dl>
      <p className='px-6 text-center text-xs text-gray-400 lg:px-0 lg:text-left'>Tus datos son privados y se usan solo dentro de SIREB. No compartimos tu información por correo ni SMS.</p>
    </div>
  </section>
)

export default PerfilView
