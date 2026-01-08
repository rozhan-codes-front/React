import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import GlassBackground from './components/GlassBackground';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';

// Sections
import HeroSection from './components/HeroSection';
import TrustedLogos from './components/TrustedLogos';
import ServicesSection from './components/ServicesSection';
import WhyUsSection from './components/WhyUsSection';
import SuccessSection from './components/SuccessSection';
import CeoSection from './components/CeoSection';
import OurTeam from './components/OurTeam';
import TestimonialsSection from './components/TestimonialsSection';
import SeoContentSection from './components/SeoContentSection';

export default function App() {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return (
        <>
            <Cursor />
            <BackToTop />

            <GlassBackground />
            <Background3D />

            <Header />

            <main className="stack" style={{ position: 'relative', zIndex: 1 }}>
                <HeroSection />
                <TrustedLogos />
                <ServicesSection />
                <WhyUsSection />
                <SuccessSection />
                <CeoSection />
                <OurTeam />
                <TestimonialsSection />
                <SeoContentSection />
            </main>

            <Footer />
        </>
    );
}