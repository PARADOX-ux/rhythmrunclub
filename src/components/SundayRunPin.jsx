import React from "react";
import { PinContainer } from "./ui/3d-pin";

export default function SundayRunPin() {
    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 py-20 -my-20">

            {/* PIN 1: THE ROSTER */}
            <div className="h-[25rem] flex items-center justify-center">
                <PinContainer title="Meet the Crew" href="/about">
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem]">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                            THE ROSTER
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500">
                                80+ Active Runners.
                                <br />
                                No one runs alone.
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-zinc-900 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-50"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-black text-white mix-blend-overlay opacity-30">CREW</span>
                            </div>
                        </div>
                    </div>
                </PinContainer>
            </div>

            {/* PIN 2: SUNDAY RUN (MAIN EVENT) */}
            <div className="h-[30rem] flex items-center justify-center z-20">
                <PinContainer title="GKVK -> Mall of Asia" href="/events">
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-white">
                            SUNDAY LONG RUN
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-orange-500 font-bold">
                                GKVK Entrance ➔ Mall of Asia
                            </span>
                            <br />
                            <span className="text-slate-400">
                                7:00 AM • 12K Route
                            </span>
                        </div>
                        {/* Visual Decor: Mini Map Representation */}
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-zinc-900 border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-50"></div>

                            {/* Abstract Map Lines */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-dashed border-white/20 rounded-full animate-spin-slow"></div>

                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-6xl font-black text-white mix-blend-overlay">18</span>
                                <span className="text-sm font-bold text-orange-500 tracking-widest bg-black/50 px-2 rounded">JAN</span>
                            </div>
                        </div>
                    </div>
                </PinContainer>
            </div>

            {/* PIN 3: MERCH DROP */}
            <div className="h-[25rem] flex items-center justify-center">
                <PinContainer title="The New Collection" href="/#merch-drop">
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem]">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                            MERCH DROP
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500">
                                Season 2 Collection.
                                <br />
                                Limited Availability.
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-zinc-900 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-50"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-black text-white mix-blend-overlay opacity-30">SHOP</span>
                            </div>
                        </div>
                    </div>
                </PinContainer>
            </div>

        </div>
    );
}
