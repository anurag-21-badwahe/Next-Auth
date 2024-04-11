import { getDataFromToken } from "@/utils/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDb} from "@/dbConfig/dbConfig";

connectDb();

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}