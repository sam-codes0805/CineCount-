import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full" />

      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-6 z-10">
        CINECOUNT<span className="text-red-600">.</span>IN
      </h1>
      
      <p className="max-w-xl text-zinc-500 text-lg md:text-xl mb-10 leading-relaxed z-10">
        Your gateway to the ultimate cinematic experience. Discover, book, and enjoy the latest blockbusters in premium comfort.
      </p>

      <button 
        onClick={() => navigate('/movies')}
        className="z-10 hover:cursor-pointer group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300"
      >
        Explore Movies
        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

export default Landing;