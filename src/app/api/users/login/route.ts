import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs'


connectDb()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const{email,password} = reqBody;

        // console.log(reqBody);

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User Does not exists"},{status:500})
        }
        // console.log("User Exits");

        const passwordCompare = bcryptjs.compare(password,user.password);

        if(!passwordCompare){
            return NextResponse.json({error:"Invalid Credentials"},{status:400})
        }
        
        //payload
        const tokenData = {
             id:user._id,
             username:user.username,
             email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response = NextResponse.json({
            message:"Logged In Success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response
                

        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})        
    }
}