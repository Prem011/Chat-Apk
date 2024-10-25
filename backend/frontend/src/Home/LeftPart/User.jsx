import React from 'react';
import { useSocketContext } from '../../context/SocketContext'; // Import useSocketContext from the correct path
import useConversation from '../../zustand/useConversation'; 

const Chatuser = ({ user }) => {
  // Destructure the state and actions from the useConversation hook
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation ?._id === user._id;

  // Use socket and onlineUsers from the SocketContext
  const { socket, onlineUsers } = useSocketContext  ();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div>
      <div
        className={`flex py-1 px-12 gap-5 hover:bg-zinc-600 mt-10 duration-300 ${isSelected ? 'bg-zinc-700' : ''}
        px-4 sm:px-8 md:px-12 `} 
        onClick={() => setSelectedConversation(user)} // Correct event handler
      >
        <div className={`avatar ${isOnline ? "online" : "" }`}>
          <div className="w-12 sm:w-14 md:w-16">
            <img 
              className='rounded-full' 
              src="https://images.unsplash.com/photo-1724812773684-e93ac802c2e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OXx8fGVufDB8fHx8fA%3D%3D" 
              alt="User Avatar" 
            />
          </div>
        </div>
        <div className='mt-1'>
          <h1 className='text-base sm:text-lg font-bold'>{user.fullname}</h1>
          <span className='text-sm sm:text-base ' >{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
