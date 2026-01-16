import React from 'react';
import { User } from 'lucide-react';
import ElectricBorder from './ui/ElectricBorder';

const runners = [
    {
        name: "AGENT K.",
        role: "THE PACER",
        distance: "42km",
        quote: "Target pace acquired. No deviations allowed.",
    },
    {
        name: "AGENT M.",
        role: "NIGHT OWL",
        distance: "21km",
        quote: "Operations commence at 2400 hours.",
    },
    {
        name: "AGENT R.",
        role: "TRAIL BLAZER",
        distance: "10km",
        quote: "Terrain analysis complete. Route secure.",
    }
];

export default function RunnerSpotlight() {
    return (
        <div className="w-full max-w-6xl py-20 px-4">
            <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase">
                    The Roster
                </h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-sm text-gray-400 font-mono hidden md:block">STATUS: ACTIVE</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {runners.map((runner, index) => (
                    <ElectricBorder
                        key={index}
                        color="#F97316"
                        speed={1}
                        chaos={0.05}
                        borderRadius={16}
                        className="h-[400px] w-full"
                    >
                        {/* Inner Card Content */}
                        <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer transition-colors duration-500">

                            {/* Noir Silhouette Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black flex items-center justify-center">
                                <User className="w-32 h-32 text-black/50 group-hover:text-orange-500/20 transition-colors duration-500" strokeWidth={1} />
                            </div>

                            {/* Noise Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-orange-500 text-xs font-bold tracking-widest mb-1">{runner.role}</p>
                                    <span className="bg-white/10 text-[10px] px-2 py-0.5 rounded text-white/60 font-mono">CLASSIFIED</span>
                                </div>

                                <h3 className="text-3xl font-black italic text-white mb-2">{runner.name}</h3>

                                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <p className="text-gray-300 text-sm italic font-mono border-l-2 border-orange-500 pl-3 mb-4">
                                        "{runner.quote}"
                                    </p>
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                        <span className="text-xs font-mono text-gray-500">MAX DISTANCE</span>
                                        <span className="text-xl font-bold text-white font-mono">{runner.distance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ElectricBorder>
                ))}
            </div>
        </div>
    );
}
