import React from 'react';
import { motion } from 'framer-motion';
import '../styles/info.scss';

export interface InfoDataItem {
  type: 'card' | 'text';
  title?: string;          // for card
  description?: string;    // for card
  heading?: string;        // for text
  content?: string;        // for text
  list?: string[];         // for text
}

export interface InfoSectionProps {
  title: string;
  description: string;
  image: string;
  infoData?: InfoDataItem[];
  cardSectionTitle?: string;
  textSectionTitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

// Extend with `path` for your route or indexing, no icons here
export interface Section extends InfoSectionProps {
  path: string;
}


const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  description,
  image,
  infoData,
  cardSectionTitle = "Details",
  textSectionTitle = "More Information",
  buttonText,
  onButtonClick,
}) => {
  const loanCards = infoData?.filter(item => item.type === "card") || [];
  const textBlocks = infoData?.filter(item => item.type === "text") || [];

  return (
    <div className="info-page">
      <div
        className="info-section"
        style={{ backgroundImage: `url('/${image}')` }}
      >
        <div className="info-text">
          <h1>{title}</h1>
          {/* Render the Icon component */}
        
          <motion.p
            className="info-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {description}
          </motion.p>
          {buttonText && onButtonClick && (
            <button onClick={onButtonClick}>{buttonText}</button>
          )}
        </div>
      </div>

      {/* Card Section */}
      {loanCards.length > 0 && (
        <section className="info-details">
          <h2>{cardSectionTitle}</h2>
          <div className="info-cards">
            {loanCards.map(({ title, description }, index) => (
              <article key={index} className="info-card">
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Text Section */}
      {textBlocks.length > 0 && (
        <section className="info-text-blocks">
          <h2>{textSectionTitle}</h2>
          {textBlocks.map(({ heading, content, list }, index) => (
            <div key={index} className="text-block">
              <h3>{heading}</h3>
              {content && <p>{content}</p>}
              {list && (
                <ul>
                  {list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default InfoSection;
