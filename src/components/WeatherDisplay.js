import React from 'react';


const WeatherDisplay = ({ description, temperature, icon, city, date}) => {
  return (
    <div className="weather-card">
        <h2>{city} </h2> <p>{date}</p>
         <div className="weather-info">
        <h2>{description}</h2>
        <p>{temperature}°C</p>
      </div>
      
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
     
    </div>
  );
};

export default WeatherDisplay;

