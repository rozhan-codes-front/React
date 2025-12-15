import { useEffect } from 'react';
import ContactSection from '../components/roya/ContactSection.jsx';
import DestinationsSection from '../components/roya/DestinationsSection.jsx';
import HeroSection from '../components/roya/HeroSection.jsx';
import RoyaFooter from '../components/roya/RoyaFooter.jsx';
import RoyaHeader from '../components/roya/RoyaHeader.jsx';
import SearchSection from '../components/roya/SearchSection.jsx';
import TestimonialsSection from '../components/roya/TestimonialsSection.jsx';
import ToursSection from '../components/roya/ToursSection.jsx';
import {
    destinations,
    footerLinks,
    headerNavItems,
    heroImages,
    mapEmbedSrc,
    socialLinks,
    testimonials,
    tours,
    trustBadges,
} from '../data/royaData.js';

export default function RoyaHome() {
    useEffect(() => {
        document.title = 'Travel Agency - Home';
    }, []);

    return (
        <div dir="rtl" className="bg-[#F9FAFB] text-gray-800" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
            <RoyaHeader logoSrc={heroImages.headerLogo} navItems={headerNavItems} />

            <main className="container mx-auto px-4 py-8">
                <HeroSection backgroundImage={heroImages.heroBackground} />
                <SearchSection />
                <DestinationsSection destinations={destinations} />
                <ToursSection tours={tours} />
                <TestimonialsSection testimonials={testimonials} />
                <ContactSection mapSrc={mapEmbedSrc} />
            </main>

            <RoyaFooter socialLinks={socialLinks} footerLinks={footerLinks} trustBadges={trustBadges} />
        </div>
    );
}