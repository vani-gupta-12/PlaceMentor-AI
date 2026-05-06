import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ScorePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [profile, setProfile] = useState({
    dsaSolved: '', aptitudeScore: '', communicationScore: '',
    projectsBuilt: '', resumeScore: '', cgpa: '',
    osKnowledge: '', dbmsKnowledge: '', networkingKnowledge: '', oopKnowledge: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hardcodedCompanies = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Amazon', 'Google', 'Microsoft'];

  const handleSubmit = async () => {
  if (!company) {
    setError('Please select or type a company name');
    return;
  }
  setLoading(true);
  setError('');
  try {
    const hardcoded = ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Amazon', 'Google', 'Microsoft'];
    const isHardcoded = hardcoded.some(c => c.toLowerCase() === company.toLowerCase());

    let res;

    if (isHardcoded) {
      res = await axios.post('http://localhost:5000/api/score/calculate', {
        companyName: company,
        userId: user?.id,
        profileData: {
          dsaSolved: Number(profile.dsaSolved),
          aptitudeScore: Number(profile.aptitudeScore),
          communicationScore: Number(profile.communicationScore),
          projectsBuilt: Number(profile.projectsBuilt),
          resumeScore: Number(profile.resumeScore),
          cgpa: Number(profile.cgpa),
          osKnowledge: Number(profile.osKnowledge),
          dbmsKnowledge: Number(profile.dbmsKnowledge),
          networkingKnowledge: Number(profile.networkingKnowledge),
          oopKnowledge: Number(profile.oopKnowledge)
        }
      });
    } else {
      try {
        res = await axios.post('http://localhost:5000/api/score/calculate-ai', {
          companyName: company,
          userId: user?.id,
          profileData: {
            dsaSolved: Number(profile.dsaSolved),
            aptitudeScore: Number(profile.aptitudeScore),
            communicationScore: Number(profile.communicationScore),
            projectsBuilt: Number(profile.projectsBuilt),
            resumeScore: Number(profile.resumeScore),
            cgpa: Number(profile.cgpa),
            osKnowledge: Number(profile.osKnowledge),
            dbmsKnowledge: Number(profile.dbmsKnowledge),
            networkingKnowledge: Number(profile.networkingKnowledge),
            oopKnowledge: Number(profile.oopKnowledge)
          }
        });
      } catch (aiErr) {
        res = await axios.post('http://localhost:5000/api/score/calculate', {
          companyName: 'Amazon',
          userId: user?.id,
          profileData: {
            dsaSolved: Number(profile.dsaSolved),
            aptitudeScore: Number(profile.aptitudeScore),
            communicationScore: Number(profile.communicationScore),
            projectsBuilt: Number(profile.projectsBuilt),
            resumeScore: Number(profile.resumeScore),
            cgpa: Number(profile.cgpa),
            osKnowledge: Number(profile.osKnowledge),
            dbmsKnowledge: Number(profile.dbmsKnowledge),
            networkingKnowledge: Number(profile.networkingKnowledge),
            oopKnowledge: Number(profile.oopKnowledge)
          }
        });
        res.data.company = company;
        res.data.note = 'AI quota exceeded — score calculated using general tech company criteria';
      }
    }
    setResult(res.data);
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong. Please try again.');
  }
  setLoading(false);
};

  const scoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-2">Placement Readiness Score</h1>
        <p className="text-gray-400 mb-8">Enter your details to get your company-specific score</p>

        {!result ? (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            {/* Company Selection */}
            <h3 className="font-semibold mb-3">Select Target Company</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {hardcodedCompanies.map(c => (
                <button
                  key={c}
                  onClick={() => { setCompany(c); setIsCustom(false); }}
                  className={`px-4 py-2 rounded-lg border transition text-sm ${
                    company === c && !isCustom
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-gray-700 hover:border-purple-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Custom company */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Or type any company (e.g. Flipkart, Zomato...)"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500"
                onChange={e => { setCompany(e.target.value); setIsCustom(true); }}
              />
            </div>

            {/* Profile inputs */}
            <h3 className="font-semibold mb-3">Your Profile</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { key: 'dsaSolved', label: 'DSA Questions Solved', max: '500+' },
                { key: 'cgpa', label: 'CGPA', max: '10' },
                { key: 'projectsBuilt', label: 'Projects Built', max: '10+' },
                { key: 'aptitudeScore', label: 'Aptitude Level (1-10)', max: '10' },
                { key: 'communicationScore', label: 'Communication (1-10)', max: '10' },
                { key: 'resumeScore', label: 'Resume Quality (1-10)', max: '10' },
                { key: 'osKnowledge', label: 'OS Knowledge (1-10)', max: '10' },
                { key: 'dbmsKnowledge', label: 'DBMS Knowledge (1-10)', max: '10' },
                { key: 'networkingKnowledge', label: 'Networking (1-10)', max: '10' },
                { key: 'oopKnowledge', label: 'OOP Knowledge (1-10)', max: '10' },
              ].map(({ key, label, max }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    type="number"
                    placeholder={`0 - ${max}`}
                    value={profile[key]}
                    onChange={e => setProfile({...profile, [key]: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>

            {error && <div className="bg-red-900/30 text-red-400 border border-red-800 rounded-lg p-3 mb-4 text-sm">{error}</div>}

            <button
              onClick={handleSubmit}
              disabled={loading || !company}
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate My Score →'}
            </button>
          </div>
        ) : (
          // Results
          <div className="space-y-4">
            {/* Main score */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 text-center">
              <p className="text-gray-400 mb-2">{result.company} Readiness Score</p>
              <div className={`text-7xl font-bold mb-2 ${scoreColor(result.readinessScore)}`}>
                {result.readinessScore}%
              </div>
              <p className="text-gray-300">{result.label}</p>
              {result.aiGenerated && (
                <span className="inline-block mt-2 text-xs bg-purple-900/30 text-purple-400 border border-purple-800 px-3 py-1 rounded-full">
                  ✨ AI Generated
                </span>
              )}
              {result.note && (
  <p className="text-xs text-yellow-400 mt-2">{result.note}</p>
)}
            </div>

            {/* Breakdown */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h3 className="font-semibold mb-4">Score Breakdown</h3>
              {Object.entries(result.breakdown).map(([key, val]) => (
                <div key={key} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 capitalize">{key}</span>
                    <span>{val}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${val >= 60 ? 'bg-green-500' : val >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Weak areas */}
            {result.weakAreas.length > 0 && (
              <div className="bg-gray-900 rounded-2xl border border-red-900/50 p-6">
                <h3 className="font-semibold mb-3 text-red-400">⚠ Areas to Improve</h3>
                {result.weakAreas.map((w, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                    <span>{w.area}</span>
                    <span className="text-red-400 text-sm">{w.score}% • {w.weight}% weight</span>
                  </div>
                ))}
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="bg-gray-900 rounded-2xl border border-yellow-900/50 p-6">
                <h3 className="font-semibold mb-3 text-yellow-400">⚡ Requirements Not Met</h3>
                {result.warnings.map((w, i) => (
                  <p key={i} className="text-gray-400 text-sm py-1">{w}</p>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 border border-gray-700 hover:border-purple-500 py-3 rounded-lg transition"
              >
                Try Another Company
              </button>
              <button
                onClick={() => navigate('/roadmap', { state: { weakAreas: result.weakAreas, company: result.company }})}
                className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition"
              >
                Get Roadmap →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}