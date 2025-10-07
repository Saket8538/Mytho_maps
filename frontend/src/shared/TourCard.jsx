import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";

const TourCard = ({ tour }) => {
  const { photo, title, city, distance, price, desc, _id, id, reviews, featured } =
    tour;

  // Handle both API tours (_id) and sacred tours (id)
  const tourId = _id || id;
  const { totalRating, avgRating } = CalculateAvg(reviews);

  return (
    <div className="card-elevated max-w-sm h-[420px] flex flex-col group relative overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
          src={photo} 
          alt={title} 
        />
        {featured === true ? (
          <div className="absolute top-3 right-0 bg-gradient-to-r from-GoldColor to-yellow-400 text-TextDark font-bold py-2 px-4 rounded-l-full shadow-lg">
            ⭐ Featured
          </div>
        ) : null}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-sm leading-relaxed">
            {desc && desc.length > 60 ? desc.substring(0, 60) + "..." : desc}
          </p>
        </div>
      </div>
      
      <div className="px-6 py-4 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-BaseColor font-semibold text-sm uppercase tracking-wide">{city}</p>
            <div className="flex items-center gap-1">
              <FaStar className="text-GoldColor text-sm" />
              <span className="text-sm font-medium text-GrayColor">
                {avgRating || 0} ({Array.isArray(reviews) ? reviews.length : 0})
              </span>
            </div>
          </div>
          
          <div className="mb-3">
            <Link to={`/tours/${tourId}`} className="group">
              <h3 className="font-heading text-lg font-semibold text-TextDark group-hover:text-BaseColor transition-colors duration-300 leading-tight mb-2">
                {title && title.length > 22 ? title.substring(0, 22) + "..." : title}
              </h3>
            </Link>
            {/* Two-line description */}
            {desc && (
              <div className="text-xs text-GrayColor leading-relaxed">
                <p className="line-clamp-2 h-8">
                  {desc.length > 80 ? desc.substring(0, 80) + "..." : desc}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-GrayColor uppercase tracking-wide mb-1">Starting From</p>
              <span className="text-xl font-bold text-BaseColor">₹{price}</span>
              <span className="text-sm text-GrayColor">/person</span>
            </div>
          </div>
          
          <Link 
            to={`/tours/${tourId}`} 
            className="btn w-full text-center text-sm py-3 block hover:scale-105 transition-transform duration-200"
          >
            Book Journey
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
