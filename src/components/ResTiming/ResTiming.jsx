import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import { LuPlus } from "react-icons/lu";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { useNavigate } from "react-router-dom";

const ResTiming = () => {
  const { register, handleSubmit } = useForm();
  const [intervalEnabled, setIntervalEnabled] = useState(false);
  const profiledata = useSelector((state) => state.profile.profiledata);
  const navigate=useNavigate()
  async function handleTimeData(data) {
    try {
      const timingData = {
        closetime: data.closetime,
        opentime: data.opentime,
        slug: profiledata.$id,
        startinterval: intervalEnabled ? data.startinterval : "",
        closeinterval: intervalEnabled ? data.closeinterval : "",
        state:"semicompleted"
      };
     const timeuploded= await profileService.updatetimings(timingData);
     if(timeuploded){
      navigate(`/resprofilepage/${profiledata.$id}`)
     }
    } catch (error) {
      console.error("Error updating timings:", error);
    }
    console.log(data);
  }

  function handleIntervalToggle() {
    setIntervalEnabled((prev) => !prev);
  }

  return (
    <form onSubmit={handleSubmit(handleTimeData)}>
      <div className="flex gap-5 w-full h-[65vh] flex-col items-center justify-center">
        <div className="Timing shadow-lg w-[70vw] flex flex-col gap-10 items-center justify-center h-[30vh] border rounded-lg">
          <div>
            <p className="font-semibold text-tertiary">
              Restaurant Opening Time:
            </p>
            <InputBox type="time" {...register("opentime")} />
          </div>
          <div>
            <p className="font-semibold text-tertiary">
              Restaurant Closing Time:
            </p>
            <InputBox type="time" {...register("closetime")} />
          </div>
        </div>
        <div className="w-[70vw] shadow-lg flex flex-col gap-10 items-center justify-center h-[30vh] border rounded-lg">
          <div>
            <button
              type="button"
              className="btn btn-wide bg-secondary text-primary flex items-center gap-2"
              onClick={handleIntervalToggle}
            >
              <div className="w-fit h-fit p-1 text-2xl rounded-full bg-primary text-secondary">
                <LuPlus />
              </div>
              Add Intervals
            </button>
            {intervalEnabled && (
              <div className="flex flex-col gap-2 mt-4">
                <InputBox type="time" {...register("startinterval")} />
                <InputBox type="time" {...register("closeinterval")} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="Buttons mt-10 flex items-center justify-center gap-20">
        <Button
          details="xl:btn-wide border border-secondary bg-transparent text-secondary"
          info="Go Back"
          onClick={() => navigate(-1)} 
        />
        <Button details="xl:btn-wide" info="Save Changes" type="submit" />
      </div>
    </form>
  );
};

export default ResTiming;
