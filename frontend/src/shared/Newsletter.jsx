import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Welcome to our Journey Newsletter!");
    console.log(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <div>
      <div className="newsletter-container p-0 w-full max-w-md">
        <h3 className="font-heading text-lg font-semibold text-GoldColor mb-4">
          Journey Newsletter
        </h3>
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Stay connected with divine stories,  destinations, and spiritual experiences. 
          Join our community of spiritual seekers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="email"
            id="email"
            placeholder="Enter your email for divine updates"
            value={email}
            onChange={handleInputChange}
            required
            className="px-4 py-3 text-TextDark border border-gray-500 rounded-lg focus:outline-none focus:border-GoldColor focus:ring-2 focus:ring-GoldColor focus:ring-opacity-50 transition-all duration-300"
          />
          <button 
            type="submit" 
            className="btn-secondary py-3 text-sm font-semibold hover:scale-105 transition-transform duration-200"
          >
            🌟 Subscribe to Updates
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
