import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import galleryRun1 from '../assets/gallery_run_1.png';
import galleryCoffee2 from '../assets/gallery_coffee_2.png';
import galleryStretch3 from '../assets/gallery_stretch_3.png';
import galleryUrban4 from '../assets/gallery_urban_4.png';

const images = [galleryRun1, galleryCoffee2, galleryStretch3, galleryUrban4, galleryRun1, galleryCoffee2, galleryStretch3, galleryUrban4]; // Duplicated for seamless loop

export default function MarqueeGallery() {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".marquee-content", {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });
        }, marqueeRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full overflow-hidden py-10 bg-black relative z-10" ref={marqueeRef}>
            <div className="marquee-content flex gap-4 w-max">
                {images.map((img, index) => (
                    <div key={index} className="w-[300px] h-[200px] md:w-[400px] md:h-[250px] flex-shrink-0 rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
                {/* Duplicate set for seamless loop if needed, though xPercent -50 handles it if content is doubled in array */}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
        </div>
    );
}
