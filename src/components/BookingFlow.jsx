import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, CreditCard } from 'lucide-react';
import emailjs from '@emailjs/browser';


const BookingFlow = ({ movie, selectedSeats, totalPrice, location, cinema, time, onComplete }) => {

  const [toEmail, setToEmail] = useState("");

  const sendTicketEmail = (movie, selectedSeats, totalPrice, Location, cinema, time, toEmail) => {
    const templateParams = {
      movie_Title: movie.title,
      seats: selectedSeats.join(", "),
      total_price: totalPrice,
      email: toEmail,
      booking_Id: Math.random().toString(36).substring(2, 10).toUpperCase(), // Random booking ID
      cinema: cinema,
      time: time,
      location: Location
    };

    emailjs.send('service_73scbjp', 'template_gb77oi7', templateParams, 'qHz18SkEukWIj16f5')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
      console.log('FAILED....', err);
    });
  }

  const [step, setStep] = useState('payment'); // payment -> processing -> success

  

  const handlePay = (e) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      sendTicketEmail(movie, selectedSeats, totalPrice, location, cinema, time, toEmail);// This will trigger the email later
    }, 3500);
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto mt-10">
      {/* --- STEP 1: PAYMENT FORM --- */}
      {step === 'payment' && (
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3 mb-6 text-red-600">
            <CreditCard size={20} />
            <h2 className="font-black italic tracking-widest text-xl">PAYMENT</h2>
          </div>
          
          <div className="space-y-4">
            <form action="" onSubmit={(e) => {handlePay(e)}}>
              <input type="text" required placeholder="CARD NUMBER" className="payment-input w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-red-600 transition" />
            <input 
              type="email" 
              required
              placeholder="EMAIL" 
              className="payment-input w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-red-600 transition" 
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" required placeholder="MM/YY" className="payment-input bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-red-600 transition" />
              <input type="text" required placeholder="CVV" className="payment-input bg-black border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-red-600 transition" />
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between text-xs font-bold text-zinc-500 mb-2 px-1">
                <span>TOTAL AMOUNT</span>
                <span className="text-white">₹{totalPrice}</span>
              </div>
              <input type="submit" value="CONFIRM & PAY" className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black tracking-widest transition-all active:scale-95 text-white" />
            </div>
            </form>
            
          </div>
        </div>
      )}

      {/* --- STEP 2: PROCESSING --- */}
      {step === 'processing' && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 className="animate-spin text-red-600 mb-6" size={48} />
          <h2 className="text-2xl font-black italic tracking-tighter">VERIFYING TRANSACTION</h2>
          <p className="text-zinc-500 text-sm mt-2">Please do not refresh the page...</p>
        </div>
      )}

      {/* --- STEP 3: SUCCESS E-TICKET --- */}
      {step === 'success' && (
        <div className="bg-white text-black p-8 rounded-[2.5rem] shadow-2xl animate-in slide-in-from-bottom-12 duration-700">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="text-green-500" size={48} />
          </div>
          
          <div className="text-center border-b-2 border-dashed border-zinc-200 pb-6 mb-6">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Booking Confirmed</h3>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">{movie.title}</h2>
          </div>

          <div className="space-y-4 px-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-zinc-400 uppercase">Cinema</span>
              <span className="font-bold text-sm">{cinema}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-zinc-400 uppercase">Seats</span>
              <span className="font-bold text-sm">{selectedSeats.join(", ")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-zinc-400 uppercase">Showtime</span>
              <span className="font-bold text-sm">{time}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col items-center">
             <div className="w-32 h-32 bg-black rounded-xl mb-4 flex items-center justify-center">
                {/* Visual placeholder for QR */}
                <div className="grid grid-cols-4 gap-1 p-4">
                   {[...Array(16)].map((_, i) => <div key={i} className="w-4 h-4 bg-white/20 rounded-sm"></div>)}
                </div>
             </div>
             <p className="text-[10px] font-black text-zinc-300 uppercase">Scan at Entrance</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlow;