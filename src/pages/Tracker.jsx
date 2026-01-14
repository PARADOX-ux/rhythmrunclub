import React from 'react';

const Tracker = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-32 px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-5xl font-bold mb-12">Your Rhythm Tracker</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Goal Inputs */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-semibold text-gray-400">Set Your Goals</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Daily Calorie Intake</label>
                                <input type="number" placeholder="2500" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Weight Goal (kg)</label>
                                    <input type="number" placeholder="70" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-2">Height (cm)</label>
                                    <input type="number" placeholder="175" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-[#fc4c02] text-white font-bold rounded-xl hover:bg-[#e34402] transition-colors flex items-center justify-center gap-2">
                            Connect Strava
                        </button>
                    </div>

                    {/* Stats Display */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                        <div className="mb-10">
                            <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Total Distance</div>
                            <div className="text-7xl font-black">0<span className="text-2xl text-gray-600">km</span></div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest mb-2">Average Pace</div>
                            <div className="text-5xl font-bold text-gray-300">--<span className="text-xl text-gray-600">/km</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
