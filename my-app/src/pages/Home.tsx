import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';  // This includes all styles
import { motion } from "framer-motion";
import ArrowNav from '../utils/icons';
import Rates from '../utils/rates';
import "../styles/home.scss";
import useCarouselStore from '../store/store';  // Import the Zustand store

const Slider = () => {
  const [slideKey, setSlideKey] = useState(0);
  const { carousels, getCarousels } = useCarouselStore();  // Access the store state and actions

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Fetch carousel data when component mounts
  useEffect(() => {
    getCarousels();  // Fetch data from API using the store's function
  }, [getCarousels]);

  // Handle slide change events
  const handleSlideChange = () => {
    setSlideKey((prevKey) => prevKey + 1); // Update key to trigger animation
  };

  return (
    <div className="Carousel">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        <ArrowNav prevRef={prevRef} nextRef={nextRef} />

        {carousels.map((carousel, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <div className="text-content">
                <h2>{carousel.title}</h2>
                <p>{carousel.description}</p>
              </div>
              <div className="image-container">
                <motion.img
                  key={`${slideKey}-${index}`}
                  src={carousel.imageUrl as string}
                  alt={carousel.title}
                  className={`slide-image-${index}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="bar-container"
                  key={`bar-${slideKey}-${index}`}
                  initial={{ scaleY: 0.5 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5 }}
                  style={{
                    transformOrigin: 'bottom',
                    height: '472px',
                    overflow: 'hidden',
                  }}
                ></motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Rates />
      <Rates />
    </div>
  );
};

export default Slider;
