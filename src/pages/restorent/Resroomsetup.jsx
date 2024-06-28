import React from 'react';
import ResDetails from '../../components/ResDetails/ResDetails';
import Navigator from '../../components/others/Navigator'
import { useLocation } from 'react-router-dom';

function Resroomsetup() {
  const { pathname } = useLocation();

  return (
    <>
      <Navigator pathname={pathname} />
      <ResDetails />
    </>
  );
}

export default Resroomsetup;
