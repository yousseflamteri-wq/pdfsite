'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroVisual() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(2.2, 0.7, 16, 60);
    const material = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 0.5;
      mouseY = (event.clientY / innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;
    const animate = () => {
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.003;

      torus.rotation.x += (mouseY - torus.rotation.x * 0.1) * 0.05;
      torus.rotation.y += (mouseX - torus.rotation.y * 0.1) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
    />
  );
}