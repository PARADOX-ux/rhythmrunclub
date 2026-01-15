import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import Link from 'next/link';
import NewJoinerFAQ from './NewJoinerFAQ';
import StravaStats from './StravaStats';
import RouteMap from './RouteMap';

import MarqueeGallery from './MarqueeGallery';
import RunnerSpotlight from './RunnerSpotlight';
import Leaderboard from './Leaderboard';
import MerchDrop from './MerchDrop';

// gsap.registerPlugin(ScrollTrigger);

export default function HomeSections() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll Animations DISABLED for debugging
        /*
        const ctx = gsap.context(() => {
            gsap.from(".anim-section", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%"
                }
            });
        }, containerRef);

        return () => ctx.revert();
        */
    }, []);

    return (
        <div ref={containerRef} className="bg-black text-white px-6 py-20 flex flex-col gap-32 items-center relative z-10">
            <div className="anim-section w-full max-w-4xl text-center space-y-8">
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

            {/* Section 2: FAQ (New Joiner) */}
            <NewJoinerFAQ />

            {/* Section 3: The Roster */}
            <RunnerSpotlight />

            {/* Section 4: Community Proof */}
            <StravaStats />

            {/* Section 5: The Route */}
            <RouteMap />

            {/* Section 6: Leaderboard */}
            <Leaderboard />

            {/* Section 4: Merch Drop */}
            <MerchDrop />

            {/* Section 5: Captured Moments Gallery (Polaroid) */}
            <MarqueeGallery />

            {/* Section 6: Fundraiser (Bar Only - B&W) */}
            <div className="w-full max-w-2xl text-center">
                <div className="w-full h-8 bg-gray-900 rounded-full overflow-hidden border border-white/20 relative">
                    <div className="bg-white h-full w-[0%] absolute top-0 left-0"></div>
                    <p className="absolute w-full text-center text-sm font-bold text-white top-1.5 z-10 tracking-wider">
                        ₹0 / ₹10,000 RAISED FOR CHARITY
                    </p>
                </div>
            </div>

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
