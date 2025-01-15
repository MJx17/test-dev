import React from 'react';

interface FlagProps {
  countryCode: string;
}

const Flag: React.FC<FlagProps> = ({ countryCode }) => {
  // Ensure the countryCode is in the correct format (lowercase, two-letter ISO 3166-1 alpha-2)
  const flagUrl = `https://flagcdn.com/w20/${countryCode}.png`; // URL format for flag images

  return (
    <img
      src={flagUrl}
      alt={`Flag of ${countryCode}`}
      style={{ width: '30px', height: '20px', marginRight: '8px' }}
    />
  );
};

export default Flag;
