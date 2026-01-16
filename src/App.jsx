import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import SEO from './components/SEO';
import ParticlesOverlay from './components/ParticlesOverlay';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Activity from './pages/Activity';
import Login from './pages/Login';
import SmoothCursor from './components/ui/SmoothCursor';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/join" element={<Login />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
                    <SmoothCursor />
                    <SEO />
                    {/* <ParticlesOverlay /> */}
                    <Navbar />
                    <AnimatedRoutes />
                    {/* <Footer /> */}
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
