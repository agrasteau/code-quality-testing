import { useState } from 'react';
import { loginUser } from '../services/api';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      navigate('/products');
    } catch (err) {
      setError(err.error || 'An error occurred');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg p-5 shadow-md" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 className="mb-5 text-center text-2xl font-semibold">Login</h2>
      {error && <div className="mb-3 rounded-md bg-[#ffebee] p-3 text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
        />
        <button
          type="submit"
          className="rounded-md p-3 text-white"
          style={{
            backgroundColor: '#4c8250'
          }}
        >
          Login
        </button>
      </form>
      <p className="mt-5 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-green-800 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
