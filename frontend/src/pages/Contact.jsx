import React, { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowNotification(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <>
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl animate-slide-in-right">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-bounce">✅</div>
            <div>
              <h4 className="font-bold">Message Sent Successfully!</h4>
              <p className="text-sm opacity-90">You will be contacted soon</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 min-h-screen py-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-gradient-to-br from-BaseColor/20 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full animate-pulse delay-1000"></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="px-4 py-8 md:py-12 m-auto max-w-6xl relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block p-3 bg-gradient-to-r from-BaseColor to-BHoverColor rounded-full mb-6 animate-bounce">
              <span className="text-3xl">📞</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-BaseColor via-purple-600 to-orange-500 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Have questions about your spiritual journey? Want to explore our sacred destinations? 
              We're here to guide you on your path to divine experiences and unforgettable adventures.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600">We'd love to hear from you!</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Your full name"
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                        focusedField === "name" 
                          ? "border-BaseColor shadow-lg transform scale-105" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField("")}
                      placeholder="+91 9876543210"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                        focusedField === "phone" 
                          ? "border-BaseColor shadow-lg transform scale-105" 
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    placeholder="your.email@example.com"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField === "email" 
                        ? "border-BaseColor shadow-lg transform scale-105" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField("")}
                    placeholder="How can we assist your spiritual journey?"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                      focusedField === "subject" 
                        ? "border-BaseColor shadow-lg transform scale-105" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField("")}
                    rows="6"
                    placeholder="Share your thoughts, questions, or spiritual aspirations..."
                    required
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none ${
                      focusedField === "message" 
                        ? "border-BaseColor shadow-lg transform scale-105" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    isSubmitting 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-BaseColor to-BHoverColor hover:from-BHoverColor hover:to-BaseColor text-white shadow-lg hover:shadow-xl hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <span className="text-xl">🚀</span>
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact Cards */}
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl animate-bounce">📧</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Email Us</h3>
                      <p className="opacity-90">harshithammu95@gmail.com</p>
                      <p className="text-sm opacity-75">We reply within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-right delay-200">
                  <div className="flex items-center space-x-4">
                    
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-right delay-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl animate-bounce delay-300">📍</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                      <p className="opacity-90">Madanapalle, Andhra Pradesh</p>
                      <p className="text-sm opacity-75">India's spiritual heartland</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-right delay-400">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl animate-bounce delay-400">💬</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Live Chat</h3>
                      <p className="opacity-90">Available 24/7</p>
                      <p className="text-sm opacity-75">Instant support & guidance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 animate-slide-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose MythoMaps?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl"></span>
                    <span className="text-gray-700">Expert guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏛️</span>
                    <span className="text-gray-700">Authentic sacred experiences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🤝</span>
                    <span className="text-gray-700">Personalized tour planning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⭐</span>
                    <span className="text-gray-700">5-star customer service</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
