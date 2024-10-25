  import React, { createContext, useState, useEffect, useContext } from 'react';
  import { io } from 'socket.io-client'; // Assuming you're using socket.io-client in the frontend
  import { useAuth } from './AuthProvider';

  const SocketContext = createContext();

  // Hook function
  export const useSocketContext = () => {
    return useContext(SocketContext);
  }

  export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [authUser] = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
      if (authUser) {
        const newSocket = io("http://localhost:5001", {
          query: {
            userId: authUser.user._id,
          },
        });
        
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        // Cleanup when the component is unmounted or authUser changes
        return () => newSocket.close();
      } else {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      }
    }, [authUser]);

    useEffect(() => {
      // Only attempt to listen for events if socket is not null
      if (socket) {
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        // Cleanup event listeners when the socket changes or unmounts
        return () => {
          socket.off("getOnlineUsers");
        };
      }
    }, [socket]);

    return (
      <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
      </SocketContext.Provider>
    );
  };

  export default SocketContext;
