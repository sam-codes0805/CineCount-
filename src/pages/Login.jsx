import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // If successful, go to Admin
    } catch (err) {
      setError("Invalid Credentials. Access Denied.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem]">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-600/10 p-4 rounded-full mb-4">
            <Lock className="text-red-600" size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Admin Access</h1>
          <p className="text-zinc-500 text-sm">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Admin Email" 
            className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl text-white outline-none focus:border-red-600 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl text-white outline-none focus:border-red-600 transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-red-500 text-xs font-bold text-center uppercase tracking-widest">{error}</p>}

          <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;