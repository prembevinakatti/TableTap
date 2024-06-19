import React from 'react'
import RoomType from '../../components/RoomType/RoomType'
import { useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

function Resroomviewpage() {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profiledata);

  return (
    <>
      <RoomType />
      <div className="Buttons mt-10 flex items-center justify-center gap-20">
     
        <button
          details="btn-wide border border-secondary bg-transparent text-secondary"
          info="Go Back"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <button
          details="btn-wide border border-secondary bg-transparent text-secondary"
          info="Go Back"
          onClick={() => navigate("/restiming")}
        >
            Save Changes
        </button>
      
      </div>
   
    </>
  )
}

export default Resroomviewpage;
