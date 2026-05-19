import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Search,
  Link as LinkIcon,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/ui/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { ConsultancyAccountType } from "@/lib/consultancyAuth";

// --- DATA CONFIG ---
const JOB_DATA: Record<string, string[]> = {
  "HR & Administration": ["HR Operations", "Recruitment", "Payroll", "Admin Support"],
  "IT & Software Development": ["Frontend", "Backend", "Full Stack", "Mobile Apps", "AI/ML", "DevOps", "QA"],
  "Finance & Accounts": ["Accounting", "Audit", "Taxation", "Banking"],
  "Sales & Marketing": ["Business Development", "Digital Marketing", "Branding"],
  "Operations & Support": ["Logistics", "Supply Chain", "Quality Assurance"],
  "Engineering (Non-IT)": ["Civil", "Mechanical", "Electrical"],
  "Creative & Design": ["UI/UX", "Graphic Design", "Content Creation"],
  "Customer Support": ["BPO", "Technical Support", "Client Management"],
  "Freshers / Internships": ["Trainee", "Internship"],
};



const Consultancy = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<ConsultancyAccountType>("jobseeker");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMode, setSuccessMode] = useState<ConsultancyAccountType>("jobseeker");

  const [functionalAreas, setFunctionalAreas] = useState<any[]>([]);
const [roles, setRoles] = useState<any[]>([]);
const fetchFunctionalAreas = async () => {
  try {
    const res = await fetch(
      "https://employee.azentraglobal.com/api/v2/Consultancy/get_functional_areas"
    );

    const data = await res.json();

    if (data.status) {
      setFunctionalAreas(data.data);
    }
  } catch (err) {
    console.error(err);
  }
};
const fetchRoles = async (functionalAreaId: string) => {
  try {
    const res = await fetch(
      `https://employee.azentraglobal.com/api/v2/Consultancy/get_roles/${functionalAreaId}`
    );

    const data = await res.json();

    if (data.status) {
      setRoles(data.data);
    }
  } catch (err) {
    console.error(err);
  }
};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    academicStatus: "",
    qualification: "",
    specialization: "",
    passingYear: "",
    category: "",
    role: "",
    jobType: "",
    preferredLocation: "",
    expectedCTC: "",
    linkedinProfile: "",
    expLevel: "",
    currentOrg: "",
    currentDesignation: "",
    currentCTC: "",
    noticePeriod: "",
    resume: null as File | null,
    password: "",
    confirmPassword: "",
    declared: false,
  });

  const [employerData, setEmployerData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    designation: "",
    companyWebsite: "",
    hiringFor: "",
    numberOfPositions: "",
    preferredLocation: "",
    requirementSummary: "",
    password: "",
    confirmPassword: "",
    declared: false,
  });

  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "category") {
      setFormData((prev) => ({ ...prev, category: value, role: "" }));
    }
  };

  const handleEmployerUpdate = (field: string, value: any) => {
    setEmployerData((prev) => ({ ...prev, [field]: value }));
  };

  const isExperienced = formData.expLevel !== "" && formData.expLevel !== "Fresher";

  const switchMode = (selectedMode: ConsultancyAccountType) => {
    setMode(selectedMode);
    setSuccessMode(selectedMode);
    setCurrentStep(1);
  };

  const validateJobSeeker = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast({ variant: "destructive", title: "Missing details", description: "Please fill the required candidate fields." });
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast({ variant: "destructive", title: "Password required", description: "Use a password with at least 6 characters." });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ variant: "destructive", title: "Password mismatch", description: "Password and confirm password must match." });
      return false;
    }
    if (!formData.declared) {
      toast({ variant: "destructive", title: "Declaration required", description: "Accept the declaration to continue." });
      return false;
    }
    return true;
  };

  const validateEmployer = () => {
    if (!employerData.companyName || !employerData.contactPerson || !employerData.email || !employerData.phone || !employerData.hiringFor || !employerData.requirementSummary) {
      toast({ variant: "destructive", title: "Missing details", description: "Please fill the required employer fields." });
      return false;
    }
    if (!employerData.password || employerData.password.length < 6) {
      toast({ variant: "destructive", title: "Password required", description: "Use a password with at least 6 characters." });
      return false;
    }
    if (employerData.password !== employerData.confirmPassword) {
      toast({ variant: "destructive", title: "Password mismatch", description: "Password and confirm password must match." });
      return false;
    }
    if (!employerData.declared) {
      toast({ variant: "destructive", title: "Declaration required", description: "Accept the declaration to continue." });
      return false;
    }
    return true;
  };

 const parseApiResponse = async (res: Response) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (parseError) {
    const message = `Server response was not valid JSON. Response text: ${text}`;
    throw new Error(message);
  }
};

 const handleJobSeekerSubmit = async () => {
  if (!validateJobSeeker()) return;

  try {
    setIsSubmitting(true);

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "resume" && value) {
        form.append("resume", value as File);
      } else {
        form.append(key, value as any);
      }
    });

    const res = await fetch(
      "https://employee.azentraglobal.com/api/v2/Consultancy/register_jobseeker",
      {
        method: "POST",
        body: form,
      }
    );

    const data = await parseApiResponse(res);

    if (!data.status) throw new Error(data.message || "Registration failed");

    toast({
      title: "Registration successful",
      description: "Job seeker registered successfully",
    });

    setSuccessMode("jobseeker");
    setCurrentStep(4);

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: error.message,
    });
  } finally {
    setIsSubmitting(false);
  }
};

 const handleEmployerSubmit = async () => {
  if (!validateEmployer()) return;

  try {
    setIsSubmitting(true);

    const res = await fetch(
      "https://employee.azentraglobal.com/api/v2/Consultancy/register_employer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employerData),
      }
    );

    const data = await parseApiResponse(res);

    if (!data.status) throw new Error(data.message || "Registration failed");

    toast({
      title: "Registration successful",
      description: "Employer registered successfully",
    });

    setSuccessMode("employer");
    setCurrentStep(4);

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Registration failed",
      description: error.message,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSubmit = async () => {
    if (mode === "jobseeker") {
      if (currentStep < 3) {
        nextStep();
        return;
      }
      await handleJobSeekerSubmit();
      return;
    }

    await handleEmployerSubmit();
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Reveal>
            <div className="flex flex-col items-center text-center mb-8">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">AZENTRA GLOBAL</h1>
              <p className="text-green-600 font-bold text-[10px] uppercase tracking-[0.3em]">Consultancy Registration Portal</p>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                Register as a job seeker or employer. After registration, sign in to your dedicated consultancy portal to manage applications and employer requests.
              </p>
              <p className="mt-3 text-sm text-slate-500">
                Already registered? <Link to="/consultancy/login" className="text-green-600 hover:underline">Sign in here</Link>.
              </p>
            </div>
          </Reveal>

          <div className="mb-10 flex justify-center gap-3">
            {( ["jobseeker", "employer"] as ConsultancyAccountType[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => switchMode(option)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition ${mode === option ? "bg-green-600 text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}
              >
                {option === "jobseeker" ? "Job Seeker" : "Employer"}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {currentStep === 4 ? (
                <SuccessState mode={successMode} onContinue={() => navigate("/consultancy/login")} />
              ) : (
                <motion.div key={`${mode}-${currentStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  {mode === "jobseeker" ? (
                    <>
                      {currentStep <= 3 && (
                        <div className="mb-10 max-w-sm mx-auto">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                            <span>Phase: {currentStep === 1 ? "Personal" : currentStep === 2 ? "Preference" : "Experience"}</span>
                            <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
                          </div>
                          <Progress value={(currentStep / 3) * 100} className="h-1.5 bg-slate-200 dark:bg-slate-800" />
                        </div>
                      )}

                      {currentStep === 1 && (
                        <div className="space-y-8">
                          <FormHeader title="Candidate Information" icon={<User size={20} />} />
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormInput label="Full Name" value={formData.fullName} onChange={(v) => handleUpdate("fullName", v)} />
                            <FormInput label="Email Address" type="email" value={formData.email} onChange={(v) => handleUpdate("email", v)} />
                            <FormInput label="Contact Number" value={formData.phone} onChange={(v) => handleUpdate("phone", v)} />
                            <FormSelect label="Gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={(v) => handleUpdate("gender", v)} />
                            <div className="md:col-span-2">
                              <FormInput label="Full Residential Address" value={formData.address} onChange={(v) => handleUpdate("address", v)} />
                            </div>
                          </div>

                          <FormHeader title="Educational Qualifications" icon={<GraduationCap size={20} />} />
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormSelect label="Academic Status" options={["Currently Student", "Passed Out"]} value={formData.academicStatus} onChange={(v) => handleUpdate("academicStatus", v)} />
                            <FormInput label="Degree / Qualification" placeholder="e.g. B.E / MBA" value={formData.qualification} onChange={(v) => handleUpdate("qualification", v)} />
                            <FormInput label="Specialization / Major" placeholder="e.g. Computer Science" value={formData.specialization} onChange={(v) => handleUpdate("specialization", v)} />
                            <FormInput label="Year of Completion" type="number" value={formData.passingYear} onChange={(v) => handleUpdate("passingYear", v)} />
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-8">
                          <FormHeader title="Job Preferences" icon={<Search size={20} />} />
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormSelect label="Functional Area" options={Object.keys(JOB_DATA)} value={formData.category} onChange={(v) => handleUpdate("category", v)} />
                            <div className={formData.category ? "" : "opacity-40 pointer-events-none"}>
                              <FormSelect label="Interested Role" options={formData.category ? JOB_DATA[formData.category] : []} value={formData.role} onChange={(v) => handleUpdate("role", v)} />
                            </div>
                            <FormSelect label="Employment Type" options={["Full-time", "Part-time", "Remote", "Contract"]} value={formData.jobType} onChange={(v) => handleUpdate("jobType", v)} />
                            <FormInput label="Preferred Work City" placeholder="e.g. Chennai, Bangalore" value={formData.preferredLocation} onChange={(v) => handleUpdate("preferredLocation", v)} />
                          </div>

                          <FormHeader title="Salary & Professional Links" icon={<DollarSign size={20} />} />
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormInput label="Expected Salary (LPA)" placeholder="e.g. 5.0" value={formData.expectedCTC} onChange={(v) => handleUpdate("expectedCTC", v)} />
                            <FormInput label="LinkedIn URL" icon={<LinkIcon size={14} />} placeholder="linkedin.com/in/yourprofile" value={formData.linkedinProfile} onChange={(v) => handleUpdate("linkedinProfile", v)} />
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-8">
                          <FormHeader title="Professional Background" icon={<Briefcase size={20} />} />
                          <FormSelect label="Total Experience" options={["Fresher", "1–3 Years", "3–5 Years", "5+ Years"]} value={formData.expLevel} onChange={(v) => handleUpdate("expLevel", v)} />

                          <AnimatePresence>
                            {isExperienced && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="grid md:grid-cols-2 gap-6 overflow-hidden border-l-4 border-green-600 pl-6 py-2">
                                <FormInput label="Current Employer" value={formData.currentOrg} onChange={(v) => handleUpdate("currentOrg", v)} />
                                <FormInput label="Current Designation" value={formData.currentDesignation} onChange={(v) => handleUpdate("currentDesignation", v)} />
                                <FormInput label="Current Salary (LPA)" value={formData.currentCTC} onChange={(v) => handleUpdate("currentCTC", v)} />
                                <FormSelect label="Notice Period" options={["Immediate", "15 Days", "30 Days", "90 Days"]} value={formData.noticePeriod} onChange={(v) => handleUpdate("noticePeriod", v)} />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <FormHeader title="Supporting Documents" icon={<Upload size={20} />} />
                          <div className="p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] text-center hover:border-green-600 transition-all cursor-pointer group bg-slate-50/50 dark:bg-slate-800/30">
                            <input type="file" id="resume" className="hidden" onChange={(e) => handleUpdate("resume", e.target.files?.[0])} />
                            <label htmlFor="resume" className="cursor-pointer flex flex-col items-center">
                              <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="text-green-600" size={20} />
                              </div>
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                {formData.resume ? formData.resume.name : "Upload Resume (PDF format)"}
                              </span>
                            </label>
                          </div>

                          <FormHeader title="Account Security" icon={<ShieldCheck size={20} />} />
                          <div className="grid md:grid-cols-2 gap-6">
                            <FormInput label="Password" type="password" value={formData.password} onChange={(v) => handleUpdate("password", v)} />
                            <FormInput label="Confirm Password" type="password" value={formData.confirmPassword} onChange={(v) => handleUpdate("confirmPassword", v)} />
                          </div>

                          <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-900">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input type="checkbox" className="mt-1 w-5 h-5 accent-green-600 rounded" checked={formData.declared} onChange={(e) => handleUpdate("declared", e.target.checked)} />
                              <span className="text-[11px] text-green-800 dark:text-green-300 leading-snug">
                                I hereby confirm that the information provided is accurate. I authorize Azentra Global to represent my profile to prospective employers for relevant job opportunities.
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-8">
                      <FormHeader title="Employer Registration" icon={<Briefcase size={20} />} />
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Company Name" value={employerData.companyName} onChange={(v) => handleEmployerUpdate("companyName", v)} />
                        <FormInput label="Contact Person" value={employerData.contactPerson} onChange={(v) => handleEmployerUpdate("contactPerson", v)} />
                        <FormInput label="Email Address" type="email" value={employerData.email} onChange={(v) => handleEmployerUpdate("email", v)} />
                        <FormInput label="Phone Number" value={employerData.phone} onChange={(v) => handleEmployerUpdate("phone", v)} />
                        <FormInput label="Designation" placeholder="HR Manager / Co-Founder" value={employerData.designation} onChange={(v) => handleEmployerUpdate("designation", v)} />
                        <FormInput label="Company Website" placeholder="https://" value={employerData.companyWebsite} onChange={(v) => handleEmployerUpdate("companyWebsite", v)} />
                      </div>

                      <FormHeader title="Hiring Requirement" icon={<Search size={20} />} />
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Hiring For" value={employerData.hiringFor} onChange={(v) => handleEmployerUpdate("hiringFor", v)} />
                        <FormInput label="Number of Positions" value={employerData.numberOfPositions} onChange={(v) => handleEmployerUpdate("numberOfPositions", v)} />
                        <FormInput label="Preferred Location" value={employerData.preferredLocation} onChange={(v) => handleEmployerUpdate("preferredLocation", v)} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.1em] ml-1">Requirement Summary</label>
                        <textarea
                          value={employerData.requirementSummary}
                          onChange={(e) => handleEmployerUpdate("requirementSummary", e.target.value)}
                          rows={5}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 transition-all text-sm"
                          placeholder="Describe the role and skills you need..."
                        />
                      </div>

                      <FormHeader title="Account Security" icon={<ShieldCheck size={20} />} />
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Password" type="password" value={employerData.password} onChange={(v) => handleEmployerUpdate("password", v)} />
                        <FormInput label="Confirm Password" type="password" value={employerData.confirmPassword} onChange={(v) => handleEmployerUpdate("confirmPassword", v)} />
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-900">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" className="mt-1 w-5 h-5 accent-green-600 rounded" checked={employerData.declared} onChange={(e) => handleEmployerUpdate("declared", e.target.checked)} />
                          <span className="text-[11px] text-green-800 dark:text-green-300 leading-snug">
                            I confirm that this employer request is genuine and authorizes Azentra Global to initiate the recruitment support process.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-10 border-t dark:border-slate-800">
                    {mode === "jobseeker" ? (
                      <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className="rounded-full px-8 border-slate-200">
                        <ChevronLeft size={18} className="mr-2" /> Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 text-white rounded-full px-14 py-6 text-base font-bold shadow-xl shadow-green-600/20 hover:scale-105 transition-all">
                      {isSubmitting ? "Submitting..." : mode === "jobseeker" ? (currentStep < 3 ? "Next Step" : "Complete Registration") : "Submit Employer Request"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// --- HELPER COMPONENTS ---

const FormHeader = ({ title, icon }: any) => (
  <div className="flex items-center gap-3 pb-2 border-b border-slate-100 dark:border-slate-800">
    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">{icon}</div>
    <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">{title}</h2>
  </div>
);

const FormInput = ({ label, type = "text", value, onChange, placeholder, icon }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.1em] ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-slate-50 dark:bg-slate-800 border-none ${icon ? "pl-10" : "px-5"} py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 transition-all text-sm`}
        placeholder={placeholder || label}
      />
    </div>
  </div>
);

const FormSelect = ({ label, options, value, onChange }: any) => (
  <div className="space-y-2 flex-1">
    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.1em] ml-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-50 dark:bg-slate-800 border-none px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 transition-all text-sm cursor-pointer appearance-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const SuccessState = ({ mode, onContinue }: { mode: ConsultancyAccountType; onContinue: () => void }) => {
  const message = mode === "jobseeker"
    ? "Your profile is now live in our consultancy database. Azentra Global will match your details with top employers and contact you for upcoming interviews."
    : "Your employer request is now received. Azentra Global will review your requirement and contact you to start the recruitment process.";

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <CheckCircle2 size={48} />
      </div>
      <h2 className="text-3xl font-black mb-4 text-slate-900 dark:text-white uppercase">Registration Complete</h2>
      <p className="text-slate-500 text-sm max-w-sm mx-auto mb-10 leading-relaxed">{message}</p>
      <Button onClick={onContinue} className="rounded-full px-12 bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-green-600 transition-colors">
        Go to Consultancy Login
      </Button>
    </motion.div>
  );
};

export default Consultancy;
