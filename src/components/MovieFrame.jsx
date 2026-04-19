import { X, Sparkles, Play, Star, BookOpen, ShieldAlert, Heart, Loader2 } from 'lucide-react';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovieBrief } from '../gemini';

const MovieFrame = ({ movie, onClose }) => {
    const [briefData, setBriefData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
      setLoading(true);
      const rawText = await getMovieBrief(movie.title, movie.description, movie.releaseDate);
      
      // Basic parsing: split the text into sections based on your prompt's headers
      const sections = rawText.split(/\d\./); 
      setBriefData({
        story: sections[1] || "No data",
        guidance: sections[2] || "No data",
        recommendation: sections[3] || "No data"
      });
      setLoading(false);
    };


    const navigate = useNavigate();
    const handleBooking = () => {
        navigate(`/booking/${movie.id}`);
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full max-w-4xl rounded-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 bg-black/50 p-2 rounded-full"><X /></button>
        
        {/* 1. Watch Trailer Section */}
        <div className="aspect-video w-full bg-black">
          <iframe 
            className="w-full h-full"
            src={movie.trailer.replace("watch?v=", "embed/")}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-8">
          {/* 2. Title and Details */}
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <p className="text-md mt-1.5 text-gray-200">{movie.genre} | {movie.rating} <Star className="inline size-4 mb-0.5 text-yellow-400" /></p>
          <p className="text-gray-400 text-sm mt-1">{movie.ageRating} • {movie.duration}</p>
          <p className="text-gray-400 text-sm mt-2">Language - {movie.language}</p>


         {/* 4. AI Section (Hidden until button clicked) */}
          {briefData && briefData.story !== "No data" ? (
            <div className="grid my-5 gap-4 animate-in fade-in slide-in-from-bottom-4">
        {/* Storyline */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-red-500 mb-2 font-bold text-xs uppercase tracking-tighter">
            <BookOpen size={14}/> Storyline & Motive
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{briefData.story}</p>
        </div>

        {/* Guidance */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-orange-500 mb-2 font-bold text-xs uppercase tracking-tighter">
            <ShieldAlert size={14}/> Parental Guidance
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{briefData.guidance}</p>
        </div>

        {/* Recommendation */}
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-blue-500 mb-2 font-bold text-xs uppercase tracking-tighter">
            <Heart size={14}/> Recommended For
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{briefData.recommendation}</p>
        </div>
      </div>
          ) : (
            <p className="mt-6 text-zinc-400 leading-relaxed line-clamp-3">{movie.description}</p>
          )}

          <p className="text-gray-400 text-sm mt-2">Release Date: {movie.releaseDate}</p>

          {/* 3. Buttons */}
          <div className="mt-8 flex gap-4">
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="flex-3 border border-zinc-700 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate AI Insights"}
            </button>
            <button className="flex-2 cursor-pointer bg-red-600 py-3 text-xl rounded-xl font-bold hover:bg-red-700 transition"
                    disabled={movie.category === "upcoming"}
                    onClick={handleBooking}>
              {movie.category === "upcoming" ? "Coming Soon" : "Book Now"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieFrame;


// <div className="mt-8 space-y-6">
//     <button 
//       onClick={handleGenerate} 
//       className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2"
//     >
//       {loading ? <Loader2 className="animate-spin" /> : "Generate AI Insights"}
//     </button>

//     {briefData && (
//       <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4">
//         {/* Storyline */}
//         <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
//           <div className="flex items-center gap-2 text-red-500 mb-2 font-bold text-xs uppercase tracking-tighter">
//             <BookOpen size={14}/> Storyline & Motive
//           </div>
//           <p className="text-zinc-300 text-sm leading-relaxed">{briefData.story}</p>
//         </div>

//         {/* Guidance */}
//         <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
//           <div className="flex items-center gap-2 text-orange-500 mb-2 font-bold text-xs uppercase tracking-tighter">
//             <ShieldAlert size={14}/> Parental Guidance
//           </div>
//           <p className="text-zinc-300 text-sm leading-relaxed">{briefData.guidance}</p>
//         </div>

//         {/* Recommendation */}
//         <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
//           <div className="flex items-center gap-2 text-blue-500 mb-2 font-bold text-xs uppercase tracking-tighter">
//             <Heart size={14}/> Recommended For
//           </div>
//           <p className="text-zinc-300 text-sm leading-relaxed">{briefData.recommendation}</p>
//         </div>
//       </div>
//     )}
//   </div>
