const mongoose = require('mongoose');

const CompanyRequirementsSchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  
  // Weightage for each parameter (must add up to 100)
  weights: {
    dsaSolved: { type: Number },
    aptitudeScore: { type: Number },
    communicationScore: { type: Number },
    projectsBuilt: { type: Number },
    resumeScore: { type: Number },
    cgpa: { type: Number },
    coreCS: { type: Number }
  },

  // Minimum requirements
  minimums: {
    dsaSolved: { type: Number },
    cgpa: { type: Number },
    projectsBuilt: { type: Number }
  },

  // Description
  description: { type: String },
  difficulty: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('CompanyRequirements', CompanyRequirementsSchema);