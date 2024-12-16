import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto p-5 shadow-md rounded-lg">
      <h2 className="text-center text-xl font-bold mb-5">Register</h2>

      {/* Error Message */}
      {error && (
        <div className="text-red-700 bg-[#ffebee] p-3 rounded-md mb-5">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstname" className="sr-only">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastname" className="sr-only">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 text-white rounded-md"
          style={{
            backgroundColor: '#4c8250',
          }}
        >
          Register
        </button>
      </form>

      {/* Link to Login */}
      <p className="font-bold text-center mt-5">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
