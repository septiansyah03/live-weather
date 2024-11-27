import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMap = ({ lat, lon }) => {
  if (!lat || !lon) {
    return <p>Location coordinates are not available.</p>;
  }

  return (
    <div className="flex justify-center items-center mt-6 px-4">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg overflow-hidden border-2 border-gray-300 max-w-4xl w-full transform transition duration-300 hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-center py-3">
          <h2 className="text-white text-3xl font-extrabold drop-shadow-md">
            Lokasi Saat Ini
          </h2>
          <p className="text-white text-opacity-80 mt-1 text-sm">
            Peta interaktif lokasi sekolah
          </p>
        </div>

        {/* Map Section */}
        <MapContainer
          center={[lat, lon]}
          zoom={15} 
          style={{ height: '600px', width: '100%' }}
          className="rounded-b-xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[lat, lon]}>
            <Popup>
              <span className="font-semibold text-blue-600">
                Lokasi Sekolah
              </span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap;
