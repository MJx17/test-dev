import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyProperties } from './Properties';
import '../styles/properties.scss';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CancelIcon from '@mui/icons-material/Cancel';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const property = dummyProperties.find((p) => p.id === Number(id));
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!property) return <div>Property not found</div>;

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % property.imageUrls.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? property.imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <div className="property-details">
      {/* Gallery */}
      <div className="property-details__gallery">
        <div className="property-details__thumbnails">
          {property.imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              onClick={() => setSelectedIndex(index)}
              className={`thumbnail ${selectedIndex === index ? 'selected' : ''}`}
            />
          ))}
        </div>

        <div
          className="property-details__main-image"
          onClick={() => setIsModalOpen(true)}
        >
          <img src={property.imageUrls[selectedIndex]} alt="Selected" />
        </div>
      </div>

      {/* Property Info */}
      <div className="property-details__info">
        <h1>{property.description}</h1>
        <table>
          <tbody>
            {[
              ['Category', property.category],
              ['Mode', property.mode],
              ['Area', property.area],
              ['Lot Area', property.lotArea],
              ['Floor Area', property.floorArea],
              ['Price', property.price],
              ['Address', property.address],
              ['Status', property.status],
            ].map(([label, value]) => (
              <tr key={label}>
                <td className="label">{label}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="property-notice">
          <h2>Notice on Properties</h2>

          <p className="notice-text">
            ALL PROPERTIES FOR SALE ARE ON "AS IS WHERE IS" BASIS.
          </p>
          <p className="notice-text">
            PROPERTIES, RATES AND PRICES ARE SUBJECT TO CHANGE WITHOUT PRIOR NOTICE.
          </p>

          <p className="section-heading"><strong>For Sales:</strong></p>
          <p className="contact-number">
            <span className="label">Telephone Nos:</span>
            <span className="yellow-gold"> (02) 8524-9061 / (02) 8990-0437</span>
          </p>
          <p className="contact-number">
            <span className="label">Fax Nos:</span>
            <span className="yellow-gold"> (02) 525-1268 / (02) 524-9022</span>
          </p>

          <p className="section-heading"><strong>For Leasing of Prime Properties:</strong></p>
          <p className="contact-number yellow-gold">(02) 8524-9061 local 154</p>
          <p className="contact-number yellow-gold">(02) 8990-0437</p>
        </div>




      </div>

      {/* Modal Lightbox */}
      {isModalOpen && (
        <div className="image-modal" onClick={() => setIsModalOpen(false)}>
          <button className='close'>
            <CancelIcon fontSize="large" />
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={property.imageUrls[selectedIndex]}
              alt="Zoomed"
              className="modal-image"
            />

            <div className="modal-controls">
              <button className="prev" onClick={prevImage} aria-label="Previous Image">
                <ArrowCircleLeftIcon fontSize="large" />
              </button>
              <button className="next" onClick={nextImage} aria-label="Next Image">
                <ArrowCircleRightIcon fontSize="large" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyDetails;
