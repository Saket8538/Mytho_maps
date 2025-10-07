import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TourCard from "../shared/TourCard";
import SearchTours from "../components/Search/SearchTours";

const SearchResultList = () => {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(location.state || []); // Update data whenever location.state changes
  }, [location.state]);

  return (
    <div className="bg-gradient-to-br from-BackgroundCream to-white min-h-screen">
      <SearchTours />
      <section className="py-16 px-6 md:px-12">
        <h1 className="heading-secondary text-center mb-12">
          Search <span className="text-BaseColor heading-accent">Results</span>
        </h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {data.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🏛️</div>
              <h4 className="text-xl font-semibold text-GrayColor mb-2">No Sacred Destinations Found</h4>
              <p className="text-GrayColor">Try searching with different keywords or explore our featured tours.</p>
            </div>
          ) : (
            data?.map((tour) => (
              <div key={tour._id} className="animate-slide-up">
                <TourCard tour={tour} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResultList;
