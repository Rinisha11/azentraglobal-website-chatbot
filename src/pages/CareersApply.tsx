import { SEO } from "@/components/SEO";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CareersApply = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      <SEO 
        title="Apply for Careers" 
        description="Join the Azentra Global team. Submit your application for Internships and Full-time roles." 
      />
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <JobApplicationForm />
      </main>

      <Footer />
    </div>
  );
};

export default CareersApply;