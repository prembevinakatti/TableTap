import { useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <SignUp /> */}
      <Login />
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
      {/* <UserProfilePage /> */}
      {/* <LandingPage /> */}
    </>
  );
}

export default App;
