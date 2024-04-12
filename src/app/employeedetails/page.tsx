"use client"
import React, { useState } from 'react';

const EmployeeTable = () => {
  // Sample data for demonstration
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', salary: 50000, joiningDate: '2023-01-01', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', salary: 60000, joiningDate: '2022-12-15', status: 'Inactive' },
    // Add more sample data as needed
  ]);

  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: '',
    email: '',
    salary: '',
    joiningDate: '',
    status: 'Active' // Default status
  });

  const toggleAddEmployeeForm = () => {
    setIsAddingEmployee(!isAddingEmployee);
    setIsEditing(false); // Reset editing mode
    setEditEmployeeId(null); // Reset edit employee ID
    setNewEmployeeData({ name: '', email: '', salary: '', joiningDate: '', status: 'Active' }); // Reset form data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({
      ...newEmployeeData,
      [name]: value
    });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setNewEmployeeData({
      ...newEmployeeData,
      status: value
    });
  };

  const handleAddEmployee = () => {
    // Generate a unique ID for the new employee
    const id = employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
    const newEmployee = { id, ...newEmployeeData };

    // Add the new employee to the employees array
    setEmployees([...employees, newEmployee]);

    // Reset the form data and toggle the form visibility
    setNewEmployeeData({ name: '', email: '', salary: '', joiningDate: '', status: 'Active' });
    toggleAddEmployeeForm();
  };

  const handleEdit = (id) => {
    // Find the employee with the given id
    const employeeToEdit = employees.find(employee => employee.id === id);

    // Set the form data with the employee's details
    setNewEmployeeData({
      name: employeeToEdit.name,
      email: employeeToEdit.email,
      salary: employeeToEdit.salary,
      joiningDate: employeeToEdit.joiningDate,
      status: employeeToEdit.status
    });

    // Set editing mode and the id of the employee being edited
    setIsEditing(true);
    setEditEmployeeId(id);
    setIsAddingEmployee(true);
  };

  const handleSaveEdit = () => {
    // Update the employee's details in the employees array
    const updatedEmployees = employees.map(employee => {
      if (employee.id === editEmployeeId) {
        return {
          ...employee,
          ...newEmployeeData
        };
      }
      return employee;
    });

    // Update the state with the updated employees array
    setEmployees(updatedEmployees);

    // Reset the form data and toggle the form visibility
    setNewEmployeeData({ name: '', email: '', salary: '', joiningDate: '', status: 'Active' });
    setIsEditing(false);
    setIsAddingEmployee(false);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const renderAddEmployeeForm = () => {
    if (!isAddingEmployee) {
      return (
        <button onClick={toggleAddEmployeeForm} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4 ">
          Add New Employee
        </button>
      );
    }

    return (
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 bg-blue-400 text-center">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>
        {/* Add Employee Form Goes Here */}
        {/* Example form fields */}
        <input type="text" name="name" placeholder="Name" value={newEmployeeData.name} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" />
        <input type="email" name="email" placeholder="Email" value={newEmployeeData.email} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" />
        <input type="number" name="salary" placeholder="Salary" value={newEmployeeData.salary} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" />
        <input type="date" name="joiningDate" placeholder="Joining Date" value={newEmployeeData.joiningDate} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md p-2 mb-2" />
        <div className="mb-2">
          <span className="mr-2">Status:</span>
          <label className="inline-flex items-center mr-4 text-center">
            <input type="radio" name="status" value="Active" checked={newEmployeeData.status === 'Active'} onChange={handleRadioChange} className="form-radio h-5 w-5 text-blue-600" />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="status" value="Inactive" checked={newEmployeeData.status === 'Inactive'} onChange={handleRadioChange} className="form-radio h-5 w-5 text-red-600" />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        {isEditing ? (
          <button onClick={handleSaveEdit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">Save</button>
        ) : (
          <button onClick={handleAddEmployee} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">Add Employee</button>
        )}
        <button onClick={toggleAddEmployeeForm} className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md">Cancel</button>
      </div>
    );
  };

  const renderEmployees = () => {
    return employees.map(employee => (
      <tr key={employee.id}>
        <td className='text-center'>{employee.name}</td>
        <td className='text-center'>{employee.email}</td>
        <td className='text-center'>${employee.salary}</td>
        <td className='text-center'>{employee.joiningDate}</td>
        <td className='text-center'>{employee.status}</td>
        <td className='text-center'>
          <button onClick={() => handleEdit(employee.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md mr-2">Edit</button>
          <button onClick={() => handleDelete(employee.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-md">Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      {renderAddEmployeeForm()}
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Salary</th>
            <th className="border px-4 py-2">Joining Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderEmployees()}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
