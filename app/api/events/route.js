// /app/api/events/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Event from '../../../models/Event';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const {
      eventName,
      eventTime,
      eventVenue,
      eventDescription,
      eventStartDate,
      eventEndDate,
      eventMode,
      participantsCount,
      organizationName,
      sponsoringAgency
    } = body;

    // Validate input data
    if (
      !eventName || !eventTime || !eventVenue || !eventDescription ||
      !eventStartDate || !eventEndDate || !eventMode ||
      !participantsCount || !organizationName || !sponsoringAgency
    ) {
      return NextResponse.json({ message: 'Invalid data format or missing data' }, { status: 400 });
    }

    const newEvent = new Event({
      eventName,
      eventTime,
      eventVenue,
      eventDescription,
      eventStartDate,
      eventEndDate,
      eventMode,
      participantsCount,
      organizationName,
      sponsoringAgency
    });

    await newEvent.save();

    return NextResponse.json({ message: 'Event successfully created' }, { status: 200 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Error creating event', error: error.message }, { status: 500 });
  }
}
