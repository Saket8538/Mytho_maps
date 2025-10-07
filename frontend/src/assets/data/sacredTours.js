import tourImg01 from "../images/tour-img01.jpg";
import tourImg02 from "../images/tour-img02.jpg";
import tourImg03 from "../images/tour-img03.jpg";
import tourImg04 from "../images/tour-img04.jpg";
import tourImg05 from "../images/tour-img05.jpg";
import tourImg06 from "../images/tour-img06.jpg";
import tourImg07 from "../images/tour-img07.jpg";
import gallery01 from "../images/gallery-01.jpg";
import gallery02 from "../images/gallery-02.jpg";
import gallery03 from "../images/gallery-03.jpg";
import gallery04 from "../images/gallery-04.jpg";
import gallery05 from "../images/gallery-05.jpg";
import gallery06 from "../images/gallery-06.jpg";
import gallery07 from "../images/gallery-07.jpg";
import gallery08 from "../images/gallery-08.jpg";

// Sacred Tours organized by regions
const sacredTours = {
  // North India Sacred Tours
  northIndia: [
    {
      id: "IN01",
      title: "Golden Temple - Harmandir Sahib",
      city: "Amritsar",
      address: "Golden Temple Complex, Amritsar, Punjab",
      distance: 450,
      price: 299,
      maxGroupSize: 15,
      desc: "Experience the spiritual magnificence of the Golden Temple, the holiest shrine of Sikhism. Witness the divine architecture covered in gold and participate in the community kitchen (langar) serving thousands daily.",
      reviews: [
        { name: "Rajesh Kumar", rating: 4.9 },
        { name: "Priya Singh", rating: 4.8 },
        { name: "Arjun Patel", rating: 4.9 }
      ],
      avgRating: 4.8,
      photo: gallery01,
      featured: true,
      category: "Sikh Heritage",
      duration: "2 Days"
    },
    {
      id: "IN02", 
      title: "Varanasi - Kashi Vishwanath",
      city: "Varanasi",
      address: "Kashi Vishwanath Temple, Varanasi, Uttar Pradesh",
      distance: 780,
      price: 399,
      maxGroupSize: 12,
      desc: "Journey to the spiritual capital of India. Experience the sacred Ganga Aarti, visit the ancient Kashi Vishwanath Temple, and witness the eternal cycle of life and death on the ghats.",
      reviews: [
        { name: "Meera Sharma", rating: 4.9 },
        { name: "Vikram Joshi", rating: 4.7 }
      ],
      avgRating: 4.8,
      photo: gallery02,
      featured: true,
      category: "Ancient Temples",
      duration: "3 Days"
    },
    {
      id: "IN03",
      title: "Haridwar & Rishikesh",
      city: "Uttarakhand", 
      address: "Haridwar & Rishikesh, Uttarakhand",
      distance: 230,
      price: 349,
      maxGroupSize: 20,
      desc: "Explore the twin holy cities where the Ganges flows from the Himalayas. Experience yoga capital Rishikesh and the sacred Har Ki Pauri ghat in Haridwar.",
      reviews: [
        { name: "Anjali Gupta", rating: 4.8 },
        { name: "Rohit Malhotra", rating: 4.6 }
      ],
      avgRating: 4.7,
      photo: gallery03,
      featured: true,
      category: "Pilgrimage Sites",
      duration: "4 Days"
    },
    {
      id: "IN04",
      title: "Amarnath Cave Temple",
      city: "Kashmir",
      address: "Amarnath Cave, Pahalgam, Jammu & Kashmir", 
      distance: 850,
      price: 799,
      maxGroupSize: 8,
      desc: "Embark on the sacred yatra to Amarnath Cave, home to the naturally formed ice Shiva Lingam. A challenging yet spiritually rewarding pilgrimage in the Himalayas.",
      reviews: [
        { name: "Deepak Pandey", rating: 4.9 },
        { name: "Sunita Devi", rating: 4.8 }
      ],
      avgRating: 4.8,
      photo: gallery04,
      featured: false,
      category: "Mountain Pilgrimage",
      duration: "6 Days"
    }
  ],

  // South India Sacred Tours
  southIndia: [
    {
      id: "IN05",
      title: "Meenakshi Temple - Madurai",
      city: "Madurai",
      address: "Meenakshi Amman Temple, Madurai, Tamil Nadu",
      distance: 1200,
      price: 449,
      maxGroupSize: 15,
      desc: "Marvel at the architectural wonder of Meenakshi Temple with its towering gopurams and intricate sculptures. Experience the rich Dravidian culture and temple traditions.",
      reviews: [
        { name: "Lakshmi Iyer", rating: 4.9 },
        { name: "Ravi Krishnan", rating: 4.7 }
      ],
      avgRating: 4.8,
      photo: gallery05,
      featured: true,
      category: "Dravidian Architecture",
      duration: "3 Days"
    },
    {
      id: "IN06",
      title: "Tirupati Balaji",
      city: "Tirupati",
      address: "Tirumala Venkateswara Temple, Tirupati, Andhra Pradesh",
      distance: 1100,
      price: 399,
      maxGroupSize: 18,
      desc: "Visit the richest temple in the world, dedicated to Lord Venkateswara. Experience the divine darshan and the spiritual energy of Tirumala hills.",
      reviews: [
        { name: "Sridhar Reddy", rating: 4.8 },
        { name: "Kavya Nair", rating: 4.9 }
      ],
      avgRating: 4.8,
      photo: gallery06,
      featured: true,
      category: "Vishnu Temples",
      duration: "2 Days"
    },
    {
      id: "IN07",
      title: "Hampi - Vijayanagara",
      city: "Hampi",
      address: "Hampi Archaeological Site, Karnataka",
      distance: 950,
      price: 499,
      maxGroupSize: 12,
      desc: "Explore the ruins of the magnificent Vijayanagara Empire. Visit the Virupaksha Temple and witness the grandeur of medieval South Indian architecture.",
      reviews: [
        { name: "Aditya Rao", rating: 4.7 },
        { name: "Sneha Jain", rating: 4.8 }
      ],
      avgRating: 4.7,
      photo: gallery07,
      featured: false,
      category: "Historical Temples",
      duration: "3 Days"
    },
    {
      id: "IN08",
      title: "Rameswaram Temple",
      city: "Rameswaram",
      address: "Ramanathaswamy Temple, Rameswaram, Tamil Nadu",
      distance: 1350,
      price: 429,
      maxGroupSize: 14,
      desc: "Visit one of the twelve Jyotirlingas and the southernmost point of pilgrimage. Experience the sacred waters and the legend of Ramayana.",
      reviews: [
        { name: "Kamala Devi", rating: 4.8 },
        { name: "Murugan Swamy", rating: 4.6 }
      ],
      avgRating: 4.7,
      photo: gallery08,
      featured: false,
      category: "Jyotirlinga",
      duration: "2 Days"
    }
  ],

  // West India Sacred Tours
  westIndia: [
    {
      id: "IN09",
      title: "Somnath Temple",
      city: "Gir Somnath",
      address: "Somnath Temple, Gujarat",
      distance: 650,
      price: 379,
      maxGroupSize: 16,
      desc: "Visit the first among the twelve Jyotirlingas, known as the 'Shrine Eternal'. Witness the temple that has been destroyed and rebuilt multiple times through history.",
      reviews: [
        { name: "Bharat Shah", rating: 4.8 },
        { name: "Kiran Patel", rating: 4.7 }
      ],
      avgRating: 4.7,
      photo: tourImg01,
      featured: true,
      category: "Jyotirlinga",
      duration: "2 Days"
    },
    {
      id: "IN10",
      title: "Shirdi Sai Baba",
      city: "Shirdi",
      address: "Sai Baba Samadhi Mandir, Shirdi, Maharashtra",
      distance: 480,
      price: 329,
      maxGroupSize: 20,
      desc: "Experience the divine presence of Sai Baba at his sacred samadhi. Participate in the daily aarti and feel the spiritual energy that attracts millions of devotees.",
      reviews: [
        { name: "Sunita Patil", rating: 4.9 },
        { name: "Ramesh Desai", rating: 4.8 }
      ],
      avgRating: 4.8,
      photo: tourImg02,
      featured: true,
      category: "Saint Shrines",
      duration: "2 Days"
    },
    {
      id: "IN11",
      title: "Ajanta & Ellora Caves",
      city: "Aurangabad",
      address: "Ajanta & Ellora Caves, Maharashtra",
      distance: 520,
      price: 449,
      maxGroupSize: 14,
      desc: "Explore the magnificent rock-cut caves showcasing Buddhist, Hindu, and Jain art. Witness 2000-year-old paintings and sculptures in these UNESCO World Heritage sites.",
      reviews: [
        { name: "Dr. Mehta", rating: 4.9 },
        { name: "Pooja Agarwal", rating: 4.8 }
      ],
      avgRating: 4.8,
      photo: tourImg03,
      featured: false,
      category: "Cave Temples",
      duration: "3 Days"
    },
    {
      id: "IN12",
      title: "Mount Abu - Dilwara Temples",
      city: "Mount Abu",
      address: "Dilwara Temples, Mount Abu, Rajasthan",
      distance: 720,
      price: 399,
      maxGroupSize: 12,
      desc: "Marvel at the exquisite marble architecture of Dilwara Temples, considered among the finest Jain temples in India. Experience the cool hill station of Mount Abu.",
      reviews: [
        { name: "Jain Sahib", rating: 4.9 },
        { name: "Rachna Jain", rating: 4.7 }
      ],
      avgRating: 4.8,
      photo: tourImg04,
      featured: false,
      category: "Jain Temples",
      duration: "3 Days"
    }
  ],

  // East India Sacred Tours
  eastIndia: [
    {
      id: "IN13",
      title: "Jagannath Puri",
      city: "Puri",
      address: "Jagannath Temple, Puri, Odisha",
      distance: 1100,
      price: 429,
      maxGroupSize: 16,
      desc: "Experience the divine darshan of Lord Jagannath and witness the famous Rath Yatra. Visit one of the four sacred Char Dham pilgrimage sites.",
      reviews: [
        { name: "Subhash Jena", rating: 4.8 },
        { name: "Mira Das", rating: 4.7 }
      ],
      avgRating: 4.7,
      photo: tourImg05,
      featured: true,
      category: "Char Dham",
      duration: "3 Days"
    },
    {
      id: "IN14",
      title: "Kali Temple - Kalighat",
      city: "Kolkata",
      address: "Kalighat Kali Temple, Kolkata, West Bengal",
      distance: 890,
      price: 299,
      maxGroupSize: 18,
      desc: "Visit the sacred shrine of Goddess Kali, one of the 51 Shakti Peethas. Experience the spiritual energy and the vibrant culture of Bengal.",
      reviews: [
        { name: "Biplab Sen", rating: 4.6 },
        { name: "Mamata Roy", rating: 4.8 }
      ],
      avgRating: 4.7,
      photo: tourImg06,
      featured: false,
      category: "Shakti Peetha",
      duration: "2 Days"
    },
    {
      id: "IN15",
      title: "Konark Sun Temple",
      city: "Konark",
      address: "Sun Temple, Konark, Odisha",
      distance: 1150,
      price: 379,
      maxGroupSize: 14,
      desc: "Marvel at the architectural masterpiece of Konark Sun Temple, designed as a colossal chariot. Witness the UNESCO World Heritage site dedicated to Surya.",
      reviews: [
        { name: "Ashok Mohanty", rating: 4.8 },
        { name: "Lila Panda", rating: 4.6 }
      ],
      avgRating: 4.7,
      photo: tourImg07,
      featured: false,
      category: "Sun Worship",
      duration: "2 Days"
    }
  ],

  // International Sacred Sites
  international: [
    {
      id: "INT01",
      title: "Pashupatinath Temple",
      city: "Kathmandu",
      address: "Pashupatinath Temple, Kathmandu, Nepal",
      distance: 1200,
      price: 599,
      maxGroupSize: 10,
      desc: "Visit the sacred Hindu temple complex on the banks of Bagmati River. One of the most significant temples of Lord Shiva in the world.",
      reviews: [
        { name: "Gopal Sharma", rating: 4.8 },
        { name: "Sita Thapa", rating: 4.7 }
      ],
      avgRating: 4.7,
      photo: gallery01,
      featured: true,
      category: "Shiva Temples",
      duration: "4 Days"
    },
    {
      id: "INT02",
      title: "Anuradhapura",
      city: "Anuradhapura",
      address: "Anuradhapura Ancient City, Sri Lanka",
      distance: 1500,
      price: 699,
      maxGroupSize: 12,
      desc: "Explore the ancient capital of Sri Lanka with its magnificent Buddhist temples and stupas. Visit the sacred Bodhi Tree and ancient monasteries.",
      reviews: [
        { name: "Sunil Fernando", rating: 4.9 },
        { name: "Champa Silva", rating: 4.8 }
      ],
      avgRating: 4.8,
      photo: gallery02,
      featured: true,
      category: "Buddhist Heritage",
      duration: "5 Days"
    },
    {
      id: "INT03",
      title: "Angkor Wat",
      city: "Siem Reap",
      address: "Angkor Archaeological Park, Cambodia",
      distance: 2200,
      price: 899,
      maxGroupSize: 8,
      desc: "Explore the magnificent Angkor Wat temple complex, the largest religious monument in the world. Experience Khmer architecture and Hindu-Buddhist heritage.",
      reviews: [
        { name: "Sophea Chan", rating: 4.9 },
        { name: "David Kumar", rating: 4.8 }
      ],
      avgRating: 4.8,
      photo: gallery03,
      featured: false,
      category: "Ancient Temples",
      duration: "6 Days"
    }
  ]
};

// Flatten all tours for backward compatibility
const allTours = [
  ...sacredTours.northIndia,
  ...sacredTours.southIndia, 
  ...sacredTours.westIndia,
  ...sacredTours.eastIndia,
  ...sacredTours.international
];

export { sacredTours, allTours };
export default allTours;