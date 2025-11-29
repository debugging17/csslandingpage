"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useStore } from "@/store/useStore";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { mode } = useStore();
    const isWhiteSection = mode === 'drift';
    const isHero = mode === 'chaos';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [hovered, setHovered] = useState<null | 'quote' | 'audit'>(null);

    return (
        <header className="fixed top-0 left-0 w-full z-[60] pointer-events-none flex justify-center">
            <div
                className={`
          pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
          flex items-center justify-between
          ${isScrolled && !isHero
                        ? isWhiteSection
                            ? "mt-6 w-[95%] md:w-auto md:min-w-[800px] rounded-full bg-midnight/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-2xl shadow-primary/20 px-8 py-4"
                            : "mt-6 w-[95%] md:w-auto md:min-w-[800px] rounded-full bg-white/60 backdrop-blur-2xl backdrop-saturate-150 border border-primary/20 shadow-2xl shadow-primary/10 px-8 py-4"
                        : "mt-0 w-full max-w-none bg-transparent border-transparent px-6 md:px-12 py-6"
                    }
        `}
            >
                <Link
                    href="/"
                    className="flex items-center hover:opacity-80 transition-opacity"
                >
                    {isScrolled && !isWhiteSection && !isHero ? (
                        <div
                            className="w-[150px] md:w-[200px] h-12 md:h-16 bg-midnight transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                            style={{
                                maskImage: 'url(/logo.png)',
                                WebkitMaskImage: 'url(/logo.png)',
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskPosition: 'center'
                            }}
                        />
                    ) : (
                        <Image
                            src="/logo.png"
                            alt="Cloudstream Systems"
                            width={300}
                            height={100}
                            className={`w-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isScrolled ? "h-12 md:h-16" : "h-16 md:h-24"} brightness-0 invert`}
                            priority
                        />
                    )}
                </Link>

                <div className={`flex items-center gap-3 md:gap-6 transition-opacity duration-500 ${isHero && isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <Link
                        href="#contact"
                        onMouseEnter={() => setHovered('quote')}
                        onMouseLeave={() => setHovered(null)}
                        className={`
              hidden md:block px-6 py-3 rounded-full font-mono font-bold text-xs md:text-sm transition-all duration-300 ease-out border
              ${hovered
                                ? "bg-transparent border-white text-highlight"
                                : "bg-highlight text-white border-transparent"
                            }
            `}
                    >
                        REQUEST_QUOTE
                    </Link>

                    <Link
                        href="#audit"
                        onMouseEnter={() => setHovered('audit')}
                        onMouseLeave={() => setHovered(null)}
                        className={`px-8 py-3 rounded-full transition-all duration-300 ease-out font-mono font-bold text-xs md:text-sm tracking-wide
              ${hovered === 'audit' || hovered === 'quote'
                                ? "bg-highlight text-white border-transparent"
                                : "bg-highlight/10 border border-highlight text-highlight"
                            }
            `}
                    >
                        GET_AUDIT
                    </Link>
                </div>
            </div>
        </header>
    );
}
