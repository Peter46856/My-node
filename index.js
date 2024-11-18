const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose')
const userRoutes =require("./Routes/userRoutes");

const app = express();
dotenv.config();
app.use(express.json());


const connectDb = async () => {
    try {
        const connect = await console.log(mongoose.connect(process.env.MONGO_URI));
        console.log("Server is connected to the database");
    } catch (error) {
        console.log("The server is not connected to the database", error.message);
    }
    
};

connectDb();

app.use("/User", userRoutes);

app.get('/', (req,res) =>{
    res.send("server app is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running..."));