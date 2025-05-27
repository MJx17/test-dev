import React, { RefObject } from "react";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import "../styles/home.scss";

// Full interface (with optional booleans)
interface ArrowNavProps {
  prevRef: RefObject<HTMLButtonElement>;
  nextRef: RefObject<HTMLButtonElement>;
  isBeginning?: boolean;
  isEnd?: boolean;
}

// 1. Default Full Version
export const ArrowNav: React.FC<ArrowNavProps> = ({
  prevRef,
  nextRef,
  isBeginning,
  isEnd,
}) => {
  return (
    <>
      <button
        className={`custom-prev-button ${isBeginning ? "hidden" : ""}`}
        ref={prevRef}
      >
        <WestIcon fontSize="large" />
      </button>
      <button
        className={`custom-next-button ${isEnd ? "hidden" : ""}`}
        ref={nextRef}
      >
        <EastIcon fontSize="large" />
      </button>
    </>
  );
};

// 2. Simplified Version (no beginning/end logic)
interface SimpleArrowNavProps {
  prevRef: RefObject<HTMLButtonElement>;
  nextRef: RefObject<HTMLButtonElement>;
}

export const SimpleArrowNav: React.FC<SimpleArrowNavProps> = ({
  prevRef,
  nextRef,
}) => {
  return (
    <>
      <button className="custom-prev-button-home" ref={prevRef}>
        <WestIcon fontSize="large" />
      </button>
      <button className="custom-next-button-home" ref={nextRef}>
        <EastIcon fontSize="large" />
      </button>
    </>
  );
};
