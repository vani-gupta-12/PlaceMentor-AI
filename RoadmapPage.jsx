import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RoadmapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { weakAreas, company, breakdown } = location.state || {};
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default roadmap based on weak areas
  const defaultPlans = {
    'DSA / Coding': [
      'Day 1-7: Arrays and Strings — solve 15 problems on LeetCode',
      'Day 8-14: Linked Lists and Stacks — solve 10 problems',
      'Day 15-21: Trees and Graphs — solve 10 problems',
      'Day 22-30: Dynamic Programming — solve 8 problems',
    ],
    'Aptitude': [
      'Day 1-7: Number System and Percentages — 20 questions daily',
      'Day 8-14: Time, Speed, Distance — 20 questions daily',
      'Day 15-21: Logical Reasoning — 20 questions daily',
      'Day 22-30: Mock aptitude tests — 2 full tests per day',
    ],
    'Communication': [
      'Day 1-7: Read English articles daily for 30 minutes',
      'Day 8-14: Practice HR questions in front of mirror',
      'Day 15-21: Record yourself answering interview questions',
      'Day 22-30: Give 2 mock interviews with friends',
    ],
    'Projects': [
      'Day 1-3: Pick a project idea relevant to your target company',
      'Day 4-15: Build the core features of the project',
      'Day 16-22: Add documentation and README to GitHub',
      'Day 23-30: Deploy the project and add it to your resume',
    ],
    'Resume': [
      'Day 1-2: Use a clean ATS-friendly template from resume.io',
      'Day 3-5: Add all projects with proper descriptions and links',
      'Day 6-7: Add skills, certifications, and achievements section',
      'Day 8-10: Get resume reviewed by a senior or mentor',
    ],
  };

  // General roadmap when no weak areas
  const generalPlan = [
    { week: 'Week 1', title: 'Strengthen DSA', tasks: ['Solve 25 LeetCode problems', 'Focus on Arrays, Strings, Hashmaps', 'Practice 2 problems daily minimum'] },
    { week: 'Week 2', title: 'Build a Project', tasks: ['Start a full stack project', 'Push code to GitHub daily', 'Write clean documentation'] },
    { week: 'Week 3', title: 'Aptitude & Communication', tasks: ['20 aptitude questions daily', 'Practice HR questions', 'Read tech news for 20 mins'] },
    { week: 'Week 4', title: 'Mock Interviews', tasks: ['Give 3 mock interviews', 'Review and improve resume', 'Apply to companies on LinkedIn'] },
  ];

  const generateAIRoadmap = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/score/roadmap', {
        company,
        weakAreas,
        breakdown
      });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      setError('AI roadmap unavailable right now. Using default plan below.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-2">Your Study Roadmap</h1>
        <p className="text-gray-400 mb-6">
          {company ? `Personalized plan to crack ${company}` : 'Complete your score first to get a personalized roadmap'}
        </p>

        {/* AI Roadmap Button */}
        {company && (
          <button
            onClick={generateAIRoadmap}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50 mb-6"
          >
            {loading ? '✨ Generating AI Roadmap...' : '✨ Generate AI Roadmap for ' + company}
          </button>
        )}

        {error && (
          <div className="bg-yellow-900/30 text-yellow-400 border border-yellow-800 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* AI Generated Roadmap */}
        {roadmap && (
          <div className="bg-gray-900 rounded-2xl border border-purple-800 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-purple-400 font-semibold">✨ AI Generated Roadmap</span>
              <span className="text-xs bg-purple-900/30 text-purple-400 border border-purple-800 px-2 py-0.5 rounded-full">Powered by Gemini</span>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {roadmap}
            </div>
          </div>
        )}

        {/* Weak Areas Roadmap */}
        {weakAreas && weakAreas.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-red-400">🎯 Focus Areas for {company}</h2>
            {weakAreas.map((area, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-purple-400">
                    Week {i + 1} — {area.area}
                  </h3>
                  <span className="text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded-full">
                    {area.score}% → Target 70%
                  </span>
                </div>
                <div className="space-y-2">
                  {(defaultPlans[area.area] || []).map((task, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-purple-400 mt-0.5">→</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // General roadmap when no weak areas
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-green-400">
              ✅ {company ? `You are on track for ${company}!` : 'General Placement Roadmap'}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Your scores look good! Follow this 4-week plan to stay sharp.
            </p>
            {generalPlan.map((week, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-purple-900/30 text-purple-400 border border-purple-800 px-2 py-1 rounded-full">
                    {week.week}
                  </span>
                  <h3 className="font-semibold">{week.title}</h3>
                </div>
                <div className="space-y-2">
                  {week.tasks.map((task, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-purple-400 mt-0.5">→</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/score')}
          className="w-full mt-6 border border-gray-700 hover:border-purple-500 py-3 rounded-lg transition text-gray-400 hover:text-white"
        >
          ← Recalculate Score
        </button>
      </div>
    </div>
  );
}