import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-purple-400">PlaceMentor AI</h1>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
          <h2 className="text-2xl font-bold mb-1">Welcome, {user?.name}! 👋</h2>
          <p className="text-gray-400">{user?.branch} • {user?.year} Year</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/score')}
            className="bg-gray-900 border border-gray-800 hover:border-purple-600 rounded-2xl p-6 cursor-pointer transition"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold mb-1">Check Readiness Score</h3>
            <p className="text-gray-400 text-sm">Get your company-specific placement score</p>
          </div>

          <div
            onClick={() => navigate('/roadmap')}
            className="bg-gray-900 border border-gray-800 hover:border-purple-600 rounded-2xl p-6 cursor-pointer transition"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="text-lg font-semibold mb-1">View Roadmap</h3>
            <p className="text-gray-400 text-sm">Get your personalized study plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}