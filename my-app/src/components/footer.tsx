import React from "react";
import "../styles/global.scss"; // Make sure to style the footer in this SCSS file

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer Images Section */}
      <div className="footer-images">
        <img src="footer-1.jpg" alt="Image 1" className="footer-image" />
        <img src="footer-2.png" alt="Image 2" className="footer-image" />
        <img src="footer-3.jpg" alt="Image 3" className="footer-3-image" />
        <img src="footer-4.jfif" alt="Image 4" className="footer-image" />
        <img src="footer-5.png" alt="Image 5" className="footer-image" />
      </div>

      {/* Mini Footer Section */}
      <div className="mini-footer">
        <p>Philtrust Bank is supervised by the Bank Sentral ng Pilipinas(+632-708-7087 | consumeraffairs@bsp.gov.ph)</p>
        <p>&copy; 2025 Philtrust Bank Corporate Website. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
