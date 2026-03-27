"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";

// Services Data Map Based on Instructions
const services = [
  { id: 1, title: "WebApp Development", desc: "Scalable, high-performance web applications built for speed, reliability, and growth.", color: "#5A8DEE", position: [-5, 0, -15] },
  { id: 2, title: "Digital Marketing", desc: "Data-driven marketing strategies designed to maximize reach, conversions, and ROI.", color: "#C6A15B", position: [5, 2, -25] },
  { id: 3, title: "Social Media", desc: "Content and growth systems that turn attention into engagement and brand loyalty.", color: "#EAEAEA", position: [-4, -2, -35] },
  { id: 4, title: "AI Receptionist Agent", desc: "24/7 intelligent agents handling customer queries, lead qualification, and sales interactions.", color: "#5A8DEE", position: [4, 1, -45] },
  { id: 5, title: "Graphic Designing", desc: "Visual identities and creatives crafted to communicate clarity, trust, and impact.", color: "#C6A15B", position: [0, -1, -55] },
];

function ServiceNode({ service }: { service: typeof services[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth hover effects
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Scale lerp
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
    
    if (materialRef.current) {
      // Glow intensity lerp
      const targetEmissive = hovered ? 0.8 : 0.2;
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        delta * 5
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={service.position as [number, number, number]}>
        {/* Node Panel */}
        <RoundedBox 
          args={[4, 2.5, 0.2]} 
          radius={0.05} 
          smoothness={4}
          ref={meshRef as any}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial 
            ref={materialRef}
            color="#08080A" // Deep premium black-grey
            emissive={service.color}
            emissiveIntensity={0.1}
            roughness={0.15}
            metalness={0.2}
            transmission={0.9} // Glass effect
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.95}
          />
          <Edges 
            linewidth={2} 
            threshold={15} 
            color={hovered ? service.color : "#222228"} 
          />
        </RoundedBox>
        
        {/* Node Content / Text */}
        <Text
          position={[0, 0.5, 0.15]}
          fontSize={0.3}
          color="#EAEAEA"
          anchorX="center"
          anchorY="middle"
        >
          {service.title}
        </Text>
        
        {hovered && (
          <Text
            position={[0, -0.2, 0.15]}
            fontSize={0.15}
            color="#A0A0A5"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.5}
            textAlign="center"
          >
            {service.desc}
          </Text>
        )}
      </group>
    </Float>
  );
}

export default function ServicesNodes() {
  return (
    <group>
      {services.map((svc) => (
        <ServiceNode key={svc.id} service={svc} />
      ))}
    </group>
  );
}
