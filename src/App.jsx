import React, { useCallback, useEffect, useRef, useState } from 'react'

import BottomNav from './components/layout/BottomNav'
import DesktopHeader from './components/layout/DesktopHeader'
import Drawer from './components/layout/Drawer'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import PlaceholderView from './components/views/PlaceholderView'

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

  useEffect(() => {
    scrollToTop()
  }, [currentView, scrollToTop])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  return (
    <div className='min-h-screen bg-gray-100 text-navy-900 lg:flex lg:h-screen lg:overflow-hidden'>
      <Sidebar currentView={currentView} onNavigate={navigateTo} />

      <div className='flex min-h-screen flex-1 flex-col lg:h-screen lg:min-h-0 lg:overflow-hidden'>
        <Header
          currentView={currentView}
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
          <PlaceholderView currentView={currentView} onNavigate={navigateTo} />
        </main>
      </div>

      <BottomNav
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />
      <Drawer
        isOpen={isDrawerOpen}
        currentView={currentView}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  )
}

export default App
