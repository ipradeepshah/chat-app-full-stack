import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect  = async ()=>{
    try {
        const res = await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
        if(res) console.log("db connection success")
    }catch(err){
        console.error(err)
    }
}

export default dbConnect