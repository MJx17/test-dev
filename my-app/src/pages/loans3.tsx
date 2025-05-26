import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";
import ArrowNav from "../utils/icons"; // Your custom navigation arrows


// MUI Icons
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import '../styles/loans.scss';

// Hardcoded icon-based slides
const loanSlides = [
    {
        title: "Personal Loan",
        description: "Quick funds for your personal needs.",
        Icon: SettingsAccessibilityIcon,
        Image: "5.png"
    },
    {
        title: "Home Loan",
        description: "Own your dream house with easy EMIs.",
        Icon: HomeIcon,
        Image: "3.png"
    },
    {
        title: "Car Loan",
        description: "Drive your dream car with low interest.",
        Icon: DirectionsCarIcon,
        Image: "2.png"
    },
    {
        title: "Education Loan",
        description: "Invest in your future with flexible education loans.",
        Icon: SchoolIcon,
        Image: "1.png"
    },
 
];


const NoticeListCard: React.FC = () => {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="loan-page-3">
            <div className="loan-section-3">
                <div className="loan-text-3">
                    <h1>Loans</h1>
                    <p className="loan-description-3">
                        Choose from a range of loan options tailored to your needs. Whether you're looking to finance your home, car, education, or personal goals, we’ve got a plan that fits your budget.
                    </p>
                </div>
                <div className="loan-banner-3">
                    <button className="button-banner-3">
                        Click Me
                    </button>
                </div>
            </div>

            <div className="loan-cards-wrapper-3">
                <div className="loan-cards-container-3">
                    <Swiper
                        spaceBetween={20}
                        loop={false}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        // // modules={[Autoplay, Navigation]}
                        // autoplay={{
                        //     delay: 5000,
                        //     disableOnInteraction: false,
                        // }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            620: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1440: { slidesPerView: 4 },
                        }}
                        className="mySwiperLoanCard-3"
                    >
                        <ArrowNav prevRef={prevRef} nextRef={nextRef} />

                        {loanSlides.map((loan, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    className="loan-card-3"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="loan-card-image-3">
                                        <img src={`/${loan.Image}`} alt={loan.title} className="image-3" />
                                    </div>
                                    <div className="loan-card-details-3">
                                        <h3 className="loan-card-title-3">{loan.title}</h3>
                                        <p className="loan-card-description-3">{loan.description}</p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default NoticeListCard;
