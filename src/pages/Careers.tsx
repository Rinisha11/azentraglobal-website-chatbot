// src/pages/Careers.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Reveal } from "@/components/ui/Reveal"; // Assuming this exists based on your About page
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Zap, 
  Heart, 
  Coffee, 
  Globe 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const jobOpenings = [
  
  {
    id: 1,
    title: "Business Development Manager",
    department: "Sales",
    type: "Full-time",
    location: "On-site / Field Work",
    description:
      "We are looking for a proactive Business Development Manager who can develop the brand through direct client visits, build strong relationships, and drive business growth. The candidate should be comfortable with field work, meeting clients, and identifying new opportunities.",
    tags: [
      "Field Sales",
      "Client Visits",
      "Brand Development",
      "Lead Generation",
      "Relationship Management",
      "Negotiation"
    ],
  },
  {
    id: 2,
    title: "Digital Marketing Executive",
    department: "Marketing",
    type: "Full-time",
    location: "On-site / Field Work",
    description:
      "Seeking a Digital Marketing Executive to manage campaigns, improve brand visibility, and generate leads through online channels.",
    tags: ["SEO", "Social Media", "Google Ads", "Content Marketing"],
  },
  {
    id: 3,
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "On-site",
    description:
      "We are looking for a React expert to build responsive and high-performance user interfaces.",
    tags: ["React", "TypeScript", "Tailwind", "UI/UX"],
  },
  {
    id: 4,
    title: "Backend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "On-site",
    description:
      "Looking for a Backend Developer to design scalable APIs and manage server-side logic for our applications.",
    tags: ["Node.js", "Laravel", "MySQL", "API Development"],
  },
  {
    id: 5,
    title: "iOS Developer",
    department: "Engineering",
    type: "Full-time",
    location: "On-site",
    description:
      "We are looking for a skilled iOS Developer to build and maintain high-quality mobile applications. The candidate should have experience in developing apps using modern iOS technologies and ensuring performance, quality, and responsiveness.",
    tags: ["Swift", "iOS", "Xcode", "API Integration", "Mobile Development"],
  },
  {
  id: 6,
  title: "Technical Trainer – Data Science & AI/ML",
  department: "Technology / Training",
  type: "Full-time",
  location: "On-site",
  description: "We are looking for a passionate Technical Trainer in Data Science & AI/ML who can deliver high-quality training to students, freshers, and interns. The role involves hands-on teaching, mentoring on live projects, and contributing to real-world development work alongside the core team.",
  tags: [
    "Python",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Data Analysis",
    "Training & Mentoring",
    "Live Projects"
  ]
},

{
  id: 7,
  title: "Telecaller Executive",
  department: "Sales & Customer Support",
  type: "Full-time",
  location: "On-site",
  description: "We are looking for an enthusiastic and confident Telecaller Executive who can handle inbound and outbound calls professionally. The role involves interacting with customers, explaining company services, following up on leads, maintaining client relationships, and supporting the sales team in achieving targets.",
  tags: [
    "Communication Skills",
    "Customer Handling",
    "Lead Generation",
    "Sales Support",
    "Follow-up",
    "CRM Handling",

  ]
}
]

const perks = [
  {
    icon: Globe,
    title: "Remote First",
    description: "Work from anywhere or join us in our hub. We value output over hours.",
  },
  {
    icon: Zap,
    title: "Fast Growth",
    description: "Accelerate your career with challenging projects and a clear path to leadership.",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible schedules and a supportive culture that respects your personal time.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health coverage and wellness programs for you and your family.",
  },
];

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers | Azentra Global - Join Our Team</title>
        <meta name="description" content="Join Azentra Global and build a future of in AI and next gen technologies. View our current job openings and career opportunities in Nagercoil, India." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1">
          {/* --- Hero Section --- */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Reveal width="100%">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider">
                      We Are Hiring
                    </span>
                  </div>
                </Reveal>

                <Reveal width="100%" delay={0.1}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground">
                    Build the Future of <span className="text-primary">IT & Training</span>
                  </h1>
                </Reveal>

                <Reveal width="100%" delay={0.2}>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    Join a team of passionate technologists and educators. At Azentra Global, we don't just write code; we shape careers and transform businesses.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* --- Perks Section --- */}
          <section className="py-20 bg-muted/20">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <Reveal>
                  <h2 className="text-3xl font-bold mb-4">Life at Azentra</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-muted-foreground text-lg">
                    We believe in taking care of our people so they can take care of our clients.
                  </p>
                </Reveal>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {perks.map((perk, index) => (
                  <Reveal key={index} delay={0.1 * index} width="100%">
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <perk.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
                      <p className="text-sm text-muted-foreground">{perk.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* --- Openings Section --- */}
          <section className="py-24 bg-background">
            <div className="container-custom max-w-5xl">
              <Reveal width="100%">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Current Openings</h2>
                    <p className="text-muted-foreground">Find the role that fits you best.</p>
                  </div>
                <Link to="/hiring"> <Button variant="outline" className="gap-2 hidden md:flex">
                    View All Positions <ArrowRight className="w-4 h-4" />
                  </Button>
                  </Link>
                </div>
              </Reveal>

              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <Reveal key={job.id} delay={0.1 * index} width="100%">
                    <Card className="hover:shadow-lg hover:border-primary/30 transition-all duration-300 group overflow-hidden">
                      <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                  {job.title}
                                </h3>
                                <Badge variant="secondary" className="hidden sm:inline-flex">
                                  {job.type}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1">
                                  <Briefcase className="w-4 h-4" /> {job.department}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" /> {job.location}
                                </span>
                                <span className="flex items-center gap-1 sm:hidden">
                                  <Clock className="w-4 h-4" /> {job.type}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground leading-relaxed">
                              {job.description}
                            </p>

                            <div className="flex gap-2 pt-2">
                              {job.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="bg-muted/50 font-normal">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center md:self-center pt-2 md:pt-0">
                          <Link to="/hiring" state={{ domain: job.title }}> <Button className="w-full md:w-auto gap-2 group-hover:translate-x-1 transition-all">
                              Apply Now <ArrowRight className="w-4 h-4" />
                            </Button>
                            </Link>

                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                      Don't see the right role?
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                      We are always on the lookout for exceptional talent. Send us your resume and tell us how you can make a difference at Azentra.
                    </p>
                    <Button size="xl" className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20 border-none" asChild>
                      <Link to="/contact">Get in Touch</Link>
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

export default Careers;