import React from "react";
import heroImage from "../assets/hero.png"; // Make sure the image path is correct

const Home = () => {
  return (
    <section className="text-gray-600 body-font min-h-screen flex items-center">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center justify-between">
        
        {/* Left Section - Text & Buttons */}
        <div className="lg:w-1/2 md:w-1/2 flex flex-col items-start text-left mb-16 md:mb-0">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          📚 Welcome to BookReview Hub!
          </h1>
          <p className="mb-8 leading-relaxed">
Discover, Share & Explore Reviews of Your Favorite Books!
Join our community and share your thoughts on amazing books.          </p>
        </div>
        
        {/* Right Section - Hero Image */}
        <div className="lg:w-1/2 md:w-1/2 w-full flex justify-center items-center">
          <img
            src={heroImage}
            alt="Hero"
            className="object-cover w-full h-auto rounded"
          />
        </div>
        
      </div>
    </section>
  );
};

export default Home;
