const mongoose = require('mongoose');

const ScoreHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: { type: String, required: true },
  readinessScore: { type: Number, required: true },
  breakdown: {
    dsaSolved: Number,
    aptitude: Number,
    communication: Number,
    projects: Number,
    resume: Number,
    cgpa: Number,
    coreCS: Number
  },
  weakAreas: [{ area: String, score: Number, weight: Number }],
  aiGenerated: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ScoreHistory', ScoreHistorySchema);