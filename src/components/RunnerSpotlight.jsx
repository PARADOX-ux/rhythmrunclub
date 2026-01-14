import React from 'react';
import asset1 from '../assets/gallery_run_1.png';
import asset2 from '../assets/gallery_coffee_2.png';
import asset3 from '../assets/gallery_stretch_3.png';

const runners = [
    {
        name: "SARAH K.",
        role: "THE PACER",
        distance: "42km",
        quote: "Joined for the vibes, stayed for the marathon training.",
        image: asset1
    },
    {
        name: "ARJUN M.",
        role: "NIGHT OWL",
        distance: "21km",
        quote: "I used to hate mornings. Now 6AM Sunday is my favorite time.",
        image: asset2
    },
    {
        name: "PRIYA R.",
        role: "TRAIL BLAZER",
        distance: "10km",
        quote: "Started walking 5Ks. Last month I finished my first 10K!",
        image: asset3
    }
];

export default function RunnerSpotlight() {
    return (
        <div className="w-full max-w-6xl py-20 px-4">
            <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase">
                    The Roster
                </h2>
                <p className="text-sm text-gray-400 font-mono hidden md:block">EST. 2024 • BENGALURU</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {runners.map((runner, index) => (
                    <div key={index} className="group relative h-[400px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 cursor-pointer">
                        {/* Image */}
                        <img
                            src={runner.image}
                            alt={runner.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-orange-500 text-xs font-bold tracking-widest mb-1">{runner.role}</p>
                            <h3 className="text-3xl font-black italic text-white mb-2">{runner.name}</h3>
                            <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <p className="text-gray-300 text-sm italic">"{runner.quote}"</p>
                                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
                                    <span className="text-xs font-mono text-gray-500">PB DISTANCE</span>
                                    <span className="text-xl font-bold text-white">{runner.distance}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
