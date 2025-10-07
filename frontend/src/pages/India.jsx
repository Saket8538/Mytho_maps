import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { itineraries } from "../assets/data/itineraries";

const India = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(itineraries.length / 3));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleViewItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-BackgroundCream to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h1 className="heading-primary mb-6">
            Incredible{" "}
            <span className="text-BaseColor heading-accent">India</span>
          </h1>
          <p className="text-lg leading-8 text-gray-700 max-w-4xl mx-auto mb-12">
            "Discover the land of diverse cultures, ancient traditions, and mystical heritage. 
            India, where every corner tells a story of gods, legends, and timeless spirituality 
            that has shaped human civilization for millennia."
          </p>
        </div>
      </section>

      {/* India Highlights Section */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <h2 className="heading-secondary text-center mb-12">
            Why{" "}
            <span className="text-BaseColor heading-accent">
              India is Incredible
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cultural Heritage */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-BackgroundCream to-white shadow-lg">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold text-BaseColor mb-3">Cultural Heritage</h3>
              <p className="text-gray-600">
                5000+ years of continuous civilization with UNESCO World Heritage sites, 
                ancient temples, and architectural marvels.
              </p>
            </div>

            {/* Spiritual Diversity */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-BackgroundCream to-white shadow-lg">
              <div className="text-4xl mb-4">🕉️</div>
              <h3 className="text-xl font-semibold text-BaseColor mb-3">Spiritual Diversity</h3>
              <p className="text-gray-600">
                Birthplace of Hinduism, Buddhism, Jainism, and Sikhism. 
                A land where all religions coexist in harmony.
              </p>
            </div>

            {/* Natural Beauty */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-BackgroundCream to-white shadow-lg">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold text-BaseColor mb-3">Natural Wonders</h3>
              <p className="text-gray-600">
                From the Himalayas to tropical beaches, deserts to rainforests - 
                India offers every landscape imaginable.
              </p>
            </div>

            {/* Festivals & Traditions */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-BackgroundCream to-white shadow-lg">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-BaseColor mb-3">Vibrant Festivals</h3>
              <p className="text-gray-600">
                Diwali, Holi, Dussehra, and countless regional celebrations 
                that showcase India's colorful cultural tapestry.
              </p>
            </div>

            {/* Cuisine */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-BackgroundCream to-white shadow-lg">
              <div className="text-4xl mb-4">🍛</div>
              <h3 className="text-xl font-semibold text-BaseColor mb-3">Culinary Paradise</h3>
              <p className="text-gray-600">
                Diverse regional cuisines with aromatic spices, vegetarian traditions, 
                and flavors that tantalize every palate.
              </p>
            </div>

            {/* Arts & Crafts */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-BackgroundCream to-white shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-BaseColor mb-3">Arts & Crafts</h3>
              <p className="text-gray-600">
                Traditional handicrafts, classical dance forms, music, 
                and artistic traditions passed down through generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Itineraries Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-BackgroundCream to-white">
        <div className="container mx-auto">
          <h2 className="heading-secondary text-center mb-4">
            Discover{" "}
            <span className="text-BaseColor heading-accent">
              India's Itineraries
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Carefully crafted journeys that beckon every traveller to explore India's diverse destinations
          </p>

          {/* Auto-scrolling Itineraries Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${Math.ceil(itineraries.length / 3) * 100}%`
              }}
            >
              {Array.from({ length: Math.ceil(itineraries.length / 3) }, (_, slideIndex) => (
                <div key={slideIndex} className="flex gap-6 min-w-full">
                  {itineraries.slice(slideIndex * 3, slideIndex * 3 + 3).map((itinerary) => (
                    <div 
                      key={itinerary.id}
                      className="group relative flex-1 min-w-0 overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer bg-white"
                    >
                      {/* Image Container */}
                      <div className="relative h-80 overflow-hidden">
                        <img 
                          src={itinerary.image}
                          alt={itinerary.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Duration Badge */}
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {itinerary.duration}
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        
                        {/* Hover Animation Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-BaseColor/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                          <button 
                            onClick={() => handleViewItinerary(itinerary)}
                            className="bg-white text-BaseColor px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-BaseColor transition-colors duration-300">
                            {itinerary.title}
                          </h3>
                          <p className="text-BaseColor font-semibold text-sm">
                            {itinerary.destination}, {itinerary.region}
                          </p>
                        </div>
                        
                        {/* Quick Info */}
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            🏛️ {itinerary.category}
                          </span>
                          <span className="flex items-center gap-1">
                            👥 {itinerary.maxGroupSize} max
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-center">
                          <span className="text-2xl font-bold text-BaseColor">₹{itinerary.price}</span>
                          <span className="text-sm text-gray-500">/person</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: Math.ceil(itineraries.length / 3) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-BaseColor scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Details Modal */}
      {showModal && selectedItinerary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedItinerary.image}
                alt={selectedItinerary.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedItinerary.duration}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {selectedItinerary.title}
                </h2>
                <p className="text-BaseColor font-semibold text-lg">
                  {selectedItinerary.destination}, {selectedItinerary.region}
                </p>
              </div>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {selectedItinerary.description}
              </p>

              {/* Journey Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Journey Itinerary</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Day 1</h4>
                    <p className="text-gray-700">{selectedItinerary.journey.day1}</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">Day 2</h4>
                    <p className="text-gray-700">{selectedItinerary.journey.day2}</p>
                  </div>
                  {selectedItinerary.journey.day3 && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-700 mb-2">Day 3</h4>
                      <p className="text-gray-700">{selectedItinerary.journey.day3}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Trip Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItinerary.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      ✨ {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-gradient-to-r from-BaseColor to-BHoverColor text-white p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">₹{selectedItinerary.price}</h3>
                    <p className="opacity-90">per person</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Group Size</p>
                    <p className="font-semibold">Max {selectedItinerary.maxGroupSize} people</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link
                    to={`/tours/${selectedItinerary.id}`}
                    className="flex-1 bg-white text-BaseColor font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowModal(false)}
                  >
                    Book Now
                  </Link>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="flex-1 border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-BaseColor transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-BaseColor to-BHoverColor text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience India's Sacred Heritage
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join us on a spiritual journey through India's most sacred destinations 
            and discover the divine stories that shaped our civilization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-BaseColor px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Sacred Tours
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-BaseColor transition-colors">
              Plan Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default India;