import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Reveal } from "@/components/ui/Reveal";
import { Target, Eye, Users, Award, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Azentra Global - Mobile and Web Development Company, Internships and Training</title>
        <meta name="description" content="Learn about Azentra Global, a leading IT company with 5+ years experience in digital transformation, software development, and professional training in Nagercoil, India." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          {/* --- Hero Section --- */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
             {/* Subtle Background Glow */}
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
            
            <div className="container-custom relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <Reveal width="100%">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider">
                      About Azentra Global
                    </span>
                  </div>
                </Reveal>
                
                <Reveal width="100%" delay={0.1}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground">
                    Leading Digital Transformation in <span className="text-primary">India</span>
                  </h1>
                </Reveal>
                
                <Reveal width="100%" delay={0.2}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    We are a passionate team of technologists, trainers, and innovators dedicated to empowering businesses across India with cutting-edge IT solutions.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* --- Who We Are & Stats --- */}
          <section className="py-20 md:py-28 bg-muted/20">
            <div className="container-custom">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* Text Content */}
                <div className="space-y-6">
                  <Reveal>
                    <h2 className="text-3xl font-bold text-foreground">Who We Are</h2>
                  </Reveal>
                  
                  <Reveal delay={0.1}>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Azentra Global is a premier IT services and training company based in Nagercoil, India. Since our inception, we have been committed to delivering innovative technology solutions that help businesses thrive in the digital era.
                    </p>
                  </Reveal>
                  
                  <Reveal delay={0.2}>
                    <p className="text-muted-foreground leading-relaxed">
                      With a team of 50+ expert developers, consultants, and certified trainers, we have successfully delivered over 500 projects across diverse industries including healthcare, fintech, e-commerce, education, and manufacturing.
                    </p>
                  </Reveal>
                  
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "5+", label: "Years of Excellence" },
                    { number: "500+", label: "Projects Delivered" },
                    { number: "2000+", label: "Professionals Trained" },
                    { number: "50+", label: "Expert Team Members" },
                  ].map((stat, index) => (
                    <Reveal key={index} delay={0.2 + (index * 0.1)} width="100%">
                      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 text-center h-full flex flex-col justify-center group">
                        <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.number}
                        </div>
                        <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- Mission & Vision --- */}
          <section className="py-24 bg-background">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Mission Card */}
                <Reveal width="100%">
                  <div className="h-full p-10 rounded-3xl bg-muted/10 border border-border hover:border-primary/50 transition-colors duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                      <Target className="h-7 w-7 text-primary group-hover:text-background" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To bridge the gap between innovative technology and practical business applications, empowering Indian businesses with world-class IT solutions and training programs that drive real growth and measurable success.
                    </p>
                  </div>
                </Reveal>

                {/* Vision Card */}
                <Reveal width="100%" delay={0.2}>
                  <div className="h-full p-10 rounded-3xl bg-muted/10 border border-border hover:border-primary/50 transition-colors duration-300 group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                      <Eye className="h-7 w-7 text-primary group-hover:text-background" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      To become India's most trusted technology partner, recognized for delivering exceptional digital solutions and nurturing the next generation of tech professionals through industry-aligned training programs.
                    </p>
                  </div>
                </Reveal>

              </div>
            </div>
          </section>
        
          {/* --- Why Choose Us --- */}
          <section className="py-24 bg-muted/20">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <Reveal width="100%">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose Azentra Global?</h2>
                </Reveal>
                <Reveal width="100%" delay={0.1}>
                  <p className="text-muted-foreground text-lg">
                    We combine technical expertise with deep understanding of the Indian market to deliver solutions that work.
                  </p>
                </Reveal>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    icon: Users,
                    title: "Expert Team",
                    description: "50+ certified professionals with hands-on industry experience across multiple domains.",
                  },
                  {
                    icon: Award,
                    title: "Proven Track Record",
                    description: "500+ successful projects delivered for SMEs, startups, and enterprise clients.",
                  },
                  {
                    icon: CheckCircle,
                    title: "Quality Assurance",
                    description: "Rigorous quality processes ensuring reliable, scalable, and secure solutions.",
                  },
                  {
                    icon: Target,
                    title: "Result-Oriented",
                    description: "Focus on delivering measurable business outcomes, not just technical deliverables.",
                  },
                  {
                    icon: Users,
                    title: "Dedicated Support",
                    description: "Round-the-clock support with dedicated account managers for seamless communication.",
                  },
                  {
                    icon: Sparkles, // Changed icon for variety
                    title: "Cost-Effective",
                    description: "Competitive pricing tailored for the Indian market without compromising quality.",
                  },
                ].map((item, index) => (
                  <Reveal key={index} delay={0.1 * index} width="100%">
                    <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                         <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
                      Ready to Partner with Us?
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                      Let's discuss how Azentra Global can help transform your business with innovative technology solutions.
                    </p>
                    <Button size="xl" className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20 border-none" asChild>
                      <Link to="/contact">Connect With Us</Link>
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

export default About;