import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AcademySection } from '../components/AcademySection';
import { SenseiSection } from '../components/SenseiSection';
import { ClassesSection } from '../components/ClassesSection';
import { GallerySection } from '../components/GallerySection';
import { NewsSection } from '../components/NewsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden">
            <Navbar />
            <main>
                <Hero />
                <AcademySection />
                <SenseiSection />
                <ClassesSection />
                <GallerySection />
                <NewsSection />
                <ContactSection />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default HomePage;
