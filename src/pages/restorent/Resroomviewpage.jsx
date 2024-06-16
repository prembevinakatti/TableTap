import React from 'react'
import RoomType from '../../components/RoomType/RoomType'

function resroomviewpage() {
  return (
        <>
        <RoomType/>
        <div className="Buttons mt-10 flex items-center justify-center gap-20">
          <Button
            details="btn-wide border border-secondary bg-transparent text-secondary"
            info="Go Back"
          />
          <Button details="btn-wide" info="Save Changes" />
        </div>
        </>
  )
}

export default resroomviewpage