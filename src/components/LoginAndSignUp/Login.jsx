import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";
import { login, varifed } from "../../store/authslice";
import { useDispatch } from "react-redux";

const Login = ({flag}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  async function handleLogin(data){
    try {
    
      const userData= await authService.login({email:data.email,password:data.password})
      if(userData.emailVerification == true){
        dispatch(varifed({ userData: userData }));
        if(flag===true){
          navigate(`resprofilepage/${userData.name}`)
        }
        else{
          navigate(`resprofilepage/${userData.name}`)
        }
      }
      else{
        dispatch(login({ userData: userData }));
      }
      
    } catch (error) {
      
    }

  }

  return (
    <div>
     <div className='w-full text-6xl text-gray-600 text-center'>{flag===true?"Restorent login":"User login"}</div>

      <div className="LoginPage w-full h-[80vh] flex items-center justify-center">
        <div className="w-fit flex flex-col border p-5 rounded-lg shadow-lg items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-5">
            <img src="" alt="LOGO" />
            <p className="text-lg text-primary font-semibold">TableTap</p>
          </div>

          <h1 className="text-4xl m-5 text-tertiary">Welcome Back!</h1>
          
          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col items-center gap-3">
            <div>
              <label>Email</label>
              <InputBox 
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label>Password</label>
              <InputBox 
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <Button details="btn-wide" info="Login" />
          </form>

          <div className="mt-4 text-center">
            <p className="text-tertiary">Don't have an account? <Link to={flag===true?"/Ressinguppage":"/usersinguppage"} className="text-primary">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
