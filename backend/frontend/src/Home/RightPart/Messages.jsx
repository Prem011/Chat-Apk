import React, { useEffect, useRef } from 'react'
import useGetMessages from '../../context/useGetMessages'
import Loading from '../../Components/Loading';
import Message from './Message';
import axios from 'axios';
import useGetSocketMessage from '../../context/useGetSocketMessage';

const Messages = () => {
  const { loading, messages } = useGetMessages();

  useGetSocketMessage();//listening incoming messages

  const lastMesRef = useRef();
  useEffect(() => {
    setTimeout(() =>{
      if(lastMesRef.current) {
        lastMesRef.current.scrollIntoView({ behavior : "smooth"})
      }
  },100)
  }, [messages])

  return (
    <div style={{ minHeight: 'calc(100vh - 8vh)' }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message._id} ref={lastMesRef} >
                <Message message={message} />
              </div>
            ))
          ) : (
            <div>
              <p className='text-center mt-[20%]'>Say! Hi to start the conversation</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Messages;
