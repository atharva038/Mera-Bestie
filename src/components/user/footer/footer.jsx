import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white pt-12 pb-8">
      {/* Top curved border */}
      <div className="absolute top-0 left-0 right-0 -mt-20">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-20 transform rotate-180"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L80,106.7C160,117,320,139,480,144C640,149,800,139,960,122.7C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Social Media Section */}
          <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0">
            <h2 className="text-4xl font-extrabold mb-4">MERA Bestie</h2>
            <p className="text-sm mb-4">
              Your trusted companion for connecting and sharing.
            </p>
            <div className="flex mt-6 space-x-4">
              <Link
                to="#"
                className="hover:text-blue-300 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link
                to="#"
                className="hover:text-blue-300 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </Link>
              <Link
                to="#"
                className="hover:text-blue-300 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full lg:w-4/12 px-4 mb-8 lg:mb-0">
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Services</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="w-full lg:w-4/12 px-4">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <address className="not-italic text-sm leading-loose">
              <p>3181 Skjdsd Sdbs Ahsdjad Ahbaja Adjadsa,</p>
              <p>Sgd Nshs Jbbb 12232,</p>
              <p>India</p>
              <p>Email: support@merabestie.com</p>
              <p>Phone: +91 12345 67890</p>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-wrap items-center md:justify-between justify-center mt-8 border-t border-gray-200 pt-8">
          <div className="w-full px-4 mx-auto text-center">
            <p className="text-sm">
              Copyright &copy; {new Date().getFullYear()} <span className="font-bold">MERA Bestie</span>. All Rights Reserved.
            </p>
            <p className="text-xs mt-2">
              Designed with <span className="text-red-500">&#10084;</span> by Your Team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;