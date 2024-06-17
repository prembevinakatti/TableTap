import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";
import profileService from "../../appwrite/profileservices";
import { useNavigate } from "react-router-dom";

const AddPhotos = () => {
  const navigate=useNavigate()
  const profiledata=useSelector((state)=>(state.profile.profiledata))
  const [restaurantImagesPreview, setRestaurantImagesPreview] = useState([]);
  const {
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  const maxImages = 4;

  const onSubmit = async (data) => {
    const allImages = data.restaurantImages;

    try {
      const imageIds = [];
      for (let img of allImages) {
        const fileId = await profileService.uploadFile(img[0]);
        if (fileId) {
          imageIds.push(fileId);
        }
      }
     let  uploedimgid=await profileService.updategropimges({slug:profiledata.$id,gropimg:JSON.stringify(imageIds)})
      if (uploedimgid){
        navigate('/Resroomsetup')
        
      }
      console.log("Uploaded image IDs:", imageIds);

      // Optionally, handle success or navigate to the next step
    } catch (error) {
      console.error("Error uploading images:", error);
      // Optionally, handle error state or display error message
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
    <div className="flex flex-col items-center gap-5 justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 justify-center">
        <div className="ResImg">
          <div className="w-[60vw] h-[40vh] flex items-center justify-center rounded-xl bg-[#c5c5c5]">
            <label className="btn btn-wide bg-secondary text-primary border-none">
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
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
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
