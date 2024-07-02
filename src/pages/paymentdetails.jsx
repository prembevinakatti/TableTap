import { useEffect } from "react"
import { useParams } from "react-router-dom"
import profileService from "../appwrite/profileservices"

function Paymentdetails(){
    
    const{slug}=useParams()
    console.log(slug)
    useEffect(()=>{
        profileService.getpayment({slug:slug}).then((data)=>{
            console.log(data)

        })

    },[])
    return<></>
}
export default Paymentdetails