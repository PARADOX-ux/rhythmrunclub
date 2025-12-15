import LightRays from './LightRays';
import HeroDashboard from './HeroDashboard';

export default function Hero() {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            <LightRays
                raysOrigin="top-center"
                raysColor="#FFFFFF"
                raysSpeed={0.4}
                lightSpread={0.6}
                rayLength={3.0}
                fadeDistance={2.5}
                followMouse={true}
                mouseInfluence={0.3}
                className="absolute inset-0 z-0"
            />

            <HeroDashboard />

            <div className="z-10 text-center mix-blend-overlay pointer-events-none">
                <h1 className="text-[120px] font-bold text-white tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    RUN WITH<br />SOUL
                </h1>
            </div>
        </div>
    );
}
