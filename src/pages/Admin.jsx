import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Admin = () => {
    const [movie, setMovie] = useState({
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'movies'), movie);
            alert('Movie added successfully!');
            setMovie({ title: '', imageURL: '', description: '', trailerURL: '', genre: '', ageRating: '', category: 'new-release', duration: '', rating: '', language: '', releaseDate: '' });
        } catch (err) {
            console.error('Error adding movie: ', err);
            alert('Failed to add movie. Please try again.');
        }
    };

    return (
        <div className="p-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Movie</h1>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
            <input type="text" placeholder="Title" className="p-3 rounded" onChange={(e) => setMovie({...movie, title: e.target.value})} />
            <input type="text" placeholder="Poster Image URL" className="p-3 rounded" onChange={(e) => setMovie({...movie, image: e.target.value})} />
            <input type="text" placeholder="Trailer Embed URL" className="p-3 rounded" onChange={(e) => setMovie({...movie, trailer: e.target.value})} />
            <textarea placeholder="Description" className="p-3 rounded" onChange={(e) => setMovie({...movie, description: e.target.value})} />
            <div className="flex gap-4">
                <input type="text" placeholder="UA / A" className="p-3 rounded flex-1" onChange={(e) => setMovie({...movie, ageRating: e.target.value})} />
                <input type="text" placeholder="Genre" className="p-3 rounded flex-1" onChange={(e) => setMovie({...movie, genre: e.target.value})} />
            </div>
            <select className="p-3 rounded" onChange={(e) => setMovie({...movie, category: e.target.value})}>
            <option value="showcase">Showcase</option>
            <option value="new-release">New Release</option>
            <option value="in-theaters">In Theaters</option>
            <option value="upcoming">Upcoming</option>
            </select>
            <button type="submit" className="bg-red-600 text-white p-3 rounded font-bold hover:bg-red-700">Upload to Database</button>
          </form>
        </div>
    );
};

export default Admin;
