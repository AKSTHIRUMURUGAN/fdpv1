// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventStartDate: {
    type: Date,
    required: true,
  },
  eventEndDate: {
    type: Date,
    required: true,
  },
  eventMode: {
    type: String,
    enum: ['Online', 'Offline'],
    required: true,
  },
  participantsCount: {
    type: Number,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  sponsoringAgency: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
