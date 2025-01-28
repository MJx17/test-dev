import React from 'react';

interface FlagProps {
  countryCode?: string; // Optional country code
  className?: string;   // Optional custom className for styling
}

const Flag: React.FC<FlagProps> = ({ countryCode, className }) => {
  const lowerCaseCountryCode = countryCode?.toLowerCase(); // Ensure it's lowercase
  const flagUrl = lowerCaseCountryCode
    ? `https://flagcdn.com/w20/${lowerCaseCountryCode}.png`
    : 'https://flagcdn.com/w20/xx.png'; // Default flag when no country code is provided

  // Handle broken flag image by using a fallback
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://flagcdn.com/w20/xx.png'; // Fallback flag
  };

  return (
    <img
      src={flagUrl}
      alt={countryCode ? `Flag of ${countryCode}` : 'Default flag'}
      className={className} // Allow custom className
      style={{
        width: '30px',
        height: '20px',
        marginRight: '10px',
      }}
      onError={handleError} // Fallback on error
    />
  );
};

export default Flag;
