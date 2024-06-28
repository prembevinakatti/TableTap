import React from 'react';
import SignUp from '../../components/LoginAndSignUp/SignUp';
import { useLocation } from 'react-router-dom';
import Navigator from '../../components/others/Navigator'; 
import { Flag } from 'appwrite';
function Ressinguppage() {
  const { pathname } = useLocation();

  return (
    <>
    
      <Navigator pathname={pathname} />
      <SignUp flag={true} />
    </>
  );
}

export default Ressinguppage;
