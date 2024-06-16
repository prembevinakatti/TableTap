import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import SignUp from "./components/LoginAndSignUp/SignUp";
import Photos from "./components/ProfileAndResPhoto/Photos";
import ResDetails from "./components/ResDetails/ResDetails";
import RoomType from "./components/RoomType/RoomType";
import ResTiming from "./components/ResTiming/ResTiming";
import Navbar from "./components/Navbar/Navbar";
import ResProfilePage from "./components/ResProfilePage/ResProfilePage";
import ResPayment from "./components/ResPayment/ResPayment";
import ResReservation from "./components/ResReservation/ResReservation";
import UserHomePage from "./components/UserHomePage/UserHomePage";
import PostPage from "./components/PostPage/PostPage";
import UserBookingPage from "./components/UserBookingPage/UserBookingPage";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LoginAndSignUp/Login";
import Otpverify from "./components/LoginAndSignUp/otpverification";

import Layout from "./components/others/outlet";
import authService from "./appwrite/authservices";
import { useDispatch } from "react-redux";
import { varifed } from "./store/authslice";
function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async() => {
      try {
        const userData = await authService.getCurrentUser()
        console.log(userData)
        if(userData.emailVerification == true){
          dispatch(varifed({ userData: userData }));
        }
      } catch (error) {
        console.error(error)
      }
    }

    getCurrentUser()
  }, [])


  

  return (
    <>
      {/* <SignUp /> */}
      {/* <Login /> */}
      {/* <Photos /> */}
      {/* <ResDetails /> */}
      {/* <RoomType /> */}
      {/* <ResTiming /> */}
      {/* <Navbar /> */}
      {/* <ResProfilePage /> */}
      {/* <ResPayment /> */}
      {/* <ResReservation /> */}
      {/* <UserHomePage /> */}
      {/* <PostPage /> */}
      {/* <UserBookingPage /> */}
      <UserProfilePage />
      {/* <LandingPage /> */}
      {/* <Otpverify/> */}
      {/* <Layout/> */}
    </>
  );
}

export default App;
