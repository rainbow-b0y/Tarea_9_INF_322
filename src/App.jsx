import React, { useCallback, useEffect, useRef, useState } from 'react'

import BottomNav from './components/layout/BottomNav'
import CalendarView from './components/booking/CalendarView'
import CaeView from './components/tramites/CaeView'
import CancelModal from './components/common/CancelModal'
import ConfirmationView from './components/booking/ConfirmationView'
import DashboardView from './components/booking/DashboardView'
import DeclaracionView from './components/tramites/DeclaracionView'
import SpecialistsView from './components/booking/SpecialistsView'
import DesktopHeader from './components/layout/DesktopHeader'
import Drawer from './components/layout/Drawer'
import Header from './components/layout/Header'
import PerfilView from './components/tramites/PerfilView'
import Sidebar from './components/layout/Sidebar'
import SocioeconomicoView from './components/tramites/SocioeconomicoView'
import SolicitudesView from './components/tramites/SolicitudesView'
import TneView from './components/tramites/TneView'
import Toast from './components/common/Toast'
import { occupiedTimeSlots, servicesData } from './data/servicesData'

export const VALID_VIEWS = [
  'dashboard',
  'specialists',
  'calendar',
  'confirmation',
  'socioeconomico',
  'declaracion',
  'solicitudes',
  'cae',
  'tne',
  'perfil'
]

const initialAppointment = {
  service: 'Kinesiología',
  specialist: 'Klgo. Matías Rojas',
  date: 'Jueves 04 de septiembre',
  time: '11:30',
  modality: 'Presencial'
}

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard')
  const [viewStack, setViewStack] = useState(['dashboard'])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [appointment, setAppointment] = useState(initialAppointment)
  const [releasedTimeSlots, setReleasedTimeSlots] = useState([])
  const [toast, setToast] = useState(null)
  const [isDeclarationSigned, setIsDeclarationSigned] = useState(false)
  const [caeAmount, setCaeAmount] = useState('$ 2.450.000')
  const [isCaeSent, setIsCaeSent] = useState(false)
  const [booking, setBooking] = useState({
    servicio: null,
    especialista: null,
    fecha: null,
    hora: null,
    modalidad: 'Presencial'
  })
  const contentRef = useRef(null)

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message })
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  const scrollToTop = useCallback(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const navigateTo = useCallback((nextView) => {
    if (!VALID_VIEWS.includes(nextView)) return

    setIsDrawerOpen(false)

    if (nextView === 'dashboard') {
      setViewStack(['dashboard'])
      setCurrentView('dashboard')
      return
    }

    setViewStack((stack) => {
      if (stack[stack.length - 1] === nextView) return stack
      return [...stack, nextView]
    })
    setCurrentView(nextView)
  }, [])

  const goBack = useCallback(() => {
    setViewStack((stack) => {
      if (stack.length <= 1) {
        setCurrentView('dashboard')
        return ['dashboard']
      }

      const previousStack = stack.slice(0, -1)
      setCurrentView(previousStack[previousStack.length - 1])
      return previousStack
    })
  }, [])

  const handleNavigate = useCallback((nextView) => {
    if (nextView === 'specialists') {
      setBooking((current) => current.servicio
        ? current
        : { ...current, servicio: servicesData.psicologia })
    }
    navigateTo(nextView)
  }, [navigateTo])

  const selectService = useCallback((serviceId) => {
    const service = servicesData[serviceId]
    if (!service) return

    setBooking({
      servicio: service,
      especialista: null,
      fecha: null,
      hora: null,
      modalidad: 'Presencial'
    })
    navigateTo('specialists')
  }, [navigateTo])

  const selectSpecialist = useCallback((specialist) => {
    setBooking((current) => ({
      ...current,
      especialista: specialist,
      fecha: null,
      hora: null,
      modalidad: 'Presencial'
    }))
    navigateTo('calendar')
  }, [navigateTo])

  const updateBooking = useCallback((changes) => {
    setBooking((current) => ({ ...current, ...changes }))
  }, [])

  const confirmBooking = useCallback(() => {
    if (!booking.servicio || !booking.especialista || !booking.fecha || !booking.hora) return

    setReleasedTimeSlots((current) => {
      const next = current.filter((time) => time !== booking.hora)
      if (appointment && appointment.time !== booking.hora && !next.includes(appointment.time)) {
        next.push(appointment.time)
      }
      return next
    })
    setAppointment({
      service: booking.servicio.title,
      specialist: booking.especialista.name,
      date: booking.fecha.fullLabel,
      time: booking.hora,
      modality: booking.modalidad
    })
    navigateTo('confirmation')
  }, [appointment, booking, navigateTo])

  const showAppointments = useCallback(() => {
    navigateTo('dashboard')
    window.setTimeout(() => {
      document.getElementById('mis-horas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }, [navigateTo])

  const cancelAppointment = useCallback(() => {
    if (!appointment) return
    setReleasedTimeSlots((current) => current.includes(appointment.time) ? current : [...current, appointment.time])
    setAppointment(null)
    setBooking({
      servicio: null,
      especialista: null,
      fecha: null,
      hora: null,
      modalidad: 'Presencial'
    })
    setIsCancelModalOpen(false)
    showToast('Hora anulada correctamente.')
  }, [appointment, showToast])

  useEffect(() => {
    scrollToTop()
  }, [currentView, scrollToTop])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen || isCancelModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCancelModalOpen, isDrawerOpen])

  const hasConfirmedBooking = Boolean(
    booking.servicio &&
    booking.especialista &&
    booking.fecha &&
    booking.hora
  )

  const unavailableTimeSlots = [
    ...occupiedTimeSlots.filter((time) => !releasedTimeSlots.includes(time)),
    ...(appointment ? [appointment.time] : [])
  ].filter((time, index, slots) => slots.indexOf(time) === index)

  const renderView = () => {
    if (currentView === 'dashboard') {
      return (
        <DashboardView
          appointment={appointment}
          onNavigate={handleNavigate}
          onRequestCancel={() => setIsCancelModalOpen(true)}
          onSelectService={selectService}
        />
      )
    }

    if (currentView === 'specialists' && booking.servicio) {
      return <SpecialistsView service={booking.servicio} onSelectSpecialist={selectSpecialist} />
    }

    if (currentView === 'calendar' && booking.servicio && booking.especialista) {
      return <CalendarView booking={booking} unavailableTimeSlots={unavailableTimeSlots} onChange={updateBooking} onConfirm={confirmBooking} />
    }

    if (currentView === 'confirmation' && hasConfirmedBooking) {
      return <ConfirmationView booking={booking} onGoHome={() => navigateTo('dashboard')} />
    }

    if (currentView === 'socioeconomico') {
      return <SocioeconomicoView onUpdate={() => showToast('La actualización de antecedentes estará disponible próximamente.')} />
    }

    if (currentView === 'declaracion') {
      return (
        <DeclaracionView
          isSigned={isDeclarationSigned}
          onSigned={() => {
            setIsDeclarationSigned(true)
            showToast('Declaración firmada correctamente.')
          }}
        />
      )
    }

    if (currentView === 'solicitudes') {
      return <SolicitudesView onOpenCae={() => navigateTo('cae')} />
    }

    if (currentView === 'cae') {
      return (
        <CaeView
          amount={caeAmount}
          isSent={isCaeSent}
          onAmountChange={setCaeAmount}
          onSent={() => {
            setIsCaeSent(true)
            showToast('Solicitud CAE enviada correctamente.')
          }}
        />
      )
    }

    if (currentView === 'tne') return <TneView />
    if (currentView === 'perfil') return <PerfilView />

    return null
  }

  return (
    <div className='min-h-screen bg-gray-100 text-navy-900 lg:flex lg:h-screen lg:overflow-hidden'>
      <Sidebar currentView={currentView} onNavigate={handleNavigate} onShowAppointments={showAppointments} />

      <div className='flex min-h-screen flex-1 flex-col lg:h-screen lg:min-h-0 lg:overflow-hidden'>
        <Header
          currentView={currentView}
          titleOverride={currentView === 'specialists' && booking.servicio ? booking.servicio.title : null}
          canGoBack={viewStack.length > 1}
          onBack={goBack}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />
        <DesktopHeader
          currentView={currentView}
          canGoBack={viewStack.length > 1}
          onBack={goBack}
          onNotifications={() => showToast('No tienes notificaciones nuevas.')}
          onSearch={(term) => showToast(term ? `Buscando “${term}”…` : 'Escribe un término para buscar.')}
        />

        <main
          ref={contentRef}
          className='content-scroll flex-1 overflow-y-auto pb-24 lg:pb-0'
          id='main-content'
        >
          {renderView()}
        </main>
      </div>

      <BottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onShowAppointments={showAppointments}
      />
      <Drawer
        isOpen={isDrawerOpen}
        currentView={currentView}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
      />
      <CancelModal
        isOpen={isCancelModalOpen}
        onCancel={cancelAppointment}
        onClose={() => setIsCancelModalOpen(false)}
      />
      <Toast key={toast ? toast.id : 'empty'} message={toast ? toast.message : ''} onClose={hideToast} />
    </div>
  )
}

export default App
