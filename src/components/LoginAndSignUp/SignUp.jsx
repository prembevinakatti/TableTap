import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputBox from '../InputBox/InputBox';
import Button from '../Button/Button';
import authService from '../../appwrite/authservices';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authslice';
import { useNavigate } from 'react-router-dom';


const SignUp = ({flag}) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const convertSlug = (slug) => {
    if(flag==false){
      return  slug.toLowerCase()
     .replace(/[^a-z0-9]+/g, '-')
     .replace(/^-+|-+$/g, '')
     .concat("-user")
     
    }
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
        dispatch(login({ userData: signUpData }));
          if(flag==true){
            navigate('/Resverification');
           
          }
          else{
            navigate('/userverification');
            
          }
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
            <div className='w-full xl:text-4xl text-2xl my-5 text-gray-600 text-center'>{flag===true?"Restaurant Singup":"User Singup"}</div>
      <div className="ProfilePage xl:w-full  flex flex-col xl:items-center ">
        <div className="PageForm border p-10 px-20 rounded-lg shadow-lg">
          <h1 className='w-full text-center text-4xl text-primary mb-10'>Sign Up</h1>
          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col items-center gap-3">
            <div className='w-full '>
              <label className="font-semibold text-tertiary">{flag===true?"Restorent Name":"User Name"}</label>
              <InputBox 
              info="w-full"
                {...register('restaurantName', { required: 'Restaurant Name is required' })}
              />
              {errors.restaurantName && <p className="text-red-500">{errors.restaurantName.message}</p>}
            </div>
            <div className='w-full '>
              <label className="font-semibold text-tertiary">Location</label>
              <InputBox 
              info="w-full"
                {...register('location', { required: 'Location is required' })}
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>
            <div className='w-full '>
              <label className="font-semibold text-tertiary">Email</label>
              <InputBox 
              info="w-full"
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
            <div className='w-full '>
              <label className="font-semibold text-tertiary">Password</label>
              <InputBox 
              info="w-full"
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
            <div className='w-full '>
              <label className="font-semibold text-tertiary">Phone Number</label>
              <InputBox 
              info="w-full"
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
          </form>
          <div className="mt-4 text-center">
            <p className="text-tertiary">Already have an account? <Link to={flag===true?"/resloginpage":"/userloginpage"} className="text-primary">Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
