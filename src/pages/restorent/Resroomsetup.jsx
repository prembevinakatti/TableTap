import React from 'react';
import ResDetails from '../../components/ResDetails/ResDetails';
import Navigator from '../../components/others/Navigator'
import { useLocation } from 'react-router-dom';

function Resroomsetup() {
  const { pathname } = useLocation();

  return (
    <>
      <ResDetails />
      <Navigator pathname={pathname} />
    </>
  );
}

export default Resroomsetup;
