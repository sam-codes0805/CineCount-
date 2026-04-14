import React, { useEffect, useState } from 'react';
import {db} from '../firebase.js';
import MovieFrame from '../components/MovieFrame';
import MovieCard from '../components/MovieCard';
import { collection, onSnapshot } from 'firebase/firestore';

const Home = (props) => {

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


  const getCategory = (releaseDate) => {
    const today = new Date();
    const rDate = new Date(releaseDate);
    const diffInDays = (today - rDate) / (1000 * 60 * 60 * 24); // Difference in days

    if (today < rDate) return "upcoming";
    if (diffInDays >= 0 && diffInDays < 10) return "new-release";
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

    <section className="relative h-[85vh] w-full overflow-hidden">
    {movieData.filter(m => m.category === "new-release").slice(0, 1).map((movie) => (
        <div key={movie.id} className="relative h-full w-full">
        <img 
            src={movie.imageURL} 
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-center px-6 lg:px-16 max-w-3xl">
            <span className="bg-red-600 w-fit text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Now Showing
            </span>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase leading-none">
            {movie.title}
            </h1>
            <p className="text-gray-300 mt-6 text-lg line-clamp-3 font-medium">
            {movie.description}
            </p>
            
            <div className="flex gap-4 mt-8">
            <button 
                onClick={() => setSelectedMovie(movie)}
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2"
            >
                View Details
            </button>
            <button 
                onClick={() => setSelectedMovie(movie)}
                className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/30 transition">
                Watch Trailer
            </button>
            </div>
        </div>
        </div>
    ))}
    </section>


    

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