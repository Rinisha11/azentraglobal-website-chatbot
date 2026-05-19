import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  HeroSection, 
  PartnerBanner, 
  ServicesOverview, 
  ConsultancyLandingSection,
  ProductsSection, 
  StatsSection, 
  TrainingPreviewSection, 
  AboutPreview, 
  CTASection 
 } from "@/components/home/HomeComponents";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Azentra Global | IT Services & Training Company in India</title>
        <meta name="description" content="Azentra Global offers AI automation, digital marketing, web development, cloud services, mobile apps, and industry-ready training programs in Nagercoil, India" />
        <meta property="og:title" content="Azentra Global | IT Services & Training Company in Nagercoil, India" />
        <meta property="og:description" content="Transform your business with Azentra Global's innovative IT solutions and comprehensive internship training programs." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <PartnerBanner />
          <ServicesOverview />
          {/* <ConsultancyLandingSection /> */}
          <StatsSection />
          <TrainingPreviewSection />
          <ProductsSection />
          <AboutPreview />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
