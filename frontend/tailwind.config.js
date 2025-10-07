/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        BaseColor: "#C8102E", // Deep Indian red
        GreenColor: "#138808", // Deep green
        GoldColor: "#DAA520", // Rich gold
        GrayColor: "#4A5568", // Elegant gray
        PurpleColor: "#6B46C1", // Rich purple
        BHoverColor: "#E53E3E", // Hover red
        BackgroundCream: "#FFF8DC", // Cream background
        TextDark: "#2D3748", // Dark text
        AccentOrange: "#FF6B35", // Vibrant orange
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Montserrat", "sans-serif"],
        cursive: ["Satisfy", "cursive"],
        display: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(200, 16, 46, 0.9) 0%, rgba(107, 70, 193, 0.7) 100%)",
        'card-overlay': "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
