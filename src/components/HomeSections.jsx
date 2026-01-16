import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import Link from 'next/link';
import NewJoinerFAQ from './NewJoinerFAQ';
import SundayRunPin from './SundayRunPin';
import StravaStats from './StravaStats';
import RouteMap from './RouteMap';

import MarqueeGallery from './MarqueeGallery';
import RunnerSpotlight from './RunnerSpotlight';
import Leaderboard from './Leaderboard';
import MerchDrop from './MerchDrop';
import SectionConnector from './SectionConnector';
// import HeroParallaxSection from './HeroParallaxSection';

// ... (existing imports)

export default function HomeSections() {
    const containerRef = useRef(null);

    // ... (existing useEffect)

    return (
    return (
        <div ref={containerRef} className="bg-black text-white px-2 md:px-10 py-20 flex flex-col gap-0 items-center relative z-10 w-full overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#333 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}>
            </div>

            {/* Side Glows */}
            <div className="absolute top-0 left-0 w-1/3 h-full bg-orange-500/5 blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-full bg-blue-500/5 blur-[150px] pointer-events-none"></div>

            <div className="anim-section w-full max-w-[95%] text-center space-y-8 mb-20 relative z-10">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mix-blend-difference">
                    NOT JUST<br />A RUN CLUB.
                </h2>
                <div className="relative group cursor-default">
                    <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed transition-colors duration-500 hover:text-white">
                        We are a collective of dreamers, doers, and night owls.
                        We run to escape, to connect, and to feel alive.
                        No pace requirements. No ego. Just vibes.
                    </p>
                </div>
            </div>

            <SectionConnector />

            {/* Section 2: Sunday Run (3D Pin) */}
            <SundayRunPin />

            {/* Section 3: The Roster */}
            <RunnerSpotlight />

            <SectionConnector />

            {/* Section 4: Community Proof */}
            <StravaStats />

            <SectionConnector />

            {/* Section 5: The Route */}
            <RouteMap />

            <SectionConnector />

            {/* Section 6: Leaderboard */}
            <Leaderboard />

            <SectionConnector />

            {/* Section 4: Merch Drop */}
            <MerchDrop />

            <SectionConnector />

            {/* Section 5: Captured Moments Gallery (Polaroid) */}
            <MarqueeGallery />

            <SectionConnector />

            {/* Section 6: Fundraiser (Bar Only - B&W) */}
            <div className="w-full max-w-2xl text-center py-20">
                <div className="w-full h-8 bg-gray-900 rounded-full overflow-hidden border border-white/20 relative">
                    <div className="bg-white h-full w-[0%] absolute top-0 left-0"></div>
                    <p className="absolute w-full text-center text-sm font-bold text-white top-1.5 z-10 tracking-wider">
                        ₹0 / ₹10,000 RAISED FOR CHARITY
                    </p>
                </div>
            </div>

            <SectionConnector />

            {/* FAQ (Moved to Bottom) */}
            <NewJoinerFAQ />

            {/* FINAL CTA: Join WhatsApp (Moved to Bottom) */}
            <div className="py-20 text-center">
                <a
                    href="https://chat.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-black tracking-[0.2em] px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(22,163,74,0.5)]"
                >
                    JOIN WHATSAPP GROUP
                </a>
            </div>
        </div>
    );
}
