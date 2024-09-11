import mongoose from 'mongoose';
import StaffSchema from './Staff'; // Import the Staff schema

const DepartmentSchema = new mongoose.Schema({
  department_name: { type: String, required: true },  // Name of the department
  staffs: [StaffSchema]  // Array of staff members
});

const Department = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
export default Department;
