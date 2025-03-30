import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

      fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,  
      },
      userName: {
        type: String,
        required: true,
        unique: true,  
        trim: true,
        minlength: 3,  
      },
      email: {
        type: String,
        required: true,
        unique: true,  
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,  
      },
      avatar: {
        type: String,
        default:""  
      },
      gender: {
        type: String,
        enum: ["male", "female"],
        required: true
      },
      isOnline: {
        type: Boolean,
        default: false
      }, 
      refreshToken: {
        type: String,  
        default: null
      }
},{timestamps: true});   



export const User = mongoose.model('User', userSchema)
      