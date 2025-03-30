import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const avatarPath = req.file?.path || null;
    
        const { fullName, userName, email, password, confirmPassword, gender } = req.body;
        if (!fullName || !userName || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message:"All Fields Are Required" });
        }
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({ message:"Email Already Used" });
        }
        const existedUserName = await User.findOne({ userName });
        if (existedUserName) {
            return res.status(409).json({ message:"UserName Already Taken" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message:"Password And Confirm Password Are Not Same" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

       //avtar
       const maleAvatar = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
       const femaleAvatar = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;


        await User.create({
            fullName,
            userName,
            email,
            password: hashedPassword,
            gender,
            avatar: gender === "male" ? maleAvatar : femaleAvatar,
        });

        return res.status(201).json({ message:"User Created Successfully" });

    }catch (error) {
        console.error(error);
        return res.status(500).json({ message:"Internal Failure" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message:"All Fields Are Required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message:"User Not Registered" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message:"Invalid Credrentials" });
        }
      

        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRY});

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
        }).json({ 
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            avatar: user.avatar,

         });



    }catch (error) {
        console.error(error);
        return res.status(500).json({ message:"Internal Failure" });
    };
};

export const logoutUser = async (req, res) => {
    try {
        return res.status(200).clearCookie("token","",{maxAge:0}).json({ message:"Logout Successfully" });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:"Internal Failure" });
        
    }
}
//show all users

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:"Internal Failure" });
        
    }
}