import React, { useState } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); 
    try {
      const res = await axios.post("/api/user/logout"); 
      if(res) {
        localStorage.removeItem("ChatApp"); 
        Cookies.remove("jwt"); 
        setLoading(false);
        toast.success("Logged out successfully!");
        navigate(-1);  
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }
    } catch (error) {
      console.error("Error in Logout: " + error);
      toast.error("Error logging out");
      setLoading(false);
    }
  };
  

  return (
    <div className="px-6 py-4">
      <div className="flex space-x-3">
        <button 
          onClick={handleLogout}
          disabled={loading}  // Disable the button when loading
          className="flex items-center space-x-3">
          <BiLogOutCircle className="text-5xl p-2 hover:bg-red-600 rounded-md duration-300" />
          {loading && <span>Logging out...</span>} {/* Show loading message */}
        </button>
      </div>
    </div>
  );
};

export default Logout;
