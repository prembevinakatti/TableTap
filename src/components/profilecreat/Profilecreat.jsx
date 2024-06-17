import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";
import InputBox from "../InputBox/InputBox";
import profileService from "../../appwrite/profileservices";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../store/profileslice";


const ProfileDetails = ({ flag }) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, register, setValue, formState: { errors } } = useForm();
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      console.log("Profile Data:", data);

      if (!profileImageFile) {
        console.error("Profile image file is missing.");
        throw new Error("Profile image file is required.");
      }

      console.log("Uploading file:", profileImageFile);

      const fileData = await profileService.uploadFile({ file: profileImageFile });

      console.log("File uploaded:", fileData);

      if (fileData) {
        const createProfile = await profileService.createProfile({
          imageid: fileData.$id,
          isres: flag,
          locaton: data.location,
          name: userData.name,
          phone: data.phoneNumber,
          slug: userData.name,
          UserId: userData.$id
        });

        console.log("Profile created:", createProfile);

        if (createProfile) {
          dispatch(updateProfile({ profiledata: createProfile }));
          navigate(flag ? '/resphotouploedpage' : '/userhomepage');
        }
      }
    } catch (error) {
      console.error("Error while creating profile:", error);
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
      <div className='w-full text-6xl text-gray-600 text-center'>{flag ? "Restaurant Profile Create" : "User Profile Create"}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 justify-center">
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

        <div className="w-full px-5">
          <InputBox
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
            placeholder="Phone Number"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

          <InputBox
            {...register("location", { required: "Location is required" })}
            placeholder="Location"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        <div className="Buttons w-full mt-1 flex items-center justify-evenly">
          <Button details="btn-wide" info="Next" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
