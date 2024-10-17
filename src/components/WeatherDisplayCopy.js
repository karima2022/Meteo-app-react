import React from 'react';

const WeatherDisplayCopy = ({ description, temperature, icon, city, date, high, low }) => {
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
    <div className="wrapper">
      <div className="weather">
        <div className="city">
          <h1>{city}</h1>
          <p>{description}</p>
        </div>
        <div className="clearfix"></div>

        <div className="cont">
          <div className="icon">
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={`Weather icon: ${description}`} />
          </div>
          <div className="temp">
            <div className="current">
              {temperature}&deg;
            </div>
            <div className="high">
              Max: {high}&deg;
            </div>
            <div className="low">
              Min: {low}&deg;
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="date">
            <p>{formattedDateTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplayCopy;
