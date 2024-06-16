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
const router=createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/otpverification' element={<Otpverify/>}/>
      <Route path='/ResDetails' element={<ResDetails/>}/>
      <Route path='/roomview' element={<RoomType/>}/>
      <Route path='/bookings' element={<UserBookingPage/>}/>
      <Route path='/userhome' element={<UserHomePage/>}/>
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
