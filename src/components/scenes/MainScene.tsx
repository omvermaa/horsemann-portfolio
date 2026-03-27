"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles, Grid } from "@react-three/drei";
import { Suspense } from "react";
import AbstractHorse from "../models/AbstractHorse";
import ServicesNodes from "./ServicesNodes";
import CameraRig from "../animations/CameraRig";

export default function MainScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0D", // Deep black background
      }}
      dpr={[1, 2]} // Performance optimization
    >
      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#0B0B0D", 10, 40]} />

      {/* Soft directional lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      {/* Gold Accent Light */}
      <pointLight position={[-5, 5, 5]} intensity={50} color="#C6A15B" distance={20} />
      {/* Blue AI Accent Light */}
      <pointLight position={[5, -5, -5]} intensity={50} color="#5A8DEE" distance={20} />

      <Suspense fallback={null}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Floating atmospheric dust through the journey */}
        <Sparkles count={200} scale={[30, 20, 100]} position={[0, 0, -50]} size={2} speed={0.4} opacity={0.3} color="#C6A15B" />
        <Sparkles count={200} scale={[20, 20, 100]} position={[0, 0, -50]} size={1.5} speed={0.2} opacity={0.2} color="#5A8DEE" />
        
        {/* Structural ground plane */}
        <Grid 
          position={[0, -5, 0]} 
          args={[100, 100]} 
          cellColor="#222228" 
          cellThickness={1} 
          sectionColor="#0B0B0D" 
          sectionSize={3} 
          fadeDistance={40} 
        />
        
        <CameraRig />
        <AbstractHorse />
        <ServicesNodes />
      </Suspense>
    </Canvas>
  );
}
