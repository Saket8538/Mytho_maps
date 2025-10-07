import React from "react";
import ImagesGallery from "../components/Gallery/Gallery";

const About = () => {
  return (
    <section className="bg-gradient-to-br from-BackgroundCream to-white min-h-screen">
      {/* {Gallery Section Start} */}
      <section className="py-16 text-center px-6 md:px-12">
        <div className="animate-fade-in">
          <h1 className="heading-primary mb-6">
            Our Vibrant <span className="text-cursive text-GoldColor">Gallery</span>
          </h1>
          <p className="para mb-12 max-w-4xl mx-auto">
            "Unveil the divine wonders in our gallery, a visual journey through India's 
            most sacred mythological sites. Each image tells a story of ancient gods, 
            legendary heroes, and the timeless spiritual heritage that continues to 
            inspire millions of devotees and travelers alike."
          </p>
          <div className="animate-slide-up">
            <ImagesGallery />
          </div>
        </div>
      </section>
      {/* {Gallery Section Ends} */}
    </section>
  );
};

export default About;
