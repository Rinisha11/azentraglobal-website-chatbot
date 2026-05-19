import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Reveal } from "@/components/ui/Reveal"; 
import { FloatingCTA } from "@/components/FloatingCTA";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowRight, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

const [isServiceOpen, setIsServiceOpen] = useState(false);

const services = [
  { label: "Internship & Training", value: "training" },
  { label: "Web & App Development", value: "web" },
  { label: "AI & Automation", value: "ai" },
  { label: "Digital Marketing", value: "marketing" },
  { label: "Cloud & DevOps", value: "devops" },
  { label: "Consulting", value: "consulting" },
  { label: "Other", value: "other" }
];

  const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formBody = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      formBody.append(key, value as string);
    });

    const response = await fetch("https://employee.azentraglobal.com/api/v2/Intern/contactqueries", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),   // ✅ FIXED
    });

    const data = await response.json();

    if (data.response_code === 1) {
      toast({
        title: "Message Sent Successfully!",
        description: data.message,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } else {
      throw new Error(data.message || "Something went wrong");
    }

  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to send message",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Azentra Global - Nagercoil</title>
        <meta name="description" content="Contact Azentra Global in Nagercoil for IT services, training, and internships. Call +91 99940 86237." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-black selection:bg-green-100 selection:text-green-900">
        <Navbar />
        
        <main className="flex-1">
          {/* --- HERO SECTION --- */}
          <section className="relative overflow-hidden bg-slate-50 dark:bg-zinc-950 pt-24 pb-16 lg:pt-32 lg:pb-20">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>

            <div className="container-custom relative z-10 text-center">
              <Reveal width="100%">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 border border-primary/20">
                  <MessageSquare className="mr-2 h-4 w-4" /> Let's Talk
                </span>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
                  Get in touch with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                    Azentra Global
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Have a project in mind, need expert training, or just want to say hi? We are always here to help you grow.
                </p>
              </Reveal>
            </div>
          </section>

          {/* --- CONTACT GRID SECTION --- */}
          <section className="section-padding bg-white dark:bg-black">
            <div className="container-custom">
              <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                
                {/* LEFT COLUMN: Contact Info */}
                <div className="space-y-8">
                  <Reveal>
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Contact Information</h2>
                      <p className="text-slate-500 dark:text-slate-400 mb-8">
                        Reach out to us for project inquiries, training consultations, or partnership opportunities.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Address Card */}
                      <div className="group flex gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent hover:border-slate-100 dark:hover:border-zinc-800">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">Office Address</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            6-100, 2nd floor, AK Infopark, Trivandrum Main Road,<br />
                            Parvathipuram, Nagercoil,<br />
                            Tamil Nadu, 629003.
                          </p>
                        </div>
                      </div>

                      {/* Phone Card */}
                      <div className="group flex gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent hover:border-slate-100 dark:hover:border-zinc-800">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">Phone</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            +91 8925552250
                          </p>
                        </div>
                      </div>

                      {/* Email Card */}
                      <div className="group flex gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent hover:border-slate-100 dark:hover:border-zinc-800">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">Email</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            info@azentraglobal.com
                          </p>
                        </div>
                      </div>

                      {/* Hours Card */}
                      <div className="group flex gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900 border border-transparent hover:border-slate-100 dark:hover:border-zinc-800">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">Business Hours</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Mon - Sat: 9:00 AM - 6:00 PM<br />
                            Sun: Closed
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* RIGHT COLUMN: Contact Form */}
                <div className="lg:col-span-2">
                  <Reveal delay={0.2}>
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                      <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Send us a Message</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">We usually respond within 24 hours.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name *</label>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-primary focus:ring-primary/20 h-12"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address *</label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@company.com"
                              className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-primary focus:ring-primary/20 h-12"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 99940 86237"
                              className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-primary focus:ring-primary/20 h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                            <Input
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your Company"
                              className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-primary focus:ring-primary/20 h-12"
                            />
                          </div>
                        </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Interested In</label>
                  <div className="relative">
                    {/* Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setIsServiceOpen(!isServiceOpen)}
                      className="w-full h-12 px-4 rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <span className={cn("block truncate", !formData.service && "text-slate-500")}>
                        {services.find(s => s.value === formData.service)?.label || "Select a service..."}
                      </span>
                      <ChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform duration-200", isServiceOpen && "rotate-180")} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isServiceOpen && (
                        <>
                          {/* Overlay to close when clicking outside */}
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setIsServiceOpen(false)} 
                          />
                          
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className={cn(
                              "absolute z-50 w-full mt-2", // Increased z-index to 50
                              "bg-white dark:bg-zinc-900",
                              "border border-slate-200 dark:border-zinc-800",
                              "rounded-xl shadow-2xl py-2",
                              "max-h-[240px] overflow-y-auto scrollbar-thin" // Added height limit and scroll
                            )}
                          >
                            {services.map((service) => (
                              <li
                                key={service.value}
                                onClick={() => {
                                  setFormData({ ...formData, service: service.value });
                                  setIsServiceOpen(false);
                                }}
                                className={cn(
                                  "px-4 py-3 text-sm cursor-pointer flex items-center justify-between transition-colors",
                                  formData.service === service.value 
                                    ? "bg-primary/10 text-primary font-medium" 
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800"
                                )}
                              >
                                {service.label}
                                {formData.service === service.value && <Check className="h-4 w-4" />}
                              </li>
                            ))}
                          </motion.ul>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message *</label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project or requirements..."
                            rows={5}
                            className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:border-primary focus:ring-primary/20 resize-none"
                            required
                          />
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white h-12 px-8 rounded-lg font-medium transition-all shadow-lg shadow-primary/20"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <span className="flex items-center gap-2">
                              Send Message <Send className="h-4 w-4" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* --- MAP SECTION --- */}
          {/* Centered on Parvathipuram, Nagercoil */}
          <section className="h-[500px] w-full relative bg-slate-100">
             {/* 
                INSTRUCTION: 
                To get the exact pin for your building, you must:
                1. Go to Google Maps (maps.google.com).
                2. Search for "6-101 Trivandrum Main Road, Parvathipuram".
                3. Click the "Share" button.
                4. Select "Embed a map".
                5. Copy the URL inside the src="..." part.
                6. Replace the src URL below with your new one.
             */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.1310750586726!2d77.39902437322895!3d8.189548801567557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f1bf17680a69%3A0x68713d29bdf4766!2sAzentra%20Global!5e0!3m2!1sen!2sin!4v1765798346308!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "grayscale(20%) contrast(1.2) opacity(0.9)" }} 
               allowFullScreen={true}
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Azentra Global Location"
             ></iframe>
             
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-2xl border border-slate-200 dark:border-zinc-800 max-w-xs w-full hidden md:block">
                <div className="flex items-start gap-3">
                   <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1">
                      <MapPin className="h-5 w-5" />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">Nagercoil Office</h4>
                      <p className="text-xs text-slate-500 mt-1">6-100, First Floor,  Trivandrum Main Road, Parvathipuram, Nagercoil, TamilNadu, 629003.</p>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=6-101+Trivandrum+Main+Road+Parvathipuram+Nagercoil+629003" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-xs font-semibold text-primary mt-2 inline-flex items-center hover:underline"
                      >
                         Get Directions <ArrowRight className="h-3 w-3 ml-1" />
                      </a>
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

export default Contact;