import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { varifed, login } from "./store/authslice";
import { updateProfile } from "./store/profileslice";
import authService from "./appwrite/authservices";
import profileService from "./appwrite/profileservices";
import Layout from "./components/others/outlet";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log(userData);

        if (userData.emailVerification === true) {
          dispatch(varifed({ userData }));

          let profileData;
          if (userData.name.includes("-user")) {
            profileData = await profileService.getuseruser(userData.name);
            if (profileData) {
              if (profileData.state === "pending") {
                dispatch(updateProfile({ profiledata: profileData }));
                navigate(`/userprofilecreatepage/`);
              } else {
                dispatch(updateProfile({ profiledata: profileData }));
                navigate(`/userprofilepage/${profileData.$id}`);
              }
            } else {
              setLoading(false);
            }
          } else {
            profileData = await profileService.getUser(userData.name);
            if (profileData) {
              if (profileData.state === "incomplete") {
                console.log(profileData);
                dispatch(updateProfile({ profiledata: profileData }));
                navigate(`/resphotouploadpage`);
              } else if (profileData.state === "InitiationPhase") {
                console.log(profileData);
                dispatch(updateProfile({ profiledata: profileData }));
                navigate(`/resroomsetup`);
              } else if (profileData.state === "createdroom") {
                console.log(profileData);
                dispatch(updateProfile({ profiledata: profileData }));
                navigate(`/restiming`);
              } else {
                console.log(profileData);
                dispatch(updateProfile({ profiledata: profileData }));
                navigate(`/resprofilepage${profileData.$id}`);
              }
            } else {
              setLoading(false);
            }
          }
        } else {
          dispatch(login({ userData }));
          if (userData.name.includes("-user")) {
            navigate("/userverification");
          } else {
            navigate("/Resverification");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!loading) {
      navigate(location.pathname);
    }
  }, [loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
