import React from 'react';
import ProfileNav from '../ProfileNav/ProfileNav';
import { useForm } from 'react-hook-form';
import InputBox from '../InputBox/InputBox';
import Button from '../Button/Button';
import authService from '../../appwrite/authservices';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authslice'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const convertSlug = (slug) => {
    return slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSignUp = async (data) => {
    try {
      data.restaurantName = convertSlug(data.restaurantName);
      console.log(data);

      const signUpData = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.restaurantName,
        phonenumber: data.phoneNumber,
        location: data.location,
      });

      if (signUpData) {
        console.log(signUpData);
        dispatch(login({ userData: signUpData })); // Ensure the payload matches the expected structure
        navigate('/otpverification');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <ProfileNav />
      <div className="ProfilePage w-full  flex flex-col items-center">
        <div className="PageForm border p-10 rounded-lg shadow-lg">
          <h1 className='w-full text-center text-4xl text-primary mb-10'>Sign Up</h1>
          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col items-center gap-3">
            <div>
              <label className="font-semibold text-tertiary">Restaurant Name</label>
              <InputBox
                {...register('restaurantName', { required: 'Restaurant Name is required' })}
              />
              {errors.restaurantName && <p className="text-red-500">{errors.restaurantName.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-tertiary">Location</label>
              <InputBox
                {...register('location', { required: 'Location is required' })}
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-tertiary">Email</label>
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
              <label className="font-semibold text-tertiary">Password</label>
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
            <div>
              <label className="font-semibold text-tertiary">Phone Number</label>
              <InputBox
                {...register('phoneNumber', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
            </div>

            <Button details="btn-wide" info="Sign Up" />

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

export default SignUp;