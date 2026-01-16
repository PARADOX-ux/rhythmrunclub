import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import MagicBento from '../components/MagicBento';
import RouteMap from '../components/RouteMap';
import routeMap from '../assets/route_map.png';

export default function Events() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', bibName: '' });
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState(null);

    const handleCardClick = (card) => {
        if (card.title === 'SUNDAY RUN') {
            setSelectedEvent(card);
            setShowRegister(false);
            setTicket(null);
        }
    };

    const closeModal = () => setSelectedEvent(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, "registrations"), {
                ...formData,
                event: "Sunday Run",
                timestamp: new Date()
            });
            setTicket({ ...formData, id: docRef.id.slice(0, 6).toUpperCase() });
            setLoading(false);
        } catch (error) {
            console.error("Error registering: ", error);
            setLoading(false);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 px-6 flex flex-col items-center relative">
            <h1 className="text-5xl font-bold mb-12 tracking-tighter text-center">UPCOMING EVENTS</h1>

            <div className="w-full max-w-7xl">
                <MagicBento
                    textAutoHide={false}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="252, 76, 2"
                    onCardClick={handleCardClick}
                />
            </div>

            {/* EVENT DETAILS MODAL */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={closeModal}>
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {!showRegister && !ticket ? (
                            // EVENT DETAILS VIEW
                            <>

                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-black text-orange-500 mb-2 tracking-tighter">SUNDAY RUN</h2>
                                        <p className="text-xl text-white font-bold">18th January 2026 • 7:00 AM • GKVK Entrance</p>
                                    </div>
                                </div>

                                {/* 1. EMBEDDED MAP */}
                                <div className="w-full h-[300px] mb-8 rounded-2xl overflow-hidden border border-white/10 relative group">
                                    <div className="absolute top-2 right-2 z-[9999] bg-black/80 text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                                        LIVE ROUTE PREVIEW
                                    </div>
                                    <RouteMap className="w-full h-full" />
                                </div>

                                {/* 2. PACE CALCULATOR */}
                                <div className="w-full bg-zinc-800/50 p-6 rounded-2xl border border-white/5 mb-8">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        ⚡ WHAT'S YOUR SQUAD?
                                    </h3>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="Your 5K time (mins)"
                                            className="bg-black border border-white/20 rounded-lg px-4 py-2 w-full text-white font-mono focus:border-orange-500 outline-none"
                                            id="paceInput"
                                        />
                                        <button
                                            onClick={() => {
                                                const time = document.getElementById('paceInput').value;
                                                if (!time) return;
                                                let squad = "";
                                                if (time < 25) squad = "⚡ WOLFPACK (Fast Pace)";
                                                else if (time < 35) squad = "🏃 PACER GANG (Steady)";
                                                else squad = "🎉 VIBE TRIBE (Party Pace)";
                                                alert(`YOU BELONG TO: ${squad}`);
                                            }}
                                            className="bg-white text-black font-black px-6 rounded-lg hover:bg-orange-500 hover:text-white transition-colors uppercase whitespace-nowrap"
                                        >
                                            CHECK
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Don't worry, we have groups for everyone. No runner left behind.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowRegister(true)}
                                    className="w-full bg-orange-600 text-white font-black text-xl py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                                >
                                    REGISTER NOW
                                </button>

                            </>
                        ) : ticket ? (
                            // TICKET VIEW
                            <div className="text-center py-10 animate-fade-in-up">
                                <div className="inline-block bg-white text-black p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
                                    <h3 className="text-3xl font-black mb-2 tracking-tighter">RHYTHM RUN CLUB</h3>
                                    <p className="text-sm font-bold text-gray-500 tracking-widest mb-8">OFFICIAL ENTRY TICKET</p>

                                    <div className="border-y-2 border-dashed border-gray-300 py-8 my-8 space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Runner Name</p>
                                            <p className="text-2xl font-bold">{ticket.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Bib Name</p>
                                            <p className="text-4xl font-black text-orange-600">"{ticket.bibName}"</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">Date</p>
                                                <p className="font-bold">18 JAN 2026</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase">Time</p>
                                                <p className="font-bold">7:00 AM</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="text-left">
                                            <p className="text-xs text-gray-500">Ticket ID</p>
                                            <p className="font-mono font-bold">#{ticket.id}</p>
                                        </div>
                                        <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-bold rounded-lg">
                                            QR
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-400 mt-8">Screenshot this ticket! See you at the starting line. 🏁</p>
                                <button onClick={() => { setTicket(null); setShowRegister(false); }} className="mt-4 text-white underline hover:text-orange-500">Close</button>
                            </div>
                        ) : (
                            // REGISTRATION FORM
                            <div className="max-w-md mx-auto py-10">
                                <h2 className="text-3xl font-black text-white mb-2 text-center">SECURE YOUR SPOT</h2>
                                <p className="text-gray-400 text-center mb-8">Join the squad for the first run of the year.</p>

                                <form onSubmit={handleRegister} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-colors"
                                            placeholder="Usain Bolt"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-colors"
                                            placeholder="runner@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Bib Name (What's on your chest?)</label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={12}
                                            value={formData.bibName}
                                            onChange={e => setFormData({ ...formData, bibName: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-colors"
                                            placeholder="SPEEDY"
                                        />
                                        <p className="text-xs text-gray-600 mt-1 text-right">Max 12 chars</p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all uppercase tracking-wider mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'GENERATING TICKET...' : 'CONFIRM REGISTRATION'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowRegister(false)}
                                        className="w-full text-gray-500 text-sm hover:text-white py-2"
                                    >
                                        Go Back
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
}
