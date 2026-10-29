import React from 'react'

const placeholders = {
  dashboard: { eyebrow: 'Inicio', title: 'Hola, Joaquín 👋', description: 'Esta es la base del portal SIREB. Desde aquí podrás agendar horas y acceder a tus trámites estudiantiles.', emoji: '🏫' },
  specialists: { eyebrow: 'Agendamiento', title: 'Especialistas', description: 'Aquí se mostrará el listado de profesionales disponibles según el servicio seleccionado.', emoji: '🩺' },
  calendar: { eyebrow: 'Agendamiento', title: 'Selecciona tu hora', description: 'Aquí se integrará el selector de modalidad, fecha y bloque horario de la reserva.', emoji: '🗓️' },
  confirmation: { eyebrow: 'Mis Horas', title: 'Reserva confirmada', description: 'Aquí se mostrará el comprobante y el detalle completo de la cita reservada.', emoji: '✅' },
  socioeconomico: { eyebrow: 'Trámites y Beneficios', title: 'Antecedentes Socioeconómicos', description: 'Aquí podrás consultar y actualizar tus antecedentes para beneficios estudiantiles.', emoji: '📋' },
  declaracion: { eyebrow: 'Trámites y Beneficios', title: 'Declaración', description: 'Aquí podrás revisar y firmar electrónicamente tus declaraciones vigentes.', emoji: '✍️' },
  solicitudes: { eyebrow: 'Trámites y Beneficios', title: 'Solicitudes y Postulaciones', description: 'Aquí se mostrará el historial y estado de tus solicitudes estudiantiles.', emoji: '📨' },
  cae: { eyebrow: 'Solicitudes', title: 'Crédito Aval del Estado', description: 'Aquí podrás ingresar y enviar tu solicitud de monto para el CAE.', emoji: '💳' },
  tne: { eyebrow: 'Trámites y Beneficios', title: 'Tarjeta Nacional Estudiantil', description: 'Aquí encontrarás la información y los pasos del proceso TNE según tu nivel.', emoji: '🪪' },
  perfil: { eyebrow: 'Cuenta', title: 'Mi Perfil', description: 'Aquí se mostrarán tus datos personales, académicos e institucionales.', emoji: '👤' }
}

const DashboardActions = ({ onNavigate }) => (
  <div className='grid gap-3 sm:grid-cols-3'>
    <button type='button' onClick={() => onNavigate('specialists')} className='rounded-2xl bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'>
      <span className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl'>🩺</span>
      <span className='block font-semibold text-navy-800'>Agendar una hora</span>
      <span className='mt-1 block text-xs text-gray-500'>Busca un profesional disponible</span>
    </button>
    <button type='button' onClick={() => onNavigate('socioeconomico')} className='rounded-2xl bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'>
      <span className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-xl'>📋</span>
      <span className='block font-semibold text-navy-800'>Revisar trámites</span>
      <span className='mt-1 block text-xs text-gray-500'>Consulta tus antecedentes</span>
    </button>
    <button type='button' onClick={() => onNavigate('perfil')} className='rounded-2xl bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400'>
      <span className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-xl'>👤</span>
      <span className='block font-semibold text-navy-800'>Ver mi perfil</span>
      <span className='mt-1 block text-xs text-gray-500'>Datos académicos y personales</span>
    </button>
  </div>
)

const FlowAction = ({ currentView, onNavigate }) => {
  if (currentView === 'specialists') {
    return <button type='button' onClick={() => onNavigate('calendar')} className='rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'>Continuar al calendario</button>
  }
  if (currentView === 'calendar') {
    return <button type='button' onClick={() => onNavigate('confirmation')} className='rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'>Simular confirmación</button>
  }
  if (currentView === 'confirmation') {
    return <button type='button' onClick={() => onNavigate('dashboard')} className='rounded-xl bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'>Volver al inicio</button>
  }
  return <button type='button' onClick={() => onNavigate('dashboard')} className='rounded-xl bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2'>Volver al inicio</button>
}

const PlaceholderView = ({ currentView, onNavigate }) => {
  const content = placeholders[currentView] || placeholders.dashboard

  return (
    <section className='view mx-auto w-full max-w-6xl p-5 lg:p-8'>
      {currentView === 'dashboard' && (
        <div className='mb-6 hidden lg:block'>
          <h2 className='font-display text-2xl font-semibold text-navy-800'>Hola, Joaquín 👋</h2>
          <p className='mt-1 text-gray-500'>¿Qué necesitas agendar hoy?</p>
        </div>
      )}

      <div className='relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 to-navy-700 p-6 text-white shadow-card lg:p-8'>
        <div className='relative z-10 max-w-2xl'>
          <span className='text-xs font-semibold uppercase tracking-widest text-orange-300'>{content.eyebrow}</span>
          <h2 className='mt-2 font-display text-2xl font-semibold lg:text-3xl'>{content.title}</h2>
          <p className='mt-2 max-w-xl text-sm leading-relaxed text-navy-100 lg:text-base'>{content.description}</p>
        </div>
        <span className='absolute -bottom-4 right-3 text-7xl opacity-20 lg:right-8 lg:text-8xl' aria-hidden='true'>{content.emoji}</span>
      </div>

      {currentView === 'dashboard'
        ? <DashboardActions onNavigate={onNavigate} />
        : (
          <div className='rounded-2xl border border-dashed border-navy-200 bg-white p-6 text-center shadow-card lg:p-10'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-2xl'>{content.emoji}</div>
            <p className='font-display font-semibold text-navy-800'>Vista preparada para la siguiente etapa</p>
            <p className='mx-auto mb-5 mt-1 max-w-md text-sm text-gray-500'>La navegación y el contenedor responsive ya están operativos. El contenido funcional se incorporará sobre este espacio.</p>
            <FlowAction currentView={currentView} onNavigate={onNavigate} />
          </div>
          )}
    </section>
  )
}

export default PlaceholderView
