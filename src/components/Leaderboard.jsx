import React from 'react';

const stats = [
    { rank: "01", name: "ADITYA V.", distance: "64.2 km", pace: "4:45 /km", location: "KORAMANGALA" },
    { rank: "02", name: "SNEHA P.", distance: "58.8 km", pace: "5:10 /km", location: "INDIRANAGAR" },
    { rank: "03", name: "ROHIT S.", distance: "52.5 km", pace: "5:30 /km", location: "WHITEFIELD" },
    { rank: "04", name: "KAVYA M.", distance: "48.0 km", pace: "6:00 /km", location: "JAYANAGAR" },
    { rank: "05", name: "VIKRAM R.", distance: "45.2 km", pace: "5:55 /km", location: "YELAHANKA" },
];

export default function Leaderboard() {
    return (
        <div className="w-full max-w-4xl py-20 px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-2">
                    WEEKLY LEADERS
                </h2>
                <p className="text-orange-500 font-mono text-sm tracking-widest">THIS WEEK'S TOP DISTANCES</p>
            </div>

            <div className="w-full bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <div className="col-span-2 md:col-span-1 text-center">RANK</div>
                    <div className="col-span-6 md:col-span-4">ATHLETE</div>
                    <div className="col-span-4 md:col-span-3 text-right">DISTANCE</div>
                    <div className="hidden md:block col-span-2 text-right">PACE</div>
                    <div className="hidden md:block col-span-2 text-right">AREA</div>
                </div>

                {stats.map((runner, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group">
                        <div className="col-span-2 md:col-span-1 text-center font-black text-xl italic text-zinc-700 group-hover:text-orange-500 transition-colors">
                            {runner.rank}
                        </div>
                        <div className="col-span-6 md:col-span-4 font-bold text-white text-lg">
                            {runner.name}
                        </div>
                        <div className="col-span-4 md:col-span-3 text-right font-mono text-orange-400 font-bold">
                            {runner.distance}
                        </div>
                        <div className="hidden md:block col-span-2 text-right font-mono text-gray-400 text-sm">
                            {runner.pace}
                        </div>
                        <div className="hidden md:block col-span-2 text-right font-mono text-zinc-600 text-xs">
                            {runner.location}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => alert("Full Leaderboard coming soon! (This is a simplified view)")}
                    className="text-zinc-500 text-xs font-mono hover:text-white transition-colors uppercase tracking-widest"
                >
                    VIEW FULL LEADERBOARD &rarr;
                </button>
            </div>
        </div>
    );
}
