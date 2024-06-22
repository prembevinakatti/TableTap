import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import Ressinguppage from './pages/restorent/Singuppage.jsx'
import Resverification from './pages/restorent/Resverification.jsx'
import Resloginpage from './pages/restorent/Resloginpage.jsx'
import Resroomsetup from './pages/restorent/Resroomsetup.jsx'
import Resprofilecreatepage from './pages/restorent/Resprofilecreatepage.jsx'
import Resphotouploed from './pages/restorent/Resphotouploed.jsx'
import Resroomviewpage from './pages/restorent/Resroomviewpage.jsx'
import ResTiming from './components/ResTiming/ResTiming.jsx'
import ResProfilePage from './components/ResProfilePage/ResProfilePage.jsx'
import Resprofileedit from './pages/restorent/Resprofileedit.jsx'
import Resroomedit from './pages/restorent/Resroomedit.jsx'
import Usersinguppage from './pages/client/Usersinguppage.jsx'
import Userloginpage from './pages/client/Userloginpage.jsx'
import Userverification from './pages/client/Userverification.jsx'
import Userprofilecreatepage from './pages/client/Userprofilecreatepage.jsx'
import Userprofilepage from './pages/client/Userprofilepage.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/Ressinguppage' element={<Ressinguppage/>}/>
      <Route path='/resloginpage' element={<Resloginpage/>}/>
      <Route path='/Resverification' element={<Resverification/>}/>
      <Route path='/resprofilecreatepage' element={<Resprofilecreatepage/>}/>
      <Route path='/resphotouploedpage' element={<Resphotouploed/>}/>
      <Route path='/resroomviewpage' element={<Resroomviewpage/>}/>
      <Route path='/restiming' element={<ResTiming/>}/>
      <Route path='/resprofilepage/:slug' element={<ResProfilePage/>}/>
      <Route path='/resroomsetup' element={<Resroomsetup/>}/>
      <Route path='/resprofileedit' element={<Resprofileedit/>}/>
      <Route path='/resresroomedit' element={<Resroomedit/>}/>
      <Route path='/usersinguppage' element={<Usersinguppage/>}/>
      <Route path='/userloginpage' element={<Userloginpage/>}/>
      <Route path='/userverification' element={<Userverification/>}/>
      <Route path='/userprofilecreatepage' element={<Userprofilecreatepage/>}/>
      <Route path='/userprofilepage/:slug' element={<Userprofilepage/>}/>
      
    </Route>
  )
 
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
  <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
