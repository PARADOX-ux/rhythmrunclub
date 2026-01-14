import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const playlist = [
    { title: "Run Boy Run", artist: "Woodkid", duration: "3:33" },
    { title: "Midnight City", artist: "M83", duration: "4:03" },
    { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
    { title: "Dog Days Are Over", artist: "Florence + The Machine", duration: "4:12" }
];

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={playerRef}>
            {/* Player Content */}
            <div
                ref={contentRef}
                className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl w-72 overflow-hidden mb-4 opacity-0 h-0 shadow-2xl"
            >
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-white font-bold text-sm tracking-wider">RHYTHM RADIO 🎵</h3>
                    <span className="text-xs text-green-400 animate-pulse">LIVE</span>
                </div>
                <div className="p-2">
                    {playlist.map((track, index) => (
                        <div key={index} className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500 group-hover:text-orange-500">{index + 1}</span>
                                <div>
                                    <p className="text-sm text-white font-medium">{track.title}</p>
                                    <p className="text-xs text-gray-400">{track.artist}</p>
                                </div>
                            </div>
                            <span className="text-xs text-gray-600">{track.duration}</span>
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-white/5 border-t border-white/10 text-center">
                    <a
                        href="https://open.spotify.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-orange-400 hover:text-orange-300 font-bold tracking-wide"
                    >
                        LISTEN ON SPOTIFY ↗
                    </a>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-white/10 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-black text-white hover:scale-110'}`}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                )}
            </button>
        </div>
    );
}
