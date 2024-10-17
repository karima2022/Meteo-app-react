import './App.scss';
import Header from './components/Header';
import GenericInput from './components/GenericInput';
import { useGeolocated } from "react-geolocated";
import WeatherDisplayCopy from './components/WeatherDisplayCopy';
import WeatherDisplay from './components/WeatherDisplay';
import { useState, useEffect } from 'react';
import Slider from 'react-slick'; 
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';


function App() {
  const [city, setCity] = useState();
  const [weatherCurrentData, setCurrentWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = useState(null);
  const [isGeolocating, setIsGeolocating] = useState(false); 

  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    getPosition
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords && isGeolocating) {
      const { latitude, longitude } = coords;
      fetchCurrentWeatherData(latitude, longitude);
      fetchWeatherData(latitude, longitude);
      setIsGeolocating(false);  // Réinitialise après géolocalisation
    }
  }, [coords, isGeolocating]);

  function handleGeolocateClick() {
    setIsGeolocating(true);  // Active la géolocalisation
  }

  function addCity(city) {
    setCity(city);
    fetchCoordinates(city);
  }

  async function fetchCoordinates(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    console.log('coordinates:', url);
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        fetchCurrentWeatherData(lat, lon);
        fetchWeatherData(lat, lon);
      } else {
        console.error('City not found');
      }
    } else {
      console.error('Error fetching coordinates', response.status);
    }
  }

  async function fetchCurrentWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;
    console.log('current weather data:', url);
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      setCurrentWeatherData(data);
    } else {
      const errorText = await response.text();
      console.error('Error fetching weather data', response.status, errorText);
    }
  }

  async function fetchWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;
    console.log('weather data:', url);
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      setWeatherData(data);
    } else {
      const errorText = await response.text();
      console.error('Error fetching weather data', response.status, errorText);
    }
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,  // Une seule carte à la fois
    slidesToScroll: 1,
    autoplay: true,  
    autoplaySpeed: 3000,  
    arrows: true,  
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="App">
      <Header />
      <GenericInput
        placeholder="Entrez le nom d'une ville"
        onAddItem={addCity}
      />
       <button onClick={handleGeolocateClick}>
        Me géolocaliser
      </button>
     

{weatherCurrentData && (
        <WeatherDisplay
          description={weatherCurrentData.weather[0].description}
          temperature={weatherCurrentData.main.temp}
          high={weatherCurrentData.main.temp_max} // Assurez-vous que ces valeurs sont disponibles
          low={weatherCurrentData.main.temp_min}
          icon={weatherCurrentData.weather[0].icon}
          city={weatherCurrentData.name}
          date={Date.now()}
        />
      )}
      
      {weatherData && weatherData.list && (
        
        <Slider {...settings}>
          {weatherData.list.map((forecast, index) => (
            <WeatherDisplay
              key={index}
              description={forecast.weather[0].description}
              temperature={forecast.main.temp}
              icon={forecast.weather[0].icon}
              city={weatherData.city.name}
              date={forecast.dt_txt}
              high={forecast.main.temp_max} 
              low={forecast.main.temp_min}
            />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default App;
