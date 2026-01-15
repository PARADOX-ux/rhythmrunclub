import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // SEO Support
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import HomeSections from './components/HomeSections';
import Activity from './pages/Activity';
import About from './pages/About';
import Events from './pages/Events';
import Login from './pages/Login';
import SEO from './components/SEO';
// import ProtectedRoute from './components/ProtectedRoute';
import ParticlesOverlay from './components/ParticlesOverlay';
// import Preloader from './components/Preloader';

export default function App() {
    return (
        <HelmetProvider>
            <ParticlesOverlay />
            <SEO />
            <Router>
                <div className="bg-black min-h-screen text-white selection:bg-orange-500 selection:text-white">
                    {/* {isLoading && <Preloader onComplete={() => setIsLoading(false)} />} */}

                    <div className="">
                        <CustomCursor />
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<><Hero /><HomeSections /></>} />
                            <Route path="/about" element={<About />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/activity" element={<Activity />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </HelmetProvider>
    );
}
