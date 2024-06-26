import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import profileService from "../../appwrite/profileservices";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../store/profileslice";

const ProfileDetails = ({ flag, edit }) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const locationRef = useRef();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(JSON.stringify(position.coords.latitude));
            setLongitude(JSON.stringify(position.coords.longitude));
            setError(null);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Profile Data:", data);

      if (!profileImageFile) {
        console.error("Profile image file is missing.");
        throw new Error("Profile image file is required.");
      }

      console.log("Uploading file:", profileImageFile);
      const fileData = await profileService.uploadFile({
        file: profileImageFile,
      });

      console.log("File uploaded:", fileData);

      if (fileData) {
        let createOrUpdateProfile;
        if (edit) {
          if (flag) {
            createOrUpdateProfile = await profileService.updateprofile({
              imageid: fileData.$id,
              isres: flag,
              locaton: data.location,
              name: userData.name,
              phone: data.phoneNumber,
              slug: userData.name,
              UserId: userData.$id,
              state: edit.state,
              type: data.type,
              latitude: edit.latitude ? edit.latitude : latitude,
              longitude: edit.longitude ? edit.longitude : longitude,
            });
          } else {
            createOrUpdateProfile = await profileService.updateuserProfile({
              imageid: fileData.$id,
              isres: flag,
              locaton: data.location,
              name: userData.name,
              phone: data.phoneNumber,
              slug: userData.name,
              UserId: userData.$id,
              state: edit.state,
              latitude: edit.latitude ? edit.latitude : latitude,
              longitude: edit.longitude ? edit.longitude : longitude,
            });
          }
        } else {
          if (flag) {
            createOrUpdateProfile = await profileService.createProfile({
              imageid: fileData.$id,
              isres: flag,
              locaton: data.location,
              name: userData.name,
              phone: data.phoneNumber,
              slug: userData.name,
              UserId: userData.$id,
              type: data.type,
              latitude: latitude,
              longitude: longitude,
            
            });
          } else {
            createOrUpdateProfile = await profileService.createuserProfile({
              imageid: fileData.$id,
              isres: flag,
              locaton: data.location,
              name: userData.name,
              phone: data.phoneNumber,
              slug: userData.name,
              UserId: userData.$id,
              latitude: latitude,
              longitude: longitude,
            });
          }
        }

        console.log("Profile created/updated:", createOrUpdateProfile);

        if (createOrUpdateProfile) {
          dispatch(updateProfile({ profiledata: createOrUpdateProfile }));
          if (edit) {
            navigate(flag ? `/resprofilepage/${edit.$id}` : `/userhomepage/${edit.$id}`);
          } else {
            navigate(flag ? "/resphotouploadpage" : `/userprofilepage/${createOrUpdateProfile.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error while creating/updating profile:", error);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Profile image selected:", file);
      setProfileImagePreview(URL.createObjectURL(file));
      setProfileImageFile(file);
      setValue("profileImage", file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 justify-center">
      <div className="w-full xl:text-4xl text-2xl mt-2 text-gray-600 text-center">
        {flag ? "Restaurant Profile Create" : "User Profile Create"}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-16 py-28 md:w-fit md:p-32 flex-col items-center gap-10 border shadow-lg rounded-lg justify-center"
      >
        <div>
          <div className="profileImg">
            <div className="relative flex flex-col items-center">
              <img
                className="w-52 h-52 rounded-full overflow-hidden"
                src={profileImagePreview || "https://via.placeholder.com/150"}
                alt="Profile"
              />
              <label className="btn absolute bottom-3 right-2 rounded-full border-none cursor-pointer bg-secondary text-primary">
                <FaPlus />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <InputBox
            info="w-full"
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            placeholder="Phone Number"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}

          <InputBox
            ref={locationRef}
            info="w-full"
            {...register("location", { required: "Location is required" })}
            placeholder="Location"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
          {flag && (
            <select
              {...register("type")}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="veg-nonveg">Veg, Non-Veg</option>
            </select>
          )}
        </div>

        <div className="Buttons w-full mt-1 flex items-center justify-evenly">
          <Button details="btn-wide" info="Next" type="submit" />
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProfileDetails;
