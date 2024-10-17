import React from 'react';

const WeatherDisplay = ({ description, temperature, icon, city, date, high, low }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  };
  const formattedDateTime = formatDateTime(date);

  return (
    <div className="container">
    <div className="widget">
     
      <div className="details">
        <div className="temperature">{temperature}°C</div>
        <div className="summary">
          <p>{description}</p>
        
          <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={`Weather icon: ${description}`} />
        </div>
        
        <div className="precipitation">{formattedDateTime}</div>
        <div className="precipitation">{city}</div>
        <div className="precipitation">Min: {low}°C</div>
        <div className="wind">Max: {high}°C</div>
      </div>
    </div>
  </div>
  );
};

export default WeatherDisplay;

