import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import { CiMenuFries } from 'react-icons/ci';

const Chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    if (!onlineUsers || onlineUsers.length === 0) return "Offline";
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  // Handle loading or missing conversation gracefully
  if (!selectedConversation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex space-x-3 justify-center items-center p-2 bg-slate-700 hover:bg-slate-600 duration-300 rounded-lg">

      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      {/* Avatar with dynamic online status */}
      <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === 'Online' ? 'online' : ''}`}>
        <div
          className="w-16 h-16 bg-center bg-cover rounded-full"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D')`
          }}
        />
      </div>

      {/* User Info */}
      <div>
        <h1 className="font-bold text-lg text-white">{selectedConversation.fullname || 'Unknown User'}</h1>
        <span className="text-sm text-gray-300">{getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>
    </div>
  );
};

export default Chatuser;
