const mongoose = require('mongoose');


const chatModel = mongoose.Schema({

    chatName : { type: string},
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    latestMessage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},
{
    timestamp: true,
});

const Chat = mongoose.Model("Chat", chatModel);
module.exports = Chat;