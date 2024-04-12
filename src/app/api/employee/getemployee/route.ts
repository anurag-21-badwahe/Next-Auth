import { NextRequest, NextResponse } from "next/server";
import Employee from "@/models/employeeModel";
import { connectDb } from "@/dbConfig/dbConfig";

connectDb();

export async function GET(request: NextRequest) {
    try {
        const employees = await Employee.find({});
        return NextResponse.json({ success: true, data: employees });
    } catch (error: any) {
        console.error("Error fetching employees:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
