import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import avatar1 from "../../assets/images/ava-1.jpg";
import avatar2 from "../../assets/images/ava-2.jpg";
import avatar3 from "../../assets/images/ava-3.jpg";

const Testimonials = () => {
  const testimonialsData = [
    {
      pic: avatar1,
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      description:
        "हमारी यात्रा अद्भुत थी! MythoMaps ने हर पवित्र स्थल की यात्रा को आध्यात्मिक अनुभव बना दिया। मंदिरों की दिव्य ऊर्जा और गाइड की विस्तृत जानकारी अविस्मरणीय थी। धन्यवाद!",
    },
    {
      pic: avatar2,
      name: "Anushka Sharma",
      location: "Jaipur, Rajasthan",
      description:
        "The Golden Temple visit organized by MythoMaps was spiritually enriching. Their deep knowledge of mythological significance and perfect arrangements made our pilgrimage divine. Truly blessed experience!",
    },
    {
      pic: avatar3,
      name: "Arjun Patel",
      location: "Ahmedabad, Gujarat",
      description:
        "Dwarkadhish Temple yatra was phenomenal! Every detail from prasad arrangements to aarti timings was perfectly planned. The spiritual guides shared amazing Krishna leelas. Best pilgrimage tour ever!",
    },
    {
      pic: avatar1,
      name: "Sushant Singh Rajput",
      location: "Chennai, Tamil Nadu",
      description:
        "MythoMaps took us through South India's ancient temples beautifully. Shore Temple, Mahabalipuram के दिव्य दर्शन और पल्लव architecture की कहानियां मन को छू गईं। Highly recommend for spiritual seekers!",
    },
    {
      pic: avatar2,
      name: "Riya Somani",
      location: "Udaipur, Rajasthan",
      description:
        "Varanasi tour was life-changing! Ganga aarti, ancient temples, and spiritual atmosphere - everything was perfectly coordinated. MythoMaps team ensured we experienced the true essence of Kashi. Jai Mahakal!",
    },
    {
      pic: avatar3,
      name: "Rajpal Yadav",
      location: "Pune, Maharashtra",
      description:
        "Our Char Dham yatra was divine! From Kedarnath to Badrinath, every darshan was blessed. The team's attention to comfort and spiritual experience was remarkable. Forever grateful for this sacred journey!",
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {testimonialsData.map((data, index) => (
        <div className="py-4 px-6" key={index}>
          <p className="text-gray-700 leading-relaxed italic">{data.description}</p>
          <div className="flex items-center gap-4 mt-8">
            <div className="w-[75px] h-[55px] rounded-md overflow-hidden">
              <img
                src={data.pic}
                className="w-full h-full object-cover rounded-2"
                alt={data.name}
              />
            </div>
            <div>
              <div>
                <h5 className="mb-0 mt-3 font-bold text-gray-800">{data.name}</h5>
                <p className="text-sm text-orange-600 font-medium">{data.location}</p>
                <p className="text-xs text-GrayColor">Spiritual Traveler</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
