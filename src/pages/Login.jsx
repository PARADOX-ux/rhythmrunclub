import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/activity');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
            {/* PARTICLES BACKGROUND */}
            <ParticlesBackground />

            {/* LOGIN CARD */}
            <div className="relative z-10 w-full max-w-md p-8 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl animate-fade-in-up">
                <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-widest">MEMBER LOGIN</h2>
                <div className="space-y-4">
                    <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 p-4 rounded text-white focus:border-purple-500 outline-none transition-colors" />
                    <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 p-4 rounded text-white focus:border-purple-500 outline-none transition-colors" />
                    <button className="w-full bg-[#5227FF] text-white font-bold py-4 rounded hover:bg-purple-600 transition-all uppercase tracking-wider">
                        Enter The Flow
                    </button>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-white text-black font-bold py-4 rounded hover:bg-gray-200 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
