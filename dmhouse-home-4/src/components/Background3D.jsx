import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

export default function Background3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        // === CONFIGURATION ===
        const CONFIG = {
            colors: [0xEF3E63, 0x2E2F7E, 0x61CE70],
            worldHeight: 80,
            count: 45,

            svgUrls: [
                // Shape 1: Pill
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8yIiB2aWV3Qm94PSIwIDAgNjYuMTMgMTMyLjI1Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2VkMTI1MDt9PC9zdHlsZT48L2RlZnM+PGcgaWQ9IkxheWVyXzEtMiI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjYuMTMsMEMyOS42MSwwLDAsMjkuNjEsMCw2Ni4xM3MyOS42MSw2Ni4xMyw2Ni4xMyw2Ni4xM1YwWiIvPjwvZz48L3N2Zz4=',

                // Shape 2: Triangle
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8yIiB2aWV3Qm94PSIwIDAgMjA2LjA4IDY1Ljg0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2VkMTI1MDt9PC9zdHlsZT48L2RlZnM+PGcgaWQ9IkxheWVyXzEtMiI+PHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjEwMy4wNCAwIDAgNjUuODQgMjA2LjA4IDY1Ljg0IDEwMy4wNCAwIi8+PC9nPjwvc3ZnPg==',

                // Shape 3: Donut
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTIgMTRhMiAyIDAgMSAwIDAtNCAyIDIgMCAwIDAgMCA0WiIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjIgMTJjMCA1LjUyMy00LjQ3NyAxMC0xMCAxMFMyIDE3LjUyMyAyIDEyIDYuNDc3IDIgMTIgMnMxMCA0LjQ3NyAxMCAxMFptLTEwIDZhNiA2IDAgMSAwIDAtMTIgNiA2IDAgMCAwIDAgMTJaIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+',

                // Shape 4: Pie Chart
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgdmVyc2lvbj0iMS4xIj48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0iSWNvbi1TZXQtRmlsbGVkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTE4LjAwMDAwMCwgLTE1My4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj48cGF0aCBkPSJNNTMzLDE1MyBMNTMzLDE3MC4zIEw1NDguOTQ3LDE3NS4wODQgQzU0OS41NjgsMTczLjU0MyA1NTAsMTcxLjY4OCA1NTAsMTY5LjU3MSBDNTUwLDE2MC40MTkgNTQxLjQ1MywxNTMgNTMzLDE1MyBMNTMzLDE1MyBaIE01MzEsMTU2IEM1MjQuMDI5LDE1Ni43MjggNTE4LDE2My4wMjYgNTE4LDE3MC41IEM1MTgsMTc4LjUwOCA1MjQuNDkyLDE4NSA1MzIuNSwxODUgQzUzOC4zOTcsMTg1IDU0My40NjMsMTgxLjQ3NCA1NDUuNzI5LDE3Ni40MTggTDUzMSwxNzIgTDUzMSwxNTYgTDUzMSwxNTYgWiIgaWQ9InBpZS1jaGFydCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+'
            ]
        };

        // === 1. SETUP ===
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        // Use documentElement to ensure we capture full viewport even if body has margins
        renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (mountRef.current) {
            mountRef.current.innerHTML = '';
            mountRef.current.appendChild(renderer.domElement);
        }

        const particlesGroup = new THREE.Group();
        const particles = [];
        const loader = new SVGLoader();

        // === 2. LOADER HELPER ===
        const loadSVGGeometry = (url) => {
            return new Promise((resolve, reject) => {
                loader.load(
                    url,
                    (data) => {
                        const paths = data.paths;
                        const shapes = [];

                        paths.forEach((path) => {
                            const pathShapes = SVGLoader.createShapes(path);
                            shapes.push(...pathShapes);
                        });

                        if (shapes.length === 0) {
                            reject('No shapes found');
                            return;
                        }

                        const extrudeSettings = {
                            depth: 5,
                            bevelEnabled: true,
                            bevelThickness: 1,
                            bevelSize: 1,
                            bevelSegments: 2
                        };

                        const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
                        geometry.center();

                        geometry.computeBoundingBox();
                        const size = new THREE.Vector3();
                        geometry.boundingBox.getSize(size);
                        const maxDim = Math.max(size.x, size.y);
                        const scaleFactor = 2 / (maxDim || 1);

                        geometry.scale(scaleFactor, -scaleFactor, scaleFactor);

                        resolve(geometry);
                    },
                    undefined,
                    (error) => {
                        console.warn('SVG Load Error:', url);
                        resolve(null);
                    }
                );
            });
        };

        // === 3. BUILD SCENE ===
        Promise.all(CONFIG.svgUrls.map(url => loadSVGGeometry(url))).then((results) => {
            const geometries = results.filter(g => g !== null);

            if (geometries.length === 0) {
                geometries.push(new THREE.IcosahedronGeometry(1, 0));
            }

            for (let i = 0; i < CONFIG.count; i++) {
                const randomGeo = geometries[Math.floor(Math.random() * geometries.length)];

                const material = new THREE.MeshBasicMaterial({
                    color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)],
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.25,
                });

                const mesh = new THREE.Mesh(randomGeo, material);

                // === CHANGED: Increased spread from 45 to 100 to cover full width ===
                mesh.position.x = (Math.random() - 0.5) * 100;
                mesh.position.z = (Math.random() - 0.5) * 25;

                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;

                mesh.scale.setScalar(Math.random() * 0.8 + 0.4);

                mesh.userData = {
                    rndY: Math.random() * CONFIG.worldHeight,
                    rotSpeed: (Math.random() - 0.5) * 0.02,
                    yOffset: Math.random() * Math.PI * 2
                };

                particles.push(mesh);
                particlesGroup.add(mesh);
            }
            scene.add(particlesGroup);
        });

        // === 4. ANIMATION LOOP ===
        const clock = new THREE.Clock();
        let animationId;
        const safeMod = (n, m) => ((n % m) + m) % m;

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            const scrollY = window.scrollY || 0;

            camera.position.y = -(scrollY * 0.015);

            particles.forEach(mesh => {
                mesh.rotation.x += mesh.userData.rotSpeed;
                mesh.rotation.y += mesh.userData.rotSpeed;

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

        const handleResize = () => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (mountRef.current) mountRef.current.innerHTML = '';
            particles.forEach(p => p.material.dispose());
        };
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw', // Forced Viewport Width
            height: '100vh', // Forced Viewport Height
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
        }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%', filter: 'blur(0.8px)', opacity: 1 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.25)', mixBlendMode: 'lighten' }} />
        </div>
    );
}