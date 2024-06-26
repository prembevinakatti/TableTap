import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Button from "../Button/Button";
import profileService from "../../appwrite/profileservices";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AddPhotos = ({ edit }) => {
  console.log(edit);
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profiledata);
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);
  const { handleSubmit, setValue, watch } = useForm();
  const maxImages = 4;

  const onSubmit = async (data) => {
    const allImages = data.restaurantImages;

    try {
      const imageIds = [];
      for (let img of allImages) {
        const fileId = await profileService.uploadFile({ file: img });
        if (fileId) {
          imageIds.push(fileId.$id);
        }
      }
      console.log(imageIds);

      const uploadImgId = await profileService.updategropimges({
        slug: profileData.$id,
        gropimg: JSON.stringify(imageIds),
        state: edit ? "photouploedphase" : edit?.state || "none",
      });

      if (uploadImgId) {
        edit ? navigate(`/resprofilepage/${profileData.$id}`) : navigate("/Resroomsetup");
      }

      console.log("Uploaded image IDs:", imageIds);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleRestaurantImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, maxImages - restaurantImagesPreview.length);
    const newImagesPreview = files.map((file) => URL.createObjectURL(file));
    setRestaurantImagesPreview((prevImages) => [...prevImages, ...newImagesPreview]);

    setValue("restaurantImages", [...(watch("restaurantImages") || []), ...files]);
  };

  const removeRestaurantImage = (index) => {
    setRestaurantImagesPreview((prevImages) => prevImages.filter((_, i) => i !== index));

    const currentFiles = watch("restaurantImages") || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    setValue("restaurantImages", newFiles);
  };

  return (
    <div className="flex flex-col m-10 p-5 items-center gap-5 justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center border p-10 rounded-lg shadow-lg gap-5 justify-center">
        <div className="ResImg">
          <div className="w-[60vw] h-[40vh] flex items-center justify-center rounded-xl bg-[#c5c5c5]">
            <label className="btn xl:btn-wide bg-secondary text-primary border-none">
              <div className="text-2xl">
                <FaPlus />
              </div>
              Add Restaurant Images
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleRestaurantImageChange}
                disabled={restaurantImagesPreview.length >= maxImages}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {restaurantImagesPreview.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Restaurant ${index + 1}`}
                  className="w-32 h-32 rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 m-1 flex items-center justify-center"
                  onClick={() => removeRestaurantImage(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div>
            <p className="text-tertiary font-semibold mt-2 text-xl">
              Number Of Images Selected: {restaurantImagesPreview.length}
            </p>
          </div>
        </div>

        <div className="Buttons w-full mt-1 flex items-center justify-evenly">
          <Button details="btn-wide" info="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddPhotos;
