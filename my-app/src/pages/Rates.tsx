import { useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import Flag from '../utils/Flag'; // Import your Flag component
import { useExchangeRateStore } from '../store/store'; // Import Zustand store

const ExchangeRateList = () => {
  const { exchangeRates, loading, error, fetchExchangeRates } = useExchangeRateStore();

  // Get the current date in the desired format
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    fetchExchangeRates(); // Fetch the exchange rates when the component loads
  }, [fetchExchangeRates]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="exchange-rate-wrapper">
      {/* Title and Date Section */}
      <div className="title-date-section">
        <h2>FX Rates</h2>
        <p>{currentDate}</p>
      </div>

      {/* Marquee section for scrolling exchange rates */}
      <Marquee gradient={false} speed={50} pauseOnHover>
        {exchangeRates.map((rate) => (
          <div key={rate._id} className="exchange-rate-item">
            {/* Flag */}
            <Flag countryCode={rate.countryCode} className="exchange-rate-flag" />

            {/* Currency, Value, and Selling Rate */}
            <div className="exchange-rate-currency">{rate.currency}</div>
            <div className="exchange-rate-value">{rate.value}</div>
            <div className="exchange-rate-selling">{rate.selling_rate}</div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ExchangeRateList;
