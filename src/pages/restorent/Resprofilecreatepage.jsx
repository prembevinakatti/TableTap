import React from "react";
import ProfileDetails from "../../components/profilecreat/Profilecreat";
import Navigator from "../../components/others/Navigator";
import { useLocation } from "react-router-dom";

function Resprofilecreatepage() {
  const { pathname } = useLocation();

  return (
    <>
      <Navigator pathname={pathname} />
      <ProfileDetails flag={true} />
    </>
  );
}

export default Resprofilecreatepage;
