import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import { motion } from "framer-motion";
import ArrowNav from '../utils/icons';
import "../styles/home.scss";
import useCarouselStore from '../store/Slide';  // Import the Zustand store and Carousel type
import RateList from '../pages/Rates';
import { Carousel } from "../ServicesTypes";
import Loading from "../utils/loading"; // Make sure you have a loading component
import NoticeListCard from '../pages/cards/cards'
import useIsMobile from "../hooks/mobile";


const Slider: React.FC = () => {


  const isMobile = useIsMobile();

  const [slideKey, setSlideKey] = useState<number>(0);  // Type state as a number
  const { carousels, getCarousels, loading } = useCarouselStore();  // Access the store state and actions

  const prevRef = useRef<HTMLButtonElement | null>(null);  // Type the prevRef as a button element or null
  const nextRef = useRef<HTMLButtonElement | null>(null);  // Type the nextRef as a button element or null

  // Fetch carousel data when component mounts
  useEffect(() => {
    getCarousels();  // Fetch data from API using the store's function
  }, []);

  // Handle slide change events
  const handleSlideChange = () => {
    setSlideKey((prevKey) => prevKey + 1); // Update key to trigger animation
  };

  // If data is still loading, render the loading state
  if (loading) {
    return <Loading />;  // Replace this with your loading spinner/component
  }

  return (
    <div>
      <div className="carousel-container">
        <div className="Carousel">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={false}
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

            {carousels && carousels.length > 0 ? (
              carousels.map((carousel: Carousel, index: number) => (
                <SwiperSlide key={index}>
                  <div className="slide-content">
                    <div className="text-content">
                      <h2>{carousel.title}</h2>
                      <p>{carousel.description}</p>
                    </div>
                    <div className="image-container">
                      {isMobile ? (
                        // Mobile motion img (the commented out one)
                        <motion.img
                          key={`${slideKey}-${index}`}
                          src={carousel.imageUrl as string}
                          alt={carousel.title}
                          className={`slide-image-${index}`}
                          initial={{ opacity: 0 }}    // start transparent
                          animate={{ opacity: 1 }}    // fade in
                          exit={{ opacity: 0 }}       // fade out
                          transition={{ duration: 0.9, ease: "easeInOut" }}
                        />


                      ) : (
                        // Desktop motion img (current one)
                        <motion.img
                          key={`${slideKey}-${index}`}
                          src={carousel.imageUrl as string}
                          alt={carousel.title}
                          className={`slide-image-${index}`}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}




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
                      >
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div>No carousel data available</div>  // Fallback if no data is available
            )}
          </Swiper>


          {/* <FeatureCardContainer /> */}


        </div>
      </div>
      <RateList />
      <NoticeListCard />
    </div>
  );
};

export default Slider;
