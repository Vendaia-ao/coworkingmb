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
import { Toaster } from './components/ui/toaster';

import { lazy, Suspense } from 'react';
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminReservas = lazy(() => import('./pages/AdminReservas'));
const AdminConfiguracoes = lazy(() => import('./pages/AdminConfiguracoes'));
const AdminConteudo = lazy(() => import('./pages/AdminConteudo'));
const AdminPaginas = lazy(() => import('./pages/AdminPaginas'));
const AdminUsuarios = lazy(() => import('./pages/AdminUsuarios'));

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

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div></div>}>
        <Routes>
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/escritorio-virtual" element={<PublicLayout><VirtualOfficePage /></PublicLayout>} />
          <Route path="/salas" element={<PublicLayout><RoomsPage /></PublicLayout>} />
          <Route path="/secretarias" element={<PublicLayout><DesksPage /></PublicLayout>} />
          <Route path="/sobre" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/contacto" element={<PublicLayout><ContactPage /></PublicLayout>} />
          <Route path="/galeria" element={<PublicLayout><GalleryPage /></PublicLayout>} />
          <Route path="/politica-de-privacidade" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
          <Route path="/termos-de-uso" element={<PublicLayout><TermsOfUsePage /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="recursos" element={<AdminRecursos />} />
            <Route path="reservas" element={<AdminReservas />} />
            <Route path="clientes" element={<AdminClientes />} />
            <Route path="conteudo" element={<AdminConteudo />} />
            <Route path="paginas" element={<AdminPaginas />} />
            <Route path="utilizadores" element={<AdminUsuarios />} />
            <Route path="configuracoes" element={<AdminConfiguracoes />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
