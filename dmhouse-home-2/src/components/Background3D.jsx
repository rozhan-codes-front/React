import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        // === CONFIGURATION ===
        const CONFIG = {
            colors: [0xEF3E63, 0x2E2F7E, 0x61CE70],
            worldHeight: 80, // Taller world to prevent popping at edges
            count: 55        // Number of thin wireframe objects
        };

        // === 1. SETUP ===
        const scene = new THREE.Scene();
        // No Fog, so they stay crisp against the glass background

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (mountRef.current) {
            mountRef.current.innerHTML = '';
            mountRef.current.appendChild(renderer.domElement);
        }

        // === 2. CREATE THIN WIREFRAME OBJECTS ===
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const particlesGroup = new THREE.Group();
        const particles = [];

        for (let i = 0; i < CONFIG.count; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
                wireframe: true, // THIN LINES
                transparent: true,
                opacity: 0.6 // Visible against the glass
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Random Spread
            mesh.position.x = (Math.random() - 0.5) * 45;
            mesh.position.z = (Math.random() - 0.5) * 25;

            // Random Scale
            mesh.scale.setScalar(Math.random() * 0.8 + 0.3);

            // Store initial random Y for infinite logic
            mesh.userData = {
                rndY: Math.random() * CONFIG.worldHeight,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                yOffset: Math.random() * Math.PI * 2
            };

            particles.push(mesh);
            particlesGroup.add(mesh);
        }
        scene.add(particlesGroup);

        // === 3. ROBUST INFINITE SCROLL LOOP ===
        const clock = new THREE.Clock();
        let animationId;

        // Helper to handle modulo with negative numbers correctly
        const safeMod = (n, m) => ((n % m) + m) % m;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Camera moves down as we scroll
            const scrollY = window.scrollY || 0;
            camera.position.y = -(scrollY * 0.02);

            particles.forEach(mesh => {
                // Rotation & Bobbing
                mesh.rotation.x += mesh.userData.rotSpeed;
                mesh.rotation.y += mesh.userData.rotSpeed;
                const floatY = Math.sin(elapsedTime + mesh.userData.yOffset) * 1.5;

                // --- INFINITE MATH FIX ---
                // 1. Calculate the distance between the object's "home" Y and the camera Y
                const diff = mesh.userData.rndY - camera.position.y;

                // 2. Wrap this distance within 0 to worldHeight
                const wrappedDiff = safeMod(diff, CONFIG.worldHeight);

                // 3. Position the object relative to the camera, centered
                // This ensures the "box" of objects travels WITH the camera forever
                mesh.position.y = camera.position.y + wrappedDiff - (CONFIG.worldHeight / 2) + floatY;
            });

            // Slowly rotate the whole world for dynamism
            particlesGroup.rotation.y = elapsedTime * 0.05;

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(tick);
        };

        tick();

        // === 4. RESIZE ===
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // === 5. CLEANUP ===
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (mountRef.current) mountRef.current.innerHTML = '';
            geometry.dispose();
            particles.forEach(p => p.material.dispose());
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // Z-INDEX: 0 sits between Glass (-1) and Content (1)
                zIndex: 0,
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
}