"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function CameraRig() {
  const { camera } = useThree();
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

  useEffect(() => {
    // We animate the camera's Z and Y position based on scroll.
    // The hero abstract horse is at [0, 0, -5], Hero Camera is at [0, 0, 10]
    // The Services Nodes are arranged from Z = -15 to -55
    // Contact is at the end.

    const tl = timeline.current;
    
    // Hard-reset the camera position to pristine defaults before building the GSAP timeline.
    // This fixes a Next.js HMR bug where the camera's hot-reloaded state corrupts the target GSAP coordinates.
    camera.position.set(0, 0, 10);
    camera.rotation.set(0, 0, 0);
    
    // Clear existing tweens if re-running
    tl.clear();
    
    // Position 1: Move through the abstract horse towards services
    tl.to(camera.position, {
      z: -10,
      y: 0,
      duration: 1,
      ease: "power1.inOut"
    }, 0);

    // Position 2: Fly past Service 1 and 2
    tl.to(camera.position, {
      z: -30,
      y: 1,
      duration: 1,
      ease: "power1.inOut"
    }, 1);

    // Position 3: Fly past Service 3 and 4
    tl.to(camera.position, {
      z: -50,
      y: 0,
      duration: 1,
      ease: "power1.inOut"
    }, 2);

    // Position 4: Arrive near end of services
    tl.to(camera.position, {
      z: -65,
      y: -2,
      duration: 1,
      ease: "power1.inOut"
    }, 3);

    // Position 5: Slow drift through the void while user scrolls HTML content
    tl.to(camera.position, {
      z: -120, // Keep pushing deep into the fog and sparkles
      y: -5,
      duration: 3, // Stretches over the remaining 600vh scroll
      ease: "none"
    }, 4);

    // We sync this timeline to global window scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Update GSAP timeline progress
      tl.progress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [camera]);

  return null;
}
