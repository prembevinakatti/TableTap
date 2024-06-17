import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { varifed } from "./store/authslice";
import { updateProfile } from "./store/profileslice";
import authService from "./appwrite/authservices";
import profileService from "./appwrite/profileservices";
import Layout from "./components/others/outlet";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData.emailVerification === true) {
          dispatch(varifed({ userData: userData }));
          const profileData = await profileService.getUser(userData.name);
          if (profileData) {
            console.log(profileData)
            dispatch(updateProfile({ profiledata: profileData }))
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, [dispatch]);

  return (
    <>
      
      <Layout />
     
    </>
  );
}

export default App;
