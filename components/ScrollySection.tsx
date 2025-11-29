"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore, ScrollMode } from "../store/useStore";

gsap.registerPlugin(ScrollTrigger);

interface ScrollySectionProps {
    mode: ScrollMode;
    children: React.ReactNode;
    className?: string;
}

import { cn } from "@/lib/utils";

export default function ScrollySection({ mode, children, className = "" }: ScrollySectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const setMode = useStore((state) => state.setMode);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setMode(mode),
            onEnterBack: () => setMode(mode),
            // Optional: revert to previous state or just let the next/prev trigger handle it
        });

        return () => {
            // Cleanup triggers if needed, though usually handled by GSAP
        };
    }, [mode, setMode]);

    return (
        <div ref={containerRef} className={cn("min-h-screen flex items-center justify-center relative", className)}>
            {children}
        </div>
    );
}
