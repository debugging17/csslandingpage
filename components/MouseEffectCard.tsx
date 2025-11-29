"use client";

/**
 * @author: @dorian_baffier
 * @description: Mouse Effect Card - Interactive card with animated dot pattern that responds to mouse movement
 * @version: 1.0.0
 * @date: 2025-01-30
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };
const OPACITY_DURATION_BASE = 0.8;
const OPACITY_DURATION_VARIATION = 0.2;
const OPACITY_EASE = [0.4, 0, 0.2, 1] as const;
const OPACITY_DELAY_CYCLE = 1.5;
const OPACITY_DELAY_STEP = 0.02;
const MIN_OPACITY_MULTIPLIER = 0.5;
const MAX_OPACITY_MULTIPLIER = 1.5;
const MIN_OPACITY_FALLBACK = 0.3;
const PROXIMITY_MULTIPLIER = 1.2;
const PROXIMITY_OPACITY_BOOST = 0.8;

export interface MouseEffectCardProps {
    className?: string;
    children?: React.ReactNode;
    dotSize?: number;
    dotSpacing?: number;
    repulsionRadius?: number;
    repulsionStrength?: number;
    title?: string;
    subtitle?: string;
    topText?: string;
    topSubtext?: string;
    primaryCtaText?: string;
    primaryCtaUrl?: string;
    secondaryCtaText?: string;
    secondaryCtaUrl?: string;
    footerText?: string;
    titleClassName?: string;
    dashboard?: React.ReactNode;
}

interface Dot {
    id: string;
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    opacity: number;
}

interface DotComponentProps {
    dot: Dot;
    index: number;
    dotSize: number;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
    repulsionRadius: number;
    repulsionStrength: number;
}

function calculateDistance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function generateDots(
    width: number,
    height: number,
    spacing: number
): Dot[] {
    const dots: Dot[] = [];
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

    for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
            const x = col * spacing;
            const y = row * spacing;

            // Calculate distance from center
            const dx = x - centerX;
            const dy = y - centerY;
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

            // Calculate edge factor (0 at edges, 1 at center)
            const edgeFactor = Math.min(distanceFromCenter / (maxDistance * 0.7), 1);

            // Skip dots near edges with probability based on distance
            if (Math.random() > edgeFactor) {
                continue;
            }

            const pattern = (row + col) % 3;
            const baseOpacities = [0.3, 0.5, 0.7];
            const opacity = baseOpacities[pattern] * edgeFactor;

            dots.push({
                id: `dot-${row}-${col}`,
                x,
                y,
                baseX: x,
                baseY: y,
                opacity,
            });
        }
    }

    return dots;
}

function DotComponent({
    dot,
    index,
    dotSize,
    mouseX,
    mouseY,
    repulsionRadius,
    repulsionStrength,
}: DotComponentProps) {
    const posX = useTransform([mouseX, mouseY], () => {
        const mx = mouseX.get();
        const my = mouseY.get();

        if (!Number.isFinite(mx) || !Number.isFinite(my)) {
            return 0;
        }

        const dx = dot.baseX - mx;
        const dy = dot.baseY - my;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) {
            const force = (1 - distance / repulsionRadius) * repulsionStrength;
            const angle = Math.atan2(dy, dx);
            return Math.cos(angle) * force;
        }

        return 0;
    });

    const posY = useTransform([mouseX, mouseY], () => {
        const mx = mouseX.get();
        const my = mouseY.get();

        if (!Number.isFinite(mx) || !Number.isFinite(my)) {
            return 0;
        }

        const dx = dot.baseX - mx;
        const dy = dot.baseY - my;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) {
            const force = (1 - distance / repulsionRadius) * repulsionStrength;
            const angle = Math.atan2(dy, dx);
            return Math.sin(angle) * force;
        }

        return 0;
    });

    const opacityBoost = useTransform([mouseX, mouseY], () => {
        const mx = mouseX.get();
        const my = mouseY.get();

        if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

        const distance = calculateDistance(dot.baseX, dot.baseY, mx, my);
        const maxDistance = repulsionRadius * PROXIMITY_MULTIPLIER;

        if (distance < maxDistance) {
            const proximityFactor = 1 - distance / maxDistance;
            return proximityFactor * PROXIMITY_OPACITY_BOOST;
        }

        return 0;
    });

    const x = useSpring(posX, SPRING_CONFIG);
    const y = useSpring(posY, SPRING_CONFIG);

    const baseMinOpacity = Math.max(
        dot.opacity * MIN_OPACITY_MULTIPLIER,
        MIN_OPACITY_FALLBACK
    );
    const baseMaxOpacity = Math.min(dot.opacity * MAX_OPACITY_MULTIPLIER, 1);

    const minOpacityWithBoost = useTransform(opacityBoost, (boost) =>
        Math.min(baseMinOpacity + boost, 1)
    );

    const delay = (index * OPACITY_DELAY_STEP) % OPACITY_DELAY_CYCLE;

    return (
        <motion.div
            className="absolute rounded-full bg-zinc-400 dark:bg-zinc-600 will-change-transform"
            style={{
                width: dotSize,
                height: dotSize,
                left: dot.baseX,
                top: dot.baseY,
                x,
                y,
                opacity: useSpring(minOpacityWithBoost, {
                    stiffness: 150,
                    damping: 25,
                }),
            }}
            initial={{ opacity: baseMinOpacity }}
            animate={{
                opacity: [baseMinOpacity, baseMaxOpacity, baseMinOpacity],
            }}
            transition={{
                opacity: {
                    duration:
                        OPACITY_DURATION_BASE +
                        (index % 4) * OPACITY_DURATION_VARIATION,
                    repeat: Infinity,
                    ease: OPACITY_EASE,
                    delay,
                    times: [0, 0.5, 1],
                },
            }}
        />
    );
}

export default function MouseEffectCard({
    className,
    children,
    dotSize = 2,
    dotSpacing = 16,
    repulsionRadius = 80,
    repulsionStrength = 20,
    title,
    subtitle,
    topText,
    topSubtext,
    primaryCtaText,
    primaryCtaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
    footerText,
    titleClassName,
    dashboard,
}: MouseEffectCardProps) {
    const innerContainerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);
    const [dots, setDots] = useState<Dot[]>([]);

    useEffect(() => {
        const updateDots = () => {
            if (!innerContainerRef.current) return;
            const rect = innerContainerRef.current.getBoundingClientRect();
            const newDots = generateDots(rect.width, rect.height, dotSpacing);
            setDots(newDots);
        };

        updateDots();

        const resizeObserver = new ResizeObserver(updateDots);
        if (innerContainerRef.current) {
            resizeObserver.observe(innerContainerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [dotSpacing]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!innerContainerRef.current) return;

        const rect = innerContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
    };

    return (
        <Card className={cn("relative w-full rounded-2xl shadow-none max-w-md overflow-hidden  border border-white/40 dark:border-white/10 p-0", className)}>
            <CardContent
                ref={innerContainerRef}
                className="relative w-full min-h-[100dvh] h-auto overflow-hidden p-0"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {dots.map((dot, index) => (
                    <DotComponent
                        key={dot.id}
                        dot={dot}
                        index={index}
                        dotSize={dotSize}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        repulsionRadius={repulsionRadius}
                        repulsionStrength={repulsionStrength}
                    />
                ))}

                {topText && (
                    <div className="absolute top-6 left-6 z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/60 dark:bg-zinc-950/60 blur-lg rounded-lg" />
                            <div className="relative flex flex-col gap-1">
                                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                                    {topText}
                                </p>
                                {topSubtext && (
                                    <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 opacity-70">
                                        {topSubtext}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative z-10 flex flex-col items-center h-full px-4 pb-8">
                    {/* Spacer to push content down below header */}
                    <div className="shrink-0 h-48 md:h-64" />

                    <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto text-center">
                        {/* Status Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase mb-4"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            System Status: Online
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 blur-3xl rounded-full opacity-50" />
                            <h2 className={cn("relative text-5xl md:text-8xl font-bold text-zinc-900 dark:text-white tracking-tighter leading-tight", titleClassName)}>
                                Is Your Digital <br className="hidden md:block" />
                                Foundation <span className="text-primary inline-block hover:scale-105 transition-transform duration-500 cursor-default">Cracking?</span>
                            </h2>
                        </motion.div>

                        {(subtitle || children) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-white/60 dark:bg-zinc-950/60 blur-2xl rounded-lg opacity-40" />
                                <p className="relative text-lg md:text-xl text-zinc-700 dark:text-gray-400 leading-relaxed max-w-2xl font-mono">
                                    <span className="text-primary/50 mr-2">//</span>
                                    {children || subtitle}
                                </p>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col md:flex-row items-center justify-center gap-6 mt-6"
                        >
                            {/* Primary CTA (Magnetic Glow) */}
                            <a
                                href={primaryCtaUrl}
                                className="group relative px-8 py-4 bg-white/5 border border-white/10 overflow-hidden transition-all hover:border-highlight/50 rounded-none"
                                onClick={(e) => {
                                    if (primaryCtaUrl === "#") e.preventDefault();
                                }}
                            >
                                <div className="absolute inset-0 bg-highlight/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <div className="relative flex items-center gap-3">
                                    <span className="font-mono text-sm font-bold tracking-widest text-highlight group-hover:text-highlight/80">
                                        [ {primaryCtaText} ]
                                    </span>
                                </div>
                            </a>

                            {/* Secondary Link */}
                            {secondaryCtaText && (
                                <a
                                    href={secondaryCtaUrl}
                                    className="text-sm font-sans text-gray-500 hover:text-white transition-colors tracking-wide border-b border-transparent hover:border-white/20 pb-1"
                                    onClick={(e) => {
                                        if (secondaryCtaUrl === "#") e.preventDefault();
                                    }}
                                >
                                    {secondaryCtaText}
                                </a>
                            )}
                        </motion.div>
                    </div>

                    {/* Dashboard Preview */}
                    {dashboard}

                    {/* Spacer to push footer to bottom */}
                    <div className="flex-grow" />

                    {/* Technical Footer */}
                    <div className="w-full flex justify-between items-end text-[10px] font-mono text-gray-600 dark:text-gray-600 select-none pointer-events-none px-6">
                        <div>
                            <p>LAT: 51.5074 N</p>
                            <p>LNG: 0.1278 W</p>
                        </div>
                        <div className="flex gap-4">
                            <span>SECURE_CONNECTION</span>
                            <span>ENCRYPTED_256</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
