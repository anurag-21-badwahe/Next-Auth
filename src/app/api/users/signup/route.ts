import { connectDb } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connectDb()

export async function POST(request:NextRequest){
    try{
       const reqBody =  request.json()
       const {userName,email,password} = reqBody;

       console.log(reqBody);

       const user = await User.findOne({email})

       if(user){
        return NextResponse.json({error:"User Already Exits"},{status:400})
       }
       const saltRounds = 10;
       const salt = await bcryptjs.genSaltSync(saltRounds);
       const hashedPassword = bcryptjs.hashSync(password, salt);

       const newUser = new User({
        userName,
        email,
        password:hashedPassword
       })

       const savedUser =  await newUser.save()
       console.log(savedUser);

       //
       
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}