import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salary: {
    type: Number,
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
});

const Employee = mongoose.models.employees || mongoose.model('employees', employeeSchema);

export default Employee;
