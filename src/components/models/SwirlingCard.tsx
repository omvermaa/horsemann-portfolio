"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { RoundedBox, Text, Image } from "@react-three/drei";

export default function SwirlingCard() {
  const groupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const camZ = state.camera.position.z;

    // 1. Z position: Lock directly to camera Z (minus 8) without lerp lag.
    // Clamp at -73 so it stops perfectly before the Work section.
    groupRef.current.position.z = Math.max(camZ - 8, -73);

    // 2. Y position: Direct assignment to camera Y to prevent frame trailing, plus gentle float.
    groupRef.current.position.y = state.camera.position.y + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;

    // 3. X position: Completely Center when at the top (Hero). Slide to Right (2.8) for Services.
    let targetX = 0;
    if (camZ <= 5 && camZ >= -10) {
      targetX = 2.8 * ((5 - camZ) / 15); 
    } else if (camZ < -10) {
      targetX = 2.8;
    }
    groupRef.current.position.x = targetX;

    // Dim the card's backdrop dynamically when it is in the center
    if (overlayRef.current) {
      const isCenteredInfo = targetX < 1.0;
      (overlayRef.current.material as THREE.Material).opacity = isCenteredInfo ? 0.6 : 0.2; 
    }

    // 4. Rotation (Swirl): Map exactly to the camera's travel distance.
    // Camera travels from 10 down to -73 (distance of 83 units).
    const swirlProgress = Math.max(0, Math.min(1, (10 - camZ) / 83));
    groupRef.current.rotation.y = swirlProgress * Math.PI * 3;
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <RoundedBox args={[3.2, 5.5, 0.2]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial color="#18181A" roughness={0.1} metalness={0.9} clearcoat={1} />
      </RoundedBox>
      
      {/* Front Face with Image and Darkening Overlay */}
      <group position={[0, 0, 0.11]}>
        <Image 
          url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
          scale={[3.1, 5.4]} 
          position={[0, 0, 0]} 
          transparent
        />
        <mesh ref={overlayRef} position={[0, 0, 0.01]}>
           <planeGeometry args={[3.1, 5.4]} />
           <meshBasicMaterial color="#000000" transparent opacity={0.6} />
        </mesh>
        <Text position={[0, 1.5, 0.02]} fontSize={0.25} color="#ECA322" anchorX="center" fontWeight="bold">
          Digital Excellence
        </Text>
        <Text position={[0, 0, 0.02]} fontSize={0.15} color="#EAEAEA" maxWidth={2.5} textAlign="center" anchorX="center">
          Delivering premium digital assets that seamlessly marry high-performance logic with profound design.
        </Text>
      </group>

      {/* Back Content Face */}
      <group position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
        <Image 
          url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
          scale={[3.1, 5.4]} 
          position={[0, 0, 0]} 
          transparent
        />
        <mesh position={[0, 0, 0.01]}>
           <planeGeometry args={[3.1, 5.4]} />
           <meshBasicMaterial color="#000000" transparent opacity={0.4} />
        </mesh>
        <Text position={[0, 0, 0.02]} fontSize={0.3} color="#ffffff" anchorX="center" fontWeight="bold">
          [ Intelligence ]
        </Text>
      </group>
    </group>
  );
}
