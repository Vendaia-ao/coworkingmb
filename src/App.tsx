import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { SolutionsCarousel } from './components/SolutionsCarousel';
import { BookingModule } from './components/BookingModule';
import { TrustedCompanies } from './components/TrustedCompanies';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieBanner } from './components/CookieBanner';
import { VirtualOfficePage } from './components/VirtualOfficePage';
import { RoomsPage } from './components/RoomsPage';
import { DesksPage } from './components/DesksPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { GalleryPage } from './components/GalleryPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfUsePage } from './components/TermsOfUsePage';
import { FAQSection } from "./components/FAQSection";
import { ScrollToTop } from './components/ScrollToTop';
import { VideoSection } from './components/VideoSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { CompanyCounter } from './components/CompanyCounter';

function HomePage() {
  return (
    <>
      <Hero />
      <VideoSection />
      <ServicesGrid />      
      <SolutionsCarousel />
      <CompanyCounter />
      <TestimonialsSection />
      <TeamSection />
      <TrustedCompanies />
      <BlogSection />
      <FAQSection />
      <BookingModule />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
