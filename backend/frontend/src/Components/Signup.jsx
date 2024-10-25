import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [authUser, setauthUser] = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  // const [authUser, setAuthUser] = useAuth();

  //defining the password and watch the password and confirm password
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const validatePasswordMatch = (value) => {
    return value === password || 'Confirm Password is not matching';
  };  

  const onSubmit = async (data) => {
    // console.log(data)
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
    
    // console.log(userInfo); 
    await axios.post("/api/user/signup", userInfo)
    .then((response) => {
      console.log(response.data)
      if(response.data){
        toast.success("Signup successful")
        navigate("/login")
      }
      // localStorage.setItem("ChatApp", JSON.stringify(response.data))
      // setauthUser(response.data)
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
          toast.error('Error: ' + error.response.data.error);
      } else {
          toast.error('An unexpected error occurred');
      }
  });
  
  }
  
    


  return (
    <div className=' px-6 py-4 rounded-md text-white w-screen h-screen flex justify-center items-center bg-zinc-900'>
      <form 
      onSubmit={handleSubmit(onSubmit)}
       className='my-2 px-10 py-8 rounded-md border border-spacing-2  border-white'>
        <h1 className='text-center text-2xl'>Chat <span style={{color: 'green'}} className='text-green-300 text-[2vw]'>apk</span></h1><br />
        <h2 className='text-lg'>Signup</h2><br />

        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow text-whiterounded-lg p-2 outline-none" placeholder="Fullname" {...register("fullname", { required: true })} />
        </label>
        {errors.fullname && <span className="text-red-500 text-sm">Fullname is required</span>}
        <br />

        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow text-white rounded-lg p-2 outline-none" placeholder="Email" 
          {...register("email", { required: true })} />
        </label>
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        <br />

        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow text-white  rounded-lg p-2 outline-none" placeholder="Password" 
          {...register('password', { required: true })} />
        </label>
        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
        <br />

        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow text-white  rounded-lg p-2 outline-none" placeholder='Confirm Password'
          {...register('confirmPassword', { required: true, validate: validatePasswordMatch })} />
        </label>
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
        <br />

        <div className='flex justify-center items-center gap-5'>
          <p>Already have an Account? <span className='text-blue-600'><Link to="/">Login</Link></span></p>
          <button type="submit" className='w-20 h-10 text-white rounded-md bg-blue-600 hover:bg-blue-800  border-0 p-2'>Signup</button>
        </div>

        
      </form>
    </div>
  );
};

export default Signup;
