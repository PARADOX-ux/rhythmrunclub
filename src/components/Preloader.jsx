import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
    const counterRef = useRef(null);
    const containerRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate counter from 0 to 100
            gsap.to(counterRef.current, {
                innerText: 100,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power2.out",
                onUpdate: function () {
                    setCount(Math.ceil(this.targets()[0].innerText));
                },
                onComplete: () => {
                    // Exit animation
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power4.inOut",
                        onComplete: onComplete
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 bg-black z-[99999] flex flex-col justify-between p-10 text-white">
            <div className="flex justify-between items-start">
                <h1 className="text-xl font-bold tracking-widest">RHYTHM RUN CLUB</h1>
                <p className="text-sm text-gray-400">EST. 2024</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="text-[15vw] font-black leading-none tracking-tighter" ref={counterRef}>
                    0
                </div>
            </div>

            <div className="flex justify-between items-end">
                <p className="text-sm text-gray-400">LOADING EXPERIENCE</p>
                <div className="w-24 h-1 bg-white/20 overflow-hidden rounded-full">
                    <div
                        className="h-full bg-orange-500 transition-all duration-100 ease-out"
                        style={{ width: `${count}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
