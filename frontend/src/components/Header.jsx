import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const Header = () => {
  return (
    <header className="text-gray-600 body-font bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
        
        {/* Logo on the Left Side */}
        <a href="#" className="flex title-font font-medium items-center text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-pink-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-bold">Book Review Management System</span>
        </a>

        {/* Navigation in the Center */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <Link to="/about" className="hover:text-gray-900">About</Link>
          <Link to="/reviews" className="hover:text-gray-900">Reviews</Link>
          <Link to="/books" className="hover:text-gray-900">Books</Link>
          <Link to="/authors" className="hover:text-gray-900">Authors</Link>
        </nav>

        {/* Buttons on the Right Side */}
        <div className="flex space-x-4">
          <Link to="/signin">
            <button className="inline-flex items-center bg-white text-pink-500 border border-pink-500 py-2 px-4 rounded-lg hover:bg-pink-500 hover:text-white transition-all">
              Sign In
            </button>
          </Link>
          
          <Link to="/register">
            <button className="inline-flex items-center bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-all">
              Register
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
