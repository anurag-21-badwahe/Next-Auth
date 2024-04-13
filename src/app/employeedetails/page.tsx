"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import axios from "axios";
import addEmp from "../../../public/addEmp.png";
import editIcon from "../../../public/editIcon.png";
import deleteIcon from "../../../public/deleteIcon.png";
import ProfileIcon from "../../../public/profile.png";
import Image from "next/image";

interface Employee {
  id: number;
  _id: string;
  name: string;
  email: string;
  salary: number;
  joiningDate: string;
  status: string;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employee/getemployee");
        console.log(response);

        // Access the data array from the response
        const responseData = response.data.data;
        if (responseData.length === 0) {
          alert("No Employee is Found in the database");
        }
        const transformedData = responseData.map(
          (employee: any, index: number) => ({
            id: index + 1,
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            salary: employee.salary,
            joiningDate: new Date(employee.joiningDate)
              .toISOString()
              .split("T")[0],
            status: employee.status,
          })
        );
        setEmployees(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const [isAddingEmployee, setIsAddingEmployee] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editEmployeeId, setEditEmployeeId] = useState<number | string | null>(
    null
  );
  const [newEmployeeData, setNewEmployeeData] = useState<Employee>({
    id: 0,
    _id: "",
    name: "",
    email: "",
    salary: 0,
    joiningDate: "",
    status: "Active",
  });

  const toggleAddEmployeeForm = () => {
    setIsAddingEmployee(!isAddingEmployee);
    setIsEditing(false);
    setEditEmployeeId(null);
    setNewEmployeeData({
      id: 0,
      _id: "",
      name: "",
      email: "",
      salary: 0,
      joiningDate: "",
      status: "Active",
    });
  };

  const handleEdit = (id: string) => {
    const employeeToEdit = employees.find((employee) => employee._id === id);
    console.log("id", id);

    if (employeeToEdit) {
      setNewEmployeeData({
        ...employeeToEdit,
      });

      setIsEditing(true);
      setEditEmployeeId(id);
      setIsAddingEmployee(true);
    } else {
      console.error("Employee to edit not found");
    }
  };

  const handleSaveEdit = async (values: Employee) => {
    console.log(editEmployeeId);
    const response = await axios.put("/api/employee/updateemployee", values, {
      params: {
        id: editEmployeeId,
      },
    });

    console.log("Edited Response", response);
    // const updatedEmployees = employees.map((employee) => {
    //   if (employee._id === editEmployeeId) {
    //     return {
    //       ...employee,
    //       ...values,
    //     };
    //   }
    //   return employee;
    // });

    // setEmployees(updatedEmployees);

    const index = employees.findIndex(
      (employee) => employee._id === editEmployeeId
    );

    if (index > 0) {
      const updatedEmployees = [...employees];
      updatedEmployees[index] = { ...updatedEmployees[index], ...values };
      setEmployees(updatedEmployees);
    }
    alert("Data Updated Succesfully");

    setNewEmployeeData({
      id: 0,
      _id: "",
      name: "",
      email: "",
      salary: 0,
      joiningDate: "",
      status: "Active",
    });
    setIsEditing(false);
    setIsAddingEmployee(false);
  };

  const handleAddEmployee = async (values: Employee) => {
    try {
      // Make a POST request to add the new employee
      const response = await axios.post("/api/employee/addemployee", values);

      console.log("Adding Employee");

      console.log(response);
      // pdate the local state with the newly added employee
      setEmployees([...employees, response.data]);
      // handleAddEmployee(values);
      // Reset form and toggle form visibility
      setNewEmployeeData({
        id: 0,
        _id: "",
        name: "",
        email: "",
        salary: 0,
        joiningDate: "",
        status: "Active",
      });
      alert("Employee Added Succesfully");
      setIsAddingEmployee(false);
    } catch (error) {
      // alert("Something Went Wrong With Data")
      console.error("Error adding employee:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/employee/deleteemployee`, {
        params: {
          id: id,
        },
      });

      console.log("Delete Response:", response);

      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(updatedEmployees);

      // Reset any necessary states
      setIsEditing(false);
      setIsAddingEmployee(false);
      setNewEmployeeData({
        id: 0,
        _id: "",
        name: "",
        email: "",
        salary: 0,
        joiningDate: "",
        status: "Active",
      });

      alert("Employee Deleted Successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee. Please try again.");
    }
  };

  const renderAddEmployeeForm = () => {
    if (!isAddingEmployee) {
      return (
        <button
          onClick={toggleAddEmployeeForm}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mb-4 flex items-center"
        >
          <Image
            src={addEmp.src}
            alt="Add Icon"
            className="w-6 h-6 mr-2"
            width={6}
            height={6}
          />
          Add New Employee
        </button>
      );
    }

    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 bg-blue-400 text-center">
          {isEditing ? "Edit Employee" : "Add New Employee"}
        </h2>
        <Formik
          initialValues={newEmployeeData}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            salary: Yup.number()
              .required("Salary is required")
              .positive("Salary must be positive"),
            joiningDate: Yup.date().required("Joining date is required"),
            status: Yup.string().required("Status is required"),
          })}
          onSubmit={(values, { resetForm }) => {
            if (isEditing) {
              handleSaveEdit(values);
            } else {
              const id =
                employees.length > 0
                  ? employees[employees.length - 1].id + 1
                  : 1;
              const newEmployee = { ...values, id };
              setEmployees([...employees, newEmployee]);
              resetForm();
              toggleAddEmployeeForm();
              handleAddEmployee(values);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="block w-full border border-gray-300 rounded-md p-2 mb-2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="block w-full border border-gray-300 rounded-md p-2 mb-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />

              <Field
                type="number"
                name="salary"
                placeholder="Salary"
                className="block w-full border border-gray-300 rounded-md p-2 mb-2"
              />
              <ErrorMessage
                name="salary"
                component="div"
                className="text-red-500"
              />

              <Field
                type="date"
                name="joiningDate"
                placeholder="Joining Date"
                className="block w-full border border-gray-300 rounded-md p-2 mb-2"
              />
              <ErrorMessage
                name="joiningDate"
                component="div"
                className="text-red-500"
              />

              <div className="mb-2">
                <span className="mr-2">Status:</span>
                <label className="inline-flex items-center mr-4 text-center">
                  <Field
                    type="radio"
                    name="status"
                    value="Active"
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <Field
                    type="radio"
                    name="status"
                    value="Inactive"
                    className="form-radio h-5 w-5 text-red-600"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
              >
                {isEditing ? "Save" : "Add Employee"}
              </button>
              <button
                type="button"
                onClick={toggleAddEmployeeForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const renderEmployees = () => {
    return employees.map((employee, index) => (
      <tr key={employee._id}>
        <td className="text-center">{index + 1}.</td>
        <td className="text-center">{employee.name}</td>
        <td className="text-center">{employee.email}</td>
        <td className="text-center">₹{employee.salary}</td>
        <td className="text-center">{employee.joiningDate}</td>
        <td className="text-center">{employee.status}</td>
        <td className="text-center">
          <button
            onClick={() => handleEdit(employee._id)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded-md mr-2"
          >
            <Image
              src={editIcon.src}
              alt="Edit Icon"
              className="w-6 h-6 mr-2"
              width={6}
              height={6}
            />
            {/* Add New Employee */}
          </button>
          <button
            onClick={() => handleDelete(employee._id)}
            className="bg-white hover:bg-red-300 text-white font-semibold py-1 px-2 rounded-md"
          >
            <Image
              src={deleteIcon.src}
              alt="Edit Icon"
              className="w-6 h-6 mr-2"
              height= {6}
              width= {6}
            />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4">
      <nav className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 my-2 flex justify-between items-center">
        <div className="font-bold text-xl">WorkFlowX</div>
        <div>
          <Link href="/profile">
            <Image
              src={ProfileIcon.src}
              alt="Profile Icon"
              className="w-10 h-10 mr-4"
              width={10}
              height={10}
            />
          </Link>
        </div>
      </nav>
      {renderAddEmployeeForm()}
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      {loading ? (
        <div className="flex justify-center text-center">
          <ReactLoading type="spin" color="blue" />
          <p className="text-blue-500">Fetching Data from Databse.....</p>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Salary</th>
              <th className="border px-4 py-2">Joining Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>{renderEmployees()}</tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeTable;
