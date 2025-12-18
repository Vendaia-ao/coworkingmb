import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { SolutionsCarousel } from './components/SolutionsCarousel';
import { BookingModule } from './components/BookingModule';
import { TrustedCompanies } from './components/TrustedCompanies';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { VirtualOfficePage } from './components/VirtualOfficePage';
import { RoomsPage } from './components/RoomsPage';
import { DesksPage } from './components/DesksPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FAQSection } from "./components/FAQSection";

type ViewState = 'home' | 'virtual' | 'rooms' | 'desks' | 'about' | 'contact';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const handleNavigate = (path: string) => {
    if (path === '#virtual') {
      setCurrentView('virtual');
      window.scrollTo(0, 0);
    } else if (path === '#rooms') {
      setCurrentView('rooms');
      window.scrollTo(0, 0);
    } else if (path === '#desks') {
      setCurrentView('desks');
      window.scrollTo(0, 0);
    } else if (path === '#about') {
      setCurrentView('about');
      window.scrollTo(0, 0);
    } else if (path === '#contact') {
      setCurrentView('contact');
      window.scrollTo(0, 0);
    } else if (path === '#home') {
      setCurrentView('home');
      window.scrollTo(0, 0);
    } else if (path === '#booking') {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const element = document.querySelector(path);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(path);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <ServicesGrid />      
            <SolutionsCarousel onNavigate={handleNavigate} />
            <TrustedCompanies />
            <FAQSection />
            <BookingModule />
          </>
        )}
        {currentView === 'virtual' && <VirtualOfficePage />}
        {currentView === 'rooms' && <RoomsPage />}
        {currentView === 'desks' && <DesksPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
