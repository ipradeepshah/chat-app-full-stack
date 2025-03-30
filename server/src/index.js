import express from "express";
import dotenv from "dotenv";   
import dbConnect from "./db/connection.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();   

const PORT = process.env.PORT || 8080;


//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use(userRoute);
app.use("/user", userRoute );

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server listening on port ${PORT}`);
});
