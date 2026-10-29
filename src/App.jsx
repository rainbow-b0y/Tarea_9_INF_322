import React, { useCallback, useEffect, useRef, useState } from 'react'

import BottomNav from './components/layout/BottomNav'
import CalendarView from './components/booking/CalendarView'
import ConfirmationView from './components/booking/ConfirmationView'
import DashboardView from './components/booking/DashboardView'
import SpecialistsView from './components/booking/SpecialistsView'
import DesktopHeader from './components/layout/DesktopHeader'
import Drawer from './components/layout/Drawer'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import PlaceholderView from './components/views/PlaceholderView'
import { servicesData } from './data/servicesData'

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

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard')
  const [viewStack, setViewStack] = useState(['dashboard'])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [booking, setBooking] = useState({
    servicio: null,
    especialista: null,
    fecha: null,
    hora: null,
    modalidad: 'Presencial'
  })
  const contentRef = useRef(null)

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
    navigateTo('confirmation')
  }, [booking, navigateTo])

  useEffect(() => {
    scrollToTop()
  }, [currentView, scrollToTop])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  const hasConfirmedBooking = Boolean(
    booking.servicio &&
    booking.especialista &&
    booking.fecha &&
    booking.hora
  )

  const renderView = () => {
    if (currentView === 'dashboard') {
      return <DashboardView onSelectService={selectService} />
    }

    if (currentView === 'specialists' && booking.servicio) {
      return <SpecialistsView service={booking.servicio} onSelectSpecialist={selectSpecialist} />
    }

    if (currentView === 'calendar' && booking.servicio && booking.especialista) {
      return <CalendarView booking={booking} onChange={updateBooking} onConfirm={confirmBooking} />
    }

    if (currentView === 'confirmation' && hasConfirmedBooking) {
      return <ConfirmationView booking={booking} onGoHome={() => navigateTo('dashboard')} />
    }

    return <PlaceholderView currentView={currentView} onNavigate={handleNavigate} />
  }

  return (
    <div className='min-h-screen bg-gray-100 text-navy-900 lg:flex lg:h-screen lg:overflow-hidden'>
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />

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
      />
      <Drawer
        isOpen={isDrawerOpen}
        currentView={currentView}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}

export default App
