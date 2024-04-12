// import { connectDb } from "@/dbConfig/dbConfig";
// import Employee from "@/models/employeeModel";
// import { NextRequest, NextResponse } from "next/server";
// import mongoose from 'mongoose';
// // import { useNavigation } from "next/navigation";

// connectDb();

// export async function PUT(request: NextRequest) {
//   try {

//     const id = request.query?.id as string | undefined;

//     const reqBody = await request.json();
//     const { name, email, salary, joiningDate, status } = reqBody;

//     // const employee = await Employee.findById(id);
//     const objectId = new mongoose.Types.ObjectId(id as string);

//     const employee = await Employee.findById(objectId);


//     if (!employee) {
//       return NextResponse.json(
//         { error: "Employee not found" },
//         { status: 404 }
//       );
//     }

//     employee.name = name;
//     employee.email = email;
//     employee.salary = salary;
//     employee.joiningDate = joiningDate;
//     employee.status = status;

//     const updatedEmployee = await employee.save();

//     return NextResponse.json({
//       message: "Employee updated successfully",
//       success: true,
//       updatedEmployee
//     });
//   } catch (error: any) {
//     console.error("Error updating employee:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/dbConfig/dbConfig';
import Employee from '@/models/employeeModel';

connectDb();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { email, ...updates } = reqBody;

    // Find the employee by email
    const employee = await Employee.findOne({ email });

    // If employee is not found, return 404 error
    if (!employee) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }

    // Update employee fields
    Object.assign(employee, updates);

    // Save the updated employee
    const updatedEmployee = await employee.save();

    // Return success response
    return NextResponse.json({
      message: 'Employee updated successfully',
      success: true,
      updatedEmployee,
    });
  } catch (error: any) {
    // Handle errors
    console.error('Error updating employee:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
