import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Achievement from '../../../models/achievement'; // Adjust the path if necessary

export async function POST(req) {
  await dbConnect();

  try {
    // Parse JSON data from the request body
    const body = await req.json();
    const {
      facultyId,
      eventId,
      participationType,
      certificateUrl,
      learningOutcomes,
      learningOutcomesUrl,
      studyMaterials,
      studyMaterialsUrl
    } = body;

    // Validate input data
    if (!facultyId || !eventId || !participationType || !learningOutcomes || !studyMaterials) {
      return NextResponse.json({ message: 'Required fields are missing' }, { status: 400 });
    }

    // Check if learningOutcomesUrl and studyMaterialsUrl are required based on the condition
    if (learningOutcomes === 'YES' && !learningOutcomesUrl) {
      return NextResponse.json({ message: 'Learning outcomes URL is required when learningOutcomes is YES' }, { status: 400 });
    }

    if (studyMaterials === 'YES' && !studyMaterialsUrl) {
      return NextResponse.json({ message: 'Study materials URL is required when studyMaterials is YES' }, { status: 400 });
    }

    console.log("Saving data to the database..."); // Log before saving data

    // Create a new achievement document
    const newAchievement = new Achievement({
      facultyId,
      eventId,
      participationType,
      certificateUrl,
      learningOutcomes,
      learningOutcomesUrl,
      studyMaterials,
      studyMaterialsUrl
    });

    await newAchievement.save(); // Save the new achievement to the database

    console.log("Data successfully saved."); // Log success

    return NextResponse.json({ message: 'Achievement data successfully saved' }, { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error); // Log any errors
    return NextResponse.json({ message: 'Error saving data', error: error.message }, { status: 500 });
  }
}
// Get all achievements
export async function GET() {
    try {
        await dbConnect();
        const achievements = await Achievement.find().populate('facultyId').populate('eventId'); // Adjust fields to include as needed
;
        return NextResponse.json({ success: true, achievements }, { status: 200 });
    } catch (error) {
        console.error("Error fetching achievements:", error);
        return NextResponse.json({ message: "Error fetching achievements", error }, { status: 500 });
    }
}

