import React from 'react';

export default function HeroDashboard() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex flex-col justify-end p-8 md:p-12">
            {/* Bottom Bar */}
            <div className="flex justify-between items-end w-full">
                {/* Location (Bottom Left) */}
                <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold tracking-[0.2em] text-white/80">LIVE</span>
                    </div>
                    <span className="text-sm font-medium text-white/60 tracking-widest font-mono">YELAHANKA, BLR</span>
                </div>

                {/* Scroll Indicator (Bottom Center - Absolute) */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                    <span className="text-[10px] tracking-[0.3em] text-white/80 uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                </div>

                {/* Coordinates/Tech Data (Bottom Right) */}
                <div className="hidden md:block text-right">
                    <p className="text-[10px] text-white/30 font-mono tracking-widest">
                        LAT: 13.1007° N<br />
                        LNG: 77.5963° E
                    </p>
                </div>
            </div>
        </div>
    );
}
