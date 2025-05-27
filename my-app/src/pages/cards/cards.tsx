import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";
import {ArrowNav} from "../../utils/icons";
import "../../styles/home.scss";
import useNoticeCardStore from "../../store/cardStore"; // Zustand store

import Loading from "../../utils/loading"; // Loading component

const NoticeListCard: React.FC = () => {
  const { noticecards, getNoticeCards, loading } = useNoticeCardStore();
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // Track if swiper is at beginning or end
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    getNoticeCards();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="noticecardswrapper">
      <div className="NoticeCards">
        <Swiper
          spaceBetween={20}
          loop={false}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            620: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          onSwiper={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="mySwiperNoticeCard"
        >
          <ArrowNav
            prevRef={prevRef}
            nextRef={nextRef}
            isBeginning={isBeginning}
            isEnd={isEnd}
          />

          {noticecards && noticecards.length > 0 ? (
            noticecards.map((noticard, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="notice-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="notice-card-image">
                    <img
                      src={noticard.imageUrl || undefined}
                      alt={noticard.title}
                      className="image"
                    />
                  </div>

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

