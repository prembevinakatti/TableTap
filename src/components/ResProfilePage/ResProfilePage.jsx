import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import { IoIosArrowDown } from "react-icons/io";
import FooterBtns from "../FooterBtns/FooterBtns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import profileService from "../../appwrite/profileservices";
import RoomType from "../RoomType/RoomType";

const ResProfilePage = () => {
  const [profileData, setProfileData] = useState("");
  const { slug } = useParams();
  const [roomDetails, setRoomDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const profileData = await profileService.getUser(slug);
        if (profileData) {
          setProfileData(profileData);
          setRoomDetails(JSON.parse(profileData.roomdetaisl || "[]").groups || []);
        } else {
          setRoomDetails([]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Error fetching profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [slug]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = JSON.parse(profileData.gropimg || "[]");
  console.log(images)

  return (
    <div>
      <div className="profilePage flex flex-col items-center justify-center gap-5">
        {loading ? (
          <div className="flex flex-col gap-4 w-52">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        ) : (
          <div className="profile w-[80vw] flex items-center justify-around gap-10 h-[20vw] rounded-lg border mt-5 shadow-md">
            <div className="profileImg">
              <img
                className="w-56 bg-red-500 h-56 rounded-full"
                src={
                  profileService.getFilePreview({fileId: profileData.imageid || ""}) ||
                  "https://static.vecteezym/resources/previews/019/776/467/non_2x/user-icon-fake-photo-sign-profile-button-simple-style-social-media-poster-background-symbol-user-brand-logo-design-element-user-t-shirt-printing-for-sticker-free-vector.jpg"
                }
                alt="profilephoto"
              />
            </div>
            <div className="ResInfo">
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Name: {profileData.name||""}
              </p>
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Location: {profileData.locaton||""}
              </p>
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Opening: {profileData.opentime||""}
              </p>
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Closing: {profileData.closetime||""}
              </p>
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Open Interval: {profileData.openinterval||""}
              </p>
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Close Interval: {profileData.closeinterval||""}
              </p>
              <p className="text-2xl font-semibold m-2 text-secondary">
                Restaurant Contact: {profileData.phone||""}
              </p>
            </div>
          </div>
        )}
        <div className="flex w-[80vw] items-center justify-between">
          <Button details="btn-wide" info="Edit Profile" />
          <Button details="btn-wide" info="Edit Time" />
        </div>
      </div>

      <div>
        <h1 className="text-4xl text-tertiary w-full text-center my-5">
          Restaurant Images
        </h1>
      </div>
      <div className="w-full px-20 flex h-[70vh] overflow-hidden flex-col justify-center">
        <Slider {...settings}>
          {images.map((url, index) => (
            <div key={index}>
              <img
                className="w-full h-full object-cover"
                src={profileService.getFilePreview({fileId:url})}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>

      <h1 className="w-full text-center text-4xl mt-10 text-tertiary">
        Table View
      </h1>
      <RoomType roomData={roomDetails} loading={loading} error={error} />

      <Button details="btn-wide absolute right-36" info="Edit Table" />

      <h1 className="w-full text-center text-4xl mt-20 text-tertiary">
        Analytics And Ratings
      </h1>

      <div className="Analytics w-full flex mt-5 items-center justify-center">
        <div className="w-[80vw] flex items-start justify-center p-3 m-3 gap-5 h-[30vw] rounded-lg border mt-5 shadow-md">
          <div className="analytics w-3/4 rounded-lg shadow-sm h-full flex items-center justify-center border">
            <p className="text-4xl font-semibold text-tertiary">Analytics</p>
          </div>
          <div className="analytics w-1/4 rounded-lg shadow-sm h-full flex flex-col gap-5 items-center justify-center border">
            <p className="text-3xl font-semibold text-tertiary">
              Average Ratings
            </p>
            <div className="rating rating-lg">
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResProfilePage;
