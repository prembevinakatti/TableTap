import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SignUp from './components/LoginAndSignUp/SignUp.jsx'
import Otpverify from './components/LoginAndSignUp/otpverification.jsx'
import ResDetails from './components/ResDetails/ResDetails.jsx'
import { Toaster } from 'react-hot-toast'
import RoomType from './components/RoomType/RoomType.jsx'
import UserBookingPage from './components/UserBookingPage/UserBookingPage.jsx'
import UserHomePage from './components/UserHomePage/UserHomePage.jsx'
import PostPage from './components/PostPage/PostPage.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import Ressinguppage from './pages/restorent/Singuppage.jsx'
import Login from './components/LoginAndSignUp/Login.jsx'
import Resverification from './pages/restorent/Resverification.jsx'
import Resloginpage from './pages/restorent/Resloginpage.jsx'
import Resroomsetup from './pages/restorent/Resroomsetup.jsx'
import Resprofilecreatepage from './pages/restorent/Resprofilecreatepage.jsx'
import Resphotouploed from './pages/restorent/Resphotouploed.jsx'
import Resroomviewpage from './pages/restorent/Resroomviewpage.jsx'
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
      <Route path='/res' element={<RoomType/>}/>
      <Route path='/resroomsetup' element={<Resroomsetup/>}/>
      <Route path='/bookings' element={<UserBookingPage/>}/>
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
