import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        // CONFIG: High count and colors that pop against the glass
        const CONFIG = {
            colors: [0xEF3E63, 0x2E2F7E, 0x61CE70],
            worldHeight: 70,
            count: 60
        };

        const scene = new THREE.Scene();
        // REMOVED FOG: Fog obscures objects against a transparent background
        // scene.fog = new THREE.Fog(0xffffff, 10, 60);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Clean and Append
        if(mountRef.current) {
            mountRef.current.innerHTML = '';
            mountRef.current.appendChild(renderer.domElement);
        }

        // CREATE OBJECTS
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const particlesGroup = new THREE.Group();
        const particles = [];

        for (let i = 0; i < CONFIG.count; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
                wireframe: true,
                transparent: true,
                opacity: 0.7 // Increased opacity to show over the busy background
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 45,
                (Math.random() - 0.5) * CONFIG.worldHeight,
                (Math.random() - 0.5) * 25
            );
            mesh.scale.setScalar(Math.random() * 0.8 + 0.2);
            mesh.userData = {
                rotSpeed: (Math.random() - 0.5) * 0.02,
                yOffset: Math.random() * Math.PI * 2,
                rndY: Math.random() * CONFIG.worldHeight
            };
            particles.push(mesh);
            particlesGroup.add(mesh);
        }
        scene.add(particlesGroup);

        // ANIMATION
        const clock = new THREE.Clock();
        let animationId;
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            camera.position.y = -(window.scrollY * 0.015);

            particles.forEach(mesh => {
                mesh.rotation.x += mesh.userData.rotSpeed;
                mesh.rotation.y += mesh.userData.rotSpeed;
                const floatY = Math.sin(elapsedTime + mesh.userData.yOffset) * 1.5;
                const relativeY = (mesh.userData.rndY + camera.position.y) % CONFIG.worldHeight;
                mesh.position.y = camera.position.y - relativeY + (CONFIG.worldHeight / 2) + floatY;
            });

            particlesGroup.rotation.y = elapsedTime * 0.05;
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(tick);
        };
        tick();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if(mountRef.current) mountRef.current.innerHTML = '';
            geometry.dispose();
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
                // CRITICAL Z-INDEX: 0 puts it ON TOP of the Glass (-1)
                zIndex: 0,
                pointerEvents: 'none',
                // CRITICAL TRANSPARENCY: Must be transparent to see Glass behind it
                background: 'transparent'
            }}
        />
    );
}