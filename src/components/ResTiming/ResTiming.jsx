import React, { useState } from "react";
import InputBox from "../InputBox/InputBox";
import { LuPlus } from "react-icons/lu";
import Button from "../Button/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profileservices";
import { useLocation, useNavigate } from "react-router-dom";
import Navigator from "../../components/others/Navigator";

const ResTiming = () => {
  const { register, handleSubmit, control } = useForm();
  const [intervalEnabled, setIntervalEnabled] = useState(false);
  const profiledata = useSelector((state) => state.profile.profiledata);
  const navigate = useNavigate();
  const pathname = useLocation()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots"
  });

  async function handleTimeData(data) {
    const slots = JSON.stringify(data.slots);
    try {
      const timingData = {
        closetime: data.closetime,
        opentime: data.opentime,
        slug: profiledata.$id,
        startinterval: intervalEnabled ? data.startinterval : "",
        closeinterval: intervalEnabled ? data.closeinterval : "",
        slots: slots,
        state: "completed"
      };
      const timeUploaded = await profileService.updatetimings(timingData);
      if (timeUploaded) {
        navigate(`/resprofilepage/${profiledata.$id}`);
      }
    } catch (error) {
      console.error("Error updating timings:", error);
    }
  }

  function handleIntervalToggle() {
    setIntervalEnabled((prev) => !prev);
  }

  function handleAddSlot(e) {
    e.preventDefault();
    append({ starttime: "", endtime: "" });
  }

  return (
    
    <form onSubmit={handleSubmit(handleTimeData)}>
      <Navigator pathname={pathname} />
      <div className="flex gap-5 w-full h-fit flex-col items-center justify-center">
        <div className="Timing shadow-lg w-[70vw] flex flex-col gap-10 items-center justify-center p-5 mt-5 h-[30vh] border rounded-lg">
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
        <div className="w-[70vw] shadow-lg flex flex-col gap-10 items-center justify-center h-fit p-10 border rounded-lg">
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
        <div className="w-[70vw] shadow-lg flex flex-col gap-10 items-center justify-center h-[30vh] p-5 border rounded-lg">
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <InputBox
                  type="time"
                  {...register(`slots[${index}].starttime`)}
                  placeholder="Start Time"
                />
                <InputBox
                  type="time"
                  {...register(`slots[${index}].endtime`)}
                  placeholder="End Time"
                />
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  info="Remove"
                  className="bg-red-500 text-white px-2 py-1 rounded"
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddSlot}
              info="Add Slot"
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
            />
          </div>
        </div>
      </div>
      <div className="Buttons mt-5 mb-5 flex items-center justify-center gap-20">
        <Button
          details="xl:btn-wide border border-secondary bg-transparent text-secondary"
          info="Go Back"
          type="button"
          onClick={() => navigate(-1)}
        />
        <Button details="xl:btn-wide" info="Save Changes" type="submit" />
      </div>
    </form>
  );
};

export default ResTiming;
