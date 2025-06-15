import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
  
      console.log("Login Response:", response); // Debugging log
  
      if (response.data && response.data.token) {
        alert("Login successful!");
        localStorage.setItem('token', response.data.token); // Save token
      } else {
        alert("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };
  
        

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-gray-900 text-2xl font-semibold title-font mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
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

          {/* Password Input */}
          <div className="relative mb-6">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
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

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full text-white bg-pink-500 border-0 py-3 px-8 focus:outline-none 
                       hover:bg-pink-600 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}

        <p className="text-sm text-gray-500 mt-4 text-center">Sign in to view the reviews</p>
      </div>
    </section>
  );
};

export default SignIn;
