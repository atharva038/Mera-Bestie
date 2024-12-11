import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaChevronDown,
  FaTimes,
  FaBars,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaGift,
  FaPhone,
  FaHome,
  FaStore,
  FaEnvelope,
} from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  const navLinks = [
    { path: "/HomePage", label: "HOME", icon: <FaHome /> },
    { path: "/shop", label: "SHOP", icon: <FaStore /> },
    { path: "/contact", label: "CONTACT", icon: <FaEnvelope /> },
    { path: "/OccasionsPage", label: "OCCASIONS" },
    { path: "/about", label: "ABOUT" },
  ];

  // Toggle functions
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `https://ecommercebackend-8gx8.onrender.com/auth/user/${userId}`
          );
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserName();
  }, []);

  // Handle Logout
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  }, []);

  const userId = sessionStorage.getItem("userId");

  return (
    <nav className="bg-white text-black shadow-md">
      {/* Promotional Banner */}
      <div className="bg-pink-200 text-pink-800 py-2 text-center text-sm border-b">
        <span className="inline-flex items-center">
          <FaGift className="mr-2" />
          🎉 10% OFF ON ORDERS ABOVE RS.499 | FREE SHIPPING | COD AVAILABLE
        </span>
      </div>

      {/* Main Header Section */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-pink-600"
        >
          <Link to="/HomePage">MERA Bestie</Link>
        </motion.div>

        {/* Search Bar */}
        <div className="hidden md:block max-w-xl w-full mx-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <input
              type="text"
              placeholder="Search Gifts for your loved ones..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-600" />
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer hover:text-pink-600"
          >
            <Link to="/cart">
              <FaShoppingCart className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Wishlist */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer hover:text-pink-600"
          >
            <FaHeart className="w-5 h-5" />
          </motion.div>

          {/* Profile Section */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer flex items-center space-x-2"
            onClick={toggleProfileMenu}
          >
            <FaUser className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-medium">{userId ? `Hi, ${userName}` : "Profile"}</span>
            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-0 mt-2 bg-white shadow-md rounded-lg z-20"
              >
                {userId ? (
                  <button
                    className="block px-3 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/Signup"
                      className="block px-3 py-2 hover:bg-gray-100"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>

      {/* Navigation Menu with transitions */}
      <div className="bg-pink-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-around space-x-6">
          {navLinks.map(({ path, label }) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`cursor-pointer ${isActive(path) ? "text-gray-100" : ""}`}
              key={path}
            >
              <Link to={path}>{label}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );
}
