import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";


connectDb()


export async function POST(request:NextRequest){
    //extract data from token
    const userId = await getDataFromToken(request)
    const user = User.findOne({_id:userId}).select("-password")
    
    if(!user){
        return NextResponse.json({ error: "User Not find while User Info" }, { status: 400 });
    }

    //check if there is no user
    return NextResponse.json({
        message:"User Found",
        data:user
    })
}