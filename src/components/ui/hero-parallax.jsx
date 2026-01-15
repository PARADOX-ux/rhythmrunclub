"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

export const HeroParallax = ({
    products
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
    const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
    const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
    const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);

    return (
        (<div
            ref={ref}
            className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className="">
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row mb-20 space-x-20">
                    {secondRow.map((product) => (
                        <ProductCard product={product} translate={translateXReverse} key={product.title} />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard product={product} translate={translateX} key={product.title} />
                    ))}
                </motion.div>
            </motion.div>
        </div>)
    );
};

export const Header = () => {
    return (
        (<div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-black italic tracking-tighter text-white">
                WE RUN <br />
                <span className="text-orange-500">THE NIGHT.</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    BENGALURU.
                </span>
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-200 font-light">
                We are a collective of dreamers, doers, and night owls.
                We run to escape, to connect, and to feel alive.
                <span className="text-orange-500 font-bold ml-1">No Pace Requirements. No Ego. Just Vibes.</span>
            </p>
        </div>)
    );
};

export const ProductCard = ({
    product,
    translate
}) => {
    return (
        (<motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-96 w-[30rem] relative flex-shrink-0">
            <Link
                to={product.link}
                className="block group-hover/product:shadow-2xl">
                <img
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl grayscale group-hover/product:grayscale-0 transition-all duration-500 border border-white/10 group-hover/product:border-orange-500"
                    alt={product.title} />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white font-black italic tracking-wider text-2xl transition-opacity duration-300">
                {product.title}
            </h2>
            <div className="absolute top-4 right-4 opacity-0 group-hover/product:opacity-100 bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded transition-opacity duration-300">
                EXPLORE
            </div>
        </motion.div>)
    );
};
