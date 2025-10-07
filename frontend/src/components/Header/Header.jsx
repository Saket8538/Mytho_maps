import React, { useState, useRef, useEffect, useContext } from "react";
import Logo from "./../../assets/images/logo3.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch, role } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    handleMenuToggle();
    navigate("/home");
    toast.info("Logged Out");
  };

  useEffect(() => {
    let lastScrollTop = window.pageYOffset;
    const header = headerRef.current;

    const handleWheel = (event) => {
      const currentScrollTop = window.pageYOffset;

      if (event.deltaY > 0) {
        // Scrolling down
        header.classList.add("hidden");
      } else {
        // Scrolling up
        header.classList.remove("hidden");
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header ref={headerRef} className="transition-all duration-300 bg-white shadow-lg border-b-2 border-GoldColor">
      <nav className="container mx-auto px-5 flex justify-between items-center py-2">
        {/* Brand Name Only - No Logo */}
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center">
            <span className="font-display text-xl md:text-2xl font-bold text-BaseColor">
              MythoMaps
            </span>
          </Link>
        </div>

        <div className="flex gap-2 md:hidden">
          {user ? (
            <div className="flex gap-3 items-center">
              <Link
                className="text-[18px] font-semibold text-BaseColor rounded hover:text-BHoverColor cursor-pointer"
                to={role === "user" && "/my-account"}
              >
                {user.username}
              </Link>
            </div>
          ) : null}
          <BiMenu
            className="w-8 h-8 cursor-pointer text-BaseColor hover:text-BHoverColor"
            onClick={handleMenuToggle}
          />
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed text-center top-0 h-screen right-0 w-2/3 bg-BackgroundCream duration-300 p-4 shadow-xl z-40">
            <IoClose
              className="w-8 h-8 cursor-pointer absolute top-4 right-0 mr-6 text-BaseColor hover:text-BHoverColor"
              onClick={handleMenuToggle}
            />
            <ul className="flex flex-col item-center h-full justify-center gap-10 font-body font-medium text-lg">
              {role !== "admin" && (
                <>
                  <Link to="/home" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Home
                  </Link>
                  <Link to="/india" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    India
                  </Link>
                  <Link to="/tours" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Sacred Tours
                  </Link>
                  <Link to="/about" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Gallery
                  </Link>
                  <Link to="/contact" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Contact
                  </Link>
                </>
              )}
              {role === "admin" && (
                <>
                  <Link to="/all-booking" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Bookings
                  </Link>
                  <Link to="/all-tours" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Tours
                  </Link>
                  <Link to="/create" onClick={handleMenuToggle} className="text-TextDark hover:text-BaseColor transition-colors">
                    Create
                  </Link>
                </>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn-primary mx-auto"
                >
                  Logout
                </button>
              ) : null}
              {user ? null : (
                <div className="flex items-center justify-center gap-4">
                  <Link to="/login" onClick={handleMenuToggle}>
                    <button className="text-BaseColor font-semibold rounded hover:text-BHoverColor transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={handleMenuToggle}>
                    <button className="btn-secondary">Register</button>
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}

        {role === "admin" ? (
          <ul className="md:flex hidden space-x-8 font-body font-medium">
            <Link to="/all-booking" className="text-TextDark hover:text-BaseColor transition-colors py-2">Bookings</Link>
            <Link to="/all-tours" className="text-TextDark hover:text-BaseColor transition-colors py-2">Tours</Link>
            <Link to="/create" className="text-TextDark hover:text-BaseColor transition-colors py-2">Create</Link>
          </ul>
        ) : (
          <ul className="md:flex hidden space-x-8 font-body font-medium">
            <Link to="/home" className="text-TextDark hover:text-BaseColor transition-colors py-2 px-3 rounded">Home</Link>
            <Link to="/india" className="text-TextDark hover:text-BaseColor transition-colors py-2 px-3 rounded">India</Link>
            <Link to="/tours" className="text-TextDark hover:text-BaseColor transition-colors py-2 px-3 rounded">Sacred Tours</Link>
            <Link to="/about" className="text-TextDark hover:text-BaseColor transition-colors py-2 px-3 rounded">Gallery</Link>
            <Link to="/contact" className="text-TextDark hover:text-BaseColor transition-colors py-2 px-3 rounded">Contact</Link>
          </ul>
        )}

        <div className="md:flex hidden items-center space-x-4">
          {user ? (
            <div className="flex gap-3 items-center">
              <Link
                className="text-[18px] font-semibold text-BaseColor rounded hover:text-BHoverColor cursor-pointer transition-colors"
                to={role === "user" && "/my-account"}
              >
                {user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-6 py-2 text-BaseColor font-semibold rounded-lg hover:text-BHoverColor hover:bg-red-50 transition-all">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn-secondary">Register</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
