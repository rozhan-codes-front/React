import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        // === CONFIGURATION ===
        const CONFIG = {
            colors: [0xEF3E63, 0x2E2F7E, 0x61CE70],
            worldHeight: 80,
            count: 45 // Slightly reduced count for less clutter
        };

        // === 1. SETUP ===
        const scene = new THREE.Scene();
        // We do NOT use fog here because it can mess with the transparency
        // needed to see the GlassBackground behind this layer.

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
                wireframe: true,
                transparent: true,
                // MELLOW FACTOR 1: Drastically reduced opacity (Subtle lines)
                opacity: 0.15
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = (Math.random() - 0.5) * 45;
            mesh.position.z = (Math.random() - 0.5) * 25;

            // Varied scales
            mesh.scale.setScalar(Math.random() * 0.8 + 0.3);

            mesh.userData = {
                rndY: Math.random() * CONFIG.worldHeight,
                rotSpeed: (Math.random() - 0.5) * 0.02,
                yOffset: Math.random() * Math.PI * 2
            };

            particles.push(mesh);
            particlesGroup.add(mesh);
        }
        scene.add(particlesGroup);

        // === 3. INFINITE SCROLL LOOP ===
        const clock = new THREE.Clock();
        let animationId;
        const safeMod = (n, m) => ((n % m) + m) % m;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            const scrollY = window.scrollY || 0;

            // Slower parallax for a calmer feel
            camera.position.y = -(scrollY * 0.015);

            particles.forEach(mesh => {
                mesh.rotation.x += mesh.userData.rotSpeed;
                mesh.rotation.y += mesh.userData.rotSpeed;

                // Gentler bobbing
                const floatY = Math.sin(elapsedTime + mesh.userData.yOffset) * 1.5;

                const diff = mesh.userData.rndY - camera.position.y;
                const wrappedDiff = safeMod(diff, CONFIG.worldHeight);

                mesh.position.y = camera.position.y + wrappedDiff - (CONFIG.worldHeight / 2) + floatY;
            });

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
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            {/* THE CANVAS CONTAINER */}
            <div
                ref={mountRef}
                style={{
                    width: '100%',
                    height: '100%',
                    // MELLOW FACTOR 2: Blur the wireframes slightly to look like etched glass
                    filter: 'blur(0.8px)',
                    opacity: 1
                }}
            />

            {/* THE GLASSY OVERLAY */}
            {/* MELLOW FACTOR 3: A white wash layer to reduce contrast */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(255, 255, 255, 0.25)', // Adjust opacity to fade shapes more/less
                    mixBlendMode: 'lighten'
                }}
            />
        </div>
    );
}