import React from 'react';

export default function MerchDrop() {
    return (
        <div className="w-full max-w-6xl py-20 px-4">
            <div className="relative w-full h-[500px] md:h-[600px] bg-zinc-900 rounded-3xl overflow-hidden group border border-white/5">
                {/* Background (Gradient as placeholder for "Blurry Product") */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-80 group-hover:scale-105 transition-transform duration-1000"></div>

                {/* Abstract Shape/Product Placeholder */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-orange-600/20 blur-[100px] rounded-full group-hover:bg-orange-600/30 transition-colors duration-700"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6">
                    <div className="bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-6 animate-pulse">
                        COMING SOON
                    </div>

                    <h2 className="text-5xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 mb-4 mix-blend-difference">
                        ESSENTIALS
                        <br />
                        DROP 001
                    </h2>

                    <p className="text-gray-400 max-w-md font-light text-lg mb-8">
                        Performance engineered. Street ready.
                        <br />
                        Limited release for club members only.
                    </p>

                    <button className="px-8 py-3 bg-white text-black font-black italic tracking-wider rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300">
                        GET NOTIFIED
                    </button>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            </div>
        </div>
    );
}
