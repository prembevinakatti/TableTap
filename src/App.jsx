import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { varifed } from "./store/authslice";
import { updateProfile } from "./store/profileslice";
import authService from "./appwrite/authservices";
import profileService from "./appwrite/profileservices";
import Layout from "./components/others/outlet";
import { useNavigate } from "react-router-dom";
import Map from "./components/Map/Map";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData.emailVerification === true) {
          dispatch(varifed({ userData: userData }));
          
          let profileData;
          if (userData.name.includes("-user")) {
            profileData = await profileService.getuseruser(userData.name);
            if (profileData) {
              console.log(profileData);
              dispatch(updateProfile({ profiledata: profileData }));
              navigate(`/userprofilepage/${profileData.$id}`);
            }
          } else {
            profileData = await profileService.getUser(userData.name);
            if (profileData) {
              console.log(profileData);
              dispatch(updateProfile({ profiledata: profileData }));
              navigate(`/resprofilepage/${profileData.$id}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, [dispatch, navigate]);

  return (
    <>
      <Layout />     
    </>
  );
}

export default App;
