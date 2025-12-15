import React, { useState } from 'react';

const mockLeaderboard = [
    { rank: 1, name: "Arjun K.", distance: "42.5 km", pace: "4:30 /km", avatar: "🏃‍♂️" },
    { rank: 2, name: "Sarah M.", distance: "38.2 km", pace: "5:15 /km", avatar: "⚡" },
    { rank: 3, name: "Rohan D.", distance: "35.0 km", pace: "4:45 /km", avatar: "🔥" },
    { rank: 4, name: "Priya S.", distance: "31.8 km", pace: "5:30 /km", avatar: "👟" },
    { rank: 5, name: "Vikram R.", distance: "28.4 km", pace: "5:00 /km", avatar: "🌪️" },
    { rank: 6, name: "Aditya B.", distance: "25.1 km", pace: "5:45 /km", avatar: "🧢" },
    { rank: 7, name: "Neha P.", distance: "22.0 km", pace: "6:00 /km", avatar: "🎧" },
    { rank: 8, name: "Karthik S.", distance: "18.5 km", pace: "5:10 /km", avatar: "🕶️" },
    { rank: 9, name: "Ananya L.", distance: "15.2 km", pace: "6:15 /km", avatar: "🎵" },
    { rank: 10, name: "Rahul V.", distance: "12.0 km", pace: "5:50 /km", avatar: "🚀" }
];

export default function StravaLeaderboard() {
    const [showAll, setShowAll] = useState(false);
    const displayedRunners = showAll ? mockLeaderboard : mockLeaderboard.slice(0, 5);

    return (
        <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-500">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-orange-500 tracking-tighter">
                    {showAll ? "TOP 10 RUNNERS" : "WEEKLY TOP 5"}
                </h3>
                <span className="text-xs font-bold text-gray-500 border border-white/10 px-2 py-1 rounded-full">STRAVA</span>
            </div>

            <div className="space-y-4">
                {displayedRunners.map((runner) => (
                    <div key={runner.rank} className="flex items-center justify-between group animate-fade-in">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${runner.rank === 1 ? 'bg-yellow-500 text-black' : 'bg-white/10 text-gray-400'}`}>
                                {runner.rank}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{runner.avatar}</span>
                                <div>
                                    <p className="font-bold text-white text-sm">{runner.name}</p>
                                    <p className="text-xs text-gray-500">{runner.pace}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-orange-400 text-sm">{runner.distance}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-xs text-gray-400 hover:text-white transition-colors tracking-widest font-bold uppercase"
                >
                    {showAll ? "COLLAPSE VIEW ↖" : "VIEW FULL LEADERBOARD ↘"}
                </button>
            </div>
        </div>
    );
}
