"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function AbstractHorse() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a minimal abstract particle cloud to represent the "Horsemann"
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Create an abstract elongated shape (tall, like a standing figure/horse)
      const x = (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 3;
      
      // Add some noise to center it
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [particlesCount]);

  // Subtle breathing animation for the particle cloud
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    
    // "Breathing" scale effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
      floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within
    >
      <points ref={pointsRef} position={[0, 0, -5]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#C6A15B"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </Float>
  );
}
