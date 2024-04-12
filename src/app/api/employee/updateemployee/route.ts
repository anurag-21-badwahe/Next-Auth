import { connectDb } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";
// import { useNavigation } from "next/navigation";

connectDb();

export async function PUT(request: NextRequest) {
  try {

    const { id } = request.query;

    const reqBody = await request.json();
    const { name, email, salary, joiningDate, status } = reqBody;

    const employee = await Employee.findById(id);

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
      updatedEmployee
    });
  } catch (error: any) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
