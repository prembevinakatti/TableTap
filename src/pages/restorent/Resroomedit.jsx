import React from 'react'

function Resroomedit() {
    const profiledata=useSelector((state)=>(state.profile.profiledata))
  return (
      <>
        <ResDetails editdata={profiledata}/>
        <Navigator pathname={pathname} />
</>
  )
}

export default Resroomedit