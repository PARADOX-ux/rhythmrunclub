import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import HomeSections from './components/HomeSections';
import Activity from './pages/Activity';
import About from './pages/About';
import Events from './pages/Events';
import Login from './pages/Login';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
    return (
        <Router>
            <div className="bg-black min-h-screen text-white selection:bg-orange-500 selection:text-white">
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
        </Router>
    );
}
