import React, { useEffect, useState } from "react";
import FeaturedTourList from "../components/featruredTour/FeaturedTourList";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import TourCard from "../shared/TourCard";
import SearchTours from "../components/Search/SearchTours";
import { sacredTours } from '../assets/data/sacredTours';

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState('sacred');
  const { apiData: tours, error } = useFetch(`${BASE_URL}/tour?page=${page}`);
  const { apiData: tourCount } = useFetch(`${BASE_URL}/tour/count`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 12);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const renderSacredTours = () => {
    const regions = [
      { 
        key: 'northIndia', 
        title: 'North India Sacred Sites', 
        subtitle: 'Golden Temple, Varanasi, Haridwar & Himalayan Shrines',
        color: '#C8102E',
        gradient: 'from-red-600 to-red-700'
      },
      { 
        key: 'southIndia', 
        title: 'South India Temple Heritage', 
        subtitle: 'Meenakshi Temple, Tirupati, Hampi & Dravidian Wonders',
        color: '#DAA520',
        gradient: 'from-yellow-600 to-yellow-700'
      },
      { 
        key: 'westIndia', 
        title: 'West India Pilgrimage', 
        subtitle: 'Somnath, Shirdi, Ajanta Caves & Jain Temples',
        color: '#138808',
        gradient: 'from-green-600 to-green-700'
      },
      { 
        key: 'eastIndia', 
        title: 'East India Spiritual Journey', 
        subtitle: 'Jagannath Puri, Kali Temple & Sun Temple',
        color: '#FF6B35',
        gradient: 'from-orange-600 to-orange-700'
      },
      { 
        key: 'international', 
        title: 'International Sacred Sites', 
        subtitle: 'Nepal, Sri Lanka & Southeast Asian Heritage',
        color: '#8E44AD',
        gradient: 'from-purple-600 to-purple-700'
      }
    ];

    return regions.map((region, index) => (
      <div key={region.key} className="mb-16">
        {/* Region Header */}
        <div className="text-center mb-8">
          <div 
            className={`bg-gradient-to-r ${region.gradient} text-white px-8 py-6 rounded-2xl shadow-lg mx-auto max-w-4xl transform hover:scale-105 transition-all duration-300`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {region.title}
            </h2>
            <p className="text-lg opacity-90">
              {region.subtitle}
            </p>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sacredTours[region.key]?.map((tour, tourIndex) => (
            <div 
              key={tour.id} 
              className="animate-slide-up transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${tourIndex * 0.1}s` }}
            >
              <TourCard tour={tour} />
            </div>
          ))}
        </div>

        {/* Divider */}
        {index < regions.length - 1 && (
          <div className="flex items-center justify-center my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
            <div className="mx-4 text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-md"></div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 min-h-screen">
      <SearchTours />
      
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Sacred <span className="text-red-600">Tours</span> & 
          <span className="text-yellow-600"> Pilgrimage</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover India's spiritual heritage and mythological wonders. From ancient temples to sacred rivers, experience the divine journey across incredible destinations.
        </p>
        
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-12">
          <button 
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'sacred' 
                ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg' 
                : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
            }`}
            onClick={() => setActiveTab('sacred')}
          >
            Sacred Sites
          </button>
          <button 
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeTab === 'all' 
                ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg' 
                : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Tours
          </button>
        </div>
      </section>

      {/* Tours Content */}
      <section className="pb-16 px-6 md:px-12">
        {activeTab === 'sacred' && (
          <div className="max-w-7xl mx-auto">
            {renderSacredTours()}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              All Available <span className="text-red-600">Tours</span>
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
              {tours?.map((tour) => (
                <div key={tour._id} className="animate-slide-up transform hover:scale-105 transition-all duration-300">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
            <div className="flex pagination items-center justify-center mt-12 gap-3">
              {pageCount &&
                [...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      page === number 
                        ? "bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg" 
                        : "bg-white text-red-600 border border-red-300 hover:bg-red-50"
                    }`}
                  >
                    {number + 1}
                  </span>
                ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Tours;
