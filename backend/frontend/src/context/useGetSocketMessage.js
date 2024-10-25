import React from 'react'
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation';
import { useEffect } from 'react';
import sound from "../assets/messagePing.mp3"

const useGetSocketMessage = () => {
    const {socket} = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        socket.on('newMessage', (newMessage) => {
            const audio = new Audio(sound)
            audio.play();
            setMessages([...messages, newMessage])
        })
        return () => {
            socket.off('newMessage')
        }
    }, [socket, messages, setMessages]);
}

export default useGetSocketMessage
