import { useRef } from "react";
import { motion } from "framer-motion";
import { RegistrationFormWorkshop} from "@/components/RegistrationFormWorkshop";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Code2, Rocket, Sparkles, ShieldCheck, Award, CalendarDays, Users2, Clock3, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

const Workshop = () => {
  const registrationRef = useRef<HTMLElement | null>(null);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const highlightItems = [
    { icon: Sparkles, label: "Career clarity" },
    { icon: Code2, label: "Skill mapping" },
    { icon: Rocket, label: "Success strategy" },
  ];

  const workshopBenefits = [
    { icon: ShieldCheck, title: "Hands-on learning", description: "Learn by building a live product step-by-step." },
    { icon: Award, title: "Certification", description: "Get a workshop completion certificate." },
    { icon: CalendarDays, title: "One-day event", description: "Efficient learning with a compact schedule." },
    { icon: Users2, title: "Small batch", description: "Personal mentoring in a focused group." },
  ];

  return (
    <div>
    <Navbar/>
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_rgba(16,185,129,0.45),_transparent_55%)]" />
        <div className="container-custom relative mx-auto px-4 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Workshop Registration
              </span>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  The Career Ignition — Your Path to Success
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
                  Join our Saturday workshop and learn how to ignite your career with clarity, confidence, and real-world skills.
                  This session is designed to help you build momentum, discover your next step, and launch your professional journey.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button onClick={scrollToRegistration} size="lg" className="rounded-full px-8 py-4 shadow-xl shadow-emerald-500/20">
                  Register Now
                </Button>
                {/* <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-4 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-slate-950">
                  <a href="#workshop-details">Workshop Details</a>
                </Button> */}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlightItems.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Career workshop session"
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent px-6 py-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Live Workshop</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Define your own version of success and launch your career</h2>
                </div>
              </div>

              <div className="absolute -bottom-8 left-0 right-0 mx-auto flex max-w-[520px] translate-y-1/2 justify-between rounded-full border border-white/10 bg-slate-950/95 p-4 shadow-xl shadow-black/20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Intensive</p>
                    <p className="font-semibold text-white">1-day Bootcamp</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Outcome</p>
                    <p className="font-semibold text-white">Certificate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="workshop-details" className="container-custom mx-auto px-4 py-20 text-slate-900 dark:text-slate-100">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.9fr] items-start">
          <div className="space-y-10">
            {/* <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              <h2 className="text-3xl font-semibold">What You Will Learn</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
                This workshop is built for students, early career professionals, and entrepreneurs who want a quick, practical introduction to building digital products with modern tools.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Self-assessment & strengths mapping",
                  "Web development with real deployment",
                  "AI automation and integrations",
                  "Certificate of completion",
                  "Mentor-led guidance",
                  "Q&A and career tips",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* <div className="grid grid-cols-2 gap-8">
                <div>
              <div className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950 to-slate-900 p-8 shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-950">
                <div className="flex flex-col gap-6">
                  <div className="rounded-[1.5rem] bg-slate-900/95 p-6 shadow-inner shadow-slate-950/20">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                      Upcoming Session
                    </span>

                    <div className="mt-8 grid gap-5">
                      <div className="rounded-3xl bg-slate-950/90 p-4 text-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                            <CalendarDays className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Date</p>
                            <p className="mt-2 text-lg font-semibold text-white">May 18, 2026</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-3xl bg-slate-950/90 p-4 text-slate-100">
                        <div className="flex items-center justify-between gap-4">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                            <Clock3 className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Time</p>
                            <p className="mt-2 text-lg font-semibold text-white">10:00 AM – 4:00 PM</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-3xl bg-slate-950/90 p-4 text-slate-100">
                        <div className="flex items-center gap-4">
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Format</p>
                            <p className="mt-2 text-lg font-semibold text-white">Live session</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 text-slate-100 shadow-xl shadow-slate-950/10">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Seats</p>
                      <p className="mt-3 text-3xl font-semibold text-white">Limited</p>
                      <p className="mt-2 text-sm text-slate-400">Reserve your seat early for the live session.</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5 text-slate-100 shadow-xl shadow-slate-950/10">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Takeaway</p>
                      <p className="mt-3 text-3xl font-semibold text-white">Career roadmap</p>
                      <p className="mt-2 text-sm text-slate-400">A clear 90-day plan to accelerate growth.</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>

             
             
             <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-xl font-semibold">Who should join?</h3>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                  <li>Students looking for practical experience</li>
                  <li>Beginners who want a fast product launch</li>
                  <li>Job seekers preparing for technical roles</li>
                  <li>Small businesses and startups eager to innovate</li>
                </ul>
              </div>
            </div> */}
          </div>

          {/* <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-2xl font-semibold">Workshop Agenda</h3>
              <ol className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <strong className="block font-semibold">1. Product planning</strong>
                  Discover the idea, requirements, and architecture for your real-world project.
                </li>
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <strong className="block font-semibold">2. Build the app</strong>
                  Hands-on coding using modern web frameworks and deployment tools.
                </li>
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <strong className="block font-semibold">3. Deploy live</strong>
                  Publish your app and connect it to AI services or automation workflows.
                </li>
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                  <strong className="block font-semibold">4. Review & next steps</strong>
                  Get feedback, ask questions, and plan follow-up learning paths.
                </li>
              </ol>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-2xl font-semibold">Why attend?</h3>
              <div className="mt-6 grid gap-4">
                {workshopBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{benefit.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside> */}
        </div>
      </section>

      <section id="registration-form" ref={registrationRef} className="container-custom mx-auto px-4 py-1">
        <div className="grid">
          {/* <div className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
            <h2 className="text-3xl font-semibold">Register for the Workshop</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-7">
              Fill in the details below to secure your seat. The registration form collects only the basic information needed for confirmation and follow-up.
            </p>
            <div className="mt-8 space-y-4 text-slate-700 dark:text-slate-300">
              <p>• Limited seats available.</p>
              <p>• Confirmation email will be sent after successful registration.</p>
              <p>• You can update your details later if needed.</p>
            </div>
          </div> */}

          <div className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-900/5 dark:bg-slate-900 dark:text-slate-100">
            <RegistrationFormWorkshop />
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </div>
  );
};

export default Workshop;
