import { useEffect } from "react"
import { useParams } from "react-router-dom"
import profileService from "../appwrite/profileservices"

function paymentdetails(){
    const{slug}=useParams()
    useEffect(()=>{
        profileService.getpayment({slug:slug}).then((data)=>{
            console.log(data)

        })

    },[])
    return<></>
}