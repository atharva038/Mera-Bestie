import React, { useEffect, useState } from "react";
import Footer from "../../components/user/footer/footer";
import { Link } from "react-router-dom";
import Navbar from "../../components/user/navbar/navbar";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import { Helmet } from "react-helmet";

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      style={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-2 bg-blue-500 origin-left z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.2 }}
    />
  );
};

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should run only once
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Mera Bestie</title>
      </Helmet>
      <div className="w-full">
        <ScrollProgress />
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <motion.img
              src="https://cdn.wallpapersafari.com/89/8/lybQgH.jpg"
              alt="Background"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 container mx-auto max-w-4xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-pink-100/90 p-8 md:p-12 rounded-lg backdrop-blur-sm">
              <h1 className="mb-6 text-4xl md:text-5xl font-serif text-center">
                Revolutionizing Gift Giving
              </h1>
              <p className="mb-8 text-gray-700 text-center max-w-2xl mx-auto">
                A world of unique gifts for every moment and milestone
              </p>
              <div className="text-center">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-white text-black hover:bg-gray-50 px-8 py-2 rounded uppercase text-sm tracking-wider"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section className="px-4 py-16 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
          <div className="container mx-auto max-w-7xl">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-5xl font-extrabold text-pink-800 mb-4 drop-shadow-lg">Products</h2>
              <div className="w-28 h-1 bg-pink-500 mx-auto mb-8 rounded-full"></div>
              <p className="text-gray-700 max-w-3xl mx-auto text-lg">
                Discover our diverse range of products crafted for all occasions, bringing
                creativity and quality to your celebrations.
              </p>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delayChildren: 0.2, staggerChildren: 0.2 },
                },
              }}
            >
              {/* Product Cards */}
              {[
                {
                  img: "https://i.pinimg.com/originals/96/24/6e/96246e3c133e6cb5ae4c7843f9e45b22.jpg",
                  title: "Stationery Items",
                },
                {
                  img: "https://cdn.pixabay.com/photo/2024/07/05/09/50/gifts-8874451_1280.jpg",
                  title: "Gift Items",
                },
                {
                  img: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?cs=srgb&dl=pexels-fotios-photos-1090638.jpg&fm=jpg",
                  title: "Decor Items",
                },
              ].map((product, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-xl shadow-lg group transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="relative h-64">
                    <img
                      src={product.img}
                      alt={`Product: ${product.title}`}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 bg-white group-hover:bg-pink-50 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-700 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 text-sm">
                      High-quality and creative products to elevate your experiences.
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

       

        {/* Vision Section */}
        <section className="relative min-h-[600px] overflow-hidden" data-aos="zoom-in">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.RNJBshhRJcxPoSt2Slj5bAHaEK&pid=Api&P=0&h=180"
              alt="Vision background"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20"></div>
          </div>

          {/* Main Content */}
          <div className="container relative z-10 mx-auto max-w-6xl px-4 py-16 lg:py-20">
            {/* Two Column Flexbox Layout */}
            <div className="flex flex-col lg:flex-row lg:space-x-8 items-start justify-center">

              {/* Left: Vision Content */}
              <motion.div
                className="w-full lg:w-1/2 bg-white bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  Our Vision
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
                  We aim to deliver innovative solutions by merging creativity and technology, fostering a positive and impactful user experience.
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg uppercase font-medium tracking-wide transition duration-200"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Right: Features/Goals Section */}
              <motion.div
                className="w-full lg:w-1/2 bg-white bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">What We Strive For</h3>
                <ul className="space-y-4 text-gray-700 leading-normal">
                  <li className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    <span>Innovative technological solutions to solve daily challenges.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    <span>Encouraging collaboration and creative opportunities for all.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                    <span>Building sustainable solutions that make a global impact.</span>
                  </li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg uppercase font-medium tracking-wide transition duration-200"
                >
                  Discover Our Vision
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;