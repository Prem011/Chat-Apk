import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      // Send the message and receive the newly created message in response
      const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });

      // Update state with the new message
      setMessages([...messages, res.data]); // Append the new message to the existing messages
    } catch (error) {
      console.error('Error sending messages: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
