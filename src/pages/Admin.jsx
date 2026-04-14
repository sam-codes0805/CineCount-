import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {signOut } from 'firebase/auth';

const Admin = () => {


  const navigate = useNavigate();

  useEffect(() => {
    // This listener checks if a user is currently signed in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is logged in, redirect to login page immediately
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);


  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate('/login'); // Redirect back to login after signing out
  } catch (err) {
    console.error("Error signing out:", err);
  }
  };
  

    const [mode, setMode] = useState('add');  //add, edit, remove
    const [status, setStatus] = useState('idle'); // idle, success
    const [searchTitle, setSearchTitle] = useState(''); // name of the movie to search for edit or remove
    const [movie, setMovie] = useState({  // movie object to add/edit
        title: '', 
        imageURL: '', 
        description: '', 
        trailerURL: '', 
        genre: '', 
        ageRating: '', 
        category: 'new-release', 
        duration: '',
        rating: '',
        language: '',
        releaseDate: ''
    }); 

    const handleSearch = async () => {
        const q = query(collection(db, "movies"), where("title", "==", searchTitle));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0];
        setMovie({ ...docData.data(), id: docData.id });
        } else {
        alert("Movie not found!");
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === 'add') {
                await addDoc(collection(db, "movies"), movie);
                alert('Movie added successfully!');
                setMovie({ title: '', imageURL: '', description: '', trailer: '', genre: '', ageRating: '', category: '', duration: '', rating: '', language: '', releaseDate: '' });
            } else if (mode === 'edit') {
                await updateDoc(doc(db, "movies", movie.id), movie);
                alert('Movie updated successfully!');
            }
            setStatus('success');
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure?")) {
        await deleteDoc(doc(db, "movies", id));
        setStatus('success');
        }
    };

    const resetForm = () => {
        setMovie({ title: '', image: '', trailer: '', description: '', ageRating: '', genre: '', releaseDate: '' });
        setSearchTitle('');
        setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-3xl font-bold text-green-500">Action Successful!</h2>
        <button onClick={resetForm} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold">
          <RefreshCw size={20} /> {mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : 'Remove'} Next Movie
        </button>
      </div>
    );
  }

    return (
    <div className="p-10 max-w-4xl mx-auto">
        
      {/* // add, edit, remove buttons */}
        <div className="flex gap-4 mb-10 justify-center">
          {['add', 'edit', 'remove'].map(m => (
            <button 
              key={m}
              onClick={() => { setMode(m); resetForm(); }}
              className={`flex items-center gap-2 px-6 py-2 rounded-full capitalize font-bold transition ${mode === m ? 'bg-red-600' : 'bg-zinc-800'}`}
            >
              {m === 'add' && <Plus size={18}/>}
              {m === 'edit' && <Edit size={18}/>}
              {m === 'remove' && <Trash2 size={18}/>}
              {m}
            </button>
          ))}
        </div>

      {/* // Search Bar */}
      {(mode === 'edit' || mode === 'remove') && (
        <div className="mb-8 flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Movie Title Exactly..." 
            className="flex-1 p-4 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-red-600"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button onClick={handleSearch} className="bg-white text-black px-6 rounded-xl font-bold">Find Movie</button>
        </div>
      )}

      {/* Form for add/edit */}
      {mode !== 'remove' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-white">

          
            <input type="text" required placeholder="Title" className="p-3 rounded" value={movie.title} onChange={(e) => setMovie({...movie, title: e.target.value})} />
            <input type="text" required placeholder="Poster Image URL" className="p-3 rounded" value={movie.imageURL} onChange={(e) => setMovie({...movie, imageURL: e.target.value})} />
            <input type="text" required placeholder="Trailer Embed URL" className="p-3 rounded" value={movie.trailer} onChange={(e) => setMovie({...movie, trailer: e.target.value})} />
        
            <textarea required placeholder="Description" className="p-3 rounded" value={movie.description} onChange={(e) => setMovie({...movie, description: e.target.value})} />

            <div className="flex gap-4">
                <input type="text" required placeholder="UA / A" className="p-3 rounded flex-1" value={movie.ageRating} onChange={(e) => setMovie({...movie, ageRating: e.target.value})} />
                <input type="text" required placeholder="Genre" className="p-3 rounded flex-1" value={movie.genre} onChange={(e) => setMovie({...movie, genre: e.target.value})} />
            </div>

            <div className="flex gap-4">
                <input type="text" required placeholder="Duration" className="p-3 rounded flex-1" value={movie.duration} onChange={(e) => setMovie({...movie, duration: e.target.value})} />
                <input type="text" required placeholder="Rating" className="p-3 rounded flex-1" value={movie.rating} onChange={(e) => setMovie({...movie, rating: e.target.value})} />
            </div>

            <input type="text" required placeholder="Language" className="p-3 rounded" value={movie.language} onChange={(e) => setMovie({...movie, language: e.target.value})} />

            <div className="flex gap-4">  
            <span className='p-3 flex-1 rounded'>Release Date: </span><input type="date" required placeholder="Release Date" className="flex-2 p-3 text-gray-400 bg-gray-900 ml-5" value={movie.releaseDate} onChange={(e) => setMovie({...movie, releaseDate: e.target.value})} />
            </div>

            <select required className="p-3 rounded bg-gray-900" value={movie.category} onChange={(e) => setMovie({...movie, category: e.target.value})}>
            <option value="showcase">Showcase</option>
            <option value="new-release">New Release</option>
            <option value="in-theaters">In Theaters</option>
            <option value="upcoming">Upcoming</option>
            </select>
          


          <button type="submit" className="col-span-2 bg-red-600 text-white p-4 rounded-xl font-bold mt-4 uppercase tracking-widest hover:bg-red-700">
            {mode === 'add' ? 'Publish Movie' : 'Update Movie Info'}
          </button>
        </form>
      ) 
      // Delete Confirmation
      : (
        movie.id && (
          <div className="bg-zinc-900 p-6 rounded-2xl border border-red-900/30 flex justify-between items-center">
             <div>
               <h3 className="text-xl font-bold">{movie.title}</h3>
               <p className="text-zinc-500">Release Date: {movie.releaseDate}</p>
             </div>
             <button onClick={() => handleDelete(movie.id)} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Confirm Delete</button>
          </div>
        )
      )}
    </div>
  );
};

export default Admin;