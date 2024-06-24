import React from "react";
import { useForm } from "react-hook-form";
import ProfileNav from "../ProfileNav/ProfileNav";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";
import profileService from "../../appwrite/profileservices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const BankDetails = () => {
  const profiledata = useSelector((state) => state.profile.profiledata);
  const navigate=useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

   const onSubmit = (data) => {
    async function updatedetails(){
        const banckdetaisluploed=await profileService.updatebankdetails({bankdetails:JSON.stringify(data),slug:profiledata.$id})
        if(banckdetaisluploed){
          navigate(-1)
        }
    }
    updatedetails()

  };

  return (
    <div>
    

      <div className="bankDetails w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-tertiary my-5">Bank Details</h1>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-5 border xl:p-10 md:p-5 p-2 rounded-lg shadow-lg"
            >
              <InputBox
                info="w-[95vw] md:w-[50vw] lg:w-[40vw]"
                placeholder="Enter Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <InputBox
                info="w-[95vw] md:w-[50vw] lg:w-[40vw]"
                placeholder="Enter Bank Name"
                {...register("bankName", { required: "Bank Name is required" })}
              />
              {errors.bankName && (
                <p className="text-red-500">{errors.bankName.message}</p>
              )}

              <InputBox
                info="w-[95vw] md:w-[50vw] lg:w-[40vw]"
                placeholder="Enter Account Number"
                {...register("accountNumber", {
                  required: "Account Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid account number",
                  },
                })}
              />
              {errors.accountNumber && (
                <p className="text-red-500">{errors.accountNumber.message}</p>
              )}

              <InputBox
                info="w-[95vw] md:w-[50vw] lg:w-[40vw]"
                placeholder="Enter Branch Name"
                {...register("branchName", {
                  required: "Branch Name is required",
                })}
              />
              {errors.branchName && (
                <p className="text-red-500">{errors.branchName.message}</p>
              )}

              <InputBox
                info="w-[95vw] md:w-[50vw] lg:w-[40vw]"
                placeholder="Enter IFSC CODE"
                {...register("ifscCode", {
                  required: "IFSC Code is required",
                  pattern: {
                    value: /^[A-Za-z]{4}\d{7}$/,
                    message: "Invalid IFSC code",
                  },
                })}
              />
              {errors.ifscCode && (
                <p className="text-red-500">{errors.ifscCode.message}</p>
              )}

              <Button details="btn-wide mt-4" info="Save" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
