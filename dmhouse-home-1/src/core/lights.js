import * as THREE from 'three'
import { scene } from './scene'

const ambient = new THREE.AmbientLight('#EF3E63', 0.35)

const key = new THREE.DirectionalLight('#FFFFFF', 1.4)
key.position.set(5, 6, 5)

const fill = new THREE.DirectionalLight('#2E2F7E', 0.6)
fill.position.set(-5, -3, 4)

scene.add(ambient, key, fill)
