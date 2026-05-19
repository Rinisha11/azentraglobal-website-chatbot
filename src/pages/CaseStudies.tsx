import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Reveal } from "@/components/ui/Reveal";
import { FloatingCTA } from "@/components/FloatingCTA";
import { 
  ArrowRight, 
  Code, 
  Cloud, 
  Briefcase, 
  GraduationCap, 
  Award,
  CheckCircle2,
  Users,
  Palette,       
  Megaphone,     
  BrainCircuit   
} from "lucide-react";

const trainingPrograms = [
  {
    title: "Full Stack MERN Development",
    description: "Master MongoDB, Express, React, and Node.js. Build scalable, high-performance web applications from scratch.",
    icon: Code,
    features: ["React.js & Next.js", "RESTful APIs", "Database Architecture"]
  },
  {
    title: "AI, ML & Data Science",
    description: "Harness the power of data. Learn Python, Machine Learning algorithms, and data visualization techniques.",
    icon: BrainCircuit,
    features: ["Python & Pandas", "Neural Networks", "Predictive Analytics"]
  },
  {
    title: "UI/UX Design",
    description: "Design intuitive digital experiences. Master Figma, prototyping, wireframing, and user research methodologies.",
    icon: Palette,
    features: ["Figma Mastery", "User Research", "Prototyping & Wireframing"]
  },
  {
    title: "Cloud Computing & DevOps",
    description: "Become an infrastructure expert. Learn AWS/Azure, Docker, Kubernetes, and CI/CD automation.",
    icon: Cloud,
    features: ["AWS/Azure", "Docker & Kubernetes", "CI/CD Pipelines"]
  },
  {
    title: "Digital Marketing",
    description: "Master the art of online growth. SEO, Social Media Marketing, PPC, and content strategy.",
    icon: Megaphone,
    features: ["SEO & SEM", "Social Media Strategy", "Google Analytics"]
  }
];

const CaseStudies = () => {
  return (
    <>
      <Helmet>
        <title>Training & Internships | Azentra Global</title>
        <meta name="description" content="Industry-ready training in Full Stack, AI/ML, UI/UX, and Digital Marketing with guaranteed internships at Azentra Global." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-black">
        <Navbar />
        
        <main className="flex-1">
          {/* --- HERO SECTION --- */}
          <section className="relative overflow-hidden bg-slate-50 dark:bg-zinc-950 pt-24 pb-20 lg:pt-32 lg:pb-24">
            {/* Matching Primary Green Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Reveal width="100%">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 border border-primary/20">
                    <GraduationCap className="mr-2 h-4 w-4" /> Azentra Global Learning
                  </span>
                  
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
                    Master the Skills <br />
                    {/* Gradient now matches your primary green */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                      The Industry Demands
                    </span>
                  </h1>
                  
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                    Practical, hands-on training designed for students and professionals. Join Azentra Global to bridge the gap between theory and reality.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Button uses bg-primary to match your screenshot exactly */}
                    <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                      Explore Courses
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800" asChild>
                      <Link to="/contact">Apply Now</Link>
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* --- COURSES GRID --- */}
          <section className="section-padding bg-white dark:bg-black">
            <div className="container-custom">
              <Reveal width="100%">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Professional Certification Programs</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Curriculum designed by industry experts.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trainingPrograms.map((program, index) => (
                  <Reveal key={index}>
                    <div className="group relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col">
                      
                      {/* Icon box uses primary/10 */}
                      <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                        <program.icon className="h-7 w-7" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">{program.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 flex-1 text-sm leading-relaxed">
                        {program.description}
                      </p>
                      
                      <div className="space-y-3 mb-8 border-t border-slate-100 dark:border-zinc-800 pt-6">
                        {program.features.map((feat, i) => (
                          <div key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                            {/* Checkmark uses text-primary */}
                            <CheckCircle2 className="h-4 w-4 text-primary mr-3" />
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <div className="inline-block bg-slate-100 dark:bg-zinc-800 px-4 py-2 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 w-full text-center border border-slate-200 dark:border-zinc-700">
                           3 Months + 15 Days Internship
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* --- INTERNSHIP SECTION --- */}
          <section className="section-padding bg-black relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="container-custom relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-primary mb-6 border border-white/10">
                      <Briefcase className="mr-2 h-4 w-4" /> Azentra Internship Program
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                      Experience Real <br/>
                      <span className="text-primary">Industry Work</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                      Don't just learn syntax. Join Azentra Global's internship program to work on live projects, collaborate with senior developers, and understand the software development lifecycle.
                    </p>
                    
                    <ul className="space-y-5 mb-10">
                      {[
                        "Work on Live Client Projects",
                        "Mentorship from Industry Experts",
                        "Letter of Recommendation",
                        "Pre-Placement Offers (PPO) for Top Performers"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="bg-primary/20 p-1 rounded-full mr-3 mt-1">
                            <Award className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-slate-200">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none rounded-full px-8">
                      Apply for Internship
                    </Button>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="relative">
                    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 transition-all group-hover:bg-primary/20"></div>
                       
                       <div className="relative z-10">
                           <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                              <div className="flex gap-2">
                                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                              </div>
                              <span className="text-xs font-mono text-zinc-500">azentra-internship.tsx</span>
                           </div>
                           
                           <div className="space-y-4 font-mono text-sm">
                              <div className="text-purple-400">const <span className="text-yellow-200">AzentraIntern</span> = ( <span className="text-orange-300">student</span> ) ={">"} {"{"}</div>
                              <div className="pl-6 text-zinc-500">// Your journey starts here</div>
                              <div className="pl-6 text-slate-300">
                                 <span className="text-purple-400">const</span> stack = [<span className="text-primary">"MERN"</span>, <span className="text-primary">"AI"</span>, <span className="text-primary">"Cloud"</span>];
                              </div>
                              <div className="pl-6 text-slate-300">
                                 <span className="text-purple-400">await</span> student.<span className="text-blue-400">getExperience</span>(stack);
                              </div>
                              <div className="pl-6 text-slate-300">
                                 <span className="text-purple-400">return</span> <span className="text-yellow-200">Success</span>;
                              </div>
                              <div className="text-purple-400">{"}"}</div>
                           </div>
                       </div>
                    </div>
                    
                    <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-zinc-700 hidden md:block">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-bold text-lg text-slate-900 dark:text-white">100%</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Practical Learning</div>
                            </div>
                        </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* --- CTA SECTION --- */}
          <section className="section-padding bg-slate-50 dark:bg-zinc-950">
            <div className="container-custom">
              {/* This box now matches the screenshot Green */}
              <div className="bg-primary rounded-3xl p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

                <Reveal>
                  <h2 className="text-3xl font-bold mb-4 text-white">Join Azentra Global Today</h2>
                  <p className="text-green-50 mb-8 max-w-xl mx-auto text-lg">
                    Whether you are a student or a professional, our courses are tailored to boost your career graph.
                  </p>
                  <Button size="lg" className="rounded-full bg-white text-primary hover:bg-slate-50 border-none font-bold" asChild>
                    <Link to="/contact">
                      Enquire Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </Reveal>
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

export default CaseStudies;