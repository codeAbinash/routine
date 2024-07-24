import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/scss/index.scss';
// import Construction from './pages/Construction'
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Routines from './pages/Routines';
// import More from './pages/More'
import Loading from './components/loading/Loading';
import { loadTheme } from './lib/theme';
// import ViewRoutine from './pages/ViewRoutine'

const LazyAbout = React.lazy(() => import('./pages/About'));
// const LazyStart = React.lazy(() => import('./pages/Start'))
const LazyMore = React.lazy(() => import('./pages/More'));
const EditRoutine = React.lazy(() => import('./pages/Edit/EditRoutine'));
const LazyApplyRoutine = React.lazy(() => import('./pages/ApplyRoutine'));
const LazyManageRoutine = React.lazy(() => import('./pages/ManageRoutine'));
const LazyNewRoutine = React.lazy(() => import('./pages/NewRoutine'));
const LazyStart = React.lazy(() => import('./pages/Start'));
const LazyNotifications = React.lazy(() => import('./pages/Notifications'));
const BuyMeCoffee = React.lazy(() => import('./pages/author/BuyMeCoffee'));
const LazyBackup = React.lazy(() => import('./pages/backup-restore/Backup'));
const LazyRestore = React.lazy(() => import('./pages/backup-restore/Restore'));
const LazyChangelog = React.lazy(() => import('./pages/changelog/Changelog'));
const LazyContributors = React.lazy(() => import('./pages/author/Contributors'));
const LazyTest = React.lazy(() => import('./pages/TestPage'));
const LazyMessages = React.lazy(() => import('./pages/Messages/Messages'));
const LazyRestoreStartup = React.lazy(() => import('./pages/backup-restore/RestoreStartup'));
const LazyNotes = React.lazy(() => import('./pages/notes/Notes'));
const LazyNotesAdd = React.lazy(() => import('./pages/notes/AddNotes'));
const LazyNotesEdit = React.lazy(() => import('./pages/notes/EditNotes'));

// const LazyMore = React.lazy(() => import('./pages/More'))

function LoadingScreen() {
   return (
      <div className='loading flex h-[100vh] w-full items-center justify-center'>
         <Loading />
      </div>
   );
}

export default function App() {
   useEffect(() => {
      loadTheme();
   }, []);
   return (
      <Router>
         <React.Suspense fallback={<LoadingScreen />}>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/about' element={<LazyAbout />} />
               <Route path='/start' element={<LazyStart />} />
               <Route path='/routines' element={<Routines />} />
               <Route path='/newRoutine' element={<LazyNewRoutine />} />
               <Route path='/applyRoutine' element={<LazyApplyRoutine />} />
               <Route path='/manageRoutines' element={<LazyManageRoutine />} />
               <Route path='/more' element={<LazyMore />} />
               <Route path='/editRoutine' element={<EditRoutine />} />
               <Route path='/calendar' element={<Calendar />} />
               <Route path='/notifications' element={<LazyNotifications />} />
               <Route path='/author/buyMeCoffee' element={<BuyMeCoffee />} />
               <Route path='/backup' element={<LazyBackup />} />
               <Route path='/restore' element={<LazyRestore />} />
               <Route path='/changelog' element={<LazyChangelog />} />
               <Route path='/author/team' element={<LazyContributors />} />
               <Route path='/loading' element={<LoadingScreen />} />
               <Route path='/test' element={<LazyTest />} />
               <Route path='messages' element={<LazyMessages />} />
               <Route path='/restoreStartup' element={<LazyRestoreStartup />} />
               <Route path='/notes' element={<LazyNotes />} />
               <Route path='/notes/add' element={<LazyNotesAdd />} />
               <Route path='/notes/edit' element={<LazyNotesEdit />} />
            </Routes>
         </React.Suspense>
      </Router>
   );
}
