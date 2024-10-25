const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Ensure this matches your frontend's URL
        methods: ["GET", "POST"],
    },
});

const users = {};

// Exported function to get the socket ID of a specific user
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

// Listen for incoming connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log("Connected users:", users);
    }

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(users));

    // Listen for client-side disconnect events
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });

    // Add more event listeners as needed
});

// Start the server and listen on a specified port
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export app, io, and server for use in other files
module.exports = { app, io, server, getReceiverSocketId };
