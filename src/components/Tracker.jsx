export default function Tracker() {
    return (
        <div id="tracker" className="bg-zinc-900 text-white py-20 px-6 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-10">YOUR TRACKER</h2>

            <div className="w-full max-w-md space-y-6">
                {/* Inputs */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">DAILY CALORIE INTAKE</label>
                    <input type="text" placeholder="e.g. 2400 kcal" className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white text-xl" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">WEIGHT GOAL</label>
                    <input type="text" placeholder="e.g. 70 kg" className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white text-xl" />
                </div>

                {/* Strava Button */}
                <button className="w-full mt-10 bg-[#FC4C02] py-4 rounded font-bold text-white hover:bg-orange-600 transition-all flex justify-center items-center gap-2">
                    CONNECT WITH STRAVA
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">Sync your runs to track progress.</p>
            </div>
        </div>
    );
}
