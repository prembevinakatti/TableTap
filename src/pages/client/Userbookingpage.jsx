import React, { useEffect, useState } from 'react'

function Userbookingpage({resid}) {
    const [resdata,setresdata]=useState()
    useEffect(()=>{
        const getCurrentUser = async () => {
           
            try {
              const profileData = await profileService.getUser(slug);
              if (profileData) {
                setresdata(profileData);
              } 
            } catch (error) {
              console.error("Error fetching profile data:", error);
              setError("Error fetching profile data. Please try again later.");
            } 
          };
      
          getCurrentUser();
        
    },[])
  return (
        x
  )
}

export default Userbookingpage