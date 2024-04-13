import { connectDb } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";

// import { useRouter } from "next/router";

connectDb();

export async function DELETE(request: NextRequest) {
  try {
    console.log("Delete request params", request.nextUrl.searchParams);

    const empId = request.nextUrl.searchParams.get("id") as string | undefined;
    if (!empId) {
      return NextResponse.json(
        { error: "Employee Id is required" },
        { status: 404 }
      );
    }

    const employee = await Employee.findById(empId);

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    const deletedEmployee = await employee.deleteOne();

    return NextResponse.json({ message: "Employee deleted successfully", success: true });
  } catch (error: any) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
