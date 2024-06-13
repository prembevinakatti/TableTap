import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginAndSignUp from "./components/LoginAndSignUp/LoginAndSignUp";
import Photos from "./components/ProfileAndResPhoto/Photos";
import ResDetails from "./components/ResDetails/ResDetails";
import RoomType from "./components/RoomType/RoomType";
import ResTiming from "./components/ResTiming/ResTiming";
import Navbar from "./components/Navbar/Navbar";
import ResProfilePage from "./components/ResProfilePage/ResProfilePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginAndSignUp /> */}
      {/* <Photos /> */}
      {/* <ResDetails /> */}
      {/* <RoomType /> */}
      {/* <ResTiming /> */}
      {/* <Navbar /> */}
      <ResProfilePage />
    </>
  );
}

export default App;
