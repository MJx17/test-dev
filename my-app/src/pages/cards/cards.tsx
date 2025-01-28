import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";
import ArrowNav from "../../utils/icons";
import "../../styles/home.scss";
import useNoticeCardStore from "../../store/cardStore"; // Zustand store

import Loading from "../../utils/loading"; // Loading component

const NoticeListCard: React.FC = () => {
  const { noticecards, getNoticeCards, loading } = useNoticeCardStore();
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    getNoticeCards(); // Fetch carousel data from API
  }, [getNoticeCards]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="noticecardswrapper">
      <div className="NoticeCards">
        <Swiper
          spaceBetween={20}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 }, // 1 card for small screens
            620: { slidesPerView: 2 }, // 2 cards for tablets
            1024: { slidesPerView: 3 }, // 3 cards for desktops
            1440: { slidesPerView: 4 }, // 4 cards for larger screens
          }}
          className="mySwiperNoticeCard"
        >
          <ArrowNav prevRef={prevRef} nextRef={nextRef} />

          {noticecards && noticecards.length > 0 ? (
            noticecards.map((noticard, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="notice-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Image Section */}
                  <div className="notice-card-image">
                    <img
                      src={noticard.imageUrl || undefined}
                      alt={noticard.title}
                      className="image"
                    />
                  </div>

                  {/* Overlay Content */}
                  <div className="notice-card-overlay">
                    <h3 className="notice-card-title">{noticard.title}</h3>
                    <p className="notice-card-description">
                      {noticard.description}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))
          ) : (
            <div>No carousel data available</div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default NoticeListCard;
