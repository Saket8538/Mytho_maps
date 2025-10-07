import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from "react-modal";
import { galleryImages, categories } from "../../assets/data/galleryImages";

const ImagesGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showImageInfo, setShowImageInfo] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage !== null) {
        switch (e.key) {
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
          case 'Escape':
            closeModal();
            break;
          case 'i':
          case 'I':
            toggleImageInfo();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  // Filter images based on category and search term
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = galleryImages;
      
      // Filter by category
      if (activeCategory !== 'all') {
        filtered = filtered.filter(image => image.category === activeCategory);
      }
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(image => 
          image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setFilteredImages(filtered);
      setIsLoading(false);
    }, 300);
  }, [activeCategory, searchTerm]);

  const openModal = (index) => {
    const actualImage = filteredImages[index];
    const originalIndex = galleryImages.findIndex(img => img.id === actualImage.id);
    setSelectedImage(originalIndex);
    setShowImageInfo(false);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowImageInfo(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const toggleImageInfo = () => {
    setShowImageInfo(!showImageInfo);
  };

  if (isSmallScreen) {
    return (
      <div className="px-4">
        {/* Search and Filter for Mobile */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-BaseColor focus:border-transparent outline-none transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-BaseColor text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-BaseColor"></div>
          </div>
        )}

        {/* Images Grid */}
        {!isLoading && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2 }}>
            <Masonry gutter="1rem">
              {filteredImages.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer bg-white"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with Animation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{item.title}</h3>
                      <p className="text-sm opacity-90 mb-2">📍 {item.location}</p>
                      <p className="text-xs opacity-80 line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {categories.find(cat => cat.id === item.category)?.name}
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {/* No Results */}
        {!isLoading && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No images found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8">
      {/* Search and Filter for Desktop */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search destinations, temples, forts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-BaseColor focus:border-transparent outline-none transition-all duration-300 shadow-lg"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-BaseColor to-BHoverColor text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
              {activeCategory === category.id && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {filteredImages.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {!isLoading && (
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-BaseColor">{filteredImages.length}</span> 
            {searchTerm && ` results for "${searchTerm}"`}
            {activeCategory !== 'all' && ` in ${categories.find(cat => cat.id === activeCategory)?.name}`}
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-BaseColor"></div>
            <p className="text-gray-600 font-medium">Loading beautiful destinations...</p>
          </div>
        </div>
      )}

      {/* Images Grid */}
      {!isLoading && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4, 1200: 5 }}>
          <Masonry gutter="1.5rem">
            {filteredImages.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer bg-white"
                onClick={() => openModal(index)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Animated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-bold text-xl mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-sm opacity-90 mb-3 flex items-center">
                      <span className="mr-2">📍</span>{item.location}
                    </p>
                    <p className="text-sm opacity-80 line-clamp-2 leading-relaxed">{item.description}</p>
                    
                    {/* View Button */}
                    <div className="mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                      <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-300">
                        <span className="mr-2">👁️</span>
                        View Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  {categories.find(cat => cat.id === item.category)?.icon} {categories.find(cat => cat.id === item.category)?.name}
                </div>

                {/* Floating Animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
                  <div className="absolute top-8 left-8 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-700 delay-200"></div>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {/* No Results */}
      {!isLoading && filteredImages.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-6 animate-bounce">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4">No destinations found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We couldn't find any destinations matching your criteria. Try adjusting your search or explore different categories.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
            className="bg-BaseColor text-white px-6 py-3 rounded-xl hover:bg-BHoverColor transition-all duration-300 transform hover:scale-105"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Enhanced Modal */}
      <Modal
        className="w-screen h-screen bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 outline-none"
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000
          }
        }}
      >
        {selectedImage !== null && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            >
              ×
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            >
              ←
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            >
              →
            </button>

            {/* Info Button */}
            <button
              onClick={toggleImageInfo}
              className="absolute bottom-6 right-6 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <span>ℹ️</span>
              <span className="text-sm font-medium">Info</span>
            </button>

            {/* Main Image */}
            <div className="relative max-w-5xl max-h-full">
              <img
                src={galleryImages[selectedImage]?.src}
                alt={galleryImages[selectedImage]?.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ 
                  maxHeight: showImageInfo ? '70vh' : '90vh',
                  transition: 'max-height 0.3s ease-in-out'
                }}
              />

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Image Information Panel */}
            {showImageInfo && galleryImages[selectedImage] && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white transform transition-all duration-300">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-2">{galleryImages[selectedImage].title}</h2>
                  <p className="text-lg opacity-90 mb-4 flex items-center">
                    <span className="mr-2">📍</span>
                    {galleryImages[selectedImage].location}
                  </p>
                  <p className="text-base opacity-80 leading-relaxed max-w-3xl">
                    {galleryImages[selectedImage].description}
                  </p>
                  
                  {/* Category Badge in Modal */}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                      <span>{categories.find(cat => cat.id === galleryImages[selectedImage].category)?.icon}</span>
                      <span>{categories.find(cat => cat.id === galleryImages[selectedImage].category)?.name}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts Hint */}
            <div className="absolute bottom-6 left-6 text-white/60 text-sm">
              <p>← → Navigate | ESC Close | I Info</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImagesGallery;
