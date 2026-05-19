// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import {
//   Server,
//   CheckCircle,
//   ArrowRight,
//   Shield,
//   Zap,
//   Clock,
//   HeadphonesIcon,
//   Database,
//   Mail,
//   Globe,
// } from "lucide-react";
// import { Reveal } from "@/components/ui/Reveal";

// const businessPlans = [
//   {
//     name: "Starter Business",
//     price: "₹199",
//     period: "/month",
//     description: "Perfect for small business websites and startups",
//     features: [
//       "5 GB SSD Storage",
//       "Unlimited Bandwidth",
//       "5 Email Accounts",
//       "1 Addon Domains",
//       "cPanel Control Panel",
//       "99.9% Uptime Guarantee",
//       "Free SSL Certificate",
//       "Daily Backups",
//     ],
//     popular: false,
//   },
//   {
//     name: "Professional",
//     price: "₹399",
//     period: "/month",
//     description: "Ideal for growing businesses with higher needs",
//     features: [
//       "15 GB SSD Storage",
//       "Unlimited Bandwidth",
//       "25 Email Accounts",
//       "5 Addon Domains",
//       "cPanel Control Panel",
//       "99.9% Uptime Guarantee",
//       "Free SSL Certificate",
//       "Daily Backups",
//       "Priority Support",
//       "Free Domain",
//     ],
//     popular: true,
//   },
//   {
//     name: "Enterprise",
//     price: "₹799",
//     period: "/month",
//     description: "Advanced features for established businesses",
//     features: [
//       "30 GB SSD Storage",
//       "Unlimited Bandwidth",
//       "Unlimited Email Accounts",
//       "Unlimited Addon Domains",
//       "cPanel Control Panel",
//       "99.9% Uptime Guarantee",
//       "Free SSL Certificate",
//       "Daily Backups",
//       "24/7 Priority Support",
//       "Free Domain",
//       "SEO Tools",
//     ],
//     popular: false,
//   },
//   {
//     name: "Unlimited Pro",
//     price: "₹1,199",
//     period: "/month",
//     description: "Unlimited resources for high-traffic websites",
//     features: [
//       "Unlimited SSD Storage",
//       "Unlimited Bandwidth",
//       "Unlimited Email Accounts",
//       "Unlimited Addon Domains",
//       "cPanel Control Panel",
//       "99.9% Uptime Guarantee",
//       "Free SSL Certificate",
//       "Daily Backups",
//       "24/7 Priority Support",
//       "Free Domain",
//       "Advanced SEO Tools",
//       "Dedicated IP",
//     ],
//     popular: false,
//   },
//   {
//     name: "E-Commerce Plus",
//     price: "₹1,999",
//     period: "/month",
//     description: "Optimized for online stores and marketplaces",
//     features: [
//       "50 GB SSD Storage",
//       "Unlimited Bandwidth",
//       "Unlimited Email Accounts",
//       "Unlimited Addon Domains",
//       "cPanel + WooCommerce",
//       "99.9% Uptime Guarantee",
//       "Free SSL Certificate",
//       "Hourly Backups",
//       "24/7 Priority Support",
//       "Free Domain",
//       "Dedicated IP",
//       "PCI Compliant Server",
//     ],
//     popular: false,
//   },
//   {
//     name: "Reseller Business",
//     price: "₹2,999",
//     period: "/month",
//     description: "Start your own hosting business",
//     features: [
//       "100 GB SSD Storage",
//       "Unlimited Bandwidth",
//       "Unlimited Email Accounts",
//       "Unlimited Addon Domains",
//       "cPanel + WHM",
//       "99.9% Uptime Guarantee",
//       "Free SSL Certificates",
//       "Hourly Backups",
//       "24/7 Dedicated Support",
//       "Free Domain",
//       "Dedicated IP",
//       "White Label Reseller",
//     ],
//     popular: false,
//   },
// ];

// const BusinessHosting = () => {
//   return (
//     <>
//       <Helmet>
//         <title>
//           Business Web Hosting | cPanel Hosting Plans | Azentra Global
//         </title>
//         <meta
//           name="description"
//           content="Reliable cPanel business web hosting plans. Choose from 6 affordable hosting solutions for your business with free SSL, 99.9% uptime, and 24/7 support."
//         />
//       </Helmet>

//       <div className="min-h-screen flex flex-col bg-background">
//         <Navbar />

//         <main className="flex-1">
//           {/* Hero Section */}
//           <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
//             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

//             <div className="container-custom relative z-10">
//               <Reveal>
//                 <div className="max-w-3xl mx-auto text-center">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
//                     <Server className="h-4 w-4" />
//                     <span>cPanel Business Hosting</span>
//                   </div>
//                   <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
//                     Powerful Hosting for{" "}
//                     <span className="text-primary">Business.</span>
//                   </h1>
//                   <p className="text-xl text-muted-foreground leading-relaxed">
//                     6 reliable cPanel hosting plans designed for businesses. Get
//                     free SSL, 99.9% uptime, and expert support.
//                   </p>
//                 </div>
//               </Reveal>
//             </div>
//           </section>

//           {/* Pricing Plans */}
//           <section className="py-24 bg-muted/20">
//             <div className="container-custom px-4 sm:px-6">
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {businessPlans.map((plan, index) => (
//                   <Reveal key={index}>
//                     <div
//                       className={`relative bg-card text-card-foreground rounded-3xl shadow-sm hover:shadow-xl border-2 transition-all duration-300 overflow-hidden h-full flex flex-col ${plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border/50"}`}
//                     >
//                       {plan.popular && (
//                         <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1.5 text-sm font-semibold">
//                           Most Popular
//                         </div>
//                       )}

//                       <div
//                         className={`p-8 ${plan.popular ? "pt-12" : ""} flex-1 flex flex-col`}
//                       >
//                         <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
//                         <p className="text-muted-foreground text-sm mb-6">
//                           {plan.description}
//                         </p>

//                         <div className="mb-6">
//                           <span className="text-4xl font-bold">
//                             {plan.price}
//                           </span>
//                           <span className="text-muted-foreground">
//                             {plan.period}
//                           </span>
//                         </div>

//                         <ul className="space-y-3 mb-8 flex-1">
//                           {plan.features.map((feature, fIndex) => (
//                             <li key={fIndex} className="flex items-start gap-3">
//                               <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
//                               <span className="text-sm">{feature}</span>
//                             </li>
//                           ))}
//                         </ul>

//                         <Button
//                           className="w-full h-12"
//                           variant={plan.popular ? "default" : "outline"}
//                           asChild
//                         >
//                           <Link to="/contact">
//                             Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                           </Link>
//                         </Button>
//                       </div>
//                     </div>
//                   </Reveal>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Features Section */}
//           <section className="py-24 bg-white dark:bg-slate-950">
//             <div className="container-custom px-4">
//               <Reveal>
//                 <div className="text-center mb-16">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                     Why Choose Our Business Hosting?
//                   </h2>
//                   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                     Enterprise-grade features at affordable prices for your
//                     business growth.
//                   </p>
//                 </div>
//               </Reveal>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[
//                   {
//                     icon: Shield,
//                     title: "99.9% Uptime",
//                     desc: "Guaranteed uptime for your business website",
//                   },
//                   {
//                     icon: Zap,
//                     title: "Fast SSD Storage",
//                     desc: "Lightning fast loading speeds for better UX",
//                   },
//                   {
//                     icon: HeadphonesIcon,
//                     title: "24/7 Expert Support",
//                     desc: "Our team is always here to help you",
//                   },
//                   {
//                     icon: Clock,
//                     title: "Daily Backups",
//                     desc: "Your data is safe with automatic backups",
//                   },
//                 ].map((feature, index) => (
//                   <Reveal key={index}>
//                     <div className="text-center p-6">
//                       <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
//                         <feature.icon className="h-8 w-8 text-primary" />
//                       </div>
//                       <h3 className="text-xl font-bold mb-2">
//                         {feature.title}
//                       </h3>
//                       <p className="text-muted-foreground">{feature.desc}</p>
//                     </div>
//                   </Reveal>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* CTA Section */}
//           <section className="py-24 bg-slate-900">
//             <div className="container-custom px-4 text-center">
//               <Reveal>
//                 <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
//                   Ready to Scale Your Business?
//                 </h2>
//                 <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
//                   Get started with our business hosting plans today. 30-day
//                   money-back guarantee.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <Button
//                     size="xl"
//                     className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700"
//                     asChild
//                   >
//                     <Link to="/contact">Get Started Now</Link>
//                   </Button>
//                   <Button
//                     size="xl"
//                     variant="outline"
//                     className="h-14 px-8 rounded-full text-lg bg-transparent text-white border-white hover:bg-white/10"
//                     asChild
//                   >
//                     <Link to="/contact">Talk to Sales</Link>
//                   </Button>
//                 </div>
//               </Reveal>
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default BusinessHosting;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Server,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  HeadphonesIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";

const BusinessHosting = () => {
  const navigate = useNavigate();

  const [businessPlans, setBusinessPlans] = useState([]);

  useEffect(() => {

    axios
      .get("https://employee.azentraglobal.com/api/v2/hosting-plans")
      .then((res) => {

        if (res.data.status) {
          setBusinessPlans(res.data.data.Commercial);
        }

      })
      .catch((err) => {
        console.error("API Error:", err);
      });

  }, []);

  return (
    <>
      <Helmet>
        <title>
          Business Web Hosting | cPanel Hosting Plans | Azentra Global
        </title>
        <meta
          name="description"
          content="Reliable cPanel business web hosting plans. Choose from affordable hosting solutions for your business with free SSL, 99.9% uptime, and 24/7 support."
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
                    <Server className="h-4 w-4" />
                    <span>cPanel Business Hosting</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                    Powerful Hosting for{" "}
                    <span className="text-primary">Business.</span>
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Reliable hosting plans designed for businesses. Get free
                    SSL, 99.9% uptime, and expert support.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="py-24 bg-muted/20">
            <div className="container-custom px-4 sm:px-6">

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {businessPlans.map((plan, index) => (

                  <Reveal key={index}>
                    <div className="relative bg-card text-card-foreground rounded-3xl shadow-sm hover:shadow-xl border-2 border-border/50 transition-all duration-300 overflow-hidden h-full flex flex-col">

                      <div className="p-8 flex-1 flex flex-col">

                        <h3 className="text-2xl font-bold mb-2">
                          {plan.plan_name}
                        </h3>

                        <div className="mb-6">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                          {plan.features?.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* <Button
                          className="w-full h-12"
                          variant="outline"
                          asChild
                        >
                          <Link to="/contact">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button> */}

                        <Button
                          className="w-full h-12"
                          variant="outline"
                          onClick={() => {
                            const planParam = encodeURIComponent(
                              plan.plan_name ?? plan.name ?? "",
                            );
                            const planIdParam = encodeURIComponent(
                              plan.plan_id ?? plan.id ?? "",
                            );

                            navigate(
                              `/register?type=Business&plan=${planParam}&plan_id=${planIdParam}`,
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
                    Why Choose Our Business Hosting?
                  </h2>

                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Enterprise-grade features at affordable prices for your
                    business growth.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                {[
                  {
                    icon: Shield,
                    title: "99.9% Uptime",
                    desc: "Guaranteed uptime for your business website",
                  },
                  {
                    icon: Zap,
                    title: "Fast NVMe Storage",
                    desc: "Lightning fast loading speeds",
                  },
                  {
                    icon: HeadphonesIcon,
                    title: "24/7 Expert Support",
                    desc: "Our team is always ready to help",
                  },
                  {
                    icon: Clock,
                    title: "Daily Backups",
                    desc: "Your data stays safe with backups",
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

                      <p className="text-muted-foreground">
                        {feature.desc}
                      </p>

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
                  Ready to Scale Your Business?
                </h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                  Get started with our business hosting plans today. 30-day money-back guarantee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="xl"
                    className="h-14 px-8 rounded-full text-lg bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <Link to="/register?type=Business">Get Started Now</Link>
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="h-14 px-8 rounded-full text-lg bg-transparent text-white border-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/contact">Talk to Sales</Link>
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

export default BusinessHosting;