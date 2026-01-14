import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
    const siteTitle = "Rhythm Run Club | Yelahanka";
    const defaultDescription = "Join the premiere running community in Yelahanka, Bengaluru. No pace requirements. No ego. Just vibes. Weekly 5K/10K runs.";
    const defaultKeywords = "running club, bengaluru, yelahanka, run club, marathon training, fitness, community, social running";

    return (
        <Helmet>
            <title>{title ? `${title} | Rhythm SC` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />

            {/* Geo Tags for Local SEO */}
            <meta name="geo.region" content="IN-KA" />
            <meta name="geo.placename" content="Bengaluru" />
            <meta name="geo.position" content="13.0768;77.5753" />
            <meta name="ICBM" content="13.0768, 77.5753" />
        </Helmet>
    );
}
