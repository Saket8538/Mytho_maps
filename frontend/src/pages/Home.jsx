import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import card01 from "../assets/images/gallery-01.jpg";
import card02 from "../assets/images/gallery-02.jpg";
import card03 from "../assets/images/gallery-03.jpg";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import SearchBar from "../shared/searchBar/SearchBar";
import ServicesList from "../components/services/ServicesList";
import FeaturedTourList from "../components/featruredTour/FeaturedTourList";
import { Link } from "react-router-dom";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { FaTimes, FaMapMarkerAlt, FaClock, FaRupeeSign } from "react-icons/fa";
import FaqList from "../components/Faq/FaqList";
import Testimonials from "../components/Testimonials/Testimonials";
import faqImg from "../assets/images/experience.png";
import ImagesGallery from "../components/Gallery/Gallery";

// Import videos
import AdventureVideo from "../assets/videos/Adventure.mp4";
import HeritageVideo from "../assets/videos/Heritage.mp4";
import India360Video from "../assets/videos/India-360-v2.mp4";
import NatureVideo from "../assets/videos/Nature.mp4";
import SpiritualVideo from "../assets/videos/Spiritual.mp4";
import WildlifeVideo from "../assets/videos/Wildlife.mp4";

// Define videos array outside component to prevent re-creation on every render
const videos = [
  { src: India360Video, category: "India 360", title: "Alround Experience" },
  { src: SpiritualVideo, category: "Spiritual", title: "Divine Journeys" },
  { src: HeritageVideo, category: "Heritage", title: "Ancient Wisdom" },
  { src: AdventureVideo, category: "Adventure", title: "Sacred Adventures" },
  { src: NatureVideo, category: "Nature", title: "Natural Sanctuaries" },
  { src: WildlifeVideo, category: "Wildlife", title: "Vibrant Wildlife" }
];

const categories = ["India 360", "Adventure", "Nature", "Wildlife", "Heritage", "Spiritual"];

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentCategoryIndex, setCategoryIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  // Attractions carousel state
  const [attractionsScrollIndex, setAttractionsScrollIndex] = useState(0);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Attractions data
  const attractions = [
    {
      id: "attr-1",
      name: "Shore Temple Mamallapuram",
      image: "/assets/images/Attractions/1-shore-temple-mamallapuram-2-attr-nearby.jpeg",
      description: "Ancient rock-cut temples showcasing magnificent Pallava architecture.\nBuilt along the scenic Bay of Bengal coastline.",
      shortDesc: "Ancient Pallava temples\nby the beautiful Bay of Bengal",
      location: "Mamallapuram, Tamil Nadu",
      price: 2500,
      duration: "2 Days",
      highlights: ["UNESCO World Heritage Site", "7th Century Architecture", "Coastal Views"]
    },
    {
      id: "attr-2",
      name: "Golden Temple",
      image: "/assets/images/Attractions/1-sri-harmandir-sahib-(golden-temple)-amritsar-punjab-attr-nearby.jpeg",
      description: "The holiest shrine of Sikhism, covered in pure gold.\nSurrounded by the sacred Amrit Sarovar waters.",
      shortDesc: "Holiest Sikh shrine covered\nin pure golden architecture",
      location: "Amritsar, Punjab",
      price: 3200,
      duration: "2 Days",
      highlights: ["Holiest Sikh Shrine", "Golden Architecture", "Community Kitchen"]
    },
    {
      id: "attr-3",
      name: "Anjuna Beach",
      image: "/assets/images/Attractions/anjuna-beach-goa-goa-anjuna-beach--goa-1-attr-nearby.jpeg",
      description: "Famous beach destination with vibrant nightlife scene.\nKnown for its scenic beauty and water sports.",
      shortDesc: "Vibrant beach destination\nwith nightlife and water sports",
      location: "Goa",
      price: 4800,
      duration: "3 Days",
      highlights: ["Beach Paradise", "Vibrant Nightlife", "Water Sports"]
    },
    {
      id: "attr-4",
      name: "Bangaram Island",
      image: "/assets/images/Attractions/bangaram-kavaratti-lakshwadeep-1-attr-nearby.jpeg",
      description: "Pristine coral island paradise in beautiful Lakshadweep.\nFeaturing crystal clear turquoise waters.",
      shortDesc: "Pristine coral island paradise\nwith crystal clear waters",
      location: "Lakshadweep",
      price: 4500,
      duration: "4 Days",
      highlights: ["Coral Reefs", "Crystal Waters", "Island Paradise"]
    },
    {
      id: "attr-5",
      name: "Brahma Sarovar",
      image: "/assets/images/Attractions/brahma-sarovar-kurukshetra-haryana-1-attr-nearby.jpeg",
      description: "Sacred water tank associated with Lord Brahma.\nLinked to the epic Mahabharata battle.",
      shortDesc: "Sacred waters of Lord Brahma\nlinked to Mahabharata epic",
      location: "Kurukshetra, Haryana",
      price: 1800,
      duration: "1 Day",
      highlights: ["Sacred Waters", "Mahabharata Connection", "Spiritual Significance"]
    },
    {
      id: "attr-6",
      name: "Charminar",
      image: "/assets/images/Attractions/charminar-hyderabad-1-attr-nearby.jpeg",
      description: "Iconic monument and mosque built in 1591.\nSymbol of historic Hyderabad city.",
      shortDesc: "Historic 1591 monument\nand symbol of Hyderabad",
      location: "Hyderabad, Telangana",
      price: 2200,
      duration: "2 Days",
      highlights: ["Historical Monument", "Islamic Architecture", "Cultural Hub"]
    },
    {
      id: "attr-7",
      name: "Cherai Beach",
      image: "/assets/images/Attractions/cherai-beach-kochi-kerala-1-attr-nearby.jpeg",
      description: "Serene beach near Kochi with golden sands.\nOffers stunning backwater views.",
      shortDesc: "Serene golden sand beach\nwith beautiful backwater views",
      location: "Kochi, Kerala",
      price: 3500,
      duration: "3 Days",
      highlights: ["Golden Sands", "Backwater Views", "Peaceful Retreat"]
    },
    {
      id: "attr-8",
      name: "Chidiya Tapu",
      image: "/assets/images/Attractions/chidiya-tapu-port-blair-andaman-nicobar-island-1-attr-nearby.jpeg",
      description: "Bird watching paradise at South Andaman Island.\nOffers spectacular sunset views.",
      shortDesc: "Bird watching paradise\nwith spectacular sunset views",
      location: "Andaman & Nicobar Islands",
      price: 4200,
      duration: "3 Days",
      highlights: ["Bird Watching", "Sunset Views", "Island Wilderness"]
    },
    {
      id: "attr-10",
      name: "Dwarkadhish Temple",
      image: "/assets/images/Attractions/dwarkadish-demple-01-attr-nearby.jpeg",
      description: "Sacred temple dedicated to Lord Krishna.\nOne of the four Char Dham pilgrimage sites.",
      shortDesc: "Sacred Krishna temple\nand Char Dham pilgrimage site",
      location: "Dwarka, Gujarat",
      price: 2800,
      duration: "2 Days",
      highlights: ["Char Dham Site", "Krishna Temple", "Ancient Architecture"]
    },
    {
      id: "attr-11",
      name: "Dzukou Valley",
      image: "/assets/images/Attractions/dzukou-valley-kohima-nagaland-1-attr-nearby.jpeg",
      description: "Valley of flowers with seasonal blooms.\nPopular trekking destination in Nagaland.",
      shortDesc: "Valley of seasonal flowers\nwith amazing trekking trails",
      location: "Nagaland",
      price: 3800,
      duration: "3 Days",
      highlights: ["Valley of Flowers", "Trekking", "Natural Beauty"]
    },
    {
      id: "attr-9",
      name: "Gateway of India",
      image: "/assets/images/Attractions/gateway-of-india-mumbai-maharashtra-1-attr-nearby.jpeg",
      description: "Iconic arch monument overlooking Arabian Sea.\nHistoric symbol of Mumbai city.",
      shortDesc: "Iconic Mumbai landmark\noverlooking the Arabian Sea",
      location: "Mumbai, Maharashtra",
      price: 2500,
      duration: "2 Days",
      highlights: ["Iconic Landmark", "Arabian Sea Views", "Historical Significance"]
    },
    {
      id: "attr-12",
      name: "Har Ki Pauri",
      image: "/assets/images/Attractions/har-ki-pauri-haridwar1-attr-nearby.jpeg",
      description: "Sacred ghat on the holy Ganges river.\nFamous for evening aarti ceremonies.",
      shortDesc: "Sacred Ganga ghat with\nbeautiful evening aarti",
      location: "Haridwar, Uttarakhand",
      price: 2000,
      duration: "2 Days",
      highlights: ["Sacred Ghat", "Ganga Aarti", "Spiritual Experience"]
    },
    {
      id: "attr-13",
      name: "Hawa Mahal",
      image: "/assets/images/Attractions/hawa-mahal-jaipur-rajasthan-1-attr-nearby.jpeg",
      description: "Palace of Winds with intricate lattice work.\nFeatures 953 beautifully carved windows.",
      shortDesc: "Palace of Winds with\n953 carved windows",
      location: "Jaipur, Rajasthan",
      price: 2300,
      duration: "2 Days",
      highlights: ["Palace of Winds", "Rajput Architecture", "Pink City"]
    },
    {
      id: "attr-14",
      name: "Kamakhya Temple",
      image: "/assets/images/Attractions/kamakhya-temple-dispur-assam-1-attr-nearby.jpeg",
      description: "One of the oldest Shakti Peethas in India.\nDedicated to Goddess Kamakhya.",
      shortDesc: "Ancient Shakti Peetha\ndedicated to Goddess Kamakhya",
      location: "Guwahati, Assam",
      price: 2700,
      duration: "2 Days",
      highlights: ["Shakti Peetha", "Tantric Traditions", "Ancient Temple"]
    },
    {
      id: "attr-15",
      name: "Mahabodhi Temple",
      image: "/assets/images/Attractions/mahabodhi-temple-gaya-bihar-1-attr-nearby.jpeg",
      description: "Sacred Buddhist temple where Buddha attained enlightenment.\nHome to the sacred Bodhi tree.",
      shortDesc: "Where Buddha attained\nenlightenment under Bodhi tree",
      location: "Bodh Gaya, Bihar",
      price: 2100,
      duration: "2 Days",
      highlights: ["Buddha's Enlightenment", "UNESCO Site", "Sacred Bodhi Tree"]
    },
    {
      id: "attr-16",
      name: "Naida Caves",
      image: "/assets/images/Attractions/naida-caves-diu-daman-&-diu-1-attr-nearby.jpeg",
      description: "Mysterious network of caves formed by water erosion.\nPerfect spot for photography enthusiasts.",
      shortDesc: "Mysterious water-carved caves\nperfect for photography",
      location: "Diu, Daman & Diu",
      price: 1900,
      duration: "2 Days",
      highlights: ["Natural Caves", "Water Erosion", "Photography Spot"]
    },
    {
      id: "attr-17",
      name: "Red Fort",
      image: "/assets/images/Attractions/red-fort-delhi-attr-nearby.jpeg",
      description: "Magnificent Mughal fortress and UNESCO World Heritage Site.\nSymbol of India's rich history.",
      shortDesc: "Magnificent Mughal fortress\nand UNESCO heritage site",
      location: "Delhi",
      price: 1500,
      duration: "1 Day",
      highlights: ["Mughal Architecture", "UNESCO Site", "Historical Fortress"]
    },
    {
      id: "attr-18",
      name: "Sanchi Stupa",
      image: "/assets/images/Attractions/sanchi-stupa-bhopal-madhya-pradesh-1-attr-nearby.jpeg",
      description: "Ancient Buddhist complex with hemispherical stone structures.\nBuilt by Emperor Ashoka.",
      shortDesc: "Ancient Buddhist stupas\nbuilt by Emperor Ashoka",
      location: "Sanchi, Madhya Pradesh",
      price: 2200,
      duration: "2 Days",
      highlights: ["Buddhist Heritage", "Ancient Stupas", "UNESCO Site"]
    },
    {
      id: "attr-19",
      name: "Swami Vivekananda Sarovar",
      image: "/assets/images/Attractions/swami-vivekananda-sarovar-raipur-chhattisgarh-1-attr-nearby.jpeg",
      description: "Peaceful lake dedicated to Swami Vivekananda.\nIdeal for meditation and spiritual reflection.",
      shortDesc: "Peaceful meditation lake\ndedicated to Swami Vivekananda",
      location: "Raipur, Chhattisgarh",
      price: 1700,
      duration: "1 Day",
      highlights: ["Peaceful Lake", "Meditation Spot", "Spiritual Retreat"]
    },
    {
      id: "attr-20",
      name: "Taj Mahal",
      image: "/assets/images/Attractions/taj-mahal-agra-uttar-pradesh-1-attr-nearby.jpeg",
      description: "Eternal symbol of love and one of Seven Wonders.\nBuilt by Emperor Shah Jahan.",
      shortDesc: "Eternal symbol of love\nand Wonder of the World",
      location: "Agra, Uttar Pradesh",
      price: 3000,
      duration: "2 Days",
      highlights: ["Wonder of World", "Mughal Architecture", "Symbol of Love"]
    }
  ];

  // Auto-cycle videos when one ends
  useEffect(() => {
    const videoElement = document.getElementById('hero-video');
    
    const handleVideoEnd = () => {
      const nextIndex = currentVideoIndex === videos.length - 1 ? 0 : currentVideoIndex + 1;
      setCurrentVideoIndex(nextIndex);
      setCurrentCategoryIndex(nextIndex);
    };

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
      return () => videoElement.removeEventListener('ended', handleVideoEnd);
    }
  }, [currentVideoIndex, videos.length]);

  // Ensure video plays when index changes
  useEffect(() => {
    const videoElement = document.getElementById('hero-video');
    if (videoElement) {
      videoElement.load();
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented:", error);
        });
      }
    }
  }, [currentVideoIndex]);

  // Auto-rotate category buttons every 5 seconds
  useEffect(() => {
    const autoRotate = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) => {
        const nextIndex = prevIndex === categories.length - 1 ? 0 : prevIndex + 1;
        setCurrentVideoIndex(nextIndex);
        return nextIndex;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(autoRotate);
  }, []);

  const handleCategoryClick = (index) => {
    setCurrentCategoryIndex(index);
    setCurrentVideoIndex(index);
  };

  const toggleMute = () => {
    const videoElement = document.getElementById('hero-video');
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setIsMuted(videoElement.muted);
    }
  };

  return (
    <>
      {/* Hero Video Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <video
          id="hero-video"
          key={currentVideoIndex}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          playsInline
        >
          <source src={videos[currentVideoIndex].src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with Dynamic Color Based on Category */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          currentCategoryIndex === 0 ? 'bg-gradient-to-b from-orange-900/30 via-black/40 to-black/50' :
          currentCategoryIndex === 1 ? 'bg-gradient-to-b from-green-900/30 via-black/40 to-black/50' :
          currentCategoryIndex === 2 ? 'bg-gradient-to-b from-lime-900/30 via-black/40 to-black/50' :
          currentCategoryIndex === 3 ? 'bg-gradient-to-b from-yellow-900/30 via-black/40 to-black/50' :
          currentCategoryIndex === 4 ? 'bg-gradient-to-b from-purple-900/30 via-black/40 to-black/50' :
          'bg-gradient-to-b from-blue-900/30 via-black/40 to-black/50'
        }`}></div>

        {/* Content Overlay - Positioned at Top */}
        <div className="relative z-10 flex flex-col justify-start items-start min-h-screen px-6 md:px-12 pt-20 text-left text-white">
          <div className="animate-fade-in max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight transition-all duration-700">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-shimmer">
                Discover India's Sacred
              </span>
              <span className={`block text-5xl md:text-7xl mt-2 bg-clip-text text-transparent font-cursive animate-gradient-text transition-all duration-700 ${
                currentCategoryIndex === 0 ? 'bg-gradient-to-r from-orange-400 via-red-400 to-pink-400' :
                currentCategoryIndex === 1 ? 'bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400' :
                currentCategoryIndex === 2 ? 'bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400' :
                currentCategoryIndex === 3 ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400' :
                currentCategoryIndex === 4 ? 'bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400' :
                'bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400'
              }`}>
                {videos[currentVideoIndex].title}
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/tours" 
                className={`text-lg px-8 py-4 hover:scale-110 transition-all duration-500 inline-block text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 rounded-lg font-semibold ${
                  currentCategoryIndex === 0 ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white' :
                  currentCategoryIndex === 1 ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white' :
                  currentCategoryIndex === 2 ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-white' :
                  currentCategoryIndex === 3 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                  currentCategoryIndex === 4 ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' :
                  'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                }`}
              >
                🏛️ Explore Destinations
              </Link>
            </div>
          </div>

          {/* Sound Control Button */}
          <button 
            onClick={toggleMute}
            className="absolute top-6 right-6 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
          >
            {isMuted ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Video Indicators - Moved to Middle (where categories were) */}
          <div className="absolute bottom-16 left-0 right-0">
            <div className="flex justify-center items-center space-x-4">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`rounded-full transition-all duration-500 transform hover:scale-125 ${
                    currentVideoIndex === index 
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 w-5 h-5 shadow-lg shadow-orange-500/50 animate-pulse' 
                      : 'bg-white/60 hover:bg-white/90 w-3 h-3 shadow-md'
                  }`}
                  title={videos[index].category}
                />
              ))}
            </div>
          </div>

          {/* Single Video Navigation Arrow - Right only */}
          <button 
            onClick={() => setCurrentVideoIndex(currentVideoIndex === videos.length - 1 ? 0 : currentVideoIndex + 1)}
            className="absolute right-8 bottom-1/2 transform translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg shadow-orange-500/50"
          >
            <span className="text-2xl font-bold">→</span>
          </button>
        </div>
      </div>

      {/* Attractions Section */}
      <section className="py-12 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          
          {/* Category Navigation - Auto-Switching Color Design */}
          <div className="mb-6 bg-gradient-to-r from-white via-gray-50 to-white rounded-xl shadow-lg p-5 border border-gray-200">
            <div className="flex justify-center items-center flex-wrap gap-3">
              {categories.map((category, index) => {
                // Define unique vibrant colors for each category
                const categoryColors = {
                  'India 360': {
                    active: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-lg shadow-orange-300/50',
                    hover: 'hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:shadow-md',
                    text: 'text-orange-600',
                    border: 'border-orange-300',
                    glow: 'ring-2 ring-orange-400/50'
                  },
                  'Adventure': {
                    active: 'bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 shadow-lg shadow-green-300/50',
                    hover: 'hover:bg-gradient-to-r hover:from-green-100 hover:to-teal-100 hover:shadow-md',
                    text: 'text-green-600',
                    border: 'border-green-300',
                    glow: 'ring-2 ring-green-400/50'
                  },
                  'Nature': {
                    active: 'bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500 shadow-lg shadow-lime-300/50',
                    hover: 'hover:bg-gradient-to-r hover:from-lime-100 hover:to-green-100 hover:shadow-md',
                    text: 'text-lime-600',
                    border: 'border-lime-300',
                    glow: 'ring-2 ring-lime-400/50'
                  },
                  'Wildlife': {
                    active: 'bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 shadow-lg shadow-yellow-300/50',
                    hover: 'hover:bg-gradient-to-r hover:from-yellow-100 hover:to-amber-100 hover:shadow-md',
                    text: 'text-yellow-600',
                    border: 'border-yellow-300',
                    glow: 'ring-2 ring-yellow-400/50'
                  },
                  'Heritage': {
                    active: 'bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 shadow-lg shadow-purple-300/50',
                    hover: 'hover:bg-gradient-to-r hover:from-purple-100 hover:to-violet-100 hover:shadow-md',
                    text: 'text-purple-600',
                    border: 'border-purple-300',
                    glow: 'ring-2 ring-purple-400/50'
                  },
                  'Spiritual': {
                    active: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-blue-300/50',
                    hover: 'hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:shadow-md',
                    text: 'text-blue-600',
                    border: 'border-blue-300',
                    glow: 'ring-2 ring-blue-400/50'
                  }
                };

                const colors = categoryColors[category];
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(index)}
                    className={`px-6 py-3 text-sm font-bold rounded-full transition-all duration-500 border-2 transform ${
                      currentCategoryIndex === index 
                        ? `${colors.active} ${colors.glow} text-white border-transparent scale-105 animate-blink` 
                        : `bg-white ${colors.text} ${colors.hover} ${colors.border} hover:scale-105`
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar - Simple Design */}
          <div className="mb-8">
            <SearchBar />
          </div>

          {/* Header - Dynamic Color Based on Active Category */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent mb-2 tracking-wide transition-all duration-700 ${
              currentCategoryIndex === 0 ? 'bg-gradient-to-r from-orange-600 via-red-600 to-pink-600' :
              currentCategoryIndex === 1 ? 'bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600' :
              currentCategoryIndex === 2 ? 'bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600' :
              currentCategoryIndex === 3 ? 'bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600' :
              currentCategoryIndex === 4 ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600' :
              'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            }`}>
              ATTRACTIONS
            </h1>
            <p className={`text-lg font-medium transition-all duration-700 ${
              currentCategoryIndex === 0 ? 'text-orange-600' :
              currentCategoryIndex === 1 ? 'text-green-600' :
              currentCategoryIndex === 2 ? 'text-lime-600' :
              currentCategoryIndex === 3 ? 'text-yellow-600' :
              currentCategoryIndex === 4 ? 'text-purple-600' :
              'text-blue-600'
            }`}>
              — worth a thousand stories —
            </p>
          </div>

          {/* Horizontal Scrolling Container */}
          <div className="relative max-w-7xl mx-auto">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById('attractions-container');
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <BsArrowLeft className="text-2xl text-gray-700" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const container = document.getElementById('attractions-container');
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <BsArrowRight className="text-2xl text-gray-700" />
            </button>

            {/* Scrolling Attractions */}
            <div 
              id="attractions-container"
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {attractions.map((attraction) => (
                <div 
                  key={attraction.id}
                  className="group relative flex-none w-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
                      {attraction.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-1 flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {attraction.location}
                    </p>
                    <p className="text-white/90 text-sm mb-2 whitespace-pre-line line-clamp-2">
                      {attraction.shortDesc}
                    </p>
                    <p className="text-white/70 text-sm mb-3 flex items-center">
                      <FaRupeeSign className="mr-1" />
                      Starting from ₹{attraction.price}
                    </p>
                  </div>

                  {/* Hover Explore Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => {
                        setSelectedAttraction(attraction);
                        setShowModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link 
              to="/tours" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">🏛️</span>
              View All Attractions
              <BsArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedAttraction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative">
                <img 
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <FaTimes />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-white text-3xl font-bold mb-2">
                    {selectedAttraction.name}
                  </h2>
                  <p className="text-white/90 flex items-center text-lg">
                    <FaMapMarkerAlt className="mr-2" />
                    {selectedAttraction.location}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed whitespace-pre-line">
                  {selectedAttraction.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <div className="flex items-center text-blue-600 mb-2">
                      <FaRupeeSign className="mr-2" />
                      <span className="font-semibold">Price</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">
                      ₹{selectedAttraction.price}
                    </p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <div className="flex items-center text-green-600 mb-2">
                      <FaClock className="mr-2" />
                      <span className="font-semibold">Duration</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">
                      {selectedAttraction.duration}
                    </p>
                    <p className="text-sm text-gray-600">trip duration</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAttraction.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        ✨ {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link
                    to={`/tours/${selectedAttraction.id}`}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowModal(false)}
                  >
                    Book Now
                  </Link>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-full transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* {Services Section Starts} */}
      <section className="pb-12 px-6 md:px-12 bg-BackgroundCream">
        <div className="container mx-auto mt-8 flex-col flex md:flex-row">
          <div className="mb-6 flex-shrink-0 mx-4 flex-1 min-w-[30%]">
            <h2 className="heading-secondary mb-6 transition-all duration-500">
              <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">
                Our
              </span>{" "}
              <span className="text-BaseColor heading-accent bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent animate-gradient-text">
                Sacred Services
              </span>
            </h2>
            <p className="para transition-all duration-300 hover:text-gray-700">
              "Empowering Your Spiritual Journey: Unrivaled Services Tailored to 
              Elevate Your Mythological Experience and Connect You with India's Divine Heritage."
            </p>
            {/* Add Slider Component or Carousel Component if needed */}
          </div>
          <ServicesList className="flex-grow" />
        </div>
      </section>

      {/* {Gallery Section Start} */}
      <section className="py-16 text-center px-6 md:px-12 bg-white">
        <h1 className="heading-secondary mb-6 transition-all duration-500">
          <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">
            Our
          </span>{" "}
          <span className="text-BaseColor heading-accent bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent animate-gradient-text">
            Sacred Gallery
          </span>
        </h1>
        <p className="para mb-12 transition-all duration-300 hover:text-gray-700">
          "Unveil the divine wonders in our gallery, a visual journey through 
          MythoMaps' most sacred and mystical destinations across India."
        </p>
        <div className="animate-fade-in">
          <ImagesGallery />
        </div>
      </section>
      {/* {Gallery Section Ends} */}
      <section className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-br from-BackgroundCream to-white">
        <h1 className="heading-secondary text-center mb-6 transition-all duration-500">
          <span className="text-BaseColor heading-accent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-text">Featured Tours</span>
        </h1>
        <p className="para mb-12 transition-all duration-300 hover:text-gray-700 text-center">
          "Embark on Unforgettable Spiritual Journeys: Discover Our Featured Sacred Tours, 
          Where Ancient Mythology Meets Extraordinary Spiritual Experiences and Divine Adventures."
        </p>
        <div className="animate-slide-up">
          <FeaturedTourList />
        </div>
      </section>
      {/* {Featured seactiton ends} */}

      {/* {Testimonials section start} */}
      <section className="md:max-h-[550px] bg-white">
        <div className="py-16 px-6 md:px-12">
          <div className="mx-auto text-center xl:w-[470px] mb-12">
            <h1 className="heading-secondary mb-6 transition-all duration-500">
              <span className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 bg-clip-text text-transparent">
                Our
              </span>{" "}
              <span className="text-BaseColor heading-accent bg-gradient-to-r from-green-600 via-teal-600 to-green-600 bg-clip-text text-transparent animate-gradient-text">
                Sacred Stories
              </span>
            </h1>
            <p className="para transition-all duration-300 hover:text-gray-700">
              "Read what our spiritual travelers have to say in their own words. 
              Real journeys, real transformations, real divine experiences."
            </p>
          </div>
          <div className="animate-fade-in">
            <Testimonials />
          </div>
        </div>
      </section>
      {/* {Testimonials section ends} */}

      {/* {faq Section Start} */}
      <section className="bg-gradient-to-br from-BackgroundCream to-white">
        <div className="px-6 md:px-12 py-16">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block animate-float">
              <img src={faqImg} alt="Sacred Experience" className="rounded-lg shadow-lg" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading-secondary text-center md:text-left mb-8 transition-all duration-500">
                <span className="text-BaseColor heading-accent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-text">
                  Frequently Asked Questions
                </span>
              </h2>

              <div className="animate-slide-up">
                <FaqList />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {faq Section ends} */}
    </>
  );
};

export default Home;



