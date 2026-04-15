import React, { useEffect, useState } from 'react';
import {db} from '../firebase.js';
import MovieFrame from '../components/MovieFrame';
import MovieCard from '../components/MovieCard';
import { collection, onSnapshot } from 'firebase/firestore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const navigate = useNavigate();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'movies'), (snapshot) => {
      const moviesFromCloud = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMovieData(moviesFromCloud);
    });
    return () => unsubscribe();
  }, []);

  const [current, setCurrent] = useState(0);
  const showcaseMovies = movieData.filter(m => m.category === "showcase");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === showcaseMovies.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [showcaseMovies.length]);

  if (showcaseMovies.length === 0) return null;

  const nextSlide = () => setCurrent(current === showcaseMovies.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? showcaseMovies.length - 1 : current - 1);

  const getCategory = (releaseDate) => {
    const today = new Date();
    const rDate = new Date(releaseDate);
    const diffInDays = (today - rDate) / (1000 * 60 * 60 * 24); // Difference in days

    if (today < rDate) return "upcoming";
    if (diffInDays >= 0 && diffInDays < 15) return "new-release";
    return "in-theaters";
  };

  
  const renderSection = (title, categoryName) => {
    const filteredMovies = movieData.filter(movie => movie.title.includes(props.searchTerm) && getCategory(movie.releaseDate) === categoryName);
   
    return (
      <section className="py-8 px-6 lg:px-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-200">{title}</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onOpen={() => setSelectedMovie(movie)} 
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="pb-20">

    <div className="relative h-[65vh] w-full overflow-hidden rounded-[2.5rem] bg-zinc-900 group">
      {showcaseMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Movie Banner Image */}
          <img 
            src={movie.imageURL} 
            alt={movie.title}
            className="w-full h-full object-cover scale-105"
          />
          
          {/* Cinematic Overlay (Darkens bottom and left for text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Text Content */}
          <div className="absolute bottom-12 left-8 md:left-16 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
            <span className="bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4 inline-block">
              Now Showing
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter mb-4 leading-none">
              {movie.title}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base line-clamp-2 mb-6 max-w-lg">
              {movie.description}
            </p>
            <button 
  onClick={(e) => {
    e.stopPropagation(); // Prevents the click from bubbling to the slide
    navigate(`/booking/${movie.id}`);
  }} 
  className="relative z-30 bg-white text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 cursor-pointer"
>
  Get Tickets
</button>
          </div>
        </div>
      ))}

      {/* Manual Navigation Arrows (Visible on Hover) */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition">
        <ChevronRight size={24} />
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-6 right-12 flex gap-3">
        {showcaseMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-300 rounded-full ${
              i === current ? "w-8 bg-red-600" : "w-3 bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </div>

      {/* 2, 3, 4. The Categorized Sections */}
      {renderSection("New Releases", "new-release")}
      {renderSection("Now in Theaters", "in-theaters")}
      {renderSection("Coming Soon", "upcoming")}

      {/* 5. The Popup Modal */}
      {/* Logic: If selectedMovie is NOT null, show the MovieFrame */}
      {selectedMovie && (
        <MovieFrame 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default Home;