"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../store/useStore";

export default function Tesseract() {
    const groupRef = useRef<THREE.Group>(null);
    const mode = useStore((state) => state.mode);
    const { viewport } = useThree();

    useFrame((state) => {
        if (!groupRef.current) return;

        // Continuous slow rotation
        groupRef.current.rotation.x += 0.002;
        groupRef.current.rotation.y += 0.003;

        // Parallax effect based on mouse position
        const x = (state.pointer.x * viewport.width) / 10;
        const y = (state.pointer.y * viewport.height) / 10;

        // Smoothly lerp to mouse position
        groupRef.current.position.x += (x - groupRef.current.position.x) * 0.1;
        groupRef.current.position.y += (y - groupRef.current.position.y) * 0.1;
    });

    // Only visible in 'order' mode
    // We can animate opacity for a smoother transition later, but for now simple conditional rendering or scale
    // Let's use scale to pop it in
    const targetScale = mode === 'order' ? 1 : 0;

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
        }
    });

    return (
        <group ref={groupRef} scale={0}>
            {/* Ring 1 - Primary Purple */}
            <mesh rotation={[0, 0, 0]}>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#7076C6"
                    emissive="#7076C6"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* Ring 2 - Accent Purple */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#7177C7"
                    emissive="#7177C7"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>

            {/* Ring 3 - Highlight Green */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#FF4500"
                    emissive="#FF4500"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
}
