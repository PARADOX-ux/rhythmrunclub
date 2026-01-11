import React from 'react';
import LightRays from './LightRays';
import HeroDashboard from './HeroDashboard';

export default function Hero() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            <LightRays />
            <HeroDashboard />

            <div className="z-10 text-center mix-blend-overlay pointer-events-none">
                <h1 className="text-6xl md:text-[120px] font-bold text-white tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    RUN WITH<br />SOUL
                </h1>
            </div>
        </div >
    );
}
