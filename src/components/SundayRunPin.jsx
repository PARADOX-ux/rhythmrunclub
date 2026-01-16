import React from "react";
import { PinContainer } from "./ui/3d-pin";

export default function SundayRunPin() {
    return (
        <div className="h-[40rem] w-full flex items-center justify-center -my-20">
            <PinContainer title="Sunday 7AM @ Cubbon Park" href="/events">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                        NEXT RUN: SUNDAY
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500">
                            Central Library Start Point.
                            <br />
                            7:00 AM Sharp.
                        </span>
                    </div>
                    {/* Visual Decor: Mini Map Representation */}
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-zinc-900 border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-50"></div>

                        {/* Abstract Map Lines */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-dashed border-white/20 rounded-full animate-spin-slow"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-black text-white mix-blend-overlay">11</span>
                            <span className="text-xs font-bold text-orange-500 absolute mt-8 mix-blend-plus-lighter">JAN</span>
                        </div>
                    </div>
                </div>
            </PinContainer>
        </div>
    );
}
