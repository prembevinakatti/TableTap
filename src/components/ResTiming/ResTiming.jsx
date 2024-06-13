import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import InputBox from "../InputBox/InputBox";
import { LuPlus } from "react-icons/lu";
import Button from "../Button/Button";

const ResTiming = () => {
  return (
    <div>
      <div>
        <ProfileNav />
      </div>
      <div className="flex gap-5  flex-col items-center justify-center">
        <div className="Timing shadow-lg w-[70vw] flex flex-col gap-10 items-center justify-center h-[30vh] border rounded-lg">
          <div>
            <p className="font-semibold text-tertiary">
              Restaurant Opening Time :
            </p>
            <InputBox type="time" />
          </div>
          <div>
            <p className="font-semibold text-tertiary">
              Restaurant Closing Time :
            </p>
            <InputBox type="time" />
          </div>
        </div>
        <div className=" w-[70vw] shadow-lg flex flex-col gap-10 items-center justify-center h-[30vh] border rounded-lg">
          <div>
            <button className="btn btn-wide bg-secondary text-primary">
              <div className="w-fit h-fit p-1 text-2xl rounded-full bg-primary text-secondary">
                <LuPlus />
              </div>
              Add Intervals
            </button>
          </div>
        </div>
      </div>

      <div className="Buttons mt-10  flex items-center   justify-center gap-20">
        <Button
          details="btn-wide border border-secondary bg-transparent text-secondary"
          info="Go Back"
        />
        <Button details="btn-wide " info="Save Changes" />
      </div>

      <div className="count flex items-center justify-center mt-20 gap-1">
        <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">1</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">2</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer  border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">3</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">4</p>
        </div>
        <div className="w-8 h-8 border cursor-pointer bg-secondary text-primary border-gray-300 flex items-center justify-center rounded-lg">
          <p className="font-semibold">5</p>
        </div>
      </div>
    </div>
  );
};

export default ResTiming;
