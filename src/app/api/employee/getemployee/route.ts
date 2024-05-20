import { NextRequest, NextResponse } from "next/server";
import Employee from "@/models/employeeModel";
import { connectDb } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDb();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        // console.log("Create User Id At Get",userId);  
        if(!userId){
            return NextResponse.json({ error: "User Not Authorize" }, { status: 404 });
        }
        const employees = await Employee.find({
            userId,
        });
        return NextResponse.json({ success: true, data: employees });
    } catch (error: any) {
        console.error("Error fetching employees:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
