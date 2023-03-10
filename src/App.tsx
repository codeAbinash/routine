import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/index.scss'
// import Construction from './pages/Construction'
import Home from './pages/Home'
import Routines from './pages/Routines'
import Calender from './pages/Calender'
import More from './pages/More'
import { loadTheme } from './lib/theme'
import Loading from './components/Loading'
// import ViewRoutine from './pages/ViewRoutine'

const LazyAbout = React.lazy(() => import('./pages/About'))
// const LazyStart = React.lazy(() => import('./pages/Start'))
const LazyApplyRoutine = React.lazy(() => import('./pages/ApplyRoutine'))
const LazyNewRoutine = React.lazy(() => import('./pages/NewRoutine'))
const LazyStart = React.lazy(() => import('./pages/Start'))
const LazyNotifications = React.lazy(() => import('./pages/Notifications'))
const LazyViewRoutine = React.lazy(() => import('./pages/ViewRoutine'))
const BuyMeCoffee = React.lazy(() => import('./pages/author/BuyMeCoffee'))
const LazyBackup = React.lazy(() => import('./pages/backup-restore/Backup'))
const LazyRestore = React.lazy(() => import('./pages/backup-restore/Restore'))
const LazyChangelog = React.lazy(() => import('./pages/changelog/Changelog'))

// const LazyMore = React.lazy(() => import('./pages/More'))




function LoadingScreen() {
  return (
    <div className="loading h-[100vh] w-full flex items-center justify-center">
      <Loading />
    </div>
  )
}




export default function App() {
  useEffect(() => {
    loadTheme()
  }, [])
  return (
    <Router basename='/routine-build/build'>
      <React.Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/about' element={< LazyAbout />} />
          <Route path='/start' element={< LazyStart />} />
          <Route path='/routines' element={< Routines />} />
          <Route path='/newRoutine' element={< LazyNewRoutine />} />
          <Route path='/applyRoutine' element={< LazyApplyRoutine />} />
          <Route path='/more' element={<More />} />
          <Route path='/calender' element={< Calender />} />
          <Route path='/notifications' element={< LazyNotifications />} />
          <Route path='/viewRoutine/:routineId' element={< LazyViewRoutine />} />
          <Route path='/author/buyMeCoffee' element={< BuyMeCoffee />} />
          <Route path='/backup' element={< LazyBackup />} />
          <Route path='/restore' element={< LazyRestore />} />
          <Route path='/changelog' element={< LazyChangelog />} />
        </Routes>
      </React.Suspense>
    </Router>
  )
}