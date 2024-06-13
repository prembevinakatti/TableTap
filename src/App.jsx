import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginAndSignUp from "./components/LoginAndSignUp/LoginAndSignUp";
import Photos from "./components/ProfileAndResPhoto/Photos";
import ResDetails from "./components/ResDetails/ResDetails";
import RoomType from "./components/RoomType/RoomType";
import ResTiming from "./components/ResTiming/ResTiming";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginAndSignUp /> */}
      {/* <Photos /> */}
      {/* <ResDetails /> */}
      {/* <RoomType /> */}
      <ResTiming />
    </>
  );
}

export default App;
