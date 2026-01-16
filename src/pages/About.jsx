import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import yelahankaImg from '../assets/yelahanka.png';
import bangaloreImg from '../assets/bangalore.png';
import communityImg from '../assets/community.png';
import GeminiScrollSection from '../components/GeminiScrollSection';

gsap.registerPlugin(ScrollTrigger);

const StatsStrip = () => (
    <div className="w-full border-y border-white/10 bg-zinc-900/50 backdrop-blur-sm py-12 my-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                { label: "WEEKS RUNNING", value: "52" },
                { label: "ACTIVE RUNNERS", value: "80+" },
                { label: "KILOMETERS", value: "1000+" },
                { label: "VIBES", value: "∞" }
            ].map((stat, i) => (
                <div key={i} className="space-y-2 group cursor-default">
                    <h3 className="text-4xl md:text-6xl font-black text-white group-hover:text-orange-500 transition-colors duration-300">
                        {stat.value}
                    </h3>
                    <p className="text-xs font-bold tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default function About() {
    const containerRef = useRef(null);
    const [showPayment, setShowPayment] = React.useState(false);
    const [showPrank, setShowPrank] = React.useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Text Sections
            const textSections = document.querySelectorAll('.animate-text');
            textSections.forEach(section => {
                gsap.fromTo(section,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Parallax Images
            const images = document.querySelectorAll('.parallax-img');
            images.forEach(img => {
                gsap.to(img, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-20 px-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-0">

                {/* Header */}
                <div className="text-center mb-32 animate-text">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-6">
                        OUR STORY
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                        From a misty morning in Yelahanka to a movement that moves the city.
                    </p>
                </div>

                {/* VISUAL STORY: The Gemini Effect (Moved to Bottom) */}

                {/* Row 1: Roots */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] mb-20">
                    <div className="relative h-full w-full overflow-hidden rounded-3xl">
                        <img
                            src={yelahankaImg}
                            alt="Yelahanka Park Run"
                            className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-20 animate-text">
                        <span className="text-orange-500 font-bold tracking-widest mb-4 block">01. THE BEGINNING</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                            ROOTS IN<br />YELAHANKA
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                            It started with a simple idea: running shouldn't feel like a chore.
                            In the misty mornings of Yelahanka, a small group of us found a rhythm
                            that was about more than just fitness.
                        </p>
                    </div>
                </div>

                {/* Row 2: Pulse */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] mb-20">
                    <div className="flex flex-col justify-center p-8 md:p-20 order-2 md:order-1 animate-text">
                        <span className="text-orange-500 font-bold tracking-widest mb-4 block">02. THE EXPANSION</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                            PULSE OF<br />BANGALORE
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                            As we grew, so did our horizons. We took to the streets of Bangalore,
                            embracing the chaos and the energy of the city. From the quiet
                            corners to the bustling avenues, we claim every mile as our own.
                        </p>
                    </div>
                    <div className="relative h-full w-full overflow-hidden rounded-3xl order-1 md:order-2">
                        <img
                            src={bangaloreImg}
                            alt="Bangalore Urban Run"
                            className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Row 3: Philosophy */}
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] mb-20">
                    <div className="relative h-full w-full overflow-hidden rounded-3xl">
                        <img
                            src={communityImg}
                            alt="Community Philosophy"
                            className="parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-20 animate-text">
                        <span className="text-orange-500 font-bold tracking-widest mb-4 block">03. THE SOUL</span>
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                            OUR<br />PHILOSOPHY
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light mb-6">
                            We believe that running is a form of moving meditation. It's not about
                            the pace or the distance, but the connection you build with yourself
                            and the world around you.
                        </p>
                    </div>
                </div>

                {/* Stats Strip (Moved to Bottom) */}
                <StatsStrip />

                {/* Footer Call to Action */}
                <div className="mt-20 text-center animate-text">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                        READY TO RUN?
                    </h2>
                    <button
                        onClick={() => setShowPayment(true)}
                        className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                    >
                        JOIN THE CLUB
                    </button>
                </div>

                {/* Gemini Effect Footer */}
                <div className="-mx-6 mt-20">
                    <GeminiScrollSection />
                </div>

                {/* Prank Payment Modal */}
                {showPayment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                        <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-md w-full text-center relative overflow-hidden">
                            {!showPrank ? (
                                <>
                                    <h3 className="text-2xl font-bold mb-2">MEMBERSHIP DETAILS</h3>
                                    <div className="my-8 py-6 border-y border-white/10">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400">Lifetime Access</span>
                                            <span className="font-mono">₹4,999.00</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400">Processing Fee</span>
                                            <span className="font-mono">₹0.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xl font-bold mt-4 pt-4 border-t border-white/10">
                                            <span>TOTAL</span>
                                            <span className="text-orange-500">₹4,999.00</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowPrank(true)}
                                        className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-xl transition-colors mb-4"
                                    >
                                        PROCEED TO PAY
                                    </button>
                                    <button
                                        onClick={() => setShowPayment(false)}
                                        className="text-xs text-gray-500 hover:text-white"
                                    >
                                        CANCEL
                                    </button>
                                </>
                            ) : (
                                <div className="py-10 animate-bounce-in">
                                    <div className="text-6xl mb-6">😂</div>
                                    <h3 className="text-3xl font-black text-orange-500 mb-4">JUST KIDDING!</h3>
                                    <p className="text-xl text-white mb-6">
                                        Joining Rhythm Run Club is <span className="font-bold underline decoration-orange-500">100% FREE</span>.
                                    </p>
                                    <p className="text-gray-400 mb-8">
                                        We don't charge for vibes. Just show up on Sunday!
                                    </p>
                                    <button
                                        onClick={() => { setShowPayment(false); setShowPrank(false); }}
                                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                                    >
                                        GOT IT! 🏃‍♂️
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
