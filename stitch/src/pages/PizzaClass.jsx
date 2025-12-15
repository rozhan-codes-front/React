import { useEffect } from 'react';
import FAQSection from '../components/pizza/FAQSection.jsx';
import HeroSection from '../components/pizza/HeroSection.jsx';
import HistorySection from '../components/pizza/HistorySection.jsx';
import LearningSection from '../components/pizza/LearningSection.jsx';
import PizzaFooter from '../components/pizza/PizzaFooter.jsx';
import PizzaHeader from '../components/pizza/PizzaHeader.jsx';
import TestimonialsSection from '../components/pizza/TestimonialsSection.jsx';
import { faqs, learningItems, pizzaTestimonials } from '../data/pizzaData.js';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Class Details', href: '#details' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
];

const heroImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBeq6iveYyDaDfIDQ94PQH8s3G_NMtTSbF6zqXyuFEcAgHRHWfIHa8SsAvL2jWRd2usYTVT9VZXUJTbooth9YFyzkl3cOmelM0Xpr5YbSZlpYwYyevkEJhI1XWd6GYNPuWqLSm-axAHrvo6JzdvNxAMdVsXj0sQLfz1xWZkL9etKyW4yTsAmKuaIXMkUaPyqupAPSoxhHDdXVMYb17mLqmvtfsffLyzUbzgtT0Ohdg5_oeLx9c3m7b2KJQXFVobPyaBpD-gTg0LVNo';

export default function PizzaClass() {
    useEffect(() => {
        document.title = 'Stitch Design';
    }, []);

    return (
        <div
            className="relative flex size-full min-h-screen flex-col bg-[#fdf7f4] group/design-root overflow-x-hidden"
            style={{ fontFamily: '"Noto Serif", "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <PizzaHeader navLinks={navLinks} />
                <main className="flex-1">
                    <HeroSection backgroundImage={heroImage} />
                    <LearningSection items={learningItems} />
                    <HistorySection />
                    <TestimonialsSection testimonials={pizzaTestimonials} />
                    <FAQSection faqs={faqs} />
                </main>
                <PizzaFooter />
            </div>
        </div>
    );
}