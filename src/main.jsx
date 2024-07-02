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
import { Elements } from '@stripe/react-stripe-js';
import Resbankdetailspage from './pages/restorent/Resbankdetailspage.jsx'
import UserHomePage from './pages/client/userhomepage.jsx'
import UserBookingPage from './components/UserBookingPage/UserBookingPage.jsx'
import Foodmenu from './pages/restorent/Foodmenu.jsx'
import ResReservation from './components/ResReservation/ResReservation.jsx'
import Userbookingpage from './pages/client/Userbookingpage.jsx'
import { useElements } from '@stripe/react-stripe-js'
import UserBookingPageWrapper from './pages/client/Userbookingpagewraper.jsx'
import ResPayment from './components/ResPayment/ResPayment.jsx'
import Respayments from './pages/restorent/Respayments.jsx'
import Userpayments from './pages/client/userpayments.jsx'
import Userreservation from './pages/client/Userreservationpage.jsx'
import UserReviewPage from './pages/client/Userreviewpage.jsx'
import Resresrvationpage from './pages/restorent/Resresevationpage.jsx'

import Userfeedbackpage from './pages/client/Userfeedbackpage.jsx'
import Restorentfeedbackpage from './pages/restorent/restorentfeedbackpage.jsx'
import Map from './components/Map/Map.jsx'
import ResTravelSetup from './pages/restorent/Restravelsetup.jsx'
import UsertravelBookingPageWrapper from './pages/client/usertravelbookingpage.jsx'
import Usertravlingbookedpage from './pages/client/Usertravlingbookedpage.jsx'
import Resalltravlingbookingpage from './pages/restorent/Resalltravlingbookingpage.jsx'



const stripePromise="pk_test_51PT4pOAM7tB5pG0HD581QBg3nRbKadN9taCSabrmIuQNCX08wF6GOrUFUlVMGx5PVsxoF99xAoE13PfXjkIFCiew004JzB7cCt"
const router=createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App/>}>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/Ressinguppage' element={<Ressinguppage/>}/>
      <Route path='/resloginpage' element={<Resloginpage/>}/>
      <Route path='/Resverification' element={<Resverification/>}/>
      <Route path='/resprofilecreatepage' element={<Resprofilecreatepage/>}/>
      <Route path='/resphotouploadpage' element={<Resphotouploed/>}/>
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
      <Route path='/userhomepage' element={<UserHomePage/>}/>
      <Route path='/resbankdetailspage' element={<Resbankdetailspage/>}/>
      <Route path='/fooddetailspage' element={<Foodmenu/>}/>
      <Route path="/userbookingpage/:slug" element={<UserBookingPageWrapper />} />
      <Route path="/Respayments" element={<Respayments />} />
      <Route path="/Userpayments" element={<Userpayments/>} />
      <Route path="/ResReservation" element={<ResReservation/>} />
      <Route path="/userreservation" element={<Userreservation/>} />
      <Route path="/UserReviewPage/:slug" element={<UserReviewPage/>} />
      <Route path="/Resresrvationpage" element={<Resresrvationpage/>} />
      <Route path="/Restorentfeedbackpage" element={<Restorentfeedbackpage/>} />
      <Route path="/Userfeedbackpage" element={<Userfeedbackpage/>} />
      <Route path="/restravelsetup" element={<ResTravelSetup/>} />
      <Route path="/UsertravelBookingPageWrapper/:slug" element={<UsertravelBookingPageWrapper/>} />
      <Route path="/Usertravlingbookedpage" element={<Usertravlingbookedpage/>} />
      <Route path="/Resalltravlingbookingpage" element={<Resalltravlingbookingpage/>} />
     
   
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
