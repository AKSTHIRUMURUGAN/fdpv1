import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Staff from '../../../models/Staff';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();  // Parse JSON data from the request body
    const { department_name, staffData } = body;  // Extract department name and staff data

    // Validate input data
    if (!department_name || !Array.isArray(staffData) || staffData.length === 0) {
      return NextResponse.json({ message: 'Invalid data format or no data provided' }, { status: 400 });
    }

    console.log("Saving data to the database..."); // Log before saving data

    // Create and save staff data with department name
    const staffPromises = staffData.map(staff => {
      return new Staff({
        ...staff,
        department_name  // Add department name to each staff record
      }).save();
    });

    await Promise.all(staffPromises); // Save all staff records

    console.log("Data successfully saved."); // Log success

    return NextResponse.json({ message: 'Staff data successfully saved' }, { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error); // Log any errors
    return NextResponse.json({ message: 'Error saving data', error: error.message }, { status: 500 });
  }
}
