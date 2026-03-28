"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(255,255,255,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "CypherConnect",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background video and gradient overlay */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 w-full h-full object-cover grayscale opacity-60"
            >
                <source src="/herobg.mov" type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            {/* Path overlays */}
            <div className="absolute inset-0 z-10 mix-blend-screen opacity-50">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-20 container mx-auto px-4 md:px-6 text-center pt-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* The Logo from the user's public folder, filtered to pure #FFFFFF while maintaining deep texture shading */}
                    <div className="flex justify-center mb-6">
                        <img 
                            src="/cypherlogo 1.svg" 
                            alt="CypherConnect Logo" 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain grayscale brightness-[5] contrast-[2] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                        />
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <div
                        className="inline-block group relative bg-black/40 p-px rounded-3xl backdrop-blur-md 
                        overflow-hidden border border-white/20 transition-all duration-300 hover:border-white/40"
                    >
                        <Button
                            variant="ghost"
                            asChild
                            className="rounded-[1.4rem] px-8 py-6 text-sm sm:text-lg font-semibold bg-transparent hover:bg-white hover:text-black text-white transition-all duration-300 tracking-wide"
                        >
                            <Link to="/sign-in">
                                <span className="opacity-100 transition-opacity">
                                    Enter the Cypher
                                </span>
                                <span
                                    className="ml-3 opacity-100 group-hover:translate-x-1.5 transition-all duration-300"
                                >
                                    →
                                </span>
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
