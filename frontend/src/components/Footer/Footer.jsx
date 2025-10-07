import Logo from "./../../assets/images/logo3.png";
import React, { useContext } from "react";
import { FaLinkedin, FaGithub, FaPhoneAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import Newsletter from "../../shared/Newsletter";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
      {role === "admin" ? null : (
        <footer className="bg-gradient-to-br from-gray-900 via-BaseColor to-gray-800 text-white">
          <div className="container mx-auto px-6 py-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Logo and Description */}
              <div className="md:col-span-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <img
                    src={Logo}
                    alt="MythoMaps Logo"
                    className="h-16 mr-3"
                  />
                  <span className="font-display text-2xl font-bold text-GoldColor">
                    MythoMaps
                  </span>
                </div>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Discover India's sacred mythological heritage through our curated spiritual journeys. 
                  Experience the divine stories that shaped our civilization.
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-1">📍 Madanapalle, Andhra Pradesh</p>
                  
                  <p className="mb-1">✉️ harshithammu95@gmail.com</p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center md:text-left">
                <h3 className="font-heading text-lg font-semibold text-GoldColor mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/home" className="text-gray-300 hover:text-GoldColor transition-colors">Home</Link></li>
                  <li><Link to="/tours" className="text-gray-300 hover:text-GoldColor transition-colors">Sacred Tours</Link></li>
                  <li><Link to="/about" className="text-gray-300 hover:text-GoldColor transition-colors">Gallery</Link></li>
                  <li><Link to="/contact" className="text-gray-300 hover:text-GoldColor transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* Sacred Destinations */}
              <div className="text-center md:text-left">
                <h3 className="font-heading text-lg font-semibold text-GoldColor mb-4">Sacred Destinations</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>🏛️ Ancient Temples</li>
                  <li>🕉️ Mythological Sites</li>
                  <li>🌸 Spiritual Retreats</li>
                  <li>📿 Pilgrimage Routes</li>
                  <li>🎭 Cultural Heritage</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="text-center md:text-left">
                <Newsletter />
              </div>
            </div>

            {/* Social Media and Bottom Bar */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-400">
                    &copy; 2025 MythoMaps. Developed with ❤️ by Harshitha
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4 text-xl">
                  <a
                    href="mailto:harshithammu95@gmail.com"
                    className="text-gray-300 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400 hover:bg-opacity-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email"
                  >
                    <SiGmail />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-blue-400 hover:bg-opacity-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/harshithammu95-coder"
                    className="text-gray-300 hover:text-gray-400 transition-colors p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="text-gray-300 hover:text-green-400 transition-colors p-2 rounded-full hover:bg-green-400 hover:bg-opacity-20"
                    aria-label="Phone"
                  >
                    <FaPhoneAlt />
                  </a>
                  {/* Additional social media inspired by Incredible India */}
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-500 hover:bg-opacity-20"
                    aria-label="Facebook"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-pink-400 transition-colors p-2 rounded-full hover:bg-pink-400 hover:bg-opacity-20"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
