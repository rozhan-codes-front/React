import * as THREE from 'three'
import { scene } from '../core/scene'

export const services = new THREE.Group()

const titles = ['SEO', 'WEB DESIGN', 'GOOGLE ADS', 'SPRINTS']

titles.forEach((_, i) => {
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(4.5, 2.2),
        new THREE.MeshStandardMaterial({
            color: '#2E2F7E',
            metalness: 0.5,
            roughness: 0.3
        })
    )

    plane.position.set(i * 5 - 7.5, 0, -8)
    services.add(plane)
})

scene.add(services)
