import React from 'react'
import RoomType from '../../components/RoomType/RoomType'
import { useSelector } from 'react-redux'
import Button from '../../components/Button/Button'

function Resroomviewpage() {
  const profileData = useSelector((state) => state.profile.profiledata);
  return (
        <>
        <RoomType/>
        <div className="Buttons mt-10 flex items-center justify-center gap-20">
          <Button
            details="btn-wide border border-secondary bg-transparent text-secondary"
            info="Go Back"
            onClick={() => navigate(`resroomedit`)} 
          />
          <Button details="btn-wide" info="Save Changes"
           onClick={() => navigate(`resprofilepage`)}
           />
        </div>
        </>
  )
}

export default Resroomviewpage