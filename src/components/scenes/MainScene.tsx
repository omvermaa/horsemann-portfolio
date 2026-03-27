"use client";

import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { Suspense } from "react";
import SwirlingCard from "../models/SwirlingCard";
import CameraRig from "../animations/CameraRig";

export default function MainScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{
        width: "100%",
        height: "100%",
        background: "#F4F4F5", // Light theme background
      }}
      dpr={[1, 2]} // Performance optimization
    >
      {/* Fog matched to background color */}
      <fog attach="fog" args={["#F4F4F5", 10, 40]} />

      {/* Soft directional lighting for light theme */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      
      {/* Gold/Orange Accent Light */}
      <pointLight position={[-5, 5, 5]} intensity={30} color="#ECA322" distance={20} />
      {/* Blue AI Accent Light */}
      <pointLight position={[5, -5, -5]} intensity={30} color="#3A7DE8" distance={20} />

      <Suspense fallback={null}>
        
        {/* Soft, clean Grid floor */}
        <Grid 
          position={[0, -5, 0]} 
          args={[100, 100]} 
          cellColor="#E4E4E7" 
          cellThickness={1} 
          sectionColor="#D4D4D8" 
          sectionSize={3} 
          fadeDistance={40} 
        />
        
        <CameraRig />
        <SwirlingCard />
      </Suspense>
    </Canvas>
  );
}
