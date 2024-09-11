import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  sl_no: { type: Number, required: true },  // Serial number
  name_of_faculty: { type: String, required: true },  // Faculty Name
  designation: { type: String, required: true },  // Designation (e.g., Professor, Assistant Professor)

  // FDPs (Faculty Development Programs)
  fdp_attended: { type: Number, default: 0 },  // Number of FDPs attended
  fdp_organized: { type: Number, default: 0 },  // Number of FDPs organized

  // Workshops
  workshop_attended: { type: Number, default: 0 },  // Number of Workshops attended
  workshop_organized: { type: Number, default: 0 },  // Number of Workshops organized

  // Webinars
  webinar_attended: { type: Number, default: 0 },  // Number of Webinars attended
  webinar_organized: { type: Number, default: 0 },  // Number of Webinars organized

  // Seminars
  seminar_attended: { type: Number, default: 0 },  // Number of Seminars attended
  seminar_organized: { type: Number, default: 0 },  // Number of Seminars organized

  // Conferences
  conference_attended: { type: Number, default: 0 },  // Number of Conferences attended
  conference_organized: { type: Number, default: 0 },  // Number of Conferences organized

  // Lectures Delivered
  lectures_delivered: { type: Number, default: 0 },  // Number of Lectures delivered

  // Courses attended
  nptel_courses_attended: { type: Number, default: 0 },  // Number of NPTEL Courses attended equivalent to FDP
  mooc_courses_attended: { type: Number, default: 0 },  // Number of other MOOC Courses attended (LinkedIn, edX, Coursera, etc.)

  // Department Name
  department_name: { type: String, required: true }  // Department Name
});

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
