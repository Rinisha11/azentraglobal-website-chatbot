import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitCareerApplication } from "@/lib/api"; 
import { Loader2, UploadCloud } from "lucide-react";

// --- CONSTANTS ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Static Options for Dropdowns (IDs match Backend expectations)
const DEGREE_OPTIONS = [
  { id: "1", name: "BE / B.Tech" },
  { id: "2", name: "ME / M.Tech" },
  { id: "3", name: "BSc" },
  { id: "4", name: "MSc" },
  { id: "5", name: "BCA" },
  { id: "6", name: "MCA" },
  { id: "7", name: "Diploma" },
  { id: "8", name: "Other" }
];

const BATCH_OPTIONS = [
  { id: "1", year: "2023" },
  { id: "2", year: "2024" },
  { id: "3", year: "2025" },
  { id: "4", year: "2026" },
  { id: "5", year: "2027" }
];

// --- ZOD SCHEMA (Frontend Validation) ---
const jobFormSchema = z.object({
  // Personal Details
  name: z.string().min(2, "Name is required"),
  contactNumber: z.string().min(10, "Valid 10-digit number required").max(15, "Number too long"),
  email: z.string().email("Valid email required"),

  // Education
  collegeName: z.string().min(2, "College name is required"),
  batch: z.string().min(1, "Batch is required"), // Validates ID is selected
  regNo: z.string().min(2, "Register number is required"),
  department: z.string().min(2, "Department is required"),
  degree: z.string().min(1, "Degree is required"), // Validates ID is selected

  // Profile (Optional)
  github: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),

  // Reference (Optional)
  staffName: z.string().optional().or(z.literal("")),
  staffContact: z.string().optional().or(z.literal("")),

  // Role Selection
  role: z.enum(["LaravelDeveloper", "FlutterDeveloper"], {
    required_error: "Please select a role",
  }),

  // Uploads (Mandatory + Size/Type Check)
  resume: z.any()
    .refine((files) => files?.length > 0, "Resume is required")
    .refine((files) => files?.[0]?.type === "application/pdf", "Only PDF files are allowed")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Resume size must be less than 5MB"), 

  photo: z.any()
    .refine((files) => files?.length > 0, "Photo is required")
    .refine((files) => files?.[0]?.type?.startsWith("image/"), "Only image files are allowed")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Photo size must be less than 5MB"),
});

type JobFormData = z.infer<typeof jobFormSchema>;

export const JobApplicationForm = () => {
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
  });

  // Watch for Photo to show preview
  const photoFile = watch("photo");
  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      setPhotoPreview(URL.createObjectURL(photoFile[0]));
    }
  }, [photoFile]);

  // --- SUBMIT LOGIC ---
  const onSubmit = async (data: JobFormData) => {
    try {
      const formData = new FormData();

      // 1. Append Text Fields
      // Note: Mapping frontend names to Backend API keys
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.contactNumber); 
      formData.append("collegename", data.collegeName);
      formData.append("collegeregno", data.regNo);
      formData.append("batchyear", data.batch); // Sends ID (e.g., "1")
      formData.append("degree", data.degree);   // Sends ID (e.g., "2")
      formData.append("department", data.department);
      formData.append("role", data.role);
      
      // 2. Append Optional Fields
      formData.append("projectLink", data.github || "");
      formData.append("linkedLink", data.linkedin || ""); 
      formData.append("staffName", data.staffName || "");
      formData.append("staffNumber", data.staffContact || "");
      formData.append("staffDesignation", "staff"); 

      // 3. Append Files
      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }
      if (data.resume && data.resume[0]) {
        formData.append("resume", data.resume[0]);
      }

      console.log("Submitting application...");

      // 4. Send to API
      // This function throws an error if response_code !== 1
      await submitCareerApplication(formData);

      // 5. Success Handler
      toast({
        title: "Application Submitted!",
        description: "We have received your details successfully.",
        className: "bg-green-600 text-white border-none",
        duration: 5000,
      });
      
      reset();
      setPhotoPreview(null);

    } catch (error: any) {
      console.error("Submission Error:", error);
      
      // 6. Error Handler (Displays Backend Message)
      // Example: "Phone number already exists"
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Server rejected the application. Please check your details.",
        duration: 5000,
      });
    }
  };

  // Helper for error messages
  const ErrorMsg = ({ field }: { field: keyof JobFormData }) => errors[field] ? <span className="text-xs text-red-500 mt-1 block">{errors[field]?.message as string}</span> : null;

  return (
    <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl shadow-lg border border-border p-6 md:p-10 my-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Job Application</h2>
        <p className="text-muted-foreground mt-2">Join the Azentra Global Team</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* --- SECTION 1: PERSONAL DETAILS --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-primary">Personal Details</h3>
          <div className="grid md:grid-cols-2 gap-5">
             <div><Label>1. Name <span className="text-red-500">*</span></Label><Input placeholder="Full Name" {...register("name")} /><ErrorMsg field="name" /></div>
             <div><Label>2. Contact Number <span className="text-red-500">*</span></Label><Input type="tel" placeholder="10-digit mobile number" {...register("contactNumber")} /><ErrorMsg field="contactNumber" /></div>
          </div>
          <div><Label>3. Mail <span className="text-red-500">*</span></Label><Input type="email" placeholder="yourname@example.com" {...register("email")} /><ErrorMsg field="email" /></div>
        </div>

        {/* --- SECTION 2: EDUCATION --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-primary">Education</h3>
          
          <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>4. College Name <span className="text-red-500">*</span></Label>
                <Input placeholder="Full College Name" {...register("collegeName")} />
                <ErrorMsg field="collegeName" />
              </div>

              <div>
                <Label>5. Batch <span className="text-red-500">*</span></Label>
                <select 
                  {...register("batch")} 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Batch</option>
                  {BATCH_OPTIONS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.year}
                    </option>
                  ))}
                </select>
                <ErrorMsg field="batch" />
              </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
              <div>
                <Label>6. College Reg No <span className="text-red-500">*</span></Label>
                <Input placeholder="University Reg No" {...register("regNo")} />
                <ErrorMsg field="regNo" />
              </div>
              
              <div>
                <Label>7. Department <span className="text-red-500">*</span></Label>
                <Input placeholder="e.g. CSE / IT" {...register("department")} />
                <ErrorMsg field="department" />
              </div>

              <div>
                <Label>8. Degree <span className="text-red-500">*</span></Label>
                <select 
                  {...register("degree")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Degree</option>
                  {DEGREE_OPTIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ErrorMsg field="degree" />
              </div>
          </div>
        </div>

        {/* --- SECTION 3: ROLE SELECTION --- */}
        <div className="bg-muted/30 p-4 rounded-lg border border-border">
          <Label className="mb-3 block text-lg font-semibold">Select Role Applying For <span className="text-red-500">*</span></Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { val: "LaravelDeveloper", label: "Software Developer - Laravel (PHP)" },
              { val: "FlutterDeveloper", label: "Flutter Developer" }
              // { val: "FrontendSoftware", label: "Software Developer - Frontend" },
              // { val: "BackendSoftware", label: "Software Developer - Backend" },
              // { val: "ResearchAnalyst", label: "Research Analyst" },
              // { val: "UIUX", label: "UI/UX Designer" }

            ].map((role) => (
              <label key={role.val} className="flex items-center space-x-3 cursor-pointer p-3 border rounded hover:bg-muted transition bg-card">
                <input type="radio" value={role.val} {...register("role")} className="h-4 w-4 accent-primary" />
                <span className="text-sm font-medium">{role.label}</span>
              </label>
            ))}
          </div>
          <ErrorMsg field="role" />
        </div>

        {/* --- SECTION 4: OPTIONAL DETAILS --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-primary">Additional Details (Optional)</h3>
          <div className="grid md:grid-cols-2 gap-5">
             <div><Label>9. Github Link</Label><Input placeholder="https://github.com/username" {...register("github")} /></div>
             <div><Label>10. LinkedIn Link</Label><Input placeholder="https://linkedin.com/in/username" {...register("linkedin")} /></div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
             <div><Label>11. Staff Name (Reference)</Label><Input placeholder="Staff Name" {...register("staffName")} /></div>
             <div><Label>12. Staff Contact (Reference)</Label><Input placeholder="Staff Contact Number" {...register("staffContact")} /></div>
          </div>
        </div>

        {/* --- SECTION 5: UPLOADS --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-primary">Upload Documents</h3>
          <div className="grid md:grid-cols-2 gap-5 items-start">
              
              {/* Resume Upload */}
              <div className="p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-muted/5 hover:bg-muted/10 transition">
                  <Label className="block mb-2 font-medium">13. Resume (PDF Only) <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input type="file" accept=".pdf" {...register("resume")} className="cursor-pointer pl-10 pt-1.5" />
                    <UploadCloud className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  <ErrorMsg field="resume" />
                  <p className="text-xs text-muted-foreground mt-2">Max size 5MB.</p>
              </div>
              
              {/* Photo Upload */}
              <div className="p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-muted/5 hover:bg-muted/10 transition">
                  <Label className="block mb-2 font-medium">14. Photo (Image) <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input type="file" accept="image/*" {...register("photo")} className="cursor-pointer pl-10 pt-1.5" />
                    <UploadCloud className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  <ErrorMsg field="photo" />
                  
                  {photoPreview && (
                    <div className="mt-4 flex justify-center">
                        <img src={photoPreview} alt="Preview" className="h-24 w-24 rounded-full object-cover border-4 border-background shadow-md" />
                    </div>
                  )}
              </div>
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg font-medium transition-all shadow-md">
            {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Application...</> : "Submit Application"}
        </Button>

      </form>
    </div>
  );
};