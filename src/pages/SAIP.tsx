import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Users, Award, Target, BookOpen, CheckCircle, XCircle, Share2, User, Building, ArrowRight, Star, Zap, Briefcase, GraduationCap, TrendingUp, Code, ChevronDown, Image as ImageIcon, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import saip1 from "@/public/initiatives/saip1.jpeg";
import { Link } from "react-router-dom";
// Interface for certificate data
interface CertificateData {
  certificate_id: string;
  student_name: string;
  program_name: string;
  organization: string;
  start_date: string;
  end_date: string;
  issue_date: string;
  registration_number: string;
  certificate_status: string;
  student_photo?: string;
  verified_on?: string;
}

// Scroll Down Indicator Component
const ScrollDownIndicator = () => (
  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
    <p className="text-white text-sm font-semibold mb-2">View Certificate Details</p>
    <ChevronDown className="w-6 h-6 text-white" />
  </div>
);

const SAIP = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Fetch certificate data only if certificateId exists
  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!certificateId) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://employee.azentraglobal.com/tracker/CertificateVerify/verify?certificate_id=${certificateId}`
        );

        if (!response.ok) {
          throw new Error('Failed to verify certificate');
        }

        const data = await response.json();
        
        if (data.success && data.data) {
          setCertificateData(data.data);
          setError(null);
        } else {
          setError(data.message || 'Certificate not found');
          setCertificateData(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCertificateData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [certificateId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Certificate Verification',
          text: `Verify my SAIP certificate: ${certificateId}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const isValid = certificateData?.certificate_status !== 'Pending';

  return (
    <>
      <Helmet>
        <title>
          {certificateId 
            ? `Certificate Verification - ${certificateId} | Azentra Global` 
            : "Skill Advancement Internship Program (SAIP) | Azentra Global"}
        </title>
        <meta 
          name="description" 
          content={certificateId 
            ? `Verify SAIP certificate ${certificateId} issued by Azentra Global`
            : "Join Azentra Global's Skill Advancement Internship Program (SAIP) - 7 days, 15 days, and 1-month internships across various technology fields for college students."} 
        />
      </Helmet>

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Premium Hero Section with Background */}
<section className="relative overflow-hidden pt-10 pb-8 h-[70vh] flex items-center justify-center" style={{
  backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(88, 28, 135, 0.85) 100%), url('/initiatives/saip1.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed'
}}>
  {/* Gradient Overlay Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 opacity-50"></div>

  {/* Animated background elements */}
  <div className="absolute inset-0">
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
  </div>

  <div className="relative container mx-auto px-4">
    <div className="max-w-5xl mx-auto text-center">
      {/* SAIP Logo Display */}
      <div className="mb-4 flex justify-center items-center gap-4">
        <div className="relative">
          <img 
            src="/initiativeslogo/SAIP Icon.png"
            alt="SAIP Logo"
            className="h-12 md:h-16 object-contain drop-shadow-2xl filter brightness-110"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* SAIP Logo/Badge */}
      <div className="inline-block mb-3">
        <Badge className="bg-gradient-to-r from-blue-400 to-purple-400 text-white border-0 px-3 py-1 text-xs font-semibold animate-pulse">
          <Zap className="w-3 h-3 mr-1" />
          SAIP - Transform Your Career
        </Badge>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight text-white drop-shadow-lg">
        <span className="block mb-1 text-xl md:text-3xl font-light text-blue-200">Master Your Skills</span>
        <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-green-300 bg-clip-text text-transparent drop-shadow-xl">Skill Advancement</span>
        <span className="block bg-gradient-to-r from-purple-300 via-pink-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-xl mt-1 pb-2">Internship Program</span>
        <div className="h-0.5 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-3 rounded-full shadow-lg"></div>
      </h1>

      <p className="text-sm md:text-base text-blue-100 mb-4 max-w-2xl mx-auto leading-relaxed">
        Transform your future with hands-on experience, expert mentorship, and real-world projects from industry leaders
      </p>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-xl font-bold text-blue-300">10000+</div>
          <div className="text-[10px] text-blue-100">Students Trained</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-xl font-bold text-purple-300">12+</div>
          <div className="text-[10px] text-blue-100">Tech Domains</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-xl font-bold text-pink-300">95%</div>
          <div className="text-[10px] text-blue-100">Success Rate</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-xl font-bold text-green-300">30+</div>
          <div className="text-[10px] text-blue-100">Hiring Partners</div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <Link to="/internship">
        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-lg px-5 h-9 text-sm font-semibold shadow-xl  transition-all">
          Apply Now <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
        </Link>
        {/* <Button size="sm" variant="outline" className="border border-white text-blue hover:bg-white hover:text-blue-900 rounded-lg px-5 h-9 text-sm font-semibold">
          View Domains
        </Button> */}
      </div>
    </div>
  </div>

  {/* Floating cards decoration */}
  <div className="absolute bottom-5 left-5 w-20 h-20 bg-blue-500 opacity-5 rounded-2xl blur-2xl"></div>
  <div className="absolute top-1/4 right-10 w-24 h-24 bg-purple-500 opacity-5 rounded-full blur-2xl"></div>

  {/* Scroll Down Indicator - Only show when certificate ID exists */}
{certificateId && (
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
    <div className="flex flex-col items-center animate-bounce cursor-pointer" onClick={() => {
      const certSection = document.getElementById('certificate-section');
      if (certSection) {
        certSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}>
      <ChevronDown className="w-4 h-4 text-white" />
      <span className="text-white text-[10px] sm:text-xs mt-1 whitespace-nowrap">
        Verify Certificate
      </span>
    </div>
  </div>
)}
</section>



        {/* Certificate Verification Section - HIGHLIGHTED & PROMINENT */}
        {certificateId && (
          <section className="bg-gradient-to-b from-blue-50 to-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Certificate Section Header */}
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
                    <Award className="w-4 h-4 mr-2" />
                    Certificate Verification
                  </Badge>
                  {/* <h2 className="text-4xl font-bold mb-3">Verify Your Achievement</h2>
                  <p className="text-lg text-gray-600">View and share your SAIP certificate credentials</p> */}
                </div>

                {/* Certificate Card */}
                {loading ? (
                  <Card className="shadow-2xl border-0">
                    <CardHeader className="text-center">
                      <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                      <Skeleton className="h-4 w-1/2 mx-auto" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
                ) : error || !certificateData ? (
                  <Card className="shadow-2xl border-0 border-l-4 border-red-500">
                    <CardHeader className="text-center">
                      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <CardTitle className="text-red-600">Certificate Not Found</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <Alert className="mb-4 bg-red-50 border-red-200">
                        <AlertDescription className="text-red-700">
                          The certificate ID "{certificateId}" could not be verified. {error || 'Please check the ID and try again.'}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-2xl border-0 border-l-4 border-green-500">
                    <CardHeader className="text-center relative overflow-hidden bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="relative z-10">
                        {isValid ? (
                          <div>
                            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                              <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <CardTitle className="text-3xl font-bold mb-2 text-green-700">
                              ✓ Certificate Verified
                            </CardTitle>
                          </div>
                        ) : (
                          <div>
                            <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                              <XCircle className="w-12 h-12 text-red-600" />
                            </div>
                            <CardTitle className="text-3xl font-bold mb-2 text-red-700">
                              Certificate Invalid
                            </CardTitle>
                          </div>
                        )}
                        <p className="text-gray-700 text-lg">
                          Certificate ID: <span className="font-mono font-bold text-blue-600">{certificateData.certificate_id}</span>
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8">
                      {isValid ? (
                        <div className="space-y-8">
                          {/* Certificate Details Grid */}
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                <User className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-gray-600 font-semibold">Student Name</p>
                                  <p className="text-lg font-bold text-gray-900">{certificateData.student_name}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                                <Award className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-gray-600 font-semibold">Program</p>
                                  <p className="text-lg font-bold text-gray-900">{certificateData.program_name}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                                <Building className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-gray-600 font-semibold">Organization</p>
                                  <p className="text-lg font-bold text-gray-900">{certificateData.organization}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-5">
                              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                                <Calendar className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-gray-600 font-semibold">Program Period</p>
                                  <p className="text-lg font-bold text-gray-900">
                                    {new Date(certificateData.start_date).toLocaleDateString()} - {new Date(certificateData.end_date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg border border-pink-200">
                                <Calendar className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-gray-600 font-semibold">Issue Date</p>
                                  <p className="text-lg font-bold text-gray-900">{new Date(certificateData.issue_date).toLocaleDateString()}</p>
                                </div>
                              </div>

                              <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                                <Briefcase className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-gray-600 font-semibold">Registration Number</p>
                                  <Badge variant="secondary" className="text-base px-3 py-1 font-mono font-bold">
                                    {certificateData.registration_number}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Share Section */}
                          <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50">
                            <Share2 className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">Share Your Achievement</h3>
                            <p className="text-gray-700 mb-6 max-w-lg mx-auto">
                              Share this verification link on LinkedIn, your resume, or with employers to showcase your SAIP certification.
                            </p>
                            <Button onClick={handleShare} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 h-12 font-semibold rounded-lg">
                              <Share2 className="w-5 h-5 mr-2" />
                              {navigator.share ? 'Share Verification' : (copied ? '✓ Copied to Clipboard!' : 'Copy Verification Link')}
                            </Button>
                          </div>

                          {/* Verification Success Badge */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckCircle className="w-7 h-7 text-green-600 mt-1" />
                              </div>
                              <div className="ml-4">
                                <h4 className="text-lg font-bold text-green-900">Verification Successful</h4>
                                <p className="text-green-800 mt-1">
                                  This certificate was issued on <strong>{new Date(certificateData.issue_date).toLocaleDateString()}</strong> and is valid.
                                </p>
                                {certificateData.verified_on && (
                                  <p className="text-sm text-green-700 mt-2">
                                    Last verified: {new Date(certificateData.verified_on).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Alert className="mb-6 bg-red-50 border-red-200">
                            <XCircle className="h-5 w-5" />
                            <AlertDescription className="text-red-700 text-base">
                              This certificate appears to be {certificateData.certificate_status}. Please contact Azentra Global support for assistance.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Program Overview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-100 text-blue-700">Why Choose SAIP?</Badge>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  Your Gateway to <span className="text-blue-600">Tech Industry Success</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  SAIP bridges the gap between academic learning and industry requirements with flexible internship durations tailored to your goals.
                </p>
              </div>

              {/* Program Duration Cards - Enhanced */}
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {[
                  {
                    duration: "7 Days",
                    title: "Express Track",
                    subtitle: "Intensive crash course",
                    icon: Zap,
                    color: "from-blue-600 to-cyan-600",
                    features: [
                      "Fast-paced fundamentals",
                      "Industry expert mentorship",
                      "Hands-on project work",
                      "Certificate of completion"
                    ]
                  },
                  {
                    duration: "15 Days",
                    title: "Professional Track",
                    subtitle: "Comprehensive learning",
                    icon: Target,
                    color: "from-purple-600 to-pink-600",
                    features: [
                      "In-depth skill development",
                      "Real-world projects",
                      "Team collaboration",
                      "Performance evaluation"
                    ],
                    featured: true
                  },
                  {
                    duration: "1 Month",
                    title: "Master Track",
                    subtitle: "Professional experience",
                    icon: Briefcase,
                    color: "from-green-600 to-emerald-600",
                    features: [
                      "Full project lifecycle",
                      "Advanced technologies",
                      "Industry networking",
                      "Job placement assistance"
                    ]
                  }
                ].map((program, idx) => {
                  const Icon = program.icon;
                  return (
                    <div key={idx} className={`relative group ${program.featured ? 'md:scale-105' : ''}`}>
                      {program.featured && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                      )}
                      <Card className={`relative  transition-all duration-300 ${program.featured ? 'border-2 border-purple-300 shadow-xl' : 'border border-gray-200'}`}>
                        <CardHeader className={`text-center bg-gradient-to-b ${program.color} text-white rounded-t-lg`}>
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur">
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="text-4xl font-bold mb-2">{program.duration}</div>
                          <CardTitle className="text-2xl">{program.title}</CardTitle>
                          <CardDescription className="text-white/80">{program.subtitle}</CardDescription>
                          {program.featured && (
                            <Badge className="bg-white text-purple-600 mt-3 mx-auto">Most Popular</Badge>
                          )}
                        </CardHeader>
                        <CardContent className="p-6">
                          <ul className="space-y-3">
                            {program.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-gray-700">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                <span className="font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button className={`w-full mt-6 bg-gradient-to-r ${program.color} hover:shadow-lg transition-all`}>
                            Learn More <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Domains Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-700">Cutting-Edge Technologies</Badge>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  Explore <span className="text-purple-600">12+ Tech Domains</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Choose from diverse technology domains and master the skills that industry leaders demand.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Web Development", icon: Code, color: "from-blue-500 to-cyan-500" },
                  { name: "Mobile Development", icon: Zap, color: "from-purple-500 to-pink-500" },
                  { name: "Data Science", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
                  { name: "Cloud Computing", icon: Award, color: "from-orange-500 to-red-500" },
                  { name: "Cybersecurity", icon: CheckCircle, color: "from-indigo-500 to-purple-500" },
                  { name: "AI & ML", icon: Zap, color: "from-pink-500 to-rose-500" },
                  { name: "DevOps", icon: Briefcase, color: "from-cyan-500 to-blue-500" },
                  { name: "Digital Marketing", icon: TrendingUp, color: "from-yellow-500 to-orange-500" },
                  { name: "UI/UX Design", icon: Star, color: "from-violet-500 to-purple-500" }
                 
                ].map((tech, idx) => {
                  const IconComp = tech.icon;
                  return (
                    <Card key={idx} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-transparent overflow-hidden">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {tech.name}
                        </h3>
                        <div className="mt-4 h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded group-hover:w-16 transition-all"></div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Program Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-green-100 text-green-700">What You'll Get</Badge>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  Complete <span className="text-green-600">Learning Ecosystem</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: GraduationCap, title: "Expert Mentors", desc: "Learn from industry professionals" },
                  { icon: Code, title: "Real Projects", desc: "Work on actual client deliverables" },
                  { icon: Award, title: "Certification", desc: "Industry-recognized credentials" },
                  { icon: Briefcase, title: "Job Ready", desc: "Direct placement opportunities" }
                ].map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={idx} className="text-center hover:shadow-lg transition-shadow border border-gray-200">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-5xl font-bold mb-6">
                Ready to Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Career?</span>
              </h2>
              <p className="text-xl text-blue-100 mb-12">
                Join 10000+ students who have already accelerated their careers through SAIP. Limited seats available!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/internship">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 border-0 rounded-lg px-8 h-12 font-semibold">
                  Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                </Link>
                {/* <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-lg px-8 h-12 font-semibold">
                  Download Brochure <ArrowRight className="w-5 h-5 ml-2" />
                </Button> */}
              </div>

              <p className="text-sm text-blue-200 mt-8">
                No hidden charges • Flexible payment plans
              </p>
            </div>
          </div>
        </section>

        {/* Azentra Related Initiatives Section */}
        {/* <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-100 text-blue-700">Part of Azentra Ecosystem</Badge>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  Explore Our <span className="text-blue-600">Programs & Initiatives</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  SAIP is part of Azentra Global's comprehensive ecosystem designed to nurture talent and transform careers.
                </p>
              </div>

              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    name: "Career Ignition",
                    path: "/career-ignition",
                    logoPaths: ["/career-ignition/logo.png", "/career-ignition/icon.png"],
                    color: "from-amber-500 to-orange-600",
                    textColor: "text-amber-700",
                    bgColor: "bg-amber-50",
                    borderColor: "border-amber-200",
                    desc: "Your Path to Success"
                  },
                  { 
                    name: "Easter Celebration",
                    path: "/easter",
                    logoPaths: ["/easter/logo.png", "/easter/icon.png"],
                    color: "from-pink-500 to-rose-600",
                    textColor: "text-pink-700",
                    bgColor: "bg-pink-50",
                    borderColor: "border-pink-200",
                    desc: "Employee Engagement"
                  },
                  { 
                    name: "Company Events",
                    path: "/events",
                    logoPaths: ["/events/logo.png", "/events/icon.png"],
                    color: "from-purple-500 to-indigo-600",
                    textColor: "text-purple-700",
                    bgColor: "bg-purple-50",
                    borderColor: "border-purple-200",
                    desc: "Community & Culture"
                  },
                  { 
                    name: "Products",
                    path: "/products",
                    logoPaths: ["/products/logo.png", "/products/icon.png"],
                    color: "from-cyan-500 to-blue-600",
                    textColor: "text-cyan-700",
                    bgColor: "bg-cyan-50",
                    borderColor: "border-cyan-200",
                    desc: "Innovation Hub"
                  }
                ].map((initiative, idx) => (
                  <Card key={idx} className={`group hover:shadow-2xl transition-all duration-300 border-2 ${initiative.borderColor} overflow-hidden hover:scale-105 ${initiative.bgColor}`}>
                    <CardContent className="p-0">
                      <div className={`h-40 bg-gradient-to-br ${initiative.color} relative overflow-hidden group-hover:shadow-lg transition-shadow flex items-center justify-center`}>
                        <div className="flex items-center justify-center gap-3 flex-wrap px-4">
                        
                          {initiative.logoPaths.map((logoPath, logoIdx) => (
                            <img 
                              key={logoIdx}
                              src={logoPath}
                              alt={`${initiative.name} Logo`}
                              className="h-24 md:h-28 object-contain drop-shadow-lg filter brightness-110 hover:scale-110 transition-transform"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ))}
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20">
                          <div className="text-8xl opacity-10">✨</div>
                        </div>
                      </div>

                    
                      <div className="p-6">
                        <h3 className={`text-xl font-bold ${initiative.textColor} mb-2`}>{initiative.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{initiative.desc}</p>
                        <Button className={`w-full bg-gradient-to-r ${initiative.color} text-white hover:shadow-lg transition-all border-0`}>
                          Learn More <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Consultancy Services Section - Custom SAIP Theme */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Specialized Support
                </Badge>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Business Consultancy</span>
                  <span className="block text-gray-700 mt-2">& Corporate Services</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Beyond training - get professional consultancy support to accelerate your career and business growth.
                </p>
              </div>

              {/* Consultancy Services Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    title: "Career Guidance",
                    desc: "Expert mentorship to shape your professional journey after SAIP",
                    icon: Users,
                    color: "from-blue-500 to-cyan-500",
                    features: ["Resume Building", "Interview Prep", "Skill Mapping"]
                  },
                  {
                    title: "Business Solutions",
                    desc: "Tailored strategies to accelerate your startup or business growth",
                    icon: Rocket,
                    color: "from-purple-500 to-pink-500",
                    features: ["Strategy Planning", "Market Analysis", "Implementation Support"]
                  },
                  {
                    title: "Corporate Placement",
                    desc: "Direct connections with leading companies and hiring partners",
                    icon: Briefcase,
                    color: "from-green-500 to-emerald-500",
                    features: ["Job Matching", "Interview Support", "Salary Negotiation"]
                  }
                ].map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <Card key={idx} className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-transparent overflow-hidden">
                      <CardContent className="p-8">
                        <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border-2 border-blue-200 text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready for the Next Level?</h3>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Combine your SAIP certification with our professional consultancy services to unlock unlimited opportunities.
                </p>
                <Link to="/consultancy">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 h-12 font-semibold">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section - Simple with Single Button */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Events Icon and Badge */}
              <div className="inline-block mb-6">
                <Badge className="bg-gradient-to-r from-pink-400 to-purple-400 text-white border-0 px-6 py-3 text-sm font-semibold">
                  <Calendar className="w-4 h-4 mr-2" />
                  Azentra Events & Celebrations
                </Badge>
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Connect & Celebrate</span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">With Our Community</span>
              </h2>

              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join us for exclusive networking events, celebrations, and community gatherings. Experience the vibrant culture at Azentra Global.
              </p>

              {/* Key Highlights */}
              <div className="grid md:grid-cols-3 gap-4 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-pink-300">50+</div>
                  <div className="text-sm text-blue-100">Annual Events</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-purple-300">100+</div>
                  <div className="text-sm text-blue-100">Community Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-blue-300">100%</div>
                  <div className="text-sm text-blue-100">Memorable Moments</div>
                </div>
              </div>

              {/* Single Action Button */}
              <Link to="/events" className="inline-block">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 rounded-lg px-12 h-14 font-semibold shadow-xl transition-all text-lg">
                  Explore Events <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <p className="text-sm text-blue-200 mt-8">
                Discover upcoming events and past celebrations • Network with industry professionals
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-purple-100 text-purple-700">Experience SAIP</Badge>
                <h2 className="text-5xl font-bold mb-6 text-gray-900">
                  Gallery & <span className="text-purple-600">Moments</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get a glimpse of the amazing learning experience and vibrant community at SAIP.
                </p>
              </div>

              {/* Gallery Grid */}







              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { id: 1, title: 'Workshop Session', desc: 'Interactive Learning', image: '/initiatives/saip1.jpeg' },
                  { id: 2, title: 'Team Collaboration', desc: 'Group Projects', image: '/initiatives/saip2.jpeg' },
                    { id: 3, title: 'Mentorship Hour', desc: 'Expert Guidance', image: '/initiatives/saip8.jpeg' },
                    { id: 4, title: 'Project Showcase', desc: 'Student Work', image: '/initiatives/saip4.jpeg' },
                  { id: 5, title: 'Networking Event', desc: 'Industry Meet', image: '/initiatives/saip5.jpeg' },
                  { id: 6, title: 'Certification', desc: 'Achievement', image: '/initiatives/saip7.jpeg' }
                ].map((item) => (
                  <div key={item.id} className="group relative overflow-hidden rounded-xl shadow-lg  transition-all duration-300 h-64">
                    {/* Background Image */}
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/0 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300 flex flex-col items-center justify-end p-6">
                      <div className="text-center text-white">
                        <p className="text-lg font-bold mb-1">{item.title}</p>
                        <p className="text-sm text-blue-200 font-semibold">{item.desc}</p>
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      SAIP
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Info */}
              {/* <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">More Stories to Tell</h3>
                <p className="text-gray-700 max-b-2xl mx-auto mb-6">
                  Every SAIP batch brings new success stories, achievements, and unforgettable memories. Check back soon for more gallery updates!
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                  View All Photos <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div> */}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default SAIP;