import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero3DSymbol() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

        // CHANGED: Moved camera back further (z: 18) to make symbol smaller
        camera.position.set(0, 2, 18);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        // Initial size estimate, resized immediately by listener
        renderer.setSize(window.innerWidth / 2, window.innerHeight * 0.7);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        if (mountRef.current) {
            while(mountRef.current.firstChild) mountRef.current.removeChild(mountRef.current.firstChild);
            mountRef.current.appendChild(renderer.domElement);
        }

        // === LIGHTING ===
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        const mainLight = new THREE.DirectionalLight(0xEF3E63, 3);
        mainLight.position.set(10, 10, 5);
        scene.add(mainLight);
        const rimLight = new THREE.SpotLight(0x2E2F7E, 5);
        rimLight.position.set(-10, 5, -10);
        scene.add(rimLight);

        // === THE 3D SYMBOL ===
        const geometry = new THREE.TorusKnotGeometry(2.5, 0.8, 150, 20, 3, 4);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff, metalness: 0.1, roughness: 0.05, transmission: 0.95, thickness: 1.5, clearcoat: 1, clearcoatRoughness: 0, emissive: 0xEF3E63, emissiveIntensity: 0.2
        });
        const mainMesh = new THREE.Mesh(geometry, glassMaterial);

        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x61CE70, transparent: true, opacity: 0.15, side: THREE.BackSide, blending: THREE.AdditiveBlending
        });
        const glowMesh = new THREE.Mesh(geometry, glowMaterial);
        glowMesh.scale.setScalar(1.05);

        const symbolGroup = new THREE.Group();
        symbolGroup.add(mainMesh);
        symbolGroup.add(glowMesh);
        scene.add(symbolGroup);

        // === ANIMATION ===
        const clock = new THREE.Clock();
        let animationId;
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            symbolGroup.rotation.x = elapsedTime * 0.2;
            symbolGroup.rotation.y = elapsedTime * 0.3;
            symbolGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.5;
            symbolGroup.rotation.z = Math.cos(elapsedTime * 0.4) * 0.1;
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(tick);
        };
        tick();

        // === RESIZE ===
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);
        // Delay slightly to ensure container is rendered
        setTimeout(handleResize, 100);

        // Mouse Parallax
        const onMouseMove = (e) => {
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            gsap.to(symbolGroup.rotation, {
                x: mouseY * 0.3 + (clock.getElapsedTime() * 0.2),
                y: mouseX * 0.3 + (clock.getElapsedTime() * 0.3),
                duration: 1, ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationId);
            if (mountRef.current) mountRef.current.innerHTML = '';
            geometry.dispose();
        };
    }, []);

    return <div ref={mountRef} className="hero-3d-canvas-container" />;
}