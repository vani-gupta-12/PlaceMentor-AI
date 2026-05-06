const express = require('express');
const router = express.Router();
const { calculateScore, getCompanies, calculateScoreAI, generateRoadmap, getHistory } = require('../controllers/scoreController');

// GET all companies
router.get('/companies', getCompanies);

// GET score history for a user
router.get('/history/:userId', getHistory);

// POST calculate score (hardcoded companies)
router.post('/calculate', calculateScore);

// POST calculate score (AI - any company)
router.post('/calculate-ai', calculateScoreAI);

// POST generate AI roadmap
router.post('/roadmap', generateRoadmap);

module.exports = router;