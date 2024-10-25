const Conversation = require("../models/coversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId } = require("../SOCKETIO/server");
const { io } = require("../SOCKETIO/server"); // Ensure 'io' is correctly imported
exports.sendMessage = async (req, res) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id; // Current user
  
      let conversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });
  
      if (!conversation) {
        conversation = new Conversation({
          members: [senderId, receiverId],
          messages: [],
        });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
  
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(200).json(newMessage);
    } catch (err) {
      console.error("Error in sending message:", err); // Log full error object
      res.status(500).json({ error: err.message || "Internal server error." });
    }
  };
      

// exports.getMessages = async (req, res) =>{
//     try{
//         const {id: receiverId} = req.params;
//         const senderId = req.user._id; //current user

//         const conversation = await Conversation.findOne({
//             members : {$all:[senderId, receiverId]},
//         }).populate("messages")
        
//         if(!conversation){
//             return res.status(201).json([]);
//         }

//         const messages = conversation.messages;
//         res.status(201).json(messages);
//     }
//     catch(err){
//         console.error("Error in getting messages:", err.message);
//         res.status(500).json({ error: "Internal server error." });
//     }
// }


exports.getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // Current user

        const conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        }).populate("messages"); // Populate 'messages', not 'message'

        if (!conversation) {
            return res.status(201).json([]);
        }

        const messages = conversation.messages;
        res.status(201).json(messages); // Use status 200 for success
    } catch (err) {
        console.error("Error in getting messages:", err.message);
        res.status(500).json({ error: "Internal server error." });
    }
};
