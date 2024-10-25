import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import axios from 'axios';

const useGetMessages = () => {

    const [loading, setloading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        const getMessages = async() => {
            setloading(true);
           if(selectedConversation && selectedConversation._id){ 
            try {
            const response = await axios.get(`/api/message/get/${selectedConversation._id}`);
            setMessages(response.data);
            setloading(false);
        } catch (error) {
            console.error('Error getting messages:', error);
        } finally {
            setloading(false);
        }}
        }
        getMessages();
    }, [selectedConversation, setMessages])


  return{loading, messages};
}

export default useGetMessages
