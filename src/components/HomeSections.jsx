import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import MarqueeGallery from './MarqueeGallery';
import RegistrationModal from './RegistrationModal';

export default function HomeSections() {
    const [runData, setRunData] = useState({
        date: "Loading...",
        time: "--:--",
        location: "Fetching location..."
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "events", "next_run");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRunData(docSnap.data());
                } else {
                    setRunData({ date: "No Run Scheduled", time: "", location: "Check back later" });
                }
            } catch (error) {
                console.error("Error fetching run:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-black text-white px-6 py-20 flex flex-col gap-32 items-center relative z-10">


            {/* Section 1: Featured Event (New Year Run) */}
            <div className="w-full max-w-4xl border border-orange-500/30 p-6 md:p-10 rounded-3xl backdrop-blur-md bg-zinc-900/50 shadow-[0_0_50px_rgba(249,115,22,0.1)] hover:shadow-[0_0_80px_rgba(249,115,22,0.2)] transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-orange-500 text-black font-black text-xs px-4 py-2 rounded-bl-xl z-20">
                    OPEN FOR REGISTRATION
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="text-center md:text-left">
                        <h3 className="text-orange-500 font-bold tracking-[0.2em] mb-2 text-sm">UPCOMING EVENT</h3>
                        <h2 className="text-4xl md:text-7xl font-black mb-2 italic tracking-tighter">NEW YEAR<br />RUN 2026</h2>
                        <p className="text-xl text-gray-300 font-light">1st JAN • 6:00 AM • YELAHANKA</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-black text-lg md:text-xl hover:scale-110 hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl whitespace-nowrap"
                    >
                        REGISTER NOW ⚡
                    </button>
                </div>

                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-colors duration-500"></div>
            </div>

            {/* Section 2: The Manifesto */}
            <div className="w-full max-w-4xl text-center space-y-8">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mix-blend-difference">
                    NOT JUST<br />A RUN CLUB.
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                    We are a collective of dreamers, doers, and night owls.
                    We run to escape, to connect, and to feel alive.
                    No pace requirements. No ego. Just vibes.
                </p>
            </div>

            {/* Section 2.5: Captured Moments Gallery (Polaroid) */}
            {/* Section 2.5: Captured Moments Gallery */}
            <MarqueeGallery />

            {/* Section 3: Fundraiser (Bar Only - B&W) */}
            <div className="w-full max-w-2xl text-center">
                <div className="w-full h-8 bg-gray-900 rounded-full overflow-hidden border border-white/20 relative">
                    <div className="bg-white h-full w-[0%] absolute top-0 left-0"></div>
                    <p className="absolute w-full text-center text-sm font-bold text-white top-1.5 z-10 tracking-wider">
                        ₹0 / ₹10,000 RAISED FOR CHARITY
                    </p>
                </div>
            </div>

            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
