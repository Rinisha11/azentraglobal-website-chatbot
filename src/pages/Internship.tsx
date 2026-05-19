import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Reveal } from "@/components/ui/Reveal";
import { FloatingCTA } from "@/components/FloatingCTA";
import { RegistrationForm } from "@/components/RegistrationForm";
import { getPrograms } from "@/lib/api"; 
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Brain,
  Palette,
  Cloud,
  Megaphone,
  CheckCircle2,
  BarChart3,
  Clock,
  Briefcase,
  Users,
  Trophy,
  Laptop,
  Sparkles,
  Zap,
  FileText,
  Wallet,
  BriefcaseBusiness,
  Bug,
  Smartphone
} from "lucide-react";

// --- Data Configuration ---
// const staticProgramDetails = {
//   "Data Science with Python": {
//     title : "Data Science with Python",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "Content Writing ": {
//     title:"Content Writing ",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "Finance and Accounting": {
//       title:"Finance and Accounting",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "Business Analyst": {
//     title:"Business Analyst",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "Software Testing": {
//     title : "Software Testing",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "HR Management": {
//     title : "HR Management",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "Mobile App Development": {
//     title: "Mobile App Development",
//     description:
//       "Transform raw data into business insights. Master SQL, PowerBI, Tableau, and Python specifically for analytics.",
//     icon: BarChart3,
//     color: "text-blue-500",
//     features: ["SQL & Database Mgmt", "PowerBI & Tableau", "Python for Analytics"],
//   },
//   "Full Stack Web Development": {
//     title : "Full Stack Web Development",
//     description:
//       "Master MongoDB, Express, React, and Node.js. Build scalable, high-performance web applications from scratch.",
//     icon: Code2,
//     color: "text-violet-500",
//     features: ["React.js & Next.js", "RESTful APIs", "Database Architecture"],
//   },

//   "AI/ML": {
//     title : "AI/ML",
//     description:
//       "Harness the power of data. Learn Python, Machine Learning algorithms, and data visualization techniques.",
//     icon: Brain,
//     color: "text-rose-500",
//     features: ["Python & Pandas", "Neural Networks", "Predictive Analytics"],
//   },

//   "UI/UX Design": {
//     title : "UI/UX Design",
//     description:
//       "Design intuitive digital experiences. Master Figma, prototyping, wireframing, and user research methodologies.",
//     icon: Palette,
//     color: "text-orange-500",
//     features: ["Figma Mastery", "User Research", "Prototyping & Wireframing"],
//   },

//   "Devops": {
//     title : "DevOps",
//     description:
//       "Become an infrastructure expert. Learn AWS/Azure, Docker, Kubernetes, and CI/CD automation.",
//     icon: Cloud,
//     color: "text-cyan-500",
//     features: ["AWS/Azure", "Docker & Kubernetes", "CI/CD Pipelines"],
//   },

//   "Digital Marketing": {
//     title : "Digital Marketing",
//     description:
//       "Master the art of online growth. SEO, Social Media Marketing, PPC, and content strategy.",
//     icon: Megaphone,
//     color: "text-green-500",
//     features: ["SEO & SEM", "Social Media Strategy", "Google Analytics"],
//   },
// };
const staticProgramDetails = {
  "Data Science with Python": {
    title: "Data Science with Python",
    description:
      "Learn data analysis, visualization, machine learning, and  modeling using industry-standard tools.",
    icon: BarChart3,
    color: "text-blue-500",
    features: [
      "Python & Pandas",
      "Machine Learning",
      "Data Visualization"
    ],
  },

  "Content Writing ": {
    title: "Content Writing",
    description:
      "Master professional content creation for blogs, websites, SEO, branding, and digital platforms.",
    icon: FileText,
    color: "text-amber-500",
    features: [
      "SEO Writing",
      "Blog & Web Content",
      "Copywriting Skills"
    ],
  },

  "Finance and Accounting": {
    title: "Finance and Accounting",
    description:
      "Gain practical expertise in accounting principles, taxation, financial reporting, and business finance.",
    icon: Wallet,
    color: "text-emerald-500",
    features: [
      "Tally & GST",
      "Financial Reporting",
      "Business Accounting"
    ],
  },

  "Business Analyst": {
    title: "Business Analyst",
    description:
      "Bridge business goals through analytics, reporting, requirement gathering, and visualization.",
    icon: BriefcaseBusiness,
    color: "text-indigo-500",
    features: [
      "Requirement Analysis",
      "Excel & Power BI",
      "Business Documentation"
    ],
  },

  "Software Testing": {
    title: "Software Testing",
    description:
      "Learn manual and automation testing techniques to ensure software quality and reliability.",
    icon: Bug,
    color: "text-red-500",
    features: [
      "Manual Testing",
      "Automation Testing",
      "Selenium Basics"
    ],
  },

  "HR Management": {
    title: "HR Management",
    description:
      "Develop HR skills in recruitment, employee management and organizational communication.",
    icon: Users,
    color: "text-pink-500",
    features: [
      "Recruitment Process",
      "Payroll Management",
      "Employee Relations"
    ],
  },

  "Mobile App Development": {
    title: "Mobile App Development",
    description:
      "Build modern Android and cross-platform mobile apps with real-world UI and backend integration.",
    icon: Smartphone,
    color: "text-teal-500",
    features: [
      "Flutter / React Native",
      "Mobile UI Design",
      "API Integration"
    ],
  },

  "Full Stack Web Development": {
    title: "Full Stack Web Development",
    description:
      "Master frontend and backend technologies to build scalable, high-performance web applications.",
    icon: Code2,
    color: "text-violet-500",
    features: [
      "React.js & Node.js",
      "REST APIs",
      "Database Management"
    ],
  },

  "AI/ML": {
    title: "AI/ML",
    description:
      "Explore artificial intelligence and machine learning concepts with hands-on model training.",
    icon: Brain,
    color: "text-rose-500",
    features: [
      "Deep Learning",
      "Neural Networks",
      "AI Model Building"
    ],
  },

  "UI/UX Design": {
    title: "UI/UX Design",
    description:
      "Design digital experiences through wireframing, prototyping, and user-centered design.",
    icon: Palette,
    color: "text-orange-500",
    features: [
      "Figma Design",
      "Wireframing",
      "User Experience"
    ],
  },

  "Devops": {
    title: "DevOps",
    description:
      "Learn cloud infrastructure, deployment pipelines, automation, and scalable DevOps workflows.",
    icon: Cloud,
    color: "text-cyan-500",
    features: [
      "Docker & Kubernetes",
      "CI/CD Pipelines",
      "AWS & Cloud"
    ],
  },

  "Digital Marketing": {
    title: "Digital Marketing",
    description:
      "Master online marketing strategies including SEO, social media campaigns, paid ads, and branding.",
    icon: Megaphone,
    color: "text-green-500",
    features: [
      "SEO & SEM",
      "Social Media Marketing",
      "Google Analytics"
    ],
  },
};
const steps = [
  {
    id: "01",
    title: "Apply & Enroll",
    desc: "Fill the form and choose your specialization."
  },
  {
    id: "02",
    title: "Intensive Training",
    desc: "3 Months of live classes & hands-on coding."
  },
  {
    id: "03",
    title: "Live Internship",
    desc: "1 Month working on real client projects."
  },
  {
    id: "04",
    title: "Certification",
    desc: "Get industry-recognized certification."
  }
];

const Internship = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const [programs, setPrograms] = useState([]);
  const [selecteddProgram, setSelectedProgram] = useState("");

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/8925553350?text=Hi,%20I'm%20interested%20in%20Training", "_blank");
  };
  useEffect(() => {
    const fetchPrograms = async () => {
      const data = await getPrograms();
      setPrograms(data);
    };

    fetchPrograms();
  }, []);
  return (
    <>
      <Helmet>
        <title> Internships & Training Company for students, professionals | Azentra Global in Nagercoil, India</title>
        <meta name="description" content="Industry-standard internship and training for students in Data Analytics, Full Stack, AI services, Machine Learning, Digital Marketing, MLOps, Java, Flutter, React, Frontend, Backend, Mobile Apps, Android, Robotics, Deep Learning, Cloud, and DevOps. Register now for the upcoming batch." />
      </Helmet>

      <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-black selection:bg-primary/20">
        <Navbar />

        <main className="flex-1">
          
          {/* --- HERO SECTION --- */}
          <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-20 overflow-hidden bg-white dark:bg-zinc-950">
             {/* Abstract Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
            
            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Reveal width="100%">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 border border-primary/10 shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>Admissions Open for 2026 Batch</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
                    Master the Skill. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
                      Crack the Career.
                    </span>
                  </h1>

                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                    A comprehensive <strong>3-Month Training + 1 Month Internship</strong> program designed to transform beginners into industry-ready professionals.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                   <Button 
                      onClick={scrollToForm} 
                      size="lg" 
                      className="rounded-full px-10 h-14 text-lg bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl  hover:-translate-y-1"
                    >
                      Apply Now
                   </Button>
                   <Button 
                      onClick={scrollToCourses} 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full h-14 text-lg px-8 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-900"
                    >
                      View Courses
                   </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> 100% Practical</span>
                    <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Certificate Included</span>
                    <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Projects Included</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* --- REGISTRATION SECTION --- */}
          <section id="registration-form" ref={formRef} className="py-20 bg-slate-900 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

             <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                   
                   {/* Left Side: Value Proposition */}
                   <div className="lg:col-span-5 text-white lg:sticky lg:top-24">
                      <Reveal>
                        <div className="flex items-center gap-2 text-green-400 font-bold uppercase tracking-widest text-sm mb-6">
                           <Zap className="h-4 w-4" /> Fast Track Your Growth
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                           Real Experience.<br/> Real Results.
                        </h2>
                        <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                           Don't just watch tutorials. Build real projects, deploy code, and work with a team. Our hybrid model bridges the gap between college and corporate.
                        </p>

                        <div className="space-y-6">
                           <div className="flex gap-4 items-start">
                              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                 <Briefcase className="h-6 w-6 text-green-400" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-lg">Live Projects</h4>
                                 <p className="text-slate-400 text-sm leading-relaxed mt-1">Work on live client requirements. No dummy data, no hello-world apps.</p>
                              </div>
                           </div>
                           
                           <div className="flex gap-4 items-start">
                              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                 <Users className="h-6 w-6 text-green-400" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-lg">Senior Mentorship</h4>
                                 <p className="text-slate-400 text-sm leading-relaxed mt-1">Daily code reviews and guidance from developers with 5+ years of experience.</p>
                              </div>
                           </div>

                           <div className="flex gap-4 items-start">
                              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                 <Trophy className="h-6 w-6 text-green-400" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-lg">Job Assistance</h4>
                                 <p className="text-slate-400 text-sm leading-relaxed mt-1">Resume building, mock HR interviews, and direct referrals to partner companies.</p>
                              </div>
                           </div>
                        </div>
                      </Reveal>
                   </div>

                   {/* Right Side: The Form */}
                   <div className="lg:col-span-7">
                      <Reveal delay={0.2}>
                        <RegistrationForm selecteddProgram={selecteddProgram}  />
                      </Reveal>
                   </div>
                </div>
             </div>
          </section>

          {/* --- HOW IT WORKS (ROADMAP) --- */}
          {/* <section className="py-24 bg-white dark:bg-zinc-950">
             <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                   <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Your Journey to Success</h2>
                   <p className="text-slate-500">We have structured the path to ensure you go from beginner to professional in 4 months.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                   {steps.map((step, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                         <div className="relative p-6 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 h-full">
                            <div className="text-6xl font-bold text-slate-200 dark:text-zinc-800 absolute -top-4 -right-2 select-none">
                               {step.id}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">{step.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm relative z-10">{step.desc}</p>
                         </div>
                      </Reveal>
                   ))}
                </div>
             </div>
          </section> */}

          {/* --- COURSES GRID --- */}
          <section ref={coursesRef} className="py-24 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-200 dark:border-zinc-800">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                  <span className="text-primary font-bold tracking-wider uppercase text-sm">Explore Offerings</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">
                    Available Training Programs
                  </h2>
                </div>
                <Button variant="outline" onClick={openWhatsApp}>
                  <Megaphone className="mr-2 h-4 w-4" /> Talk to Counselor
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {programs.map((program, index) => {
                const details = staticProgramDetails[program.IProgramName];

                if (!details) return null;
                const Icon = details.icon;

                return (




                  <Reveal key={index} delay={index * 0.1}>
                    <div className="group relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-primary/50  hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col">
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg bg-slate-50 dark:bg-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${details.color}`}>
                          <Icon className="h-6 w-6" />
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                        {details.title}
                      </h3>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                        {details.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {details.features.map((feat, i) => (
                          <div key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2.5"></div>
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-zinc-900 flex items-center justify-between">
                         <div className="flex items-center text-xs font-medium text-slate-500">
                            <Clock className="h-3.5 w-3.5 mr-1" /> 3+1 Months
                         </div>
                         <Button 
                           variant="link" 
                           onClick={() => {
  setSelectedProgram(program.IProgramName);
  scrollToForm();
}}
                           className="text-primary p-0 h-auto font-semibold group-hover:underline"
                         >
                           Book Seat <ArrowRight className="ml-1 h-3.5 w-3.5" />
                         </Button>
                      </div>

                    </div>
                  </Reveal>
        )})}
              </div>
            </div>
          </section>

          {/* --- UNIFIED CTA SECTION (Internships/Training) --- */}
          <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">
              
              {/* Dark Card Container */}
              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-20 text-center shadow-2xl">
                
                {/* Background Glow Effects (Green for Growth/Learning) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/15 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto">
                  <Reveal>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
                      Ready to start your career?
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                      Slots are filling up fast for the upcoming batch. Secure your spot today and get access to our pre-learning material.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {/* Apply Button - Updated to Primary Green Style */}
                      <Button 
                          onClick={scrollToForm} 
                          size="xl" 
                          className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-900/20 border-none"
                      >
                          <Laptop className="mr-2 h-5 w-5" /> Apply Now
                      </Button>
                      
                      {/* WhatsApp Button - Updated to Glass/Outline Style */}
                      <Button 
                          onClick={openWhatsApp}
                          variant="outline" 
                          size="xl" 
                          className="h-14 px-8 rounded-full text-lg bg-transparent border-slate-600 text-white hover:bg-white hover:text-slate-900 transition-all"
                      >
                          Talk to Co-ordinator
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

        </main>
        
        <FloatingCTA />
        <Footer />
      </div>
    </>
  );
};

export default Internship;