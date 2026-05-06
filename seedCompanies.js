const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const CompanyRequirements = require('./models/CompanyRequirements');

const companies = [
  {
    companyName: 'TCS',
    weights: {
      dsaSolved: 15,
      aptitudeScore: 35,
      communicationScore: 25,
      projectsBuilt: 10,
      resumeScore: 10,
      cgpa: 5,
      coreCS: 0
    },
    minimums: { dsaSolved: 20, cgpa: 6.0, projectsBuilt: 1 },
    description: 'TCS focuses heavily on aptitude and communication for freshers',
    difficulty: 'Easy'
  },
  {
    companyName: 'Infosys',
    weights: {
      dsaSolved: 15,
      aptitudeScore: 30,
      communicationScore: 25,
      projectsBuilt: 10,
      resumeScore: 10,
      cgpa: 10,
      coreCS: 0
    },
    minimums: { dsaSolved: 20, cgpa: 6.5, projectsBuilt: 1 },
    description: 'Infosys values aptitude, communication and good CGPA',
    difficulty: 'Easy'
  },
  {
    companyName: 'Wipro',
    weights: {
      dsaSolved: 15,
      aptitudeScore: 30,
      communicationScore: 20,
      projectsBuilt: 15,
      resumeScore: 10,
      cgpa: 10,
      coreCS: 0
    },
    minimums: { dsaSolved: 15, cgpa: 6.0, projectsBuilt: 1 },
    description: 'Wipro looks for well-rounded freshers with good projects',
    difficulty: 'Easy'
  },
  {
    companyName: 'Amazon',
    weights: {
      dsaSolved: 40,
      aptitudeScore: 5,
      communicationScore: 10,
      projectsBuilt: 25,
      resumeScore: 10,
      cgpa: 5,
      coreCS: 5
    },
    minimums: { dsaSolved: 100, cgpa: 7.0, projectsBuilt: 2 },
    description: 'Amazon is DSA-heavy. Strong problem solving and projects needed',
    difficulty: 'Hard'
  },
  {
    companyName: 'Google',
    weights: {
      dsaSolved: 45,
      aptitudeScore: 5,
      communicationScore: 5,
      projectsBuilt: 25,
      resumeScore: 5,
      cgpa: 5,
      coreCS: 10
    },
    minimums: { dsaSolved: 200, cgpa: 7.5, projectsBuilt: 3 },
    description: 'Google requires exceptional DSA skills and impressive projects',
    difficulty: 'Very Hard'
  },
  {
    companyName: 'Microsoft',
    weights: {
      dsaSolved: 35,
      aptitudeScore: 5,
      communicationScore: 15,
      projectsBuilt: 25,
      resumeScore: 10,
      cgpa: 5,
      coreCS: 5
    },
    minimums: { dsaSolved: 150, cgpa: 7.0, projectsBuilt: 2 },
    description: 'Microsoft focuses on DSA, projects and system design',
    difficulty: 'Hard'
  },
  {
    companyName: 'Accenture',
    weights: {
      dsaSolved: 10,
      aptitudeScore: 30,
      communicationScore: 30,
      projectsBuilt: 10,
      resumeScore: 10,
      cgpa: 10,
      coreCS: 0
    },
    minimums: { dsaSolved: 10, cgpa: 6.0, projectsBuilt: 1 },
    description: 'Accenture values communication and aptitude most',
    difficulty: 'Easy'
  },
  {
    companyName: 'Cognizant',
    weights: {
      dsaSolved: 15,
      aptitudeScore: 30,
      communicationScore: 25,
      projectsBuilt: 10,
      resumeScore: 10,
      cgpa: 10,
      coreCS: 0
    },
    minimums: { dsaSolved: 15, cgpa: 6.0, projectsBuilt: 1 },
    description: 'Cognizant looks for aptitude, communication and basic coding',
    difficulty: 'Easy'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');

    await CompanyRequirements.deleteMany({});
    await CompanyRequirements.insertMany(companies);

    console.log('✅ Company data seeded successfully!');
    console.log(`✅ ${companies.length} companies added`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();