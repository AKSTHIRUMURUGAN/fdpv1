import mongoose from 'mongoose';
import Staff from './Staff';
import Event from './event';

// Achievement Schema
const AchievementSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for facultyId
    required: true,
    ref: 'Staff' // Reference to Faculty model if you have one
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for eventId
    required: true,
    ref: 'Event' // Reference to Event model if you have one
  },
  participationType: {
    type: String,
    enum: ['Attended', 'Organized'],
    required: true
  },
  certificateUrl: {
    type: String,
    default: '' // Default to an empty string if not provided
  },
  learningOutcomes: {
    type: String,
    enum: ['YES', 'NO'],
    required: true
  },
  learningOutcomesUrl: {
    type: String,
    default: '' // Default to an empty string if not provided
  },
  studyMaterials: {
    type: String,
    enum: ['YES', 'NO'],
    required: true
  },
  studyMaterialsUrl: {
    type: String,
    default: '' // Default to an empty string if not provided
  }
});

const Achievement = mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);

export default Achievement;
