import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import galleryRun1 from '../assets/gallery_run_1.png';
import galleryCoffee2 from '../assets/gallery_coffee_2.png';
import galleryStretch3 from '../assets/gallery_stretch_3.png';
import galleryUrban4 from '../assets/gallery_urban_4.png';

// Sample images (using placeholders or existing assets)
const photos = [
    { id: 1, src: galleryRun1, caption: "Morning Vibes 🌅" },
    { id: 2, src: galleryCoffee2, caption: "Post-Run Coffee ☕" },
    { id: 3, src: galleryStretch3, caption: "Squad Goals 🏃‍♂️" },
    { id: 4, src: galleryUrban4, caption: "Night Moves 🌃" },
];

export default function PolaroidGallery() {
    const containerRef = useRef(null);

    return (
        <div className="w-full py-20 overflow-hidden relative">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                    MEMORIES <span className="text-orange-500">UNLEASHED</span>
                </h2>
                <p className="text-gray-400">Drag, throw, and relive the moments.</p>
            </div>

            <div ref={containerRef} className="h-[600px] w-full max-w-6xl mx-auto relative bg-zinc-900/30 rounded-3xl border border-white/5 overflow-hidden">
                {photos.map((photo, index) => (
                    <Polaroid key={photo.id} photo={photo} index={index} containerRef={containerRef} />
                ))}

                <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                    <p className="text-white/10 text-9xl font-black tracking-widest uppercase select-none">GALLERY</p>
                </div>
            </div>
        </div>
    );
}

function Polaroid({ photo, index, containerRef }) {
    // Random initial rotation and position
    const randomRotate = Math.random() * 30 - 15; // -15 to 15 deg
    const randomX = Math.random() * 200 - 100; // -100 to 100 px
    const randomY = Math.random() * 100 - 50; // -50 to 50 px

    return (
        <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, zIndex: 50, rotate: 0, cursor: "grab" }}
            whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing" }}
            initial={{ rotate: randomRotate, x: randomX, y: randomY, opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: index * 0.2 } }}
            className="absolute top-1/2 left-1/2 w-64 bg-white p-3 pb-8 shadow-2xl transform -translate-x-1/2 -translate-y-1/2"
            style={{
                rotate: randomRotate,
                x: randomX,
                y: randomY
            }}
        >
            <div className="w-full h-56 bg-gray-200 overflow-hidden mb-3">
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover pointer-events-none" />
            </div>
            <p className="text-black font-handwriting text-center font-bold text-lg transform -rotate-1">
                {photo.caption}
            </p>
        </motion.div>
    );
}
