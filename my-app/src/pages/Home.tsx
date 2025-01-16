import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';  // This includes all styles
import { motion } from "framer-motion";
import ArrowNav from '../utils/icons';
import Rates from '../utils/rates';
import "../styles/home.scss";
import useCarouselStore from '../store/store';

interface Carousel {
  title: string;
  description: string;
  imageUrl: string | null;  // Allow null for imageUrl
}

const Slider: React.FC = () => {
  const [slideKey, setSlideKey] = useState<number>(0);
  const { carousels, getCarousels } = useCarouselStore();  // Access the store state and actions

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

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

        {carousels.map((carousel: Carousel, index: number) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <div className="text-content">
                <h2>{carousel.title}</h2>
                <p>{carousel.description}</p>
              </div>
              <div className="image-container">
                <motion.img
                  key={`${slideKey}-${index}`}
                  src={carousel.imageUrl || '/default-image.jpg'}  // Provide a fallback if imageUrl is null
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
