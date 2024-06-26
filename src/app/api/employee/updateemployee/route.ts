import { connectDb } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";
// import mongoose from "mongoose";
// import { useNavigation } from "next/navigation";
// import { useParams } from "next/navigation";

connectDb();

export async function PUT(request: NextRequest) {
  try {
    console.log("Put request params", request.nextUrl.searchParams);

    const empId = request.nextUrl.searchParams.get("id") as string | undefined;
    if (!empId) {
      return NextResponse.json(
        { error: "Employee Id is required" },
        { status: 404 }
      );
    }

    const reqBody = await request.json();
    const { name, email, salary, joiningDate, status } = reqBody;

    // const employee = await Employee.findById(id);
    // const objectId = new mongoose.Types.ObjectId(id as string);

    const employee = await Employee.findById(empId);

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    employee.name = name;
    employee.email = email;
    employee.salary = salary;
    employee.joiningDate = joiningDate;
    employee.status = status;

    const updatedEmployee = await employee.save();

    return NextResponse.json({
      message: "Employee updated successfully",
      success: true,
      updatedEmployee,
    });
  } catch (error: any) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


