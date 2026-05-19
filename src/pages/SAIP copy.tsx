import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Users, Award, Target, BookOpen, CheckCircle, XCircle, Share2, User, Building, ArrowRight, Star, Zap, Briefcase, GraduationCap, TrendingUp, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white pt-32 pb-20">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          <div className="relative container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto text-center">
              {/* SAIP Logo/Badge */}
              <div className="inline-block mb-6">
                <Badge className="bg-gradient-to-r from-blue-400 to-purple-400 text-white border-0 px-6 py-3 text-sm font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  SAIP - Transform Your Career
                </Badge>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Skill Advancement <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Internship Program
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your future with hands-on experience, expert mentorship, and real-world projects from industry leaders
              </p>

              {/* Key Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-12">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-blue-300">500+</div>
                  <div className="text-sm text-blue-100">Students Trained</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-purple-300">12+</div>
                  <div className="text-sm text-blue-100">Tech Domains</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-pink-300">95%</div>
                  <div className="text-sm text-blue-100">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-bold text-green-300">30+</div>
                  <div className="text-sm text-blue-100">Hiring Partners</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-lg px-8 h-12 font-semibold">
                  Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg px-8 h-12 font-semibold">
                  View Domains
                </Button>
              </div>
            </div>
          </div>

          {/* Floating cards decoration */}
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500 opacity-5 rounded-2xl blur-2xl"></div>
          <div className="absolute top-1/4 right-20 w-40 h-40 bg-purple-500 opacity-5 rounded-full blur-2xl"></div>
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
                  <h2 className="text-4xl font-bold mb-3">Verify Your Achievement</h2>
                  <p className="text-lg text-gray-600">View and share your SAIP certificate credentials</p>
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
                      <Card className={`relative hover:shadow-2xl transition-all duration-300 ${program.featured ? 'border-2 border-purple-300 shadow-xl' : 'border border-gray-200'}`}>
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
                  { name: "UI/UX Design", icon: Star, color: "from-violet-500 to-purple-500" },
                  { name: "Blockchain", icon: Code, color: "from-amber-500 to-orange-500" },
                  { name: "IoT", icon: Zap, color: "from-teal-500 to-green-500" },
                  { name: "Game Development", icon: Briefcase, color: "from-red-500 to-pink-500" }
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
                Join 500+ students who have already accelerated their careers through SAIP. Limited seats available!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 border-0 rounded-lg px-8 h-12 font-semibold">
                  Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 rounded-lg px-8 h-12 font-semibold">
                  Download Brochure <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <p className="text-sm text-blue-200 mt-8">
                No hidden charges • Flexible payment plans • Lifetime access to resources
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default SAIP;