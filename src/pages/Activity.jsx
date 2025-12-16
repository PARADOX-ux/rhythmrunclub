import { useEffect, useState } from 'react';
import { getStravaAuthUrl, exchangeToken, getAthleteStats } from '../stravaConfig';
import DotGrid from '../components/DotGrid';
import StravaLeaderboard from '../components/StravaLeaderboard';

export default function Activity() {
    const [stats, setStats] = useState({ distance: "0.0", runs: 0 });
    const [isConnected, setIsConnected] = useState(false);

    // New state variables for the updated layout
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Check if Strava sent us back with a code
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");

        if (authCode) {
            handleStravaCallback(authCode);
        } else {
            // Check if user is already authenticated (e.g., from session storage or local storage)
            const storedAccessToken = localStorage.getItem('strava_access_token');
            const storedAthlete = localStorage.getItem('strava_athlete');
            if (storedAccessToken && storedAthlete) {
                setIsAuthenticated(true);
                setUserProfile(JSON.parse(storedAthlete));
                fetchAthleteActivities(storedAccessToken, JSON.parse(storedAthlete).id);
            }
        }
    }, []);

    const handleStravaCallback = async (code) => {
        const data = await exchangeToken(code);
        if (data && data.access_token) {
            setIsAuthenticated(true);
            setUserProfile(data.athlete);
            localStorage.setItem('strava_access_token', data.access_token);
            localStorage.setItem('strava_athlete', JSON.stringify(data.athlete));
            fetchAthleteActivities(data.access_token, data.athlete.id);
            // Clean URL
            window.history.replaceState({}, document.title, "/activity");
        }
    };

    const fetchAthleteActivities = async (accessToken, athleteId) => {
        const statsData = await getAthleteStats(accessToken, athleteId);
        if (statsData) {
            setActivities(statsData.recent_runs || []); // Assuming getAthleteStats returns an array of activities or similar structure
            setStats({
                distance: (statsData.all_run_totals.distance / 1000).toFixed(1),
                runs: statsData.all_run_totals.count
            });
        }
    };

    const handleLogin = () => {
        window.location.href = getStravaAuthUrl();
    };

    const handleLogout = () => {
        localStorage.removeItem('strava_access_token');
        localStorage.removeItem('strava_athlete');
        setIsAuthenticated(false);
        setUserProfile(null);
        setActivities([]);
        setStats({ distance: "0.0", runs: 0 });
    };


    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black text-white pt-32 px-6">


            {/* Background - Removed DotGrid as requested */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Stats & Auth */}
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                            YOUR<br />ACTIVITY
                        </h1>
                        <p className="text-xl text-gray-400 font-light max-w-md">
                            Track your progress, analyze your pace, and sync with the community.
                        </p>
                    </div>

                    {/* Strava Auth Section */}
                    <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm">
                        {!isAuthenticated ? (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-[#FC4C02] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold">Connect with Strava</h3>
                                <p className="text-gray-400 text-sm">
                                    Sync your runs to appear on the community leaderboard and track your weekly mileage.
                                </p>
                                <button
                                    onClick={handleLogin}
                                    className="w-full py-4 bg-[#FC4C02] hover:bg-[#e34402] text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-95"
                                >
                                    CONNECT STRAVA
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img src={userProfile.profile} alt={userProfile.firstname} className="w-12 h-12 rounded-full border-2 border-[#FC4C02]" />
                                        <div>
                                            <h3 className="font-bold text-lg">{userProfile.firstname} {userProfile.lastname}</h3>
                                            <p className="text-xs text-gray-400">{userProfile.city}, {userProfile.state}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-white transition-colors">
                                        DISCONNECT
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">RUNS</p>
                                        <p className="text-2xl font-black text-white">{stats.runs}</p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">DISTANCE</p>
                                        <p className="text-2xl font-black text-white">
                                            {stats.distance}k
                                        </p>
                                    </div>
                                    <div className="bg-black/40 p-4 rounded-xl text-center border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">TIME</p>
                                        <p className="text-2xl font-black text-white">
                                            {Math.round(activities.reduce((acc, curr) => acc + curr.moving_time, 0) / 3600)}h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Leaderboard */}
                <div className="flex flex-col items-center lg:items-end space-y-8 pt-8 lg:pt-0">
                    <StravaLeaderboard />

                    {/* Placeholder for future charts or more stats */}
                    <div className="w-full max-w-md p-6 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm text-center">
                        <p className="text-sm text-gray-500 italic">
                            "The only bad run is the one that didn't happen."
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
