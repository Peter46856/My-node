const mongoose = require('mongoose');


const messageModal = mongoose.schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },

   reciever : {
        type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },

    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},
{
    timestamp: true,
});

const Message = mongoose.Model("Message", messageModel);
module.exports = Message;