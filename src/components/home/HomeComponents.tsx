import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Bot, Globe, Cloud, Smartphone, 
  GraduationCap, LineChart, Sparkles, ChevronLeft, ChevronRight,
  Code2, Rocket, Users, Trophy, Briefcase, Layers, ShieldCheck, LayoutGrid, CheckCircle2
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import CountUp from "react-countup";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// --- DATA CONFIGURATION ---

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop", 
    badge: "Leading IT Solutions & Training",
    title: "Empowering Innovation Through",
    highlight: "Digital Solutions",
    suffix: "& Training",
    description: "Transform your business with cutting-edge AI automation, cloud services, and comprehensive training programs.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop", 
    badge: "Expert Corporate & Student Training",
    title: "Bridge the Gap With",
    highlight: "Industry-Ready Training",
    suffix: "",
    description: "Master the skills that matter. Hands-on courses in Python, Full Stack, AI, and Data Science.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", 
    badge: "Business Transformation",
    title: "Reimagine Business With",
    highlight: "Strategic Consulting",
    suffix: "& AI",
    description: "Future-proof your enterprise. Bespoke strategies in Cloud Migration and Workflow Automation.",
  }
];

const PARTNERS = [
  { alt: "AK Infopark", src: "/partners/AK.png" },
  { alt: "My Bilz", src: "/partners/MB.png" },
  { alt: "Rapid Bazzar", src: "/partners/RB.png" },
  { alt: "Achiever Way", src: "/partners/AW.png" },
  // { alt: "Sky Tree", src: "/partners/SKT.png" },
];

const PRODUCTS = [
  {
    title: "My Bilz",
    desc: "Billing software for modern businesses.",
    src: "/products/MB.png", // Path to product logo
    tag: "Enterprise",
    whatsapp: "https://wa.me/918925553350?text=Hi,%20I%20am%20interested%20in%20a%20demo%20for%20MyBilz%20Software.",
    link: "https://mybilz.com/"
  },
  {
    title: "Rapidbazzar",
    desc: "Your Trusted Grocery Delivery Partner.",
    src: "/products/RB.png", // Path to product logo
    tag: "Business",
    whatsapp: "https://wa.me/918925553350?text=Hi,%20I%20am%20interested%20in%20a%20demo%20for%20Rapidbazzar.",
    link: "https://rapidbazzar.com/"
  },
    {
    title: "Achiever Way",
    desc: "Industry-Ready Internships & Courses.",
    src: "/partners/AW.png", // Path to product logo
    tag: "EdTech",
    whatsapp: "https://wa.me/918925553350?text=Hi,%20I%20am%20interested%20in%20a%20demo%20for%20Achiever%20Way.",
    link: "https://azentraglobal.com/"
  }
];

// --- 1. HERO SECTION (Fixed Mobile Spacing) ---
const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  return (
    <Reveal>
    <section className="relative min-h-[75vh] md:min-h-[90vh] flex items-center overflow-hidden bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={HERO_SLIDES[current].image} alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent/40" />
        </motion.div>
      </AnimatePresence>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 py-12 md:py-20">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <div key={current} className="overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6 backdrop-blur-md"
                >
                    <Sparkles className="h-4 w-4 text-green-600 animate-pulse" />
                    <span className="text-xs md:text-sm font-medium text-white tracking-wide">{HERO_SLIDES[current].badge}</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    {HERO_SLIDES[current].title} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                        {HERO_SLIDES[current].highlight}
                    </span> {HERO_SLIDES[current].suffix}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-base md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl"
                >
                    {HERO_SLIDES[current].description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" className="h-12 md:h-14 px-8 text-lg rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 border-none" asChild>
                      <Link to="/services">Explore Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-12 md:h-14 px-8 text-lg rounded-full border-white/20 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black transition-all" asChild>
                      <Link to="/contact">Get Consultation</Link>
                    </Button>
                </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    </Reveal>
  );
};

// --- 2. PARTNERS MARQUEE (New Horizontal Banner) ---
const PartnerBanner = () => {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400 mb-2">Trusted by</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white " >Our <span style={{"color":"#16A34A"}}>Brand Partners</span></h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-500 dark:text-slate-400 mt-3">
            Working with leading brands to deliver digital solutions, training, and business transformation.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-slate-950 px-4 py-8 md:px-6">
          {/* Soft Edge Blurring */}
          <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />

          <motion.div
            className="flex whitespace-nowrap gap-16 md:gap-32 items-center"
            animate={{ x: [0, -1800] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          >
            {/* Repeating the array to ensure seamless loop */}
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
              <img
                key={i}
                src={partner.src}
                alt={partner.alt}
                title={partner.alt}
                className="h-10 md:h-12 w-auto object-contain grayscale-0 opacity-100 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- 3. SERVICES SECTION (Fixed Spacing) ---
const SERVICES_DATA = [
  { icon: Bot, title: "AI & Automation", desc: "Intelligent agents to automate workflows." },
  { icon: Globe, title: "Web Development", desc: "High-performance business websites." },
  { icon: Cloud, title: "Cloud & DevOps", desc: "Scalable AWS/Azure infrastructure." },
  { icon: Smartphone, title: "Mobile Apps", desc: "iOS & Android enterprise solutions." },
  { icon: GraduationCap, title: "Training Programs", desc: "Corporate & student upskilling." },
  { icon: LineChart, title: "Digital Marketing", desc: "SEO & performance marketing." },
];

const ServicesOverview = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -350 : 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* CHANGED: items-start for mobile, items-end for desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
            <div className="max-w-2xl text-left"> {/* Added text-left explicitly */}
                <span className="text-green-600 font-bold text-sm uppercase tracking-widest">Our Expertise</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 text-slate-900 dark:text-white leading-tight">
                    Future-Ready <br className="hidden md:block"/> <span className="text-green-600">Digital Services.</span>
                </h2>
            </div>
            
            {/* Navigation Buttons - Hidden or smaller on mobile to save space */}
            <div className="flex gap-3 pt-2 md:pt-0">
                <button onClick={() => scroll('left')} className="p-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-green-600 hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => scroll('right')} className="p-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-green-600 hover:text-white transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>

        {/* 
          SCROLL CONTAINER FIX: 
          -mx-4 and px-4 allows the cards to scroll to the very edge of the screen 
          on mobile while staying aligned with the header text.
        */}
        <div 
          ref={scrollRef} 
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
        >
          {SERVICES_DATA.map((s, i) => (
            <div 
              key={i} 
              className="min-w-[85vw] md:min-w-[350px] snap-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group hover:shadow-xl transition-all"
            >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <s.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{s.desc}</p>
                {/* <Link to="/services" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                </Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ConsultancyLandingSection = () => (
  <section className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-600 mb-6 border border-green-200 dark:border-green-800">
            Consultancy Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
            Find talent or your next role with our <span className="text-green-600">dedicated recruitment portals.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Azentra’s consultancy offering connects job seekers with employers using tailored support, verified roles, and a seamless application experience.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-600 text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Job Seeker Portal</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Register, browse open positions, and apply directly through your personal job seeker dashboard.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Employer Portal</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Post staffing needs, review candidates, and manage employer requests with clarity and speed.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white border-none" asChild>
              <Link to="/consultancy">Register Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white" asChild>
              <Link to="/consultancy/login">Open Portal</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[2rem] bg-slate-100 dark:bg-slate-900 p-10 shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="mb-10 rounded-3xl bg-gradient-to-br from-green-600 to-blue-600 p-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.3em] mb-4">Consultancy Spotlight</p>
            <h3 className="text-2xl font-bold mb-3">Two portals, one seamless hiring experience.</h3>
            <p className="text-sm text-white/90">Whether you are looking for your next career move or hiring new team members, Azentra’s consultancy offering saves time and connects you to the right opportunities.</p>
          </div>
          <div className="space-y-4">
            {[
              "Verified job listings for trusted employers.",
              "Easy apply flow for job seekers.",
              "Employer request tracking with secure login.",
              "Fast registration for both seekers and employers."
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-600" />
                <p className="text-sm text-slate-500 dark:text-slate-400">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- 4. PRODUCTS SECTION (Large Headline Logo Banner) ---
const ProductsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4">
        
        {/* Big Simple Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Our <span className="text-[#209b59]">Products</span>
          </h2>
          <div className="h-1.5 w-20 bg-[#209b59] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Logo Banner Container */}
        {/* <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {PRODUCTS.map((p, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center justify-center"
            >
            
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] bg-white dark:bg-slate-900 flex items-center justify-center p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 dark:border-slate-800 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                 <img 
                   src={p.src} 
                   alt={p.title} 
                   className="w-full h-full object-contain"
                 />
              </div>
              
              
              <p className="mt-4 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-[#209b59] transition-colors">
                {p.title}
              </p>
            </div>
          ))}
        </div> */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
  {PRODUCTS.map((p, i) => (
    <a
      key={i}
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center"
    >
      {/* Logo Card */}
      <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] bg-white dark:bg-slate-900 flex items-center justify-center p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 dark:border-slate-800 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <img
          src={p.src}
          alt={p.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Title */}
      <p className="mt-4 text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest group-hover:text-[#209b59] transition-colors">
        {p.title}
      </p>
    </a>
  ))}
</div>
      </div>
    </section>
  );
};

// --- 5. STATS SECTION ---
const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Projects Delivered" },
    { number: "10000+", label: "Students Trained" },
    { number: "50+", label: "Expert Trainers" },
    { number: "5+", label: "Years Experience" },
  ];
  return (
    <section className="bg-green-600 py-16 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl font-bold mb-2"><CountUp start={0} end={parseInt(s.number)} duration={3} suffix="+" enableScrollSpy /></div>
              <div className="opacity-80 text-sm md:text-base font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. TRAINING SECTION ---
const TrainingPreviewSection = () => {
  const features = [
    { icon: Code2, title: "Skill Development", text: "Master MERN, Python, and AI with labs.", color: "bg-blue-500/10 text-blue-500" },
    { icon: Briefcase, title: "Internship Program", text: "Work on live client projects.", color: "bg-purple-500/10 text-purple-500" },
    { icon: Trophy, title: "Certifications", text: "Industry-recognized certificates.", color: "bg-orange-500/10 text-orange-500" },
    { icon: Users, title: "Mentorship", text: "1-on-1 guidance from Engineers.", color: "bg-green-600/10 text-green-600" }
  ];

  return (
    <section className="py-12 md:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-600 mb-6 border border-green-200 dark:border-green-800">
                <GraduationCap className="mr-2 h-4 w-4" /> Azentra Academy
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Kickstart Your <span className="text-green-600">Tech Career</span></h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">Bridge the gap between academic theory and industry reality with our live projects and senior mentorship.</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white border-none" asChild><Link to="/training">Explore Courses</Link></Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 dark:border-slate-700 dark:text-white" asChild><Link to="/internship">Apply for Internship</Link></Button>
              </div>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 group hover:-translate-y-1 transition-all">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}><item.icon className="h-6 w-6" /></div>
                 <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 7. ABOUT & CTA ---
const AboutPreview = () => (
    <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-green-600 font-bold text-sm uppercase tracking-wider">Who We Are</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-slate-900 dark:text-white leading-tight">Driving Digital Excellence Across <span className="text-green-600">India.</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">At Azentra Global, we blend technical expertise with innovation to help startups and enterprises scale effectively in the modern digital age.</p>
            <div className="space-y-4 mb-10">
                {["Certified Expert Team", "24/7 Support & Maintenance", "Agile Development"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
                    </div>
                ))}
            </div>
            <Button size="lg" className="rounded-full px-8 bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800" asChild><Link to="/about">More About Us</Link></Button>
          </div>
          <div className="aspect-square rounded-[2rem] bg-slate-200 dark:bg-slate-800 overflow-hidden relative group">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
             <div className="absolute bottom-8 left-8 text-white"><p className="font-bold text-2xl">500+ Success Stories</p></div>
          </div>
        </div>
      </div>
    </section>
);

const CTASection = () => (
    <section className="py-12 md:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-slate-900 dark:bg-slate-900 p-12 md:p-24 text-center shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Scale Your Vision?</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10">Stop waiting for the future. Create it with Azentra Global. Get a custom roadmap for your digital journey today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 md:h-16 px-10 rounded-full text-lg bg-green-600 hover:bg-green-700 text-white border-none" asChild><Link to="/contact">Schedule Consultation</Link></Button>
              <Button variant="outline" size="lg" className="h-14 md:h-16 px-10 rounded-full text-lg border-white/20 text-white bg-white/5 backdrop-blur-sm" asChild><Link to="/services">View Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
);

export { HeroSection, PartnerBanner, ServicesOverview, ConsultancyLandingSection, ProductsSection, StatsSection, TrainingPreviewSection, AboutPreview, CTASection };