import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CountriesPage from "./pages/CountriesPage";
import ConsultationPage from "./pages/ConsultationPage";
import CyprusPage from "./pages/CyprusPage";
import AustraliaPage from "./pages/AustraliaPage";
import UKPage from "./pages/UKPage";
import CanadaPage from "./pages/CanadaPage";
import HungaryPage from "./pages/HungaryPage";
import MaltaPage from "./pages/MaltaPage";
import MalaysiaPage from "./pages/MalaysiaPage";
import LithuaniaPage from "./pages/LithuaniaPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import ScrollToTop from "./components/ScrollToTop";

import FBPixelProvider from "./components/FBPixelProvider";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FBPixelProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/cyprus" element={<CyprusPage />} />
            <Route path="/countries/australia" element={<AustraliaPage />} />
            <Route path="/countries/uk" element={<UKPage />} />
            <Route path="/countries/canada" element={<CanadaPage />} />
            <Route path="/countries/hungary" element={<HungaryPage />} />
            <Route path="/countries/malta" element={<MaltaPage />} />
            <Route path="/countries/malaysia" element={<MalaysiaPage />} />
            <Route path="/countries/lithuania" element={<LithuaniaPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FBPixelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
