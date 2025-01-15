import React, { useState, useRef} from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';  // This includes all styles
import { motion } from "framer-motion";
import ArrowNav from '../utils/icons'
import Rates from '../utils/rates'
import "../styles/home.scss";
import Navbar from "../components/navbar";



const Slider = () => {
  const [slideKey, setSlideKey] = useState(0);
  
const prevRef = useRef(null);
const nextRef = useRef(null);

  // Handle slide change events
  const handleSlideChange = () => {
    setSlideKey(prevKey => prevKey + 1); // Update key to trigger animation
  };

  return (
    
    <div className="Carousel">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange} // Handle slide change
        className="mySwiper"
      >

      <ArrowNav prevRef={prevRef} nextRef={nextRef} />
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <h2>Savings Account </h2>
              <p>Secure your future with our flexible Savings Account. Enjoy easy access to your funds anytime, anywhere, and watch your savings grow with us.</p>
            </div>
            <div className="image-container">
              <motion.img
                key={`${slideKey}-1`} // Unique key for each image
                src="1.png"
                alt="Slide 1"
                className="slide-image-1"
                initial={{ scale: 0.8 }} // Initial scale when the component loads
                animate={{ scale: 1 }} // Final scale after animation
                transition={{ duration: 0.5 }} // Duration of the scaling animation
              />
              <motion.div
                className="bar-container"
                key={`bar-${slideKey}-1`} // Unique key for each bar
                initial={{ scaleY: 0.5 }} // Start with 0 height
                animate={{ scaleY: 1 }} // Animate to full height
                transition={{ duration: 1.5 }} // Duration of the animation
                style={{
                  transformOrigin: 'bottom', // Anchor the animation to the bottom
                  height: '472px', // Set the final height of the bar
                  overflow: 'hidden' // Ensure content doesn't overflow
                }}
              ></motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <h2>Auto Loan</h2>
              <p>Drive your dream car home with our Auto Loan. Affordable rates, flexible payment plans, and fast approvals to get you on the road in no time.</p>
            </div>
            <div className="image-container">
              <motion.img
                key={`${slideKey}-2`} // Unique key for each image
                src="2.png"
                alt="Slide 1"
                className="slide-image-2"
                initial={{ scale: 0.8 }} // Initial scale when the component loads
                animate={{ scale: 1 }} // Final scale after animation
                transition={{ duration: 0.5 }} // Duration of the scaling animation
              />
              <motion.div
                className="bar-container"
                key={`bar-${slideKey}-1`} // Unique key for each bar
                initial={{ scaleY: 0.5 }} // Start with 0 height
                animate={{ scaleY: 1 }} // Animate to full height
                transition={{ duration: 1.5 }} // Duration of the animation
                style={{
                  transformOrigin: 'bottom', // Anchor the animation to the bottom
                  height: '472px', // Set the final height of the bar
                  overflow: 'hidden' // Ensure content doesn't overflow
                }}
              ></motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <h2>Housing Loan</h2>
              <p>Turn your dream home into a reality with our Housing Loan. Offering competitive rates, flexible terms, and a quick approval process to help you move in faster.</p>
            
            </div>
            <div className="image-container">
              <motion.img
                key={`${slideKey}-3`} // Unique key for each image
                src="3.png"
                alt="Slide 3"
                className="slide-image-3"
                initial={{ scale: 0.8 }} // Initial scale when the component loads
                animate={{ scale: 1 }} // Final scale after animation
                transition={{ duration: 0.5 }} // Duration of the scaling animation
              />
              <motion.div
                className="bar-container"
                key={`bar-${slideKey}-3`} // Unique key for each bar
                initial={{ scaleY: 0.5 }} // Start with 0 height
                animate={{ scaleY: 1 }} // Animate to full height
                transition={{ duration: 1.5 }} // Duration of the animation
                style={{
                  transformOrigin: 'bottom', // Anchor the animation to the bottom
                  height: '472px', // Set the final height of the bar
                  overflow: 'hidden' // Ensure content doesn't overflow
                }}
              ></motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <h2>Business Loan</h2>
              <p>Fuel your business growth with our Business Loan solutions. Tailored to meet your needs, with competitive rates and fast approvals to get your business moving forward.</p>
            </div>
            <div className="image-container">
              <motion.img
                key={`${slideKey}-1`} // Unique key for each image
                src="4.png"
                alt="Slide 4"
                className="slide-image-4"
                initial={{ scale: 0.8 }} // Initial scale when the component loads
                animate={{ scale: 1 }} // Final scale after animation
                transition={{ duration: 0.5 }} // Duration of the scaling animation
              />
              <motion.div
                className="bar-container"
                key={`bar-${slideKey}-4`} // Unique key for each bar
                initial={{ scaleY: 0.5 }} // Start with 0 height
                animate={{ scaleY: 1 }} // Animate to full height
                transition={{ duration: 1.5 }} // Duration of the animation
                style={{
                  transformOrigin: 'bottom', // Anchor the animation to the bottom
                  height: '472px', // Set the final height of the bar
                  overflow: 'hidden' // Ensure content doesn't overflow
                }}
              ></motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <h2>Cashless Shopping</h2>
              <p>Experience the freedom of cashless shopping. Our contactless payment solutions are safe, convenient, and rewarding—enjoy exclusive discounts and cashback offers!.</p>
            </div>
            <div className="image-container">
              <motion.img
                key={`${slideKey}-5`} // Unique key for each image
                src="5.png"
                alt="Slide 1"
                className="slide-image-5"
                initial={{ scale: 0.5 }} // Initial scale when the component loads
                animate={{ scale: 1 }} // Final scale after animation
                transition={{ duration: 0.5 }} // Duration of the scaling animation
              />
              <motion.div
                className="bar-container"
                key={`bar-${slideKey}-5`} // Unique key for each bar
                initial={{ scaleY: 0.8 }} // Start with 0 height
                animate={{ scaleY: 1 }} // Animate to full height
                transition={{ duration: 1.5 }} // Duration of the animation
                style={{
                  transformOrigin: 'bottom', // Anchor the animation to the bottom
                  height: '472px', // Set the final height of the bar
                  overflow: 'hidden' // Ensure content doesn't overflow
                }}
              ></motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
        <Rates/>
        
    </div>
  );
};

export default Slider;
