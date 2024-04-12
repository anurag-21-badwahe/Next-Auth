import { connectDb } from "@/dbConfig/dbConfig";
import Employee from "@/models/employeeModel";
import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/router";

connectDb();

export async function DELETE(request: NextRequest) {
  try {
    const router = useRouter();
    const { id } = router.query;

    const employee = await Employee.findById(id);

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    await employee.remove();

    return NextResponse.json({ message: "Employee deleted successfully", success: true });
  } catch (error: any) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
