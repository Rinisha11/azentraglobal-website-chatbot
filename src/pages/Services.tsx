import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Bot, Globe, Cloud, Smartphone, GraduationCap, LineChart, 
  Cog, ArrowRight, CheckCircle, Sparkles 
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    icon: Bot,
    title: "AI & Automation Services",
    description: "Harness the power of artificial intelligence to automate workflows, enhance customer experiences, and drive data-driven decisions.",
    features: [
      "Custom Chatbots & Virtual Assistants",
      "AI Agents for Business Automation",
      "Predictive Analytics & ML Models",
      "Workflow Automation (RPA)",
      "GenAI Solutions & Integration",
      "Natural Language Processing",
    ],
    benefits: "Reduce operational costs by up to 40% while improving efficiency and customer satisfaction.",
  },
  {
    icon: LineChart,
    title: "Digital Marketing Services",
    description: "Comprehensive digital marketing strategies that boost your online presence, generate qualified leads, and drive sustainable growth.",
    features: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing & Management",
      "Pay-Per-Click (PPC) Advertising",
      "Content Marketing Strategy",
      "Marketing Automation & CRM",
      "Analytics & Performance Tracking",
    ],
    benefits: "Increase organic traffic by 200%+ and generate 3x more qualified leads for your business.",
  },
  {
    icon: Globe,
    title: "Website Development & Hosting",
    description: "Create stunning, responsive websites and web applications that engage users and drive conversions across all devices.",
    features: [
      "Custom Responsive Web Design",
      "E-Commerce Development",
      "Progressive Web Apps (PWA)",
      "CMS Development (WordPress, Shopify)",
      "Secure Web Hosting Solutions",
      "Domain Management & SSL",
    ],
    benefits: "Launch professional websites that load fast, rank higher, and convert visitors into customers.",
  },
  {
    icon: Cloud,
    title: "Cloud Services & DevOps",
    description: "Modernize your infrastructure with cloud-native solutions and DevOps practices for scalability, reliability, and cost optimization.",
    features: [
      "Cloud Migration (AWS, Azure, GCP)",
      "CI/CD Pipeline Implementation",
      "Infrastructure as Code (IaC)",
      "Kubernetes & Container Management",
      "Serverless Architecture Design",
      "Cloud Cost Optimization",
    ],
    benefits: "Achieve 99.99% uptime while reducing infrastructure costs by up to 50%.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Build feature-rich mobile applications that deliver exceptional user experiences on iOS, Android, and cross-platform solutions.",
    features: [
      "Native iOS App Development",
      "Native Android App Development",
      "Cross-Platform Apps (React Native, Flutter)",
      "Enterprise Mobile Solutions",
      "App Store Optimization",
      "Mobile App Maintenance & Support",
    ],
    benefits: "Launch apps that users love with 4.5+ star ratings and high engagement rates.",
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Industry-aligned training programs that transform beginners into job-ready professionals with hands-on project experience.",
    features: [
      "Full-Stack Web Development",
      "AI & Machine Learning",
      "Data Science & Analytics",
      "Cloud & DevOps Engineering",
      "Cybersecurity Fundamentals",
      "Digital Marketing Certification",
    ],
    benefits: "Join 2000+ professionals who've accelerated their careers with Azentra Global training.",
  },
  {
    icon: Cog,
    title: "Business Transformation Consulting",
    description: "Strategic consulting services to help organizations embrace digital transformation and optimize their operations.",
    features: [
      "Digital Transformation Roadmap",
      "Process Automation Assessment",
      "IT Strategy & Architecture",
      "Technology Stack Modernization",
      "Change Management Support",
      "ROI-Driven Implementation",
    ],
    benefits: "Achieve up to 60% improvement in operational efficiency through strategic transformation.",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Azentra Global - Software, Cloud, IT Consulting, Design, AI, Digital Marketing and Web Development Services in Nagercoil, India</title>
        <meta name="description" content="Explore Azentra Global's comprehensive IT services including AI automation, digital marketing, UI/UX design, web development, DevOps, cloud services, mobile apps, AI services, Deep learning, training, internships, projects, and business consulting." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section - Using Theme Variables */}
          <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
            {/* Subtle primary glow in background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
            
            <div className="container-custom relative z-10">
              <Reveal>
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                    <Sparkles className="h-4 w-4" />
                    <span>World-Class IT Solutions</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                    Services that drive <span className="text-primary">Growth.</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    From AI-powered automation to professional training, we offer end-to-end services designed to accelerate your digital transformation journey.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Services List - Theme Consistent Cards */}
          <section className="py-24 bg-muted/20">
            <div className="container-custom px-4 sm:px-6">
              <div className="space-y-12">
                {services.map((service, index) => (
                  <Reveal key={index}>
                    <div className="group relative bg-card text-card-foreground rounded-3xl shadow-sm hover:shadow-xl border border-border/50 transition-all duration-300 overflow-hidden">
                      
                      {/* Theme Primary Border Line on Left */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                      
                      <div className="grid lg:grid-cols-5 gap-0">
                        
                        {/* Left Side: Content (3/5 width) */}
                        <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <service.icon className="h-8 w-8 text-primary" />
                          </div>
                          
                          <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {service.description}
                          </p>
                          
                          {/* Benefits Box */}
                          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 mb-8">
                             <p className="text-sm font-semibold text-primary flex gap-2">
                               <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
                               {service.benefits}
                             </p>
                          </div>

                          <Button className="w-fit" asChild>
                            <Link to="/contact">
                              Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>

                        {/* Right Side: Features (2/5 width) - Using Muted Background */}
                        <div className="lg:col-span-2 bg-muted/40 border-t lg:border-t-0 lg:border-l border-border p-8 md:p-12 flex flex-col justify-center">
                          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Key Features
                          </h4>
                          <ul className="space-y-4">
                            {service.features.map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground font-medium text-sm md:text-base">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* --- UNIFIED CTA SECTION (About Page) --- */}
          <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-20 text-center shadow-2xl">
                
                {/* Background Glow Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px]" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                  <Reveal>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
                      Not Sure Which Service You Need?
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                      Our experts will analyze your requirements and recommend the best solutions for your business. Schedule a free consultation today.
                    </p>
                    <Button size="xl" className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20 border-none" asChild>
                      <Link to="/contact">Schedule Free Consultation</Link>
                    </Button>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Services;