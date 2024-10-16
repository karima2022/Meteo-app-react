import './App.css';
import Header from './components/Header';
import GenericInput from './components/GenericInput';
import WeatherDisplay from './components/WeatherDisplay';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState(null);

  function addCity(city) {
    setCity(city);
    console.log(city);
    fetchCoordinates(city);
  }

  async function fetchCoordinates(city) {
    const apiKey = '7eaa1d530e40021b70dbcaf065391712'; 
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    console.log('coordinates:', url);
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        fetchWeatherData(lat, lon);
      } else {
        console.error('City not found');
      }
    } else {
      console.error('Error fetching coordinates', response.status);
    }
  }

  async function fetchWeatherData(lat, lon) {
    const apiKey = '7eaa1d530e40021b70dbcaf065391712'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;
    
    console.log('weather data:', url);
    
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } else {
      const errorText = await response.text();
      console.error('Error fetching weather data', response.status, errorText);
    }
  }

  return (
    <div className="App">
      <Header />
      <GenericInput
        placeholder="Entrez le nom d'une ville"
        onAddItem={addCity}
      />
      {weatherData&& (
        <WeatherDisplay
          description={weatherData.weather[0].description}
          temperature={weatherData.main.temp}
          icon={weatherData.weather[0].icon}
          city={city}

        />
      )}
    </div>
  );
}

export default App;

