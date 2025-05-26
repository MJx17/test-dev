import React from 'react';
import { motion } from 'framer-motion';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';

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
    }
];

const Loans4: React.FC = () => {
    return (
        <div className="loan-page-4">
            <div className="loan-section-4">
                <div className="loan-text-4">
                    <h1>Loans</h1>
                    <p className="loan-description-4">
                        Choose from a range of loan options tailored to your needs. Whether you're looking to finance your home, car, education, or personal goals, we’ve got a plan that fits your budget.
                    </p>
                </div>
                <div className="loan-banner-4">
                    <button className="button-banner-4">Click Me</button>
                </div>
            </div>

            <div className="loan-cards-wrapper-4">
                <div className="loan-cards-container-4">
                    {loanSlides.map((loan, index) => (
                        <motion.div
                            key={index}
                            className="loan-card-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="loan-card-image-4">
                                <img src={`/${loan.Image}`} alt={loan.title} className="image-4" />
                            </div>
                            <div className="loan-card-details-4">
                                <h3 className="loan-card-title-4">{loan.title}</h3>
                                <p className="loan-card-description-4">{loan.description}</p>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loans4;
