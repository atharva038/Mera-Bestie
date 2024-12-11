// Import required dependencies
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { allowedAdminEmails } from "../../../context/AdminEmails";
import {
  FaUser,
  FaHome,
  FaStore,
  FaEnvelope,
  FaGift,
  FaShoppingCart,
} from "react-icons/fa";

// Navbar component
export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState(""); // Username state
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Navigation links
  const navLinks = [
    { path: "/HomePage", label: "HOME", icon: <FaHome /> },
    { path: "/shop", label: "SHOP", icon: <FaStore /> },
    { path: "/contact", label: "CONTACT", icon: <FaEnvelope /> },
    { path: "/OccasionsPage", label: "OCCASIONS" },
    { path: "/about", label: "ABOUT" },
  ];

  // Fetch username (simulate auth check via backend)
  const fetchUserName = async () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      try {
        const response = await fetch(`https://ecommercebackend-8gx8.onrender.com/auth/user/${userId}`);
        const data = await response.json();
        setUserName(data?.name || ""); // Only set name if it's valid
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  // Handle logout properly
  const handleLogout = useCallback(() => {
    logout(); // Call logout from context
    setUserName(""); // Clear username explicitly
    sessionStorage.removeItem("userId"); // Clear session storage
    setIsAdmin(false); // Reset admin state
    setIsProfileMenuOpen(false); // Close menu
    navigate("/HomePage"); // Redirect to home after logout
  }, [logout, navigate]);

  useEffect(() => {
    fetchUserName();
    if (user?.email) {
      if (allowedAdminEmails().includes(user.email)) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      // Set the username after login
      setUserName(user?.userName || "");
    }
  }, [user]);

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path;
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

      {/* Header Section */}
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-pink-600 cursor-pointer"
        >
          <Link to="/HomePage">MERA Bestie</Link>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Admin Panel for Admins */}
          {isAdmin && user (
            <Link
              to="/admin"
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              Admin Panel
            </Link>
          )}


          {/* Cart Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer px-3 py-2"
          >
            <Link to="/cart">
              <FaShoppingCart className="w-6 h-6" />
            </Link>
          </motion.div>

          {/* Profile Menu */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer flex items-center space-x-2"
            onClick={toggleProfileMenu}
          >
            <FaUser className="w-5 h-5" />
            {userName ? (
              <span className="hidden md:inline text-sm font-medium">Hi, {userName}</span>
            ) : (
              <span className="hidden md:inline text-sm font-medium">Profile</span>
            )}

            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-0 mt-2 bg-white shadow-md rounded-lg z-20"
              >
                {userName ? (
                  <>
                    {/* Show logout if logged in */}
                    <button
                      className="block px-3 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login/Signup if logged out */}
                    <Link to="/login" className="block px-3 py-2 hover:bg-gray-100">
                      Login
                    </Link>
                    <Link to="/signup" className="block px-3 py-2 hover:bg-gray-100">
                      Signup
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
