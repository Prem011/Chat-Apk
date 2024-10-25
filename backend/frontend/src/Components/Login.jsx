import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';


const Login = () => {
  const [authUser, setauthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit = async (data) => {
    // console.log(data)
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    
    // console.log(userInfo); 
    // await axios.post("http://localhost:5000/user/signin", userInfo)
    await axios.post("/api/user/signin", userInfo)
    .then((response) => {
      // console.log(response.data)
      if(response.data){
        toast.success("Login successful")
      }
      
      localStorage.setItem("ChatApp", JSON.stringify(response.data))
      setauthUser(response.data)

    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
          alert('Error: ' + error.response.data.error);
      } else {
          toast.error('Please enter the correct username and password');
      }
  });
  
  
  
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center px-6 py-4  bg-zinc-900 text-white'>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className='my-2 px-10 py-8 rounded-md border border-spacing-2  border-white'>
        <br />

        <h1 className='text-2xl text-center '>Chat <span className='text-2xl text-green-600' >Apk</span> </h1><br />

        <h2 className='text-lg'>Login</h2><br />
        
        <label className="input input-bordered flex items-center gap-2 ">
          <input type="text" className="grow p-2 rounded-lg text-white outline-none " placeholder="Email" 
          {...register("email", { required: true })} />
          <br />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </label>
        <br />

        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow p-2 rounded-lg text-white outline-none " placeholder="Password" {...register("password", { required: true })} />
        </label>
          {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
        <br />

        <div className='flex gap-5 items-center justify-center'>
          <p>Don't have an account? <span><Link className='text-blue-600' to="/signup">Signup</Link></span></p>
          <button type='submit' className='px-4 p-2 rounded-md bg-blue-600'>Login</button>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
