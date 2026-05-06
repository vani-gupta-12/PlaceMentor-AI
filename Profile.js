const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Academic details
  cgpa: { type: Number, default: 0 },
  branch: { type: String, default: '' },
  year: { type: String, default: '' },
  college: { type: String, default: '' },

  // Technical skills
  dsaSolved: { type: Number, default: 0 },
  projectsBuilt: { type: Number, default: 0 },
  internships: { type: Number, default: 0 },
  skills: [{ type: String }],

  // Soft skills (1-10 scale)
  communicationScore: { type: Number, default: 0 },
  aptitudeScore: { type: Number, default: 0 },

  // Resume
  hasResume: { type: Boolean, default: false },
  resumeScore: { type: Number, default: 0 },

  // Core CS subjects (1-10 scale)
  osKnowledge: { type: Number, default: 0 },
  dbmsKnowledge: { type: Number, default: 0 },
  networkingKnowledge: { type: Number, default: 0 },
  oopKnowledge: { type: Number, default: 0 },

  // Target
  targetCompany: { type: String, default: '' }

}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);