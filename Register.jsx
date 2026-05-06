import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    college: '', branch: '', year: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-8">
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-400 mb-6">Start your placement journey today</p>

        {error && <div className="bg-red-900/30 text-red-400 border border-red-800 rounded-lg p-3 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { key: 'name', placeholder: 'Full Name', type: 'text' },
            { key: 'email', placeholder: 'Email', type: 'email' },
            { key: 'password', placeholder: 'Password', type: 'password' },
            { key: 'college', placeholder: 'College Name', type: 'text' },
          ].map(({ key, placeholder, type }) => (
            <input
              key={key}
              type={type}
              placeholder={placeholder}
              value={form[key]}
              onChange={e => setForm({...form, [key]: e.target.value})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
              required
            />
          ))}

          <select
            value={form.branch}
            onChange={e => setForm({...form, branch: e.target.value})}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
            required
          >
            <option value="">Select Branch</option>
            {['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={form.year}
            onChange={e => setForm({...form, year: e.target.value})}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
            required
          >
            <option value="">Select Year</option>
            {['1st', '2nd', '3rd', '4th'].map(y => (
              <option key={y} value={y}>{y} Year</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}