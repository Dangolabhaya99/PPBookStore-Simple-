import React from "react";

const AboutComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1505063366573-38928ae5567e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-4xl p-8 bg-white bg-opacity-90 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center text-green-500 mb-8">About Us</h1>
        <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to PP Book Store, your number one source for all academic books for college and schools.
            We're dedicated to giving you the very best of books, with a focus on quality, variety, and customer service.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Founded in 2024, PP Book Store has come a long way from its beginnings.
            When we first started out, our passion for providing the best educational resources drove us to start our own business.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We now serve customers all over the country and are thrilled to be a part of the educational wing of the book industry.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We hope you enjoy our products as much as we enjoy offering them to you.
            If you have any questions or comments, please don't hesitate to contact us.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Sincerely, <br />
            PP Book Store Team
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
