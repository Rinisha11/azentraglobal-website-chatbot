import { ThemeProvider } from "@/components/ui/theme-provider"; // <--- Import added
import { FloatingThemeToggle } from "@/components/FloatingThemeToggle"; // <--- Import added
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Internship from "./pages/Internship";
import Careers from "./pages/Careers";
import CareersApply from "./pages/CareersApply";
import BusinessHosting from "./pages/BusinessHosting";
import StudentHosting from "./pages/StudentHosting";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CustomerPortal from "./pages/CustomerPortal";
import ConsultancyLogin from "./pages/ConsultancyLogin";
import ConsultancyPortal from "./pages/ConsultancyPortal";
import LuckyDraw from "./pages/LuckyDraw";
// import CaseStudies from "./pages/CaseStudies";
// import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Hiring from "./pages/Hiring";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import News from "./pages/News";
import EventReport from "./pages/EventReport";
import Consultancy from "./pages/Consultancy";
import Workshop from "./pages/Workshop";
import SAIP from "./pages/SAIP";
import CertificateVerification from "./pages/CertificateVerification";
import CCP from "./pages/CCP";
import CEIP from "./pages/CEIP";
import DigitalMarketing from "./pages/DigitalMarketing";
import SoftwareDevelopment from "./pages/SoftwareDevelopment";
import DevOps from "./pages/DevOps";
import WebHosting from "./pages/WebHosting";
import AchieverWay from "./pages/AchieverWay";
import GlobalMindsClub from "./pages/GlobalMindsClub";
import GrowGreenInitiative from "./pages/GrowGreenInitiative";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      {/* 1. Wrap the UI logic with ThemeProvider */}
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            {/* 2. Add the Toggle Button here, next to WhatsAppButton */}
            <FloatingThemeToggle />
            <WhatsAppButton />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/Internship" element={<Internship />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/apply" element={<CareersApply />} />
              <Route path="/services" element={<Services />} />{" "}
              {/* Main Services Page */}
              <Route path="/hosting/business" element={<BusinessHosting />} />
              <Route path="/hosting/student" element={<StudentHosting />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/portal/*" element={<CustomerPortal />} />
              <Route path="/consultancy/login" element={<ConsultancyLogin />} />
              <Route path="/consultancy/portal" element={<ConsultancyPortal />} />
              <Route path="/lucky-draw" element={<LuckyDraw />} />
              {/* <Route path="/case-studies" element={<CaseStudies />} /> */}
              {/* <Route path="/blog" element={<Blog />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/workshop" element={<Workshop />} />
              <Route path="/events" element={<News />} />
              <Route path="/events/:eventId" element={<EventReport />} />
              <Route path="/consultancy" element={<Consultancy />} />
              <Route path="/skill-advancement-internship-program" element={<SAIP />} />
              <Route path="/skill-advancement-internship-program/:certificateId" element={<SAIP />} />
              <Route path="/initiatives/ccp" element={<CCP />} />
              <Route path="/initiatives/ceip" element={<CEIP />} />
              <Route path="/initiatives/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/initiatives/software-development" element={<SoftwareDevelopment />} />
              <Route path="/initiatives/devops" element={<DevOps />} />
              <Route path="/initiatives/web-hosting" element={<WebHosting />} />
              <Route path="/initiatives/achiever-way" element={<AchieverWay />} />
              <Route path="/initiatives/global-minds-club" element={<GlobalMindsClub />} />
              <Route path="/initiatives/grow-green-initiative" element={<GrowGreenInitiative />} />


              <Route path="*" element={<NotFound />} />
              
            </Routes>
            <ScrollToTop />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
