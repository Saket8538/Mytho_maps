import React, { useRef } from "react";
import BASE_URL from "../../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchTours = () => {
  const cityRef = useRef(0);
  const navigate = useNavigate();

  const SubmitHandler = async () => {
    const searchTerm = cityRef.current.value;

    if (searchTerm === "") {
      toast.error("Please fill all the fields");
    } else {
      const response = await fetch(
        `${BASE_URL}/tour/search?search=${searchTerm}`
      );
      if (!response.ok) {
        toast.error("No Record Found!");
        navigate(`/tours/search?search=${searchTerm}`, { state: result.data });
      }

      const result = await response.json();
      navigate(`/tours/search?search=${searchTerm}`, { state: result.data });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SubmitHandler();
    }
  };

  return (
    <div>
      <section className="py-8 px-6 md:px-12 bg-gradient-to-br from-BackgroundCream to-white">
        <div className="container text-center">
          <h2 className="heading-secondary mb-8">
            Find Your <span className="text-BaseColor heading-accent">Sacred Journey</span>
          </h2>
          <div className="max-w-[570px] mt-[15px] mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-between overflow-hidden border border-gray-100">
            <input
              type="search"
              ref={cityRef}
              onKeyPress={handleKeyPress}
              className="py-4 pl-6 bg-transparent w-full focus:outline-none placeholder:text-GrayColor text-TextDark"
              placeholder="Search Sacred Destinations..."
            />
            <button
              onClick={SubmitHandler}
              className="Searchbtn mt-0 rounded-none rounded-r-2xl mx-0 py-4 px-6 hover:px-8 transition-all duration-300"
            >
              🔍 Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchTours;
