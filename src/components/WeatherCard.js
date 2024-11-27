import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const apiKey = 'cb0960c758f5af37fe946871ade06ad9'; // Ganti dengan API key OpenWeatherMap Anda

  // Fungsi untuk mengambil cuaca saat ini
  const fetchWeather = async (inputCity = city) => {
    if (!inputCity) {
      setError('Harap masukkan nama kota');
      return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric&lang=id`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=${apiKey}&units=metric&lang=id`;

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(currentWeatherUrl),
        fetch(forecastUrl),
      ]);

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      if (currentResponse.ok && forecastResponse.ok) {
        setWeather(currentData);
        setForecast(forecastData.list.slice(0, 5)); // Ambil 5 data pertama (5 jam ke depan)
        setError('');
      } else {
        setWeather(null);
        setForecast([]);
        setError('Kota tidak ditemukan, coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi nanti.');
    }
  };

  // Ambil cuaca Jakarta secara default saat aplikasi dimuat
  useEffect(() => {
    fetchWeather('Jakarta');
  }, []);

  // Fungsi untuk menentukan kegiatan outdoor
  const decision = () => {
    if (!weather) return '';

    const temp = weather.main.temp;
    const condition = weather.weather[0].main;

    if (temp > 30 && condition === 'Clear') {
      return 'Kegiatan Outdoor dapat dilaksanakan!';
    } else if (condition === 'Rain' || condition === 'Thunderstorm') {
      return 'Kegiatan Outdoor ditunda!';
    }
    return 'Periksa cuaca lebih lanjut.';
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 p-8 rounded-xl shadow-xl transform transition-all hover:scale-105">
      <h2 className="text-3xl text-white font-extrabold mb-6 text-center shadow-lg transform transition-all hover:scale-105">
        Prakiraan Cuaca
      </h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Masukkan nama kota"
        className="p-3 text-xl w-full rounded-lg mb-4 text-gray-800"
      />
      <button
        onClick={() => fetchWeather()}
        className="bg-blue-600 text-white px-6 py-2 rounded-full w-full mt-2"
      >
        Cari Kota
      </button>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 bg-opacity-90 bg-white p-6 rounded-lg shadow-xl">
          <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
            Cuaca Saat Ini di {weather.name}
          </h1>
          <div className="flex justify-center items-center mb-4">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="w-24 h-24"
            />
            <div className="ml-4">
              <p className="text-5xl font-semibold text-blue-700">{Math.round(weather.main.temp)}°C</p>
              <p className="text-xl text-gray-600 italic">{weather.weather[0].description}</p>
            </div>
          </div>

          <p className="mt-6 text-lg text-blue-800 bg-opacity-80 bg-white p-4 rounded-lg shadow-lg">
            {decision()}
          </p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Prakiraan Cuaca Yang Akan Datang:</h2>
          <div className="grid grid-cols-2 gap-4">
            {forecast.map((hour, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md"
              >
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  className="w-12 h-12"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold">
                    {new Date(hour.dt * 1000).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-gray-600">{Math.round(hour.main.temp)}°C</p>
                  <p className="text-sm text-gray-500 italic">{hour.weather[0].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
