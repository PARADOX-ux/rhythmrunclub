import React from 'react';

const Home = () => {
    return (
        <div className="bg-black text-white pb-20">
            {/* Section 1: Upcoming Run */}
            <section className="container mx-auto px-6 py-20">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-white/20 transition-colors">
                    <h2 className="text-3xl font-bold mb-4">Next Run</h2>
                    <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                        SUNDAY 7AM
                    </div>
                    <p className="text-xl text-gray-400">@ Cubbon Park, Bangalore</p>
                    <button className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Join the Pack
                    </button>
                </div>
            </section>

            {/* Section 2: Events */}
            <section className="container mx-auto px-6 py-10">
                <h2 className="text-4xl font-bold mb-10 border-b border-zinc-800 pb-4">Weekly Rhythms</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        {['Morning Glory', 'Night Owl Run', 'Speed Work'].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <span className="text-xl font-medium">{item}</span>
                                <span className="text-gray-500">Details &rarr;</span>
                            </div>
                        ))}
                    </div>
                    {/* Placeholder Map */}
                    <div className="bg-zinc-800 rounded-3xl h-64 md:h-auto flex items-center justify-center text-gray-500">
                        [Route Map Placeholder]
                    </div>
                </div>
            </section>

            {/* Section 3: Fundraiser */}
            <section className="container mx-auto px-6 py-20">
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-10 text-center">
                    <h2 className="text-4xl font-bold mb-6">Running for a Cause</h2>
                    <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                        Every step counts. We are raising funds for local athletes.
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-800 rounded-full h-4 mb-4 overflow-hidden">
                        <div className="bg-white h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Raised: $6,500</span>
                        <span>Goal: $10,000</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
