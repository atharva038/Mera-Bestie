import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
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

  // Navigation Links Config
  const navLinks = [
    { path: "/HomePage", label: "HOME", icon: <FaHome /> },
    { path: "/shop", label: "SHOP", icon: <FaStore /> },
    { path: "/contact", label: "CONTACT", icon: <FaEnvelope /> },
    { path: "/OccasionsPage", label: "OCCASIONS" },
    { path: "/about", label: "ABOUT" },
  ];

  // Toggle Functions
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  // Fetch User Data
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

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Logout
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  }, []);

  const userId = sessionStorage.getItem("userId");

  return (
    <nav className="bg-white text-black">
      {/* Promotional Banner */}
      <div className="bg-white text-pink-500 py-2 text-center text-sm border-b">
        <span className="inline-flex items-center">
          <FaGift className="mr-2" />
          USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE RS.499 | FREE
          SHIPPING | COD AVAILABLE
        </span>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="h-[60px] flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="lg:hidden text-black">
              <FaBars className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/HomePage" className="text-2xl flex items-center">
              <span className="font-['Bodoni_MT'] font-bold text-xl">
                MERA Bestie
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block max-w-xl w-full mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Gifts for your loved ones...."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <FaSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              <button
                aria-label="Search"
                className="md:hidden hover:text-gray-500"
                onClick={toggleSearch}
              >
                <FaSearch className="w-4 h-4" />
              </button>
              <Link
                to="/cart"
                className="hover:text-gray-500 flex items-center"
              >
                <FaShoppingCart className="w-4 h-4" />
                <span className="ml-2 hidden md:inline">Cart</span>
              </Link>
              <button
                aria-label="Wishlist"
                className="hover:text-gray-500 hidden md:block"
              >
                <FaHeart className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  aria-label="Profile"
                  onClick={toggleProfileMenu}
                  className="hover:text-gray-500 flex items-center"
                >
                  <FaUser className="w-4 h-4" />
                  <span className="ml-2 hidden md:inline">
                    {userId ? `Hi, ${userName}` : "Hi, Profile"}
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-[120px] bg-white border rounded shadow-lg z-20">
                    {userId ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Signup
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-pink-600 text-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="h-12 flex items-center justify-between">
            {/* Menu Items */}
            <div className="flex items-center space-x-8 text-sm font-normal">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`hover:text-gray-200 ${isActive(path) ? "text-gray-900" : ""
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Phone Number */}
            <div className="hidden lg:flex items-center text-sm font-normal">
              <FaPhone className="w-4 h-4 mr-2" />
              <span>(219) 555-0114</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white p-4 shadow-lg z-50 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Gifts for your loved ones...."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Navigation Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              <button onClick={toggleMenu} className="absolute top-5 right-5">
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="mt-8">
                {navLinks.map(({ path, label, icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block py-2.5 text-lg font-medium hover:text-pink-500"
                    onClick={toggleMenu}
                  >
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                  </Link>
                ))}
                <hr className="my-4" />
                <div className="mt-4 flex items-center">
                  <FaPhone className="w-4 h-4 mr-2" />
                  <span>(219) 555-0114</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
