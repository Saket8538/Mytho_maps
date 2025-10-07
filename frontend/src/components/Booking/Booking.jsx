import React, { useState, useContext, useEffect } from "react";
import { FaStar, FaCalendarAlt, FaUser, FaPhone, FaUsers, FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";

const Booking = ({ price, title, reviewsArray, avgRating }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    userId: user && user._id,
    tourName: title,
    fullName: "",
    totalPrice: price,
    phone: "",
    maxGroupSize: 1,
    bookAt: currentDate,
    date: "",
  });
  const calculatedPrice = data.maxGroupSize * price;

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      tourName: title,
      totalPrice: calculatedPrice,
    }));
  }, [title, calculatedPrice]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const response = await fetch(`${BASE_URL}/booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(data);
        const result = await response.json();
        if (response.ok) {
          toast.success("Booking Confirmed Successfully! 🎉");
          navigate("/booked");
        } else {
          toast.error(result.message);
        }
      }
      if (!user || user === null || user === undefined) {
        toast.error("Please Sign In first");
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl shadow-xl border border-orange-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-yellow-600 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <FaRupeeSign className="text-2xl" />
              {price}
              <span className="text-lg font-normal opacity-90">/per person</span>
            </h3>
            <p className="text-orange-100 font-medium">Sacred Journey Booking</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <FaStar className="text-yellow-300" />
            <span className="font-semibold">{avgRating || 0}</span>
            <span className="text-sm opacity-80">({reviewsArray?.length || 0})</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold text-gray-800 mb-2">
             Book Your Journey
          </h4>
          <p className="text-gray-600">Fill in your details for a spiritual experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaUser className="text-red-500" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium"
              type="text"
              placeholder="Enter your full name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </div>

          {/* Phone Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaPhone className="text-red-500" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium"
              type="tel"
              placeholder="Enter your contact number"
              id="phone"
              required
              onChange={handleChange}
            />
          </div>

          {/* Group Size Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaUsers className="text-red-500" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium"
              type="number"
              placeholder="Number of travelers"
              id="maxGroupSize"
              min="1"
              max="20"
              required
              onChange={handleChange}
            />
          </div>

          {/* Date Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-red-500" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white/70 backdrop-blur-sm font-medium"
              type="date"
              id="date"
              min={currentDate}
              required
              onChange={handleChange}
            />
          </div>

          {/* Price Breakdown */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-orange-100">
            <h5 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaRupeeSign className="text-green-600" />
              Pricing Details
            </h5>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-orange-100">
                <span className="text-gray-700 font-medium">Base Price per Person:</span>
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <FaRupeeSign className="text-sm text-green-600" />
                  {price}
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-orange-100">
                <span className="text-gray-700 font-medium">Number of Travelers:</span>
                <span className="font-semibold text-gray-800">{data.maxGroupSize || 1}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-orange-100">
                <span className="text-gray-700 font-medium">GST & Service Tax:</span>
                <span className="font-semibold text-green-600">Included</span>
              </div>
              
              <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 rounded-lg border-2 border-green-200">
                <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                <div className="flex items-center gap-1 text-2xl font-bold text-green-700">
                  <FaRupeeSign />
                  {calculatedPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
          >
            <span></span>
            Confirm Journey
            <span>🙏</span>
          </button>
          
          <p className="text-center text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            💡 <strong>Note:</strong> Your booking will be confirmed within minutes. 
            Safe travels on your spiritual journey!
          </p>
        </form>
      </div>
    </div>
  );
};

export default Booking;
