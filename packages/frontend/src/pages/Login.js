import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

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
    <div className="max-w-md mx-auto p-5 shadow-md rounded-lg" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 className="text-center text-2xl font-semibold mb-5">Login</h2>
      {error && (
        <div className="text-red-700 mb-3 p-3 bg-[#ffebee] rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
        />
        <button
          type="submit"
          className="p-3 text-white rounded-md"
          style={{
            backgroundColor: '#4c8250',
          }}
        >
          Login
        </button>
      </form>
      <p className="text-center mt-5">
        Don't have an account?{' '}
        <Link to="/register" className="text-green-800 font-bold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
