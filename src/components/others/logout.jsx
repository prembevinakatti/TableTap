import React from 'react'
import authService from '../../appwrite/authservices'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authslice'

const Logout = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  function handelogout(){
    authService.logout().then(()=>{
      
      navigate("/")
      dispatch(logout())
     
    })
  }
  return (
    <Button details="btn-wide" info="Logout" onclick={handelogout}  />
  )
}

export default Logout