import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Exact 6km Route: Doddabettahalli -> GKVK Zig-Zag -> Mall of Asia
const routeCenter = [13.0800, 77.5780];
const routePoints = [
    [13.0950, 77.5640], // Doddabettahalli (Start)
    [13.0920, 77.5645], // South on Main Rd
    [13.0880, 77.5665], // Pass NTI
    [13.0865, 77.5685], // Turn Left into GKVK Rd
    [13.0840, 77.5700], // GKVK Gate
    [13.0810, 77.5705], // Inside: South
    [13.0795, 77.5720], // Inside: Bend East
    [13.0780, 77.5740], // Inside: Vignana Kendra
    [13.0770, 77.5780], // Inside: Past Pond
    [13.0760, 77.5800], // Inside: Near Judicial
    [13.0740, 77.5830], // Inside: East Road
    [13.0720, 77.5860], // Exit Gate (L&T)
    [13.0700, 77.5875], // Highway Service Rd
    [13.0670, 77.5900], // Jakkur Service Rd
    [13.0645, 77.5930]  // Phoenix Mall of Asia (Finish)
];

export default function RouteMap({ className = "w-full h-[600px] relative z-10 px-0 md:px-0 my-20 max-w-[95%] mx-auto" }) {
    const customIcon = new L.DivIcon({
        className: 'custom-marker-icon',
        html: '<div class="marker-pin"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });

    const finishIcon = new L.DivIcon({
        className: 'custom-marker-icon',
        html: '<div class="marker-pin" style="background: white; border-color: #f97316;"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10]
    });

    return (
        <section className={className}>
            <div className="max-w-6xl mx-auto w-full h-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl relative group">

                {/* Overlay Text */}
                <div className="absolute top-6 left-6 z-[9999] pointer-events-none">
                    <h3 className="bg-black/80 backdrop-blur-md px-4 py-2 text-white font-bold text-lg inline-block rounded-lg border border-white/10 shadow-lg">
                        THE GKVK TRAIL <span className="text-orange-500">12K ROUTE</span>
                    </h3>
                </div>

                <MapContainer
                    center={routeCenter}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="w-full h-full transition-all duration-700"
                    style={{ background: '#111' }}
                >
                    {/* Dark Mode Tiles (CartoDB Dark Matter) */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {/* Start Marker */}
                    <Marker position={routePoints[0]} icon={customIcon}>
                        <Popup className="custom-popup">
                            <span className="font-bold text-orange-500 tracking-widest text-xs">START</span><br />
                            <span className="text-lg font-black">DODDABETTAHALLI</span><br />
                            <span className="text-gray-400 text-xs">Warmup @ 5:45 AM</span>
                        </Popup>
                    </Marker>

                    {/* Finish Marker (Mall of Asia) */}
                    <Marker position={routePoints[routePoints.length - 1]} icon={finishIcon}>
                        <Popup className="custom-popup">
                            <span className="font-bold text-white tracking-widest text-xs">FINISH LINE</span><br />
                            <span className="text-lg font-black">MALL OF ASIA</span><br />
                            <span className="text-orange-500 text-xs">Breakfast @ Rameshwaram</span>
                        </Popup>
                    </Marker>

                    {/* Neon Glow Layer */}
                    <Polyline
                        positions={routePoints}
                        color="#f97316" // Orange-500
                        weight={12}
                        opacity={0.3}
                        lineCap="round"
                    />

                    {/* Main Route Line */}
                    <Polyline
                        positions={routePoints}
                        color="#fff" // White core
                        weight={3}
                        opacity={1}
                        dashArray="5, 10"
                    />
                </MapContainer>
            </div>
        </section>
    )
}
