const MovieCard = ({ movie, onOpen }) => {

  return (
    <div 
      onClick={onOpen}
      // FIXED: Added 'w-[160px]' and 'md:w-[220px]' to lock the width
      // Removed 'min-w' which was allowing it to grow too much
      className="w-[160px] md:w-[220px] shrink-0 cursor-pointer group transition-all duration-300 hover:scale-105"
    >
      {/* Image Container */}
      <div className="aspect-2/3 w-full rounded-xl overflow-hidden bg-zinc-800 shadow-lg">
        <img 
          src={movie.imageURL} 
          alt={movie.title}
          // 'object-cover' ensures the image fills the 2/3 box without stretching
          className="w-full h-full object-cover group-hover:opacity-80 transition"
        />
      </div>

      {/* Movie Info Section */}
      <div className="mt-3 px-1">
        <h3 className="font-bold text-sm md:text-base line-clamp-1 group-hover:text-red-500 transition">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-1 text-xs font-medium text-gray-400">
          <span className="border border-gray-600 px-1.5 py-0.5 rounded text-[10px] text-gray-300">
            {movie.ageRating}
          </span>
          <span>•</span>
          <span className="truncate">
            {movie.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;