import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import profileService from "../../appwrite/profileservices";
import { Query } from "appwrite";
import StarRating from "../../components/starratting";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
      alert("Saved removed successfully");
    } else {
      updatedSaved.push(resid);
      alert("Saved successfully");
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
                  <div>
                    <button
                      onClick={() => handleSave(doc.resid)}
                      title="Save"
                      className="cursor-pointer flex items-center fill-lime-400 bg-lime-950 hover:bg-lime-900 active:border active:border-lime-400 rounded-md duration-100 p-2"
                    >
                      <svg
                        viewBox="0 -0.5 25 25"
                        height="20px"
                        width="20px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                      <span className=" text-sm text-lime-400 font-bold pr-1">
                        Save Post
                      </span>
                    </button>
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
