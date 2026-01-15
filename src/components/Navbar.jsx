import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Shuffle from './Shuffle';

export default function Navbar() {
  const [user, setUser] = useState(null);

  const LINKS = [
    { name: 'ABOUT', path: '/about' },
    { name: 'EVENTS', path: '/events' },
    { name: 'GALLERY', path: '/activity' },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-white z-50 mix-blend-difference flex items-center">
          <Shuffle
            text="RHYTHM"
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
          <span className="text-orange-500 inline-block ml-1">
            <Shuffle
              text="RC"
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
          </span>
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
          {LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => document.getElementById('mobile-menu').classList.add('hidden')}
            >
              {link.name}
            </Link>
          ))}

          {user && (
            <button onClick={() => { logout(); document.getElementById('mobile-menu').classList.add('hidden'); }} className="text-red-500">LOGOUT</button>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-sm font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors">
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
          {LINKS.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              <Shuffle
                text={link.name}
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
          ))}

          {/* Login Link (Restored) */}
          {!user && (
            <Link
              to="/login"
              className="text-sm font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              LOGIN
            </Link>
          )}



          {/* Right: User (Desktop) - Logout if logged in */}
          {user && (
            <div className="hidden md:flex items-center gap-4 ml-4">
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
          )}
        </div>
      </div>
    </nav>
  );
}
