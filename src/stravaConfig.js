// STRAVA CONFIGURATION
export const STRAVA_CLIENT_ID = "185686";
export const STRAVA_CLIENT_SECRET = "2815b298aea14fa13172cb111951ab0cd7ea34e5";

// This MUST match exactly what you set in Strava website settings
export const REDIRECT_URI = "http://localhost:5173/activity";

export const getStravaAuthUrl = () => {
    return `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=activity:read_all&approval_prompt=force`;
};

export const exchangeToken = async (authCode) => {
    try {
        const url = `https://www.strava.com/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${authCode}&grant_type=authorization_code`;

        const response = await fetch(url, { method: "POST" });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error exchanging token:", error);
        return null;
    }
};

export const getAthleteStats = async (accessToken, athleteId) => {
    try {
        const response = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching stats:", error);
        return null;
    }
};
