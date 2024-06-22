import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";

export const BankDetails = () => {
  return (
    <div>
      <div>
        <ProfileNav />
      </div>

      <div className="bankDetails w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-tertiary my-5">Bank Details</h1>
          <div>
            <form
              action=""
              className="flex w-full flex-col items-center gap-5 border xl:p-10 md:p-5 p-2 rounded-lg shadow-lg"
            >
              <InputBox info="w-[95vw] md:w-[50vw] lg:w-[40vw]" placeholder="Enter Your Name" />
              <InputBox info="w-[95vw] md:w-[50vw] lg:w-[40vw]" placeholder="Enter Bank Name" />
              <InputBox info="w-[95vw] md:w-[50vw] lg:w-[40vw]" placeholder="Enter Account  Number" />
              <InputBox info="w-[95vw] md:w-[50vw] lg:w-[40vw]" placeholder="Enter Branch Name" />
              <InputBox info="w-[95vw] md:w-[50vw] lg:w-[40vw]" placeholder="Enter IFSC CODE" />
              <Button details="btn-wide mt-4" info="Save" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
