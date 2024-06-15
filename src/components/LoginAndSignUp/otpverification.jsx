import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OTPBox from "../OTPBox/OTPBox";
import authService from "../../appwrite/authservices";
import { varifed } from "../../store/authslice";
import { useNavigate } from "react-router-dom";

function Otpverify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const verified = useSelector((state) => state.auth.verified);
  const data = useSelector((state) => state.auth.userData);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [buttonText, setButtonText] = useState("Get otp");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleGetOtp = async () => {
    try {
      setButtonText("Resend otp");
      const token = await authService.createEmailToken({
        userId: data.$id,
        email: data.email,
      });

      let timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        setCountdown(60);
        setButtonText("Get otp");
      }, 60000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const session = await authService.createSession({
        userId: data.$id,
        secret: otp,
      });
      if (session) {
        dispatch(varifed({ userData: session }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!verified) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="flex flex-col border p-10 rounded-lg shadow-lg items-center gap-10">
          <div className="text-2xl font-semibold text-primary">Verify your OTP</div>
          <button
            className={`btn btn-wide p-1 rounded-lg font-semibold text-lg hover:bg-tertiary bg-secondary text-primary ${
              countdown !== 60
                ? "disabled:opacity-50 disabled:pointer-events-none"
                : ""
            }`}
            onClick={handleGetOtp}
            disabled={countdown !== 60}
          >
            {buttonText}
          </button>
          {buttonText === "Get otp" ? null : (
            <OTPBox length={6} onChange={handleOtpChange} />
          )}

          <div>
            <span className="countdown font-mono text-2xl">
              <span style={{ "--value": countdown }}></span>
            </span>
          </div>
          <div
            className="btn-wide btn p-1 rounded-lg font-semibold text-lg hover:bg-tertiary bg-secondary text-primary"
            onClick={handleOtpSubmit}
          >
            Verify
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-5xl text-primary">You are verified</div>
      </div>
    );
  }
}

export default Otpverify;
