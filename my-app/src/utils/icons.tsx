// CustomArrows.tsx
import React, { RefObject } from 'react';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import '../styles/home.scss'; // Add your CSS styles here

// Define the types for the props
interface CustomArrowsProps {
  prevRef: RefObject<HTMLButtonElement>;  // Ref for the previous button
  nextRef: RefObject<HTMLButtonElement>;  // Ref for the next button
}

const CustomArrows: React.FC<CustomArrowsProps> = ({ prevRef, nextRef }) => {
  return (
    <>
      <button className="custom-prev-button" ref={prevRef}>
        <WestIcon fontSize="large" />
      </button>
      <button className="custom-next-button" ref={nextRef}>
        <EastIcon fontSize="large" />
      </button>
    </>
  );
};

export default CustomArrows;
