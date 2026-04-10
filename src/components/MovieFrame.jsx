import { X, Sparkles, ShieldAlert, Play, Star } from 'lucide-react';
import React, {useState} from 'react';


const MovieFrame = ({ movie, onClose }) => {
    const [aiData, setAiData] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateAIDescription = () => {
        setIsGenerating(true);

        setTimeout(() => {
            setAiData({
                description: `Based on current trends, "${movie.title}" is a must-watch for fans of ${movie.genre}. The film explores deep themes of ${movie.category === 'new-release' ? 'innovation and discovery' : 'human emotion'}, featuring a standout performance by the lead cast.`,
                advisory: "Parental Guidance: Recommended for ages 13+. Contains mild language and intense sequences."
            });
            setIsGenerating(false);
        }, 1500);
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full max-w-4xl rounded-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 bg-black/50 p-2 rounded-full"><X /></button>
        
        {/* 1. Watch Trailer Section */}
        <div className="aspect-video w-full bg-black">
          <iframe 
            className="w-full h-full"
            src={movie.trailerURL.replace("watch?v=", "embed/")}
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
          {aiData ? (
            <div className="mt-6 p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-2 text-amber-300 mb-2">
                <Sparkles size={18} />
                <span className="text-xs font-black uppercase tracking-widest">AI Generated Insight</span>
              </div>
              <p className="text-gray-300 text-sm italic leading-relaxed">"{aiData.description}"</p>
              
              <div className="mt-4 flex items-start gap-2 text-orange-400">
                <ShieldAlert size={16} className="mt-0.5" />
                <p className="text-[11px] font-bold uppercase tracking-tight">{aiData.advisory}</p>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-zinc-400 leading-relaxed line-clamp-3">{movie.description}</p>
          )}

          {/* 3. Buttons */}
          <div className="mt-8 flex gap-4">
            <button 
              onClick={generateAIDescription}
              disabled={isGenerating}
              className="flex-3 border border-zinc-700 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <span className="animate-pulse">Analyzing Movie...</span>
              ) : (
                <div className=""><Sparkles className="inline mb-0.5 mr-1 text-amber-300 size-4"/>Brief Description (AI)</div>
              )}
            </button>
            <button className="flex-2 bg-red-600 py-3 text-xl rounded-xl font-bold hover:bg-red-700 transition">
              Book Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieFrame;