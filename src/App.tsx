import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />      
      <SolutionsCarousel />
      <TrustedCompanies />
      <FAQSection />
      <BookingModule />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/escritorio-virtual" element={<VirtualOfficePage />} />
            <Route path="/salas" element={<RoomsPage />} />
            <Route path="/secretarias" element={<DesksPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
