"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import EntropyParticles from "./EntropyParticles";
import Tesseract from "./Tesseract";

export default function Scene() {
    const [particleCount, setParticleCount] = useState(1500);

    useEffect(() => {
        // Detect mobile devices based on viewport width
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            setParticleCount(isMobile ? 500 : 1500);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                dpr={[1, 2]} // Handle high DPI screens
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={["#1e1b4b"]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0055" />

                <Suspense fallback={null}>
                    <EntropyParticles count={particleCount} />
                    <Tesseract />
                </Suspense>

                {/* Fog for depth */}
                <fog attach="fog" args={["#1e1b4b", 5, 30]} />
            </Canvas>
        </div>
    );
}
