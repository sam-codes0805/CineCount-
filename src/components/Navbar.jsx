import React from 'react';
import { Search } from 'lucide-react'; // Make sure to import the icon

const Navbar = ({ setSearchTerm }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* LOGO */}
        <div className="text-white font-black italic text-2xl tracking-tighter cursor-pointer">
          CINECOUNT<span className="text-red-600">.</span>IN
        </div>

        {/* SEARCH BAR (The New Part) */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search exact movie title..." 
            className="navbar-search" // Custom class for styling
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-6">
        <button className="hover:text-red-500">Movies</button>
        <button className="bg-red-600 px-4 py-2 rounded-lg">Sign In</button>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;








// export default function Navbar({ setSearchTerm }) {
//     return (
//         <nav className="p-6 flex flex-row-1 justify-between items-center border-b border-gray-800">
//           <h1 className="flex-2 text-2xl font-bold text-red-600">CineCount</h1>
//             <input
//               type="text"
//               placeholder="Search movies..."
//               className="flex-4 bg-zinc-800 text-white placeholder:text-gray-500 border border-zinc-700 focus:border-red-600 outline-none"
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           <div className="flex-4 space-x-6 text-sm font-medium">
//             <button className="hover:text-red-500">Movies</button>
//             <button className="bg-red-600 px-4 py-2 rounded-lg">Sign In</button>
//           </div>
//         </nav>
//     )
// }