import express from "express";
import dotenv from "dotenv";   
import dbConnect from "./db/connection.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";


import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();


const app = express();   

const PORT = process.env.PORT || 8080;


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//routes

app.use("/user", userRoute);
app.use("/message", messageRoute);


app.listen(PORT, () => {
    dbConnect();
    console.log(`Server listening on port ${PORT}`);
});
