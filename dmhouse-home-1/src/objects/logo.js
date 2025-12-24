import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { scene } from '../core/scene'

export const logo = new THREE.Group()

const loader = new FontLoader()

loader.load('/fonts/inter-bold.json', (font) => {
    const mainGeo = new TextGeometry('DMHOUSE', {
        font,
        size: 1.4,
        height: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelSegments: 6
    })

    mainGeo.center()

    const mainMat = new THREE.MeshPhysicalMaterial({
        color: '#EF3E63',
        metalness: 0.9,
        roughness: 0.25,
        clearcoat: 0.4
    })

    const mainMesh = new THREE.Mesh(mainGeo, mainMat)
    logo.add(mainMesh)

    const subGeo = new TextGeometry('DIGITAL GROWTH ENGINE', {
        font,
        size: 0.35,
        height: 0.1
    })

    subGeo.center()

    const subMesh = new THREE.Mesh(
        subGeo,
        new THREE.MeshStandardMaterial({ color: '#FFFFFF' })
    )

    subMesh.position.y = -1.4
    logo.add(subMesh)

    scene.add(logo)
})
