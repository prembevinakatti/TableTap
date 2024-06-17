import React, { useEffect, useState } from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import profileService from "../../appwrite/profileservices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../store/profileslice";


const ResDetails = (editdata) => {
  const userdata=useSelector((state)=>(state.auth.userData))
  const profiledata=useSelector((state)=>(state.profile.profiledata))
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [formValues, setFormValues] = useState({
    numberOfRooms: "",
    groups: [
      {
        name: "Rooms Includes AC",
        includes: "Yes",
        numRooms: "",
        numTables: "",
        numChairsPerTable: "",
      },
      {
        name: "Room Includes Normal Room",
        includes: "Yes",
        numRooms: "",
        numTables: "",
        numChairsPerTable: "",
      },
      {
        name: "Room Includes Party Room",
        includes: "Yes",
        numRooms: "",
        numTables: "",
        numChairsPerTable: "",
      },
      {
        name: "Room Include Custom Room",
        includes: "Yes",
        numRooms: "",
        numTables: "",
        numChairsPerTable: "",
      },
    ],
  });
    useEffect(()=>{
        if(editdata){
          const getCurrentUser = async() => {
            try {
              const userData = await profileService.getUser(editdata.$id)
              if(userData){
                let  data=JSON.parse(userData.roomdetaisl||"[ ]") 
                  setFormValues(data)
              }
             
            } catch (error) {
              console.error(error)
            }
          }
      
          getCurrentUser()
        }
    },[])
  const handleChange = (e, groupIndex, key) => {
    const { value } = e.target;
    if (key === "includes") {
      setFormValues((prevValues) => ({
        ...prevValues,
        groups: [
          ...prevValues.groups.slice(0, groupIndex),
          {
            ...prevValues.groups[groupIndex],
            [key]: value,
            numRooms: value === "No" ? "" : prevValues.groups[groupIndex].numRooms,
            numTables: value === "No" ? "" : prevValues.groups[groupIndex].numTables,
            numChairsPerTable: value === "No" ? "" : prevValues.groups[groupIndex].numChairsPerTable,
          },
          ...prevValues.groups.slice(groupIndex + 1),
        ],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        groups: [
          ...prevValues.groups.slice(0, groupIndex),
          {
            ...prevValues.groups[groupIndex],
            [key]: value,
          },
          ...prevValues.groups.slice(groupIndex + 1),
        ],
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalRooms = formValues.groups.reduce(
      (total, group) =>
        group.includes === "Yes" ? total + parseInt(group.numRooms || 0, 10) : total,
      0
    );
    if (parseInt(formValues.numberOfRooms, 10) === totalRooms) {
      console.log("Form is valid:", formValues);
      if(editdata){
        async function updatedata(){
          try 
          {
           let isedited=await profileService.updateroomdetails({slug:editdata.$id,roomdetaisl:JSON.stringify(formValues)})
            if(isedited){
              toast.success("room details edited sucessfuly")
              navigate('Resroomview')
            }
            
          } catch (error) {
            console.log(error)
          }

        }
       updatedata()
      }else{
        async function creatprofile(){
          try {
           let isprofile=await profileService.createroomdetails({slug:profiledata.$id,roomdetaisl:JSON.stringify(formValues)})
                if (isprofile){
                  console.log(isprofile)
                  
                  navigate('Resroomview')
                  
                }
            
          } catch (error) {
            console.log(error)
          }
        }
      }
      
    } else {
      console.log("Form is invalid: Number of rooms mismatch");
     toast.error("Form is invalid: Number of rooms mismatch")
    }
  };

  return (
    <div>
      <ProfileNav />

      <form onSubmit={handleSubmit}>
        <div className="ResDetails w-full flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <p className="text-tertiary font-semibold text-lg">
              Number Of Rooms For Reservation
            </p>
            <input
              type="text"
              value={formValues.numberOfRooms}
              onChange={(e) =>
                setFormValues({ ...formValues, numberOfRooms: e.target.value })
              }
              className="border px-3 py-1 rounded-lg"
            />
          </div>

          {formValues.groups.map((group, index) => (
            <div key={index}>
              <div className="flex items-center mt-5 gap-5">
                <label className="text-tertiary font-semibold text-lg">
                  {group.name}
                </label>
                <div className="flex items-center gap-4">
                  {["Yes", "No"].map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <p className="text-tertiary font-semibold text-lg">
                        {option}
                      </p>
                      <input
                        type="radio"
                        value={option}
                        checked={group.includes === option}
                        onChange={(e) => handleChange(e, index, "includes")}
                        className="radio radio-warning"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`border mt-2 p-3 px-10 rounded-lg flex gap-20 items-center ${group.includes === "No" ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="flex items-center gap-3">
                  <p className="text-tertiary font-semibold">Number Of Rooms</p>
                  <input
                    type="text"
                    value={group.numRooms}
                    onChange={(e) => handleChange(e, index, "numRooms")}
                    disabled={group.includes === "No"}
                    className="border px-3 py-1 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-tertiary font-semibold">Number Of Tables</p>
                  <input
                    type="text"
                    value={group.numTables}
                    onChange={(e) => handleChange(e, index, "numTables")}
                    disabled={group.includes === "No"}
                    className="border px-3 py-1 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-tertiary font-semibold">
                    Number Of Chairs Per Table
                  </p>
                  <input
                    type="text"
                    value={group.numChairsPerTable}
                    onChange={(e) => handleChange(e, index, "numChairsPerTable")}
                    disabled={group.includes === "No"}
                    className="border px-3 py-1 rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="Buttons mt-10  flex items-center justify-center gap-20">
         
          <Button details="btn-wide " info="Save Changes" />
        </div>

       
      </form>
    </div>
  );
};

export default ResDetails;
