import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Shuffle from './Shuffle';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 text-white mix-blend-difference">
      {/* Left: Brand */}
      <Link to="/" className="text-xl font-bold tracking-widest uppercase z-50">
        <Shuffle
          text="RHYTHM RUN CLUB"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          ease="power3.out"
          stagger={0.03}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={true}
        />
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden z-50 text-white mix-blend-difference"
        onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      <div id="mobile-menu" className="hidden fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-bold">
        <Link to="/" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')}>HOME</Link>
        <Link to="/about" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')}>ABOUT</Link>
        <Link to="/events" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')}>EVENTS</Link>
        <Link to="/activity" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')}>ACTIVITY</Link>
        {user ? (
          <button onClick={() => { logout(); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-red-500">LOGOUT</button>
        ) : (
          <Link to="/login" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="text-orange-500">LOGIN</Link>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-wider">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          <Shuffle
            text="HOME"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
          />
        </Link>
        <Link to="/about" className="hover:text-gray-300 transition-colors">
          <Shuffle
            text="ABOUT"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
          />
        </Link>
        <Link to="/events" className="hover:text-gray-300 transition-colors">
          <Shuffle
            text="EVENTS"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
          />
        </Link>
        <Link to="/activity" className="hover:text-gray-300 transition-colors">
          <Shuffle
            text="ACTIVITY"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
          />
        </Link>
      </div>

      {/* Right: Login/User (Desktop) */}
      {user ? (
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm font-bold">{user.displayName}</span>
          <button
            onClick={logout}
            className="border border-white/40 px-6 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all"
          >
            LOGOUT
          </button>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-white/50"
            />
          )}
        </div>
      ) : (
        <Link to="/login" className="hidden md:block border border-white/40 px-6 py-2 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all">
          LOGIN
        </Link>
      )}
    </nav>
  );
  );
}
