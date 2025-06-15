import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  const [user_id, setUser_id] = useState(''); // Ensure consistency in naming
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        user_id, // Ensure it matches the state variable
        email,
        username,
        password,
      });

      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Something went wrong');
      } else {
        setErrorMessage('Network error: Unable to reach the server');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-gray-900 text-2xl font-semibold title-font mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleRegister}>
          {/* User ID - Number Input */}
          <div className="relative mb-4">
            <label htmlFor="user_id" className="leading-7 text-sm text-gray-600">
              User ID
            </label>
            <input
              type="number"
              id="user_id"
              name="user_id"
              value={user_id} // Fixed: Using correct state variable
              onChange={(e) => setUser_id(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 
                         focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 
                         py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {/* Username */}
          <div className="relative mb-4">
            <label htmlFor="username" className="leading-7 text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 
                         focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 
                         py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 
                         focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 
                         py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 
                         focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 
                         py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit" // Fixed: Now it's inside a form with "onSubmit"
            className="w-full text-white bg-pink-500 border-0 py-3 px-8 focus:outline-none 
                       hover:bg-pink-600 rounded-lg text-lg transition-transform transform 
                       hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}

        {/* Sign In Link */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Have an account? <a href="/signin" className="text-pink-500 hover:underline">Sign In</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
