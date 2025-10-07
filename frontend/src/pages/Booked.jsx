import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Booked = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  
  return (
    <div className="bg-gradient-to-br from-BackgroundCream to-white min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-GreenColor rounded-full mb-6 animate-float">
            <FaCheckCircle size={45} className="text-white" />
          </div>
          
          <h1 className="heading-primary text-GreenColor mb-4">
            🙏 Journey Awaits! 🙏
          </h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-TextDark mb-4">
              Your Tour is Confirmed
            </h2>
            <p className="text-GrayColor leading-relaxed mb-6">
              Congratulations! Your journey has been successfully booked. 
              You're one step closer to experiencing the divine heritage and 
              mystical wonders of ancient India. Prepare for a transformative adventure one step to the world.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
              <div className="p-4 bg-gradient-to-br from-BaseColor to-BHoverColor rounded-lg text-white">
                <div className="text-2xl mb-2">🏛️</div>
                <p className="text-sm font-medium">Sacred Temples</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-GoldColor to-yellow-400 rounded-lg text-TextDark">
                <div className="text-2xl mb-2">📿</div>
                <p className="text-sm font-medium">Spiritual Guidance</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-GreenColor to-green-500 rounded-lg text-white">
                <div className="text-2xl mb-2">🌸</div>
                <p className="text-sm font-medium">Divine Experiences</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link 
              className="btn text-lg px-8 py-4 inline-block" 
              to="/my-account"
            >
              📋 View My Sacred Bookings
            </Link>
            
            <div className="text-center">
              <Link 
                className="text-BaseColor hover:text-BHoverColor font-medium underline transition-colors" 
                to="/tours"
              >
                Explore More Sacred Destinations →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booked;
