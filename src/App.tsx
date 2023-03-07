import React, { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/index.scss'
// import Construction from './pages/Construction'
import Home from './pages/Home'
import Routines from './pages/Routines'
import Calender from './pages/Calender'
import More from './pages/More'
import { loadTheme } from './lib/theme'
// import ViewRoutine from './pages/ViewRoutine'

const LazyAbout = React.lazy(() => import('./pages/About'))
// const LazyStart = React.lazy(() => import('./pages/Start'))
const LazyApplyRoutine = React.lazy(() => import('./pages/ApplyRoutine'))
const LazyNewRoutine = React.lazy(() => import('./pages/NewRoutine'))
const LazyStart = React.lazy(() => import('./pages/Start'))
const LazyConstruction = React.lazy(() => import('./pages/Construction'))
const LazyViewRoutine = React.lazy(() => import('./pages/ViewRoutine'))
const BuyMeCoffee = React.lazy(() => import('./pages/author/BuyMeCoffee'))
const Backup = React.lazy(() => import('./pages/backup-restore/Backup'))
const Restore = React.lazy(() => import('./pages/backup-restore/Restore'))

// const LazyMore = React.lazy(() => import('./pages/More'))




function LoadingScreen() {
  return (
    <div className="loading h-[100vh] w-full flex items-center justify-center">
      <p>Please Wait...</p>
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
          <Route path='/notifications' element={< LazyConstruction />} />
          <Route path='/viewRoutine/:routineId' element={< LazyViewRoutine />} />
          <Route path='/author/buyMeCoffee' element={< BuyMeCoffee />} />
          <Route path='/backup' element={< Backup />} />
          <Route path='/restore' element={< Restore />} />
        </Routes>
      </React.Suspense>
    </Router>
  )
}