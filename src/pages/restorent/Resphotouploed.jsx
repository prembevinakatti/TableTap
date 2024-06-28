import React from 'react'
import AddPhotos from '../../components/ProfileAndResPhoto/Photos'
import Navigator from '../../components/others/Navigator'
import { useLocation } from 'react-router-dom'

function Resphotouploed() {
  const {pathname} = useLocation()
  return (
<>
      <Navigator pathname={pathname}  />
      <AddPhotos/>
</>
  )
}

export default Resphotouploed