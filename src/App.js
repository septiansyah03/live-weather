import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import WeatherMap from './components/WeatherMap';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Koordinat sekolah (contoh: Jakarta)
  const [lat, lon] = [-6.183228, 106.809298];
  const API_KEY = 'cb0960c758f5af37fe946871ade06ad9'; // Ganti dengan API Key kamu

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setTimeout(() => {
          fetchWeather();  // Retry request
        }, 5000); // Retry after 5 seconds
      } finally {
        setLoading(false);
      }
    };
    

    fetchWeather();
  }, [lat, lon, API_KEY]);

  if (loading) {
    return <div className="text-center text-blue-600 mt-10">Loading...</div>;
  }
  
  if (!weather) {
    return <div className="text-center text-red-600 mt-10">Failed to load weather data. Please try again later.</div>;
  }
  
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center">
      <WeatherCard weather={weather} />
      <WeatherMap lat={lat} lon={lon} />
    </div>
  );
  
};

export default App;
