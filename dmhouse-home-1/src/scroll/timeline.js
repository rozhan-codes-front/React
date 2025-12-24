import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { camera } from '../core/camera'
import { logo } from '../objects/logo'
import { services } from '../objects/services'
import { portfolio } from '../objects/portfolio'

gsap.registerPlugin(ScrollTrigger)

const sections = document.querySelectorAll('section')

export const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    }
})

timeline
    // HERO
    .to(camera.position, { z: 8 }, 0)
    .to(logo.rotation, { y: Math.PI }, 0)

    // SERVICES
    .to(camera.position, { x: 6, z: 6 }, 0.25)
    .to(services.rotation, { y: -1 }, 0.25)

    // PORTFOLIO
    .to(camera.position, { x: 0, z: -14 }, 0.5)

    // PROCESS
    .to(camera.position, { y: -4 }, 0.75)

    // CTA
    .to(camera.position, { z: 18 }, 1)
sections.forEach((section) => {
    gsap.fromTo(
        section,
        { opacity: 0 },
        {
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'top 40%',
                scrub: true
            }
        }
    )
})
