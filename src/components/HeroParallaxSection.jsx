"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

// Importing existing assets to ensure images load
import asset1 from '../assets/gallery_run_1.png';
import asset2 from '../assets/gallery_coffee_2.png';
import asset3 from '../assets/gallery_stretch_3.png';
import asset4 from '../assets/gallery_urban_4.png';
import asset5 from '../assets/bangalore.png';  // Using existing assets
import asset6 from '../assets/yelahanka.png';  // Using existing assets

// Map assets to a larger list by cycling through them
const getAsset = (index) => {
    const assets = [asset1, asset2, asset3, asset4, asset5, asset6];
    return assets[index % assets.length];
};

export function HeroParallaxSection() {
    return <HeroParallax products={products} />;
}

export const products = [
    {
        title: "MORNING RITUAL",
        link: "/events",
        thumbnail: getAsset(0),
    },
    {
        title: "URBAN EXPLORER",
        link: "/activity",
        thumbnail: getAsset(1),
    },
    {
        title: "NIGHT OWO SQUAD",
        link: "/about",
        thumbnail: getAsset(2),
    },
    {
        title: "MARATHON READY",
        link: "/events",
        thumbnail: getAsset(3),
    },
    {
        title: "STREET CULTURE",
        link: "/activity",
        thumbnail: getAsset(4),
    },
    {
        title: "COMMUNITY FIRST",
        link: "/about",
        thumbnail: getAsset(5),
    },
    {
        title: "PACE PUSHERS",
        link: "/events",
        thumbnail: getAsset(0),
    },
    {
        title: "COFFEE & MILES",
        link: "/activity",
        thumbnail: getAsset(1),
    },
    {
        title: "TRACK DAYS",
        link: "/events",
        thumbnail: getAsset(2),
    },
    {
        title: "TRAIL BLAZERS",
        link: "/activity",
        thumbnail: getAsset(3),
    },
    {
        title: "SUNDAY LONG RUN",
        link: "/events",
        thumbnail: getAsset(4),
    },
    {
        title: "NEW JOINERS",
        link: "/about",
        thumbnail: getAsset(5),
    },
    {
        title: "MEDAL MONDAY",
        link: "/activity",
        thumbnail: getAsset(0),
    },
    {
        title: "GEAR DROP",
        link: "/merch",
        thumbnail: getAsset(1),
    },
    {
        title: "RHYTHM ORIGINS",
        link: "/about",
        thumbnail: getAsset(2),
    },
];
