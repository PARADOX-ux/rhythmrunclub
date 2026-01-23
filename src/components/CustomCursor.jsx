import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    useEffect(() => {
        // Optimize with quickSetter for performance
        const setCursorX = gsap.quickSetter(cursorRef.current, "x", "px");
        const setCursorY = gsap.quickSetter(cursorRef.current, "y", "px");

        const moveCursor = (e) => {
            setCursorX(e.clientX);
            setCursorY(e.clientY);
            // Keep the follower smooth
            gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    if (isTouchDevice) return null;

    return (
        <>
            <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
            <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2" />
        </>
    );
}
