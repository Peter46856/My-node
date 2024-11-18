const express = require('express');
const userModal = require("../Modals/userModal");
const expressAsyncHandler = require('express-async-handler')

const loginController = expressAsyncHandler( async (req, res) => {
    const {name, password} =req.body;
    const User = await userModal.findone({name});

    if(User&&(await User.matchPassword(password))) {
        res.json({
            _id : User._id,
            name : User.name,
            email : User.email,
            token : generateToken(User._id),
            age : User.age,
            gender : User.gender,
            seeking : User.seeking,
            
            });
    } else {
        res.status(400);
        throw new error("Invalid Details");
    }
});


const signUpController = expressAsyncHandler( async (req, res) => {
    const {age, gender, seeking, name, email, password} =req.body;

    // checkfor required fields
    if(!name || !email || !password || !age || !gender || !seeking) {
        res.send(400)
        throw error("All input fields are required");
    }

    // check if user already exists
    const existingUser = await userModal.findone({email});
    
    if (existingUser) {
        res.send(400)
        throw new error("User already Exists");
    }

    // check if userName already exists
    const existingUserName = await userModal.findone({name});
    
    if (existingUserName) {
        res.send(400)
        throw new error("UserName already Taken");
    }


    //create a new user/ entry

    const User = await userModal.create({
        name,
        email,
        password
    });
    if(User) {
        res.status(201). json({
        _id : User._id,
        name : User.name,
        email : User.email,
        token : generateToken(User._id),
        age : User.age,
        gender : User.gender,
        seeking : User.seeking,
        
        });
    } 
    else{
        res.status(400);
        throw new error("User registration failed");

    }
   
});

const fetchAllUsersController = expressAsyncHander( async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
            {name:{ $regex: req.query.search, $options: "1"}},
            {email:{ $regex: req.query.search, $options: "1"}},
        ],
    }
    :{};

    const User = await userModal.find(keyword).find({
        _id: { $ne: req.User._id},
    });

    res.send(Users);
      
});

module.exports = {loginController, signUpController};