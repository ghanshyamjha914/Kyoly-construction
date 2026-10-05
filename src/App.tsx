import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GalleryPage } from './pages/GalleryPage';
import { CareerPage } from './pages/CareerPage';
import { SafetyPage } from './pages/SafetyPage';
import { ContactPage } from './pages/ContactPage';
import { ConstructionDocumentsPage } from './pages/ConstructionDocumentsPage';
import { ConstructionDocumentsProvider } from './modules/construction-documents/context/ConstructionDocumentsContext';
import { AuthProvider } from './modules/construction-documents/context/AuthContext';

// Scroll to top helper component on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function AppContent() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string | undefined>(undefined);
  const location = useLocation();

  const isPrivateDocRoute =
    location.pathname.startsWith('/construction-documents') ||
    location.pathname.startsWith('/internal');

  const handleOpenQuote = (serviceName?: string) => {
    setSelectedQuoteService(serviceName || 'Transmission Lines');
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124] selection:bg-[#D6A548]/20 selection:text-[#202124]">
      <ScrollToTop />
      
      {/* Sticky White Header - Public Routes Only */}
      {!isPrivateDocRoute && <Header onOpenQuote={() => handleOpenQuote()} />}

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
          <Route path="/about" element={<AboutPage onOpenQuote={() => handleOpenQuote()} />} />
          <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage onOpenQuote={handleOpenQuote} />} />
          <Route path="/projects" element={<ProjectsPage onOpenQuote={() => handleOpenQuote()} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/internal/portal" element={<ConstructionDocumentsPage />} />
          <Route path="/construction-documents" element={<ConstructionDocumentsPage />} />
          <Route path="/construction-documents/:tab" element={<ConstructionDocumentsPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback to Home */}
          <Route path="*" element={<HomePage onOpenQuote={handleOpenQuote} />} />
        </Routes>
      </main>

      {/* Corporate Dark Footer - Public Routes Only */}
      {!isPrivateDocRoute && <Footer />}

      {/* Floating WhatsApp button - Public Routes Only */}
      {!isPrivateDocRoute && <FloatingWhatsApp />}

      {/* Interactive Global Quote & Tender Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedQuoteService}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConstructionDocumentsProvider>
          <AppContent />
        </ConstructionDocumentsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
