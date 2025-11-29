"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../store/useStore";

interface EntropyParticlesProps {
    count?: number;
    colors?: string[];
}

interface ParticleData {
    t: number;
    factor: number;
    speed: number;
    xFactor: number;
    yFactor: number;
    zFactor: number;
    gx: number;
    gy: number;
    gz: number;
    mx: number;
    my: number;
    cx?: number;
    cy?: number;
    cz?: number;
}

export default function EntropyParticles({
    count = 1000,
    colors = ["#7076C6", "#7177C7", "#FF4500"] // Cloudstream accents
}: EntropyParticlesProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const mode = useStore((state) => state.mode);

    // Dummy object for matrix calculations
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Particle state
    const particles = useMemo(() => {
        const temp: ParticleData[] = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;

            // Grid position for "Order" state
            // Simple cubic grid
            const side = Math.ceil(Math.pow(count, 1 / 3));
            const spacing = 2;
            const gx = (i % side) * spacing - (side * spacing) / 2;
            const gy = (Math.floor(i / side) % side) * spacing - (side * spacing) / 2;
            const gz = (Math.floor(i / (side * side))) * spacing - (side * spacing) / 2;

            temp.push({
                t, factor, speed, xFactor, yFactor, zFactor,
                gx, gy, gz,
                mx: 0, my: 0
            });
        }
        return temp;
    }, [count]);

    // Initial positioning and coloring
    useEffect(() => {
        if (!meshRef.current) return;

        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            // Random position
            dummy.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            dummy.scale.setScalar(0.1 + Math.random() * 0.1);
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);

            // Random color from palette
            color.set(colors[Math.floor(Math.random() * colors.length)]);
            meshRef.current.setColorAt(i, color);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.instanceColor!.needsUpdate = true;
    }, [count, colors, dummy]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        const color = new THREE.Color();

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor, gx, gy, gz } = particle;

            // Update time
            t = particle.t += speed / 2;

            // Target position
            let tx = 0, ty = 0, tz = 0;
            let targetScale = 0;
            let targetColor = null;

            if (mode === 'chaos') {
                // Hide particles in chaos mode (Hero section) to reduce clutter behind the card
                targetScale = 0;

                // Keep moving them so they don't freeze when appearing
                const a = Math.cos(t) + Math.sin(t * 1) / 10;
                const b = Math.sin(t) + Math.cos(t * 2) / 10;
                tx = (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10;
                ty = (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10;
                tz = (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10;
            } else if (mode === 'drift') {
                // Slower, drifting motion
                tx = xFactor + Math.sin(t * 0.5) * 5;
                ty = yFactor + Math.cos(t * 0.3) * 5;
                tz = zFactor + Math.sin(t * 0.2) * 5;
                targetScale = 0.3;
            } else if (mode === 'warning') {
                // Jagged, fast motion, red color
                tx = xFactor + (Math.random() - 0.5) * 2;
                ty = yFactor + (Math.random() - 0.5) * 2;
                tz = zFactor + (Math.random() - 0.5) * 2;
                targetScale = 0.4;
                targetColor = "#ff0000"; // Red
            } else if (mode === 'order') {
                // Grid formation
                tx = gx;
                ty = gy;
                tz = gz;
                targetScale = 0.2;
                targetColor = "#00f3ff"; // Neon Blue
            }

            // Lerp current position to target (simple approach for now, reading from matrix is expensive so we just set it)
            // For smoother transitions we would need to store current pos in the particle object and lerp that.
            // Let's do a simple lerp on the particle object properties if we want smoothness, but for performance let's just calculate directly for now
            // except for 'order' where we want it to snap or move clearly.
            // Let's do a simple lerping.

            // Initialize current pos if not set
            if (particle.cx === undefined) { particle.cx = tx; particle.cy = ty; particle.cz = tz; }

            // Lerp factor
            const lerp = mode === 'warning' ? 0.1 : 0.05;

            // We know these are defined now because of the check above
            particle.cx = particle.cx! + (tx - particle.cx!) * lerp;
            particle.cy = particle.cy! + (ty - particle.cy!) * lerp;
            particle.cz = particle.cz! + (tz - particle.cz!) * lerp;

            dummy.position.set(particle.cx, particle.cy, particle.cz);

            // Scale
            dummy.scale.setScalar(targetScale);
            dummy.rotation.set(Math.cos(t), Math.sin(t), 0);
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);

            // Color updates
            if (targetColor) {
                color.set(targetColor);
                meshRef.current!.setColorAt(i, color);
            } else if (mode !== 'warning' && mode !== 'order') {
                // Revert to original random colors if needed, but we didn't store them per particle easily accessibly here without looking up.
                // For now, let's just leave color as is unless warning/order. 
                // Actually, let's reset to palette in chaos/drift if we can.
                // We can use the index to pick from palette deterministically.
                color.set(colors[i % colors.length]);
                meshRef.current!.setColorAt(i, color);
            }
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.instanceColor!.needsUpdate = true;
    });

    return (
        <>
            <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    toneMapped={false}
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                />
            </instancedMesh>
        </>
    );
}
