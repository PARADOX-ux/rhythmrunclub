import React from 'react';
import { motion } from 'framer-motion';

export default function MerchDrop() {
    return (
        <div className="w-full max-w-6xl py-20 px-4">
            <div className="relative w-full h-[500px] md:h-[600px] bg-zinc-900 rounded-3xl overflow-hidden group border border-white/5">

                {/* 1. Animated Marquee Background */}
                <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none select-none overflow-hidden">
                    <motion.div
                        className="whitespace-nowrap text-[10rem] font-black italic text-stroke-white leading-none"
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        LIMITED RUN // DO NOT MISS // ARCHIVE SALE //
                    </motion.div>
                    <motion.div
                        className="whitespace-nowrap text-[10rem] font-black italic text-stroke-white leading-none ml-[-500px]"
                        animate={{ x: [-1000, 0] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    >
                         // STREETWEAR // PERFORMANCE // RHYTHM //
                    </motion.div>
                </div>

                {/* 2. Glowing Orb / "Scanner" Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-orange-600/30 blur-[120px] rounded-full group-hover:bg-orange-600/50 group-hover:scale-125 transition-all duration-700 animate-pulse"></div>

                {/* 3. Main Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6">
                    <div className="bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-6 animate-bounce shadow-[0_0_20px_rgba(249,115,22,0.6)]">
                        COMING SOON
                    </div>

                    <h2 className="text-5xl md:text-9xl font-black italic tracking-tighter text-white mb-4 mix-blend-difference drop-shadow-2xl">
                        ESSENTIALS
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0">DROP 001</span>
                    </h2>

                    <p className="text-gray-300 max-w-md font-mono text-sm mb-8 tracking-widest uppercase">
                        // Performance engineered.<br />
                        // Street ready.<br />
                        // Member Exclusive.
                    </p>

                    <button className="px-8 py-4 bg-white text-black font-black italic tracking-wider rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-xl">
                        GET NOTIFIED
                    </button>
                </div>

                {/* 4. Grid & Noise Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 border-[0.5px] border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>
        </div>
    );
}
