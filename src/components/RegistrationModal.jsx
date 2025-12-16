import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import routeMap from '../assets/route_map.png';

export default function RegistrationModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: '', email: '', bibName: '' });
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [showDetails, setShowDetails] = useState(true);

    if (!isOpen) return null;

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Check for duplicate email
            const q = query(collection(db, "registrations"), where("email", "==", formData.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("You have already registered with this email ID! 🚫");
                setLoading(false);
                return;
            }

            // Proceed with registration
            const docRef = await addDoc(collection(db, "registrations"), {
                ...formData,
                event: "New Year Run 2026",
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
            <div className="bg-zinc-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col relative shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-50 p-2 bg-black/50 rounded-full hover:bg-black/80">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto p-6 md:p-10 w-full">

                    {ticket ? (
                        // TICKET VIEW
                        <div className="text-center py-4 animate-fade-in-up">
                            <div className="inline-block bg-white text-black p-6 rounded-3xl shadow-2xl w-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
                                <h3 className="text-2xl font-black mb-1 tracking-tighter">RHYTHM RUN CLUB</h3>
                                <p className="text-xs font-bold text-gray-500 tracking-widest mb-6">OFFICIAL ENTRY TICKET</p>

                                <div className="border-y-2 border-dashed border-gray-300 py-6 my-6 space-y-3">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Runner Name</p>
                                        <p className="text-xl font-bold">{ticket.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Bib Name</p>
                                        <p className="text-3xl font-black text-orange-600">"{ticket.bibName}"</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase">Date</p>
                                            <p className="font-bold text-sm">01 JAN 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase">Time</p>
                                            <p className="font-bold text-sm">6:00 AM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="text-left">
                                        <p className="text-[10px] text-gray-500">Ticket ID</p>
                                        <p className="font-mono font-bold text-sm">#{ticket.id}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg overflow-hidden">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.id}`}
                                            alt="QR"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-400 mt-6 text-sm">Screenshot this ticket! 📸</p>
                            <button onClick={onClose} className="mt-4 text-white underline hover:text-orange-500 text-sm">Close</button>
                        </div>
                    ) : showDetails ? (
                        // EVENT DETAILS VIEW
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black text-orange-500 mb-2 tracking-tighter">NEW YEAR RUN</h2>
                                    <p className="text-xl text-white font-bold">1st January 2026 • 6:00 AM • Yelahanka Main Gate</p>
                                </div>
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="hidden md:block bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                                >
                                    REGISTER NOW
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* MAP SECTION */}
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden border border-white/20 h-[300px] md:h-[400px]">
                                        <img src={routeMap} alt="Route Map" className="w-full h-full object-cover" />

                                    </div>
                                    <p className="text-sm text-gray-400 text-center italic">Interactive 3D Map • Zoom & Pan</p>
                                </div>

                                {/* DETAILS SECTION */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">📍 THE ROUTE</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            Starting point: <strong>Dairy Cross</strong> → Attur Layout → Vidyaranyapura Rd → GKVK Entrance → Rajiv Gandhi Nagar Park → L&T Realty → Sahakar Nagar Main Rd → Judicial Layout Park → Allalsandra Lake View Rd → <strong>Dairy Cross (End)</strong>.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">🎒 ESSENTIALS</h3>
                                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                                            <li>Running shoes (obviously!)</li>
                                            <li>Water bottle (hydration stops available)</li>
                                            <li>Small towel</li>
                                            <li>Good vibes only</li>
                                        </ul>
                                    </div>

                                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
                                        <h3 className="text-xl font-bold text-orange-400 mb-1">🥞 BREAKFAST INCLUDED</h3>
                                        <p className="text-gray-300 text-sm">
                                            Join us for a post-run community breakfast. It's on the house!
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setShowDetails(false)}
                                        className="md:hidden w-full bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform mt-4"
                                    >
                                        REGISTER NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // REGISTRATION FORM
                        <div className="max-w-md mx-auto py-10">
                            <h2 className="text-3xl font-black text-white mb-2 text-center">SECURE YOUR SPOT</h2>
                            <p className="text-gray-400 text-center mb-8 text-sm">Join the squad for the first run of the year.</p>

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
                                    {loading ? 'CHECKING...' : 'CONFIRM REGISTRATION'}
                                </button>
                            </form>

                            <button onClick={() => setShowDetails(true)} className="w-full text-center text-gray-500 text-sm mt-4 hover:text-white">Back to Details</button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
