import React from "react";
import ProfileNav from "../ProfileNav/ProfileNav";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";

const Login = () => {
  return (
    <div>
      <div>
        <ProfileNav />
      </div>

      <div className="LoginPage w-full h-[80vh] flex items-center justify-center">
        <div className="w-fit  flex flex-col border  p-5 rounded-lg shadow-lg items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-5">
            <img src="" alt="LOGO" />
            <p className="text-lg text-primary font-semibold">TableTap</p>
          </div>

          <h1 className="text-4xl m-5 text-tertiary ">Welcome Back !</h1>
          <div>
            <label>Email</label>
            <InputBox />
          </div>
          <div>
            <label>Password</label>
            <InputBox />
          </div>

          <Button details="btn-wide" info="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
