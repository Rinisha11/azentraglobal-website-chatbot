import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Send, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { getPrograms } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png"; 

const Footer = () => {
  const socialLinks = [
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/company/azentraglobal/" 
    },
    { 
      icon: Twitter, 
      href: "https://x.com/azentraglobal" 
    },
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/azentraglobal" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/azentraglobal/" 
    },
    { 
      icon: Youtube, 
      href: "https://www.youtube.com/@azentraglobal" 
    }
  ];
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const data = await getPrograms();
      setPrograms(data);
    };

    fetchPrograms();
  }, []);

  return (
    <footer className="relative bg-[#0a0a0a] text-slate-200 overflow-hidden pt-16 pb-8 border-t border-white/5 font-sans">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[0%] w-[40%] h-[60%] rounded-full bg-emerald-600/5 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10 px-6 tablet-lg:px-12">
        <div className="grid grid-cols-1 tablet-lg:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-16 mb-12">
          
          {/* 1. Company Info with LOGO */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Azentra Global Logo" 
                className="h-12 w-auto object-contain bg-white/5 rounded-lg p-1" 
              />
              <span className="text-2xl font-bold text-white tracking-tight">
                Azentra <span className="text-primary">Global</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Bridging the gap between business innovation and technical education. Your partner in Digital Transformation and Career Growth.
            </p>
            
            {/* SOCIAL MEDIA SECTION */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  target="_blank"             // 👈 THIS forces the new tab
                  rel="noopener noreferrer"   // 👈 Security best practice
                  className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-primary hover:border-primary hover:text-white text-slate-400 transition-all duration-300 hover:-translate-y-1"
                  aria-label="Social Media Link"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. IT Solutions */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">IT Solutions</h4>
            <ul className="space-y-3">
              {["Web & App Development", "AI & Automation", "Cloud Infrastructure", "Digital Marketing", "UI/UX Consulting", "Custom Software"].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>{service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Internships */}
          <div>
            <h4 className="font-semibold mb-6 text-lg text-white">Internships</h4>
            <ul className="space-y-3">
               <li >
  <Link
    to="/Internship"
    className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
    AI/ML
  </Link>
</li>
      <li >
  <Link
    to="/Internship"
    className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
    Data Science with Python
  </Link>
</li>
      <li >
  <Link
    to="/Internship"
    className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
    Full Stack Web Development
  </Link>
</li>
      <li >
  <Link
    to="/Internship"
    
    className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
    Mobile App Development
  </Link>
</li>
      <li >
  <Link
    to="/Internship"
    className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
    Devops
  </Link>
</li>
      <li >
  <Link
    to="/Internship"
    className="text-slate-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 hover:translate-x-1"
  >
    <span className="h-1.5 w-1.5 rounded-full bg-primary/50"></span>
    HR Management
  </Link>
</li>
            </ul>
          </div>

          {/* 4. Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-6 text-lg text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                  <span>6-100, First Floor,  Trivandrum Main Road, Parvathipuram, Nagercoil, TamilNadu, 629003.</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>+91 8925552250</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>info@azentraglobal.com</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col tablet-lg:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Azentra Global. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 tablet-lg:gap-8 text-sm text-slate-500">
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;