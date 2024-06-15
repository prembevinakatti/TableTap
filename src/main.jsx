import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SignUp from './components/LoginAndSignUp/SignUp.jsx'
import Otpverify from './components/LoginAndSignUp/otpverification.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/otpverification' element={<Otpverify/>}/>
    </Route>
  )
 
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
  </Provider>
)
