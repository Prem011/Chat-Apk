// import React from 'react'

// const Message = ({message}) => {
//   const authUser = JSON.parse(localStorage.getItem("ChatApp"))
//   // const itsMe = authUser?.user ? message.senderId === authUser.user._id : false;
//   const itsMe = message.senderId === authUser.user._id ? authUser.user._id : false;
//   // console.log(message.senderId);
//   // console.log(authUser.user._id);

//   const chatName = itsMe ? "chat-end" : "chat-start";
//   const chatColor =itsMe ? "bg-blue-500" : ""

//   return (
//     <div>
//       <div className='p-4'>
//         <div className={`chat ${chatName}`}>
//             <div className={`chat-bubble text-white chat-bubble-info ${chatColor} `}>{message.message}</div>
//         </div>

//       </div>
//     </div>
//   )
// }

import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));

  // Determine if the message is from the authenticated user
  const itsMe = message.senderId === authUser?.user?._id;

  // Set CSS classes for alignment and color based on the sender
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-zinc-700";

  // Safely handle the message creation time
  const createdAt = message.createdAt ? new Date(message.createdAt) : null;
  const formattedTime = createdAt
    ? createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
    : "Invalid time";

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
        <div className="chat-footer text-md text-gray-400 mt-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}

export default Message;
  