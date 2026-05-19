import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {Navbar} from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Briefcase,
  FileText,
  User,
  Phone,
  Calendar,
  Users,
} from "lucide-react";

const domainMap = {
  "Business Development Manager": "BusinessDevelopmentManager",
  "Digital Marketing Executive": "DigitalMarketingExecutive",
  "Frontend Developer": "FrontendDeveloper",
  "Backend Developer": "BackendDeveloper",
  "iOS Developer": "IOSDeveloper",
  "Technical Trainer – Data Science & AI/ML":"Technical Trainer DataScienceAIML",
  "Telecaller Executive":"Telecaller Executive"
};
const domains = [
  { value: "BusinessDevelopmentManager", label: "Business Development Manager" },
  { value: "DigitalMarketingExecutive", label: "Digital Marketing Executive" },
  { value: "FrontendDeveloper", label: "Frontend Developer" },
  { value: "BackendDeveloper", label: "Backend Developer" },
  { value: "IOSDeveloper", label: "iOS Developer" },
   { value: "Technical Trainer DataScienceAIML", label: "Technical Trainer – Data Science & AI/ML" },
   { value: "Telecaller Executive", label: "Telecaller Executive" }
];

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

function Hiring() {
  const { toast } = useToast();
  const location = useLocation();

const selectedDomain =
  domainMap[location.state?.domain] || "";
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
    domain: selectedDomain, 
    summary: "",
    notes: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("dob", formData.dob);
      formPayload.append("phone", formData.phone);
      formPayload.append("gender", formData.gender);
      formPayload.append("domain", formData.domain);
      formPayload.append("summary", formData.summary);
      formPayload.append("notes", formData.notes);
      if (formData.resume) {
        formPayload.append("resume", formData.resume);
      }

      const response = await fetch(
        "https://employee.azentraglobal.com/api/v2/intern/azentracareer",
        {
          method: "POST",
          body: formPayload,
        },
      );

      // ALWAYS parse response
      const result = await response.json();

      if (response.ok && result.response_code === 1) {
        toast({
          title: "Success!",
          description: "Your application has been submitted successfully.",
        });

        setFormData({
          name: "",
          email: "",
          dob: "",
          phone: "",
          gender: "",
          domain: "",
          summary: "",
          notes: "",
          resume: null,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to submit application.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="w-12 h-12 text-[#16A34A] dark:text-[#16A34A]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're looking for talented professionals to grow with us. Apply now
            for exciting opportunities!
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#16A34A] to-[#15803d] dark:from-[#16A34A] dark:to-[#15803d] text-white rounded-t-lg">
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription className="text-blue-100">
              Fill in the details below to apply
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="yourmail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label
                  htmlFor="dob"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Date of Birth *
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Gender *
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gen) => (
                      <SelectItem key={gen.value} value={gen.value}>
                        {gen.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Domain */}
              <div className="space-y-2">
                <Label
                  htmlFor="domain"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Domain (Position) *
                </Label>
                <Select
                  value={formData.domain}
                  onValueChange={(value) => handleSelectChange("domain", value)}
                >
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((dom) => (
                      <SelectItem key={dom.value} value={dom.value}>
                        {dom.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <Label htmlFor="summary" className="text-base font-semibold">
                  Summary *
                </Label>
                <Textarea
                  id="summary"
                  name="summary"
                  placeholder="Brief summary about yourself..."
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  className="min-h-24 resize-none"
                />
              </div>

              {/* Notes */}
              {/* <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-semibold">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Additional notes (optional)..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="min-h-24 resize-none"
                />
              </div> */}

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label
                  htmlFor="resume"
                  className="text-base font-semibold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Resume/CV *
                </Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#16A34A] transition-colors">
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <FileText className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {formData.resume
                        ? formData.resume.name
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF, DOC, or DOCX (Max 5MB)
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#16A34A] to-[#15803d] hover:from-[#15803d] hover:to-[#127a3f] text-white text-lg font-semibold rounded-lg transition-all"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By submitting, you agree to our terms and conditions
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Briefcase className="w-8 h-8 mx-auto mb-4 text-[#16A34A] dark:text-[#16A34A]" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Available Positions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                iOS Developer, Digital Marketing Executive, Trainer
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="w-8 h-8 mx-auto mb-4 text-[#16A34A] dark:text-[#16A34A]" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quick Response
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We review applications within 48 hours
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <User className="w-8 h-8 mx-auto mb-4 text-[#16A34A] dark:text-[#16A34A]" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Grow With Us
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join a team of talented professionals
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Hiring;
