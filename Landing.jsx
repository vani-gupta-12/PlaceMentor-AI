import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-purple-400">PlaceMentor AI</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-gray-300 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="inline-block bg-purple-900/30 text-purple-400 text-sm px-4 py-1 rounded-full mb-6 border border-purple-800">
          AI-Powered Placement Readiness
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Know Exactly How Ready<br />
          <span className="text-purple-400">You Are For Placements</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-xl">
          Get a personalized readiness score for TCS, Amazon, Google and any
          company worldwide. Know your gaps. Fix them. Get placed.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition"
        >
          Check Your Score Free →
        </button>

        {/* Stats */}
        <div className="flex gap-12 mt-16 text-center">
          {[
            ['8+', 'Top Companies'],
            ['0-100', 'Readiness Score'],
            ['AI', 'Powered Roadmap'],
          ].map(([val, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold text-purple-400">{val}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}