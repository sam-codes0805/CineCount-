import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans">
        <nav className="p-6 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-2xl font-bold text-red-600">CineCount</h1>
          <div className="space-x-6 text-sm font-medium">
            <button className="hover:text-red-500">Movies</button>
            <button className="bg-red-600 px-4 py-2 rounded-lg">Sign In</button>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;