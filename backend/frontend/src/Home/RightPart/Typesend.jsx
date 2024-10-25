import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import useSendMessage from '../../context/useSendMessage';

const Typesend = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const submitHandler = async (e) => {
    console.log(e.target.value);
    e.preventDefault(); // Prevent the page from reloading
    if (message.trim() === "") return; // Prevent sending empty messages
    await sendMessages(message); // Send the message using the custom hook
     setMessage(""); // Clear the input field after sending the message
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='flex items-center  px-4 h-[8%] bg-slate-800'>
        <div className='w-full'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update state with input value
            type="text"
            placeholder="Type here"
            className="input w-full input-bordered p-4"
          />
        </div>
        <div>
          <button type="submit" disabled={loading || message.trim() === ""}>
            <IoMdSend className='w-10 h-10 hover:bg-slate-700 rounded-btn p-1 mt-1' />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Typesend;
