import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide a username"]
    },
    email:{
        type:String,
        required:[true,"Please Provide a valid email"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"Please Provide Password"]
    },
    isVerified :{
        type:Boolean,
        default : false
    },
    isAdmin :{
        type:Boolean,
        default : false
    },
    forgetPasswordToken : String,
    forgetPasswordTokenExpiry : Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.model.users || mongoose.model("users",userSchema);

export default User