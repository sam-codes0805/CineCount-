import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar setSearchTerm={setSearchTerm} />
        
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/movies" element={<Home searchTerm={searchTerm} />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;