import * as THREE from 'three'
import { scene } from '../core/scene'

export const portfolio = new THREE.Group()

for (let i = 0; i < 7; i++) {
    const item = new THREE.Mesh(
        new THREE.PlaneGeometry(5.5, 3),
        new THREE.MeshStandardMaterial({
            color: '#FFFFFF',
            metalness: 0.2,
            roughness: 0.6
        })
    )

    item.position.set(0, 0, -i * 6)
    portfolio.add(item)
}

scene.add(portfolio)
