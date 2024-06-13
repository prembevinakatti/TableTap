import React from 'react'
import Button from '../Button/Button'

const FooterBtns = () => {
  return (
    <div className='border-t flex itemce justify-between p-3 border-primary'>
        <Button details="btn-wide border bg-transparent border-secondary text-secondary" info="Reservations" />
        <Button details="btn-wide border bg-transparent border-secondary text-secondary" info="Payments" />
        <Button details="btn-wide" info="Profile" />
    </div>
  )
}

export default FooterBtns