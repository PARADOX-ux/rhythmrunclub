// Replace these with your actual Strava API credentials
const CLIENT_ID = 'YOUR_STRAVA_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_STRAVA_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:5173/activity'; // Redirect back to Activity page

// Scopes: read, activity:read_all
const SCOPE = 'read,activity:read_all';

export const getStravaAuthUrl = () => {
    return `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=${SCOPE}`;
};

export const exchangeToken = async (authorizationCode) => {
    try {
        const response = await fetch(`https://www.strava.com/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: authorizationCode,
                grant_type: 'authorization_code',
            }),
        });

        const data = await response.json();
        if (data.errors) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error('Error exchanging token:', error);
        throw error;
    }
};

export const getAthleteStats = async (accessToken, athleteId) => {
    try {
        const response = await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

export const getAthleteActivities = async (accessToken) => {
    try {
        const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=5`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};
