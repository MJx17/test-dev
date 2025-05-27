import React from "react";
import "../styles/footer.scss";
import SiteMap from './siteMap';


const Footer: React.FC = () => {
  return (
    <>
      <SiteMap />
      <footer className="footer-container">

        {/* Combined layout for Info + Images */}
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-info">
            <h2 className="company-title">Philtrust Bank</h2>
            <p className="company-address">1000 United Nations Avenue, Manila, Philippines</p>
            <p className="company-description">Empowering generations with trusted financial services.</p>
            <p className="company-description">Your future, our mission.</p>
          </div>

          {/* Footer Images */}
          <div className="footer-images">
            <img src="footer-1.jpg" alt="Image 1" className="footer-image" />
            <img src="footer-2.png" alt="Image 2" className="footer-image" />
            <img src="footer-3.jpg" alt="Image 3" className="footer-image" />
            <img src="footer-4.jfif" alt="Image 4" className="footer-image" />
            <img src="footer-5.png" alt="Image 5" className="footer-image" />
          </div>
        </div>

        {/* Mini Footer */}
        <div className="mini-footer">
          <p>
            Philtrust Bank is supervised by the Bangko Sentral ng Pilipinas (+632-708-7087 |
            <a href="mailto:consumeraffairs@bsp.gov.ph"> consumeraffairs@bsp.gov.ph</a>)
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
