import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios"
import {
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  HeadphonesIcon,
  BookOpen,
  Code,
  Globe,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const defaultStudentPlans = [
  {
    plan_id: "1",
    plan_name: "Students Starter",
    price: "₹199.00 / month",
    features: [
      "Includes",
      "10 GB NVMe Disk",
      "10 GB Bandwidth",
      "5 Emails",
      "1 FTP Accounts",
      "2 Sub Domain",
      "1 Websites",
      "2 CORE",
      "15000 Monthly Visitors",
      "Lifetime Free SSL",
      "Support 24x7",
      "DNS Management",
      "1-click WordPress install",
      "Daily Backups",
      "Mail Channel Email Filters",
      "Application Firewall",
      "Powerful Enhance panel",
      "Free Website Migration",
      "WordPress Support",
      "Vulnerabilities scanner",
      "PHP MyAdmin",
      "Multiple PHP Version",
      "99.9% Uptime Guarantee",
      "PreInstalled PHP,Node,Python",
      "24x7 Technical Support",
    ],
  },
  {
    plan_id: "2",
    plan_name: "Students Professional",
    price: "₹250.00 / month",
    features: [
      "Includes",
      "20 GB NVMe Disk",
      "20GB Bandwidth",
      "30 Emails",
      "5 FTP Accounts",
      "3 Sub Domain",
      "3 Websites",
      "2 CORE",
      "30,000 Monthly Visitors",
      "Lifetime Free SSL",
      "Support 24x7",
      "DNS Management",
      "1-click WordPress install",
      "Daily Backups",
      "Mail Channel Email Filters",
      "Application Firewall",
      "Powerful Enhance panel",
      "Free Website Migration",
      "WordPress Support",
      "Vulnerabilities scanner",
      "PHP MyAdmin",
      "Multiple PHP Version",
      "99.9% Uptime Guarantee",
      "PreInstalled PHP,Node,Python",
      "24x7 Technical Support",
    ],
  },
  {
    plan_id: "3",
    plan_name: "Students Enterprise",
    price: "₹400.00 / month",
    features: [
      "Includes",
      "35GB NVMe Disk",
      "30GB Bandwidth",
      "50 Emails",
      "10 FTP Accounts",
      "unlimited Sub Domain",
      "5 Websites",
      "2 CORE",
      "1,00,000 Monthly Visitors",
      "Lifetime Free SSL",
      "Support 24x7",
      "DNS Management",
      "1-click WordPress install",
      "Daily Backups",
      "Mail Channel Email Filters",
      "Application Firewall",
      "Powerful Enhance panel",
      "Free Website Migration",
      "WordPress Support",
      "Vulnerabilities scanner",
      "PHP MyAdmin",
      "Multiple PHP Version",
      "99.9% Uptime Guarantee",
      "PreInstalled PHP,Node,Python",
      "24x7 Technical Support",
    ],
  },
];

const StudentHosting = () => {
  const navigate = useNavigate();
  const [studentPlans, setStudentPlans] = useState<any[]>(defaultStudentPlans);

  useEffect(() => {
    const rawApiUrl = import.meta.env.VITE_API_URL;
    const apiBase = (rawApiUrl ?? "/api").replace(/\/+$/, "");

    // If env var already points directly at a hosting-plans endpoint, use it as-is.
    // Otherwise build a predictable path off the base.
    const endpoint = apiBase.includes("hosting-plans")
      ? apiBase
      : apiBase.includes("/v2/")
      ? `${apiBase.replace(/\/v2\/.+$/, "")}/v2/hosting-plans`
      : `${apiBase}/v2/hosting-plans`;

    axios
      .get(endpoint)
      .then((res) => {
        if (res?.data?.status) {
          setStudentPlans(res.data.data?.Academic ?? defaultStudentPlans);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setStudentPlans(defaultStudentPlans);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Student Web Hosting | Affordable cPanel Plans | Azentra Global
        </title>
        <meta
          name="description"
          content="Budget-friendly cPanel hosting for students. Get 6 affordable hosting plans starting at ₹49/month with free SSL and learning resources."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <div className="container-custom relative z-10">
              <Reveal>
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                    <GraduationCap className="h-4 w-4" />
                    <span>Student Hosting</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                    Learn & Launch with{" "}
                    <span className="text-primary">Academic Web Hosting.</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Affordable cPanel hosting plans designed for students.
                    Start building your career with as low as ₹200/month.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="py-24 bg-muted/20">
            <div className="container-custom px-4 sm:px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studentPlans.map((plan, index) => (
                  <Reveal key={plan.plan_id ?? index}>
                    <div
                      className={`relative bg-card text-card-foreground rounded-3xl shadow-sm hover:shadow-xl border-2 transition-all duration-300 overflow-hidden h-full flex flex-col ${plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50"}`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1.5 text-sm font-semibold">
                          Best Value
                        </div>
                      )}

                      <div
                        className={`p-8 ${plan.popular ? "pt-12" : ""} flex-1 flex flex-col`}
                      >
                        <h3 className="text-2xl font-bold mb-2">{plan.plan_name}</h3>
                        {plan.description && (
                          <p className="text-muted-foreground text-sm mb-6">
                            {plan.description}
                          </p>
                        )}

                        <div className="mb-6">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                          {(plan.features || []).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* <Button
                          className="w-full h-12"
                          variant={plan.popular ? "default" : "outline"}
                          asChild
                        >
                          <Link to="/contact">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button> */}

                        <Button
                          className="w-full h-12"
                          variant={plan.popular ? "default" : "outline"}
                          onClick={() => {
                            const planParam = encodeURIComponent(
                              plan.plan_name ?? plan.name ?? "",
                            );
                            const planIdParam = encodeURIComponent(
                              plan.plan_id ?? plan.id ?? "",
                            );

                            navigate(
                              `/register?type=Academic&plan=${planParam}&plan_id=${planIdParam}`,
                            );
                          }}
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container-custom px-4">
              <Reveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Why Students Love Our Hosting?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to learn web development and launch your
                    career.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: BookOpen,
                    title: "Learning Resources",
                    desc: "Free tutorials and guides for beginners",
                  },
                  {
                    icon: Code,
                    title: "Developer Tools",
                    desc: "Node.js, Python, Git and more",
                  },
                  {
                    icon: Globe,
                    title: "Build Portfolio",
                    desc: "Host your projects and resume",
                  },
                  {
                    icon: HeadphonesIcon,
                    title: "Student Support",
                    desc: "Help from experts when you need it",
                  },
                ].map((feature, index) => (
                  <Reveal key={index}>
                    <div className="text-center p-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-slate-900">
            <div className="container-custom px-4 text-center">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Start Your Web Journey Today
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                  Get affordable hosting and build your portfolio. Perfect for
                  students, beginners, and aspiring developers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="xl"
                    className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <Link to="/register?type=Academic">Get Started</Link>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="h-14 px-8 rounded-full text-lg bg-transparent text-white border-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/contact">Ask Questions</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StudentHosting;
