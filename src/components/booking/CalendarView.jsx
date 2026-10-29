import React, { useMemo } from 'react'

import { occupiedTimeSlots, timeSlots } from '../../data/servicesData'

const getInitials = (name) => name
  .split(' ')
  .slice(-2)
  .map((part) => part[0])
  .join('')

const toDateKey = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0')
].join('-')

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

const getBusinessDays = () => {
  const days = []
  const today = new Date()
  const cursor = new Date(today)

  while (days.length < 6) {
    const weekday = cursor.getDay()
    if (weekday !== 0 && weekday !== 6) {
      const isToday = toDateKey(cursor) === toDateKey(today)
      days.push({
        id: toDateKey(cursor),
        shortLabel: isToday
          ? 'Hoy'
          : capitalize(new Intl.DateTimeFormat('es-CL', { weekday: 'short' }).format(cursor).replace('.', '')),
        dayNumber: cursor.getDate(),
        fullLabel: capitalize(cursor.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }))
      })
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return days
}

const BookingButton = ({ enabled, onConfirm }) => (
  <button
    type='button'
    disabled={!enabled}
    onClick={onConfirm}
    className={`w-full rounded-2xl py-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${enabled ? 'bg-orange-500 text-white hover:bg-orange-600' : 'cursor-not-allowed bg-gray-200 text-gray-400'}`}
  >
    {enabled ? 'Confirmar Reserva' : 'Selecciona día y hora'}
  </button>
)

const CalendarView = ({ booking, onChange, onConfirm }) => {
  const days = useMemo(getBusinessDays, [])
  const isReady = Boolean(booking.fecha && booking.hora)

  return (
    <section className='view mx-auto w-full max-w-6xl space-y-5 p-5 pb-28 lg:p-8 lg:pb-8'>
      <div className='hidden lg:block'>
        <h2 className='font-display text-2xl font-semibold text-navy-800'>Selecciona tu hora</h2>
      </div>

      <p className='rounded-xl bg-navy-50 p-3 text-sm text-navy-700 lg:mt-1 lg:rounded-none lg:bg-transparent lg:p-0 lg:text-base lg:text-gray-500'>
        <span className='font-semibold'>{booking.especialista.name}</span> · {booking.servicio.title}
      </p>

      <div className='grid grid-cols-1 items-start gap-5 lg:grid-cols-3 lg:gap-6'>
        <div className='space-y-5 lg:col-span-2 lg:space-y-6'>
          <div className='rounded-2xl bg-white p-4 shadow-card lg:p-5'>
            <p className='mb-3 text-sm font-semibold text-navy-800'>Modalidad</p>
            <div className='flex gap-2 lg:max-w-xs lg:gap-3'>
              {['Presencial', 'Online'].map((modality) => {
                const selected = booking.modalidad === modality
                return (
                  <button
                    type='button'
                    key={modality}
                    aria-pressed={selected}
                    onClick={() => onChange({ modalidad: modality })}
                    className={`flex-1 rounded-xl border-2 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${selected ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 text-gray-500 hover:border-navy-300'}`}
                  >
                    {modality}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='rounded-2xl bg-white p-4 shadow-card lg:p-5'>
            <p className='mb-3 text-sm font-semibold text-navy-800'>Selecciona un día</p>
            <div className='day-chip flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0'>
              {days.map((day) => {
                const selected = booking.fecha && booking.fecha.id === day.id
                return (
                  <button
                    type='button'
                    key={day.id}
                    aria-pressed={selected}
                    onClick={() => onChange({ fecha: day, hora: null })}
                    className={`w-14 shrink-0 rounded-xl border-2 py-2.5 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 lg:w-auto lg:py-3 ${selected ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 text-navy-700 hover:border-navy-300'}`}
                  >
                    <span className='block text-[10px] font-semibold uppercase'>{day.shortLabel}</span>
                    <span className='block text-sm font-bold lg:text-base'>{day.dayNumber}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className='rounded-2xl bg-white p-4 shadow-card lg:p-5'>
            <div className='mb-3 flex items-center justify-between gap-3'>
              <p className='text-sm font-semibold text-navy-800'>Bloques disponibles</p>
              <p className='text-[11px] text-gray-400'><span className='mr-1 inline-block h-2 w-2 rounded-full bg-gray-200' />Ocupado</p>
            </div>
            <div className='grid grid-cols-3 gap-2 sm:grid-cols-4'>
              {timeSlots.map((time) => {
                const occupied = occupiedTimeSlots.includes(time)
                const selected = booking.hora === time
                return (
                  <button
                    type='button'
                    key={time}
                    disabled={occupied}
                    aria-pressed={selected}
                    onClick={() => onChange({ hora: time })}
                    className={`rounded-xl border-2 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${occupied ? 'cursor-not-allowed border-gray-100 text-gray-300 line-through' : selected ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-200 text-navy-700 hover:border-navy-300'}`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <aside className='sticky top-4 hidden space-y-4 rounded-2xl bg-white p-5 shadow-card lg:block'>
          <p className='text-xs font-semibold uppercase tracking-wide text-gray-400'>Resumen de tu reserva</p>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-800 font-display font-semibold text-white' aria-hidden='true'>{getInitials(booking.especialista.name)}</div>
            <div>
              <p className='text-sm font-semibold text-navy-800'>{booking.especialista.name}</p>
              <p className='text-xs text-gray-500'>{booking.servicio.title}</p>
            </div>
          </div>
          <dl className='space-y-2 border-t border-gray-100 pt-3 text-sm'>
            <div className='flex justify-between gap-3'><dt className='text-gray-400'>Día</dt><dd className='text-right font-semibold text-navy-800'>{booking.fecha ? booking.fecha.fullLabel : 'Sin seleccionar'}</dd></div>
            <div className='flex justify-between gap-3'><dt className='text-gray-400'>Hora</dt><dd className='font-semibold text-navy-800'>{booking.hora || 'Sin seleccionar'}</dd></div>
            <div className='flex justify-between gap-3'><dt className='text-gray-400'>Modalidad</dt><dd className='font-semibold text-navy-800'>{booking.modalidad}</dd></div>
          </dl>
          <BookingButton enabled={isReady} onConfirm={onConfirm} />
        </aside>
      </div>

      <div className='fixed inset-x-0 bottom-[68px] z-10 border-t border-gray-100 bg-white px-5 py-3 shadow-[0_-4px_18px_rgba(11,31,58,0.08)] lg:hidden'>
        <BookingButton enabled={isReady} onConfirm={onConfirm} />
      </div>
    </section>
  )
}

export { getBusinessDays }
export default CalendarView

