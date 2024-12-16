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
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  // Password validation functions
  const validatePasswordLength = (password) => {
    if (password.length < 13) {
      return "Password must be at least 13 characters long.";
    }
    return null;
  };

  const validateUppercase = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    return null;
  };

  const validateLowercase = (password) => {
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return null;
  };

  const validateNumber = (password) => {
    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }
    return null;
  };

  const validateSpecialCharacter = (password) => {
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (e.g., !, @, #, $, %, etc.).";
    }
    return null;
  };

  // Aggregate password validation function
  const validatePassword = (password) => {
    const errors = [];

    // Check each condition
    const lengthError = validatePasswordLength(password);
    if (lengthError) errors.push(lengthError);

    const uppercaseError = validateUppercase(password);
    if (uppercaseError) errors.push(uppercaseError);

    const lowercaseError = validateLowercase(password);
    if (lowercaseError) errors.push(lowercaseError);

    const numberError = validateNumber(password);
    if (numberError) errors.push(numberError);

    const specialCharacterError = validateSpecialCharacter(password);
    if (specialCharacterError) errors.push(specialCharacterError);

    setPasswordErrors(errors); // Update the errors state
    return errors.length === 0; // Return true if no errors
  };

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

    if (name === 'password') {
      validatePassword(value); // Trigger password validation on each change
    }
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <div className="flex flex-col relative group">
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
            required
          />
          {/* Hover Tooltip */}
          <div className="absolute top-full mt-2 left-0 bg-gray-700 text-white text-sm p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <p>Password must contain:</p>
            <ul className="list-disc pl-4">
              <li>At least one special character</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least 13 characters</li>
            </ul>
          </div>
        </div>

        {/* Password Errors */}
        {passwordErrors.length > 0 && (
          <div className="text-red-700 bg-[#ffebee] p-3 rounded-md mb-5">
            <ul className="list-disc pl-5">
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 text-white rounded-md"
          style={{
            backgroundColor: '#4c8250',
          }}
          disabled={passwordErrors.length > 0} // Disable the button if there are password errors
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
