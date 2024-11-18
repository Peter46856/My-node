const mongoose = require('mongoose');

const userModal = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },

    email : {
        type: String,
        required: true,
    },

    password : {
        type: String,
        required: true,
    },
},
{
    timestamp: true,
});

userModal.methods.matchPassword = async function(enterdPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userModal.pre("save", async function (next) {
    if(!this.isModified) {
        next();
    }

    const salts = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
    
const User = mongoose.model("User", userModal);
module.exports = User;

