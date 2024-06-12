import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import { TbCameraPlus } from "react-icons/tb";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";
import OTPBox from "../OTPBox/OTPBox";

const LoginAndSignUp = () => {
  const handleOtpChange = (otp) => {
    console.log("Entered OTP:", otp);
  };
  return (
    <div>
      <ProfileNav />
      <div className="ProfilePage w-full flex flex-col items-center">
        <div className="profilePhoto mb-5">
          <div className=" relative image flex flex-col items-center ">
            <img
              className="w-36 h-36 rounded-full"
              src="https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
              alt=""
            />
            <div className="absolute bg-slate-600 rounded-full p-2 bottom-2 right-0 text-xl text-primary">
              <TbCameraPlus />
            </div>
          </div>
        </div>

        <div className="PageForm">
          <form className="flex flex-col items-center gap-3">
            <div>
              <label className="font-semibold text-tertiary">
                Restaurant Name
              </label>
              <InputBox />
            </div>
            <div>
              <label className="font-semibold text-tertiary">Location</label>
              <InputBox />
            </div>
            <div>
              <label className="font-semibold text-tertiary">Email</label>
              <InputBox />
            </div>
            <div>
              <label className="font-semibold text-tertiary">Password</label>
              <InputBox />
            </div>
            <div>
              <label className="font-semibold text-tertiary">
                Phone Number
              </label>
              <InputBox />
            </div>

            <button className="w-full btn p-1 rounded-lg font-semibold text-lg hover:bg-tertiary bg-secondary text-primary">
              Get OTP
            </button>
            <OTPBox length={4} onChange={handleOtpChange} />

            <Button details=" btn-wide " info="Save Changes" />

            <div className="count flex items-center m-2 gap-1">
              <div className="w-8 h-8 border cursor-pointer bg-secondary text-primary border-gray-300 flex items-center justify-center rounded-lg">
                <p className="font-semibold">1</p>
              </div>
              <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
                <p className="font-semibold">2</p>
              </div>
              <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
                <p className="font-semibold">3</p>
              </div>
              <div className="w-8 h-8 border cursor-pointer border-gray-300 flex items-center justify-center rounded-lg">
                <p className="font-semibold">4</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignUp;
