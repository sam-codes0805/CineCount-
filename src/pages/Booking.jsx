import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import Cities from '../cities-name-list.json';

const Booking = () => {
  const uniqueCities = [...new Set(Cities)];
  const { id } = useParams(); // Gets the movie ID from the URL
  
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const locations = ["Inox: PVR Mall", "Cinepolis: City Center", "Carnival: Downtown"];
  const timings = ["10:30 AM", "01:45 PM", "05:00 PM", "09:30 PM"];



  const [selectedSeats, setSelectedSeats] = useState([]);

// 1. Define the Theater Map (Rows & Seat Counts)
    const rows = [
      { id: 'A', type: 'VIP', price: 150, count: 12 },
      { id: 'B', type: 'VIP', price: 150, count: 8 },
      { id: 'C', type: 'Standard', price: 250, count: 10 },
      { id: 'D', type: 'Standard', price: 250, count: 10 },
      { id: 'E', type: 'Standard', price: 250, count: 10 },
      { id: 'F', type: 'Standard', price: 250, count: 10 },
      { id: 'G', type: 'Economy', price: 500, count: 12 },
    ];

    const toggleSeat = (rowId, seatNum) => {
      const seatId = `${rowId}${seatNum}`;
      if (selectedSeats.includes(seatId)) {
        setSelectedSeats(selectedSeats.filter(s => s !== seatId));
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    };

    const [showSeatSelection, setShowSeatSelection] = useState(false);




    // 1. Logic: Calculate Total Price
    const calculateTotal = () => {
      let total = 0;
      selectedSeats.forEach(seatId => {
        const rowId = seatId.charAt(0); // Gets 'A', 'B', etc.
        const rowData = rows.find(r => r.id === rowId);
        total += rowData ? rowData.price : 0;
      });
      return total;
    };

    // 2. Logic: Internet Handling Fee (to look like a real app)
    const fee = selectedSeats.length > 0 ? 30 : 0;
    const finalAmount = calculateTotal() + fee;

    const [isConfirmed, setIsConfirmed] = useState(false);

    if (isConfirmed) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24 bg-black">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2rem] max-w-sm w-full relative overflow-hidden">
        {/* Ticket Header */}
        <div className="text-center mb-6">
          <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <svg className="text-black w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Booking Confirmed</h2>
          <p className="text-zinc-500 text-sm">Enjoy your movie!</p>
        </div>

        {/* Ticket Details */}
        <div className="space-y-4 border-y border-dashed border-zinc-800 py-6 my-6">
          <div className="flex justify-between">
            <span className="text-zinc-500 text-xs font-bold uppercase">Cinema</span>
            <span className="text-white text-xs font-bold">{selectedLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500 text-xs font-bold uppercase">Seats</span>
            <span className="text-red-500 text-xs font-bold">{selectedSeats.join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500 text-xs font-bold uppercase">Time</span>
            <span className="text-white text-xs font-bold">{selectedTime}</span>
          </div>
        </div>

        {/* Fake QR Code Area */}
        <div className="bg-white p-4 rounded-xl aspect-square flex items-center justify-center mb-6">
           {/* You can use a real QR library later, for now a placeholder */}
           <div className="w-full h-full border-4 border-black border-double flex items-center justify-center">
              <span className="text-black font-black text-center text-[8px] uppercase leading-none">
                Scan at Theatre Entry<br/>CINECOUNT-IN-OFFICIAL
              </span>
           </div>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="w-full py-4 bg-zinc-800 rounded-xl font-bold text-sm hover:bg-zinc-700 transition"
        >
          BACK TO HOME
        </button>

        {/* Decorative Ticket "Cuts" */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
}


  return (
    <div className="min-h-screen h-full pt-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Select Location & Time</h1>

      {/* 0. City Selection */}
      <div className="grid gap-4 mb-10">
        <label className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-xs tracking-widest">
          <MapPin size={16} /> Choose City
        </label>
        <div className="flex flex-wrap gap-4">
          <select className='rounded-xl border-2 px-6 w-full py-3 bg-black' name="" defaultValue="" id="" onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select a city</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. Location Selection */}
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
      {/* 2. Timing Selection */}
      <div className="grid gap-4 mb-10">
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
      </div>

      {/* Next Step Button */}
        <button 
          disabled={!(selectedLocation && selectedTime && selectedCity)}
          className="w-full bg-red-600 py-4 rounded-2xl font-black text-lg animate-bounce"
          onClick= {() => setShowSeatSelection(true)}>
          {!(selectedLocation && selectedTime && selectedCity) ? 'Select all options to proceed' : 'CONTINUE TO SEAT SELECTION'}
        </button>


      {showSeatSelection && <div className="mt-12 mb-20">
        {/* THE SCREEN */}
        <div className="w-full flex flex-col items-center mb-16">
          <div className="w-3/4 h-1 bg-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full mb-2" />
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.5em]">All eyes this way</p>
        </div>

        {/* SEAT GRID */}
      <div className='w-full overflow-x-auto pb-6 cursor-grab active:cursor-grabbing'>
        <div className="flex flex-col gap-6 items-center">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center gap-4">
              <span className="text-zinc-600 font-bold w-4">{row.id}</span>
              <div className="flex gap-2">
                {[...Array(row.count)].map((_, i) => {
                  const seatNum = i + 1;
                  const isSelected = selectedSeats.includes(`${row.id}${seatNum}`);
                  
                  return (
                    <button
                      key={seatNum}
                      onClick={() => toggleSeat(row.id, seatNum)}
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-t-lg border-2 text-[10px] font-bold transition-all
                        ${isSelected 
                          ? 'bg-red-600 border-red-600 text-white scale-110 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                          : 'border-zinc-800 text-zinc-500 hover:border-zinc-500'}`}
                    >
                      {seatNum}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div> 

          
      {/* 1. THE LEGEND (Fills the white space) */}
          <div className="flex justify-center gap-8 mt-12 pb-32 border-t border-zinc-900 pt-10">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-zinc-800" />
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-zinc-800" />
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Occupied</span>
            </div>
          </div>

      



      


    {selectedSeats.length > 0 ? (
      <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 p-6 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          
          <div>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
              {selectedSeats.length} Ticket(s) • {selectedSeats.join(', ')}
            </p>
            <h2 className="text-2xl font-black text-white">
              ₹{finalAmount} 
              <span className="text-xs text-zinc-500 ml-2 font-normal">(Incl. fees)</span>
            </h2>
          </div>

          <button 
            className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            onClick={() => setIsConfirmed(true)}
          >
            PAY NOW
          </button>

        </div>
      </div>) : (
        <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-800 p-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest"> No seats selected</p>
            <button 
              disabled
              className="bg-red-600/50 text-white px-10 py-4 rounded-2xl font-black cursor-not-allowed"
            >
              PAY NOW 
            </button>
          </div>
        </div>
      )}

      </div>  }
      
    </div>
  );
};

export default Booking;