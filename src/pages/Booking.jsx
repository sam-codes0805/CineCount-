import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import Cities from '../cities-name-list.json';

const Booking = () => {
  console.log(Cities);
  
  const { id } = useParams(); // Gets the movie ID from the URL
  
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const locations = ["Inox: PVR Mall", "Cinepolis: City Center", "Carnival: Downtown"];
  const timings = ["10:30 AM", "01:45 PM", "05:00 PM", "09:30 PM"];

  return (
    <div className="min-h-screen pt-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Select Location & Time</h1>

      {/* 0. City Selection */}
      <div className="grid gap-4 mb-10">
        <label className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
          <MapPin size={16} /> Choose City
        </label>
        <div className="flex flex-wrap gap-4">
          <select className='rounded-xl border-2 px-6 py-3 bg-black' name="" defaultValue="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select a city</option>
            {Cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Location Selection */}
      {selectedCity !== "" && (
        <div className="grid gap-4 mb-10">
          <label className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
            <MapPin size={16} /> Choose Cinema
          </label>
          <div className="flex flex-wrap gap-4">
            {locations.map(loc => (
              <button 
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-6 py-3 rounded-xl border-2 transition ${selectedLocation === loc ? 'border-red-600 bg-red-600/10' : 'border-zinc-800'}`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Timing Selection */}
      {selectedLocation !== "" && (<div className="grid gap-4 mb-10">
        <label className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
          <Clock size={16} /> Select Session
        </label>
        <div className="flex flex-wrap gap-4">
          {timings.map(time => (
            <button 
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-6 py-3 rounded-xl border-2 transition ${selectedTime === time ? 'border-red-600 bg-red-600/10' : 'border-zinc-800'}`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>)}

      {/* Next Step Button */}
      {selectedLocation && selectedTime && (
        <button className="w-full bg-red-600 py-4 rounded-2xl font-black text-lg animate-bounce">
          CONTINUE TO SEAT SELECTION
        </button>
      )}
      
    </div>
  );
};

export default Booking;