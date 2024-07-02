import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import profileService from "../../appwrite/profileservices";
import { Query } from "appwrite";
import StarRating from "../../components/starratting";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function UserHomePage() {
  const { register, handleSubmit, watch } = useForm();
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [usersaved, setUsersaved] = useState([]);
  const [users, setUsers] = useState("");
  const profiledata = useSelector((state) => state.profile.profiledata);

  const timeToMinutes = (time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleFetchDocuments = async (data) => {
    try {
      console.log("Form data:", data);
      const filters = [];

      if (data.location) filters.push(Query.equal("locaton", data.location));
      if (data.roomType) filters.push(Query.equal("type", data.roomType));

      console.log("Filters:", filters);

      const userTime = timeToMinutes(data.time);

      const response = await profileService.getqueryres({ query: filters });

      if (response) {
        const filteredDocuments = response.documents.filter((doc) => {
          const openTime = timeToMinutes(doc.opentime);
          const closeTime = timeToMinutes(doc.closetime);
          const startInterval = timeToMinutes(doc.startinterval);
          const closeInterval = timeToMinutes(doc.closeinterval);

          if (userTime === null || openTime === null || closeTime === null) {
            return false;
          }

          return (
            userTime >= openTime &&
            userTime <= closeTime &&
            !(userTime >= startInterval && userTime <= closeInterval)
          );
        });
        setDocuments(filteredDocuments);
        console.log("Filtered Documents:", filteredDocuments);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    const subscription = watch(handleSubmit(handleFetchDocuments));
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit]);

  useEffect(() => {
    if (profiledata) {
      setUsersaved(JSON.parse(profiledata.saved));
      setUsers(profiledata.$id);
    }
  }, [profiledata]);

  function handleSave(resid) {
    let updatedSaved = [...usersaved];
    if (updatedSaved.includes(resid)) {
      updatedSaved = updatedSaved.filter(id => id !== resid);
      toast.success("Saved removed successfully");
    } else {
      updatedSaved.push(resid);
      toast.success("Saved successfully");
    }
    setUsersaved(updatedSaved);
    profileService.updatesaved({ saved: JSON.stringify(updatedSaved), slug: users });
  }

  return (
    <div>
      <div className="UserHome">
        <form
          className="HomenavBtns m-2 flex flex-wrap items-center xl:gap-10 gap-3"
          onSubmit={handleSubmit(handleFetchDocuments)}
        >
          <div>
            <select
              className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
              {...register("location")}
              defaultValue=""
            >
              <option value="" disabled>
                Location
              </option>
              <option value="Gadag">Gadag</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Goa">Goa</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Mysore">Mysore</option>
              <option value="Laxmeshwar">Laxmeshwar</option>
              <option value="Bagalkot">Bagalkot</option>
            </select>
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input
              type="date"
              className="bg-transparent"
              {...register("date")}
            />
          </div>
          <div className="btn w-44 bg-primary text-secondary">
            <input
              type="time"
              className="bg-transparent"
              {...register("time")}
            />
          </div>
          <div>
            <select
              className="select w-44 btn text-lg bg-primary text-secondary max-w-xs"
              {...register("roomType")}
              defaultValue=""
            >
              <option value="" disabled>
                Type
              </option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Veg,Non-Veg">Veg, Non-Veg</option>
            </select>
          </div>
        </form>

        <div className="homeContent w-full h-[70vh] overflow-auto">
          <div className="xl:flex md:flex md:flex-wrap lg:flex lg:flex-wrap xl:flex-wrap items-center justify-center w-full my-3 h-full gap-10 rounded-lg p-5">
            {documents.map((doc) => (
              <div
                key={doc.$id}
                className="HomeBox flex flex-col items-start xl:w-1/4 h-[65vh] rounded-lg p-4 border m-3 shadow-lg"
              >
                <div className="cardImg w-full rounded-lg overflow-hidden border">
                  <img
                    className="w-full h-full"
                    src={
                      profileService.getFilePreview({
                        fileId: doc.imageid || "uyug",
                      }) || "https://via.placeholder.com/150"
                    }
                    alt={doc.name}
                  />
                </div>
                <div>
                <div className="w-full flex items-center justify-between">
                   <p className="font-semibold text-4xl w-full mt-2">
                     {doc.name}
                   </p>
                 <div>
                   <StarRating numOfStars={doc.ratings} color="orange" />
                   <StarRating numOfStars={doc.hygienePoints} color="blue" />
                 </div>
               </div>

                  <div>
                    <div>
                      <p className="text-lg my-1 font-semibold">{doc.locaton}</p>
                    </div>
                    {/* <div>
                      <p className="text-lg my-1 font-semibold">
                        {doc.addres || "this is the address"}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-lg my-1 font-semibold">{doc.type}</p>
                    </div>
                    <div>
                      <p className="text-lg my-1 font-semibold">{doc.isopen ? "open" : "close"}</p>
                    </div>
                    <div className="cardContent">
                      <p className="text-tertiary mt-5 text-sm leading-[1.2]">
                        {doc.address}
                      </p>
                      <p className="text-tertiary mt-10 font-semibold">
                        {doc.timings}
                      </p>
                      <p className="text-tertiary mt-10 font-semibold">
                      
                      </p>
                    </div>
                  </div>
                 
                </div>
                <div
                  onClick={() => navigate(`/resprofilepage/${doc.$id}`)}
                  className="btn w-full text-center hover:border-secondary hover:text-secondary bg-secondary text-primary"
                >
                  <p>More Details</p>
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
