import React from 'react'
import { useSelector } from 'react-redux'
import ResDetails from '../../components/ResDetails/ResDetails'

function Resroomedit() {
    const profiledata=useSelector((state)=>(state.profile.profiledata))
  return (
      <>
        <ResDetails editdata={profiledata}/>

</>
  )
}

export default Resroomedit