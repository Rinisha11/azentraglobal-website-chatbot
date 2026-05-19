import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, CalendarIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  submitApplication, 
  getPrograms, 
  getCollegesAndBatches, 
  getSessions 
} from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10),
  program: z.string().min(1, "Select a program"),
  college: z.string().min(1, "Select a college"),
  customCollege: z.string().optional(),
  regno: z.string().min(1),
  degree: z.string().min(1, "Select a degree"),
  batch: z.string().min(1, "Select a batch"),
  year: z.string().min(1, "Select year"),
  duration: z.string().min(1, "Select Duration"),
  startDate: z.string().min(1, "Select Start Date"),
  session: z.string().min(1, "Select a session"),
  photo: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  selecteddProgram?: string;
}

export const RegistrationForm = ({ selecteddProgram }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(false);

  // Static degrees
  const degrees = [
    { id: "1", name: "BE / B.Tech" },
    { id: "2", name: "ME / M.Tech" },
    { id: "3", name: "BSc" },
    { id: "4", name: "MSc" },
    { id: "5", name: "BCA" },
    { id: "6", name: "MCA" },
    { id: "7", name: "Diploma" },
    { id: "8", name: "Other" }
  ];

  const { register, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
  if (selecteddProgram && programs.length > 0) {
    
    // Find matching program from API
    const matchedProgram = programs.find(
      (p) => p.IProgramName === selecteddProgram
    );

    // Set dropdown value automatically
    if (matchedProgram) {
      setValue("program", matchedProgram.IProgramID.toString());
    }
  }
}, [selecteddProgram, programs, setValue]);

  // --- WATCHERS ---
  const selectedDegree = watch("degree");
  const selectedCollege = watch("college");
  const selectedProgram = watch("program");
  const startDate = watch("startDate");
  const duration = watch("duration");
  const customCollege = watch("customCollege");
  const photoFile = watch("photo");

  // 1. Load Programs on Mount
  useEffect(() => {
    getPrograms().then(setPrograms);
  }, []);

  // 2. Load Colleges & Batches when Degree Changes
  useEffect(() => {
    if (selectedDegree) {
      getCollegesAndBatches(selectedDegree).then(data => {
        setColleges(data.colleges); 
        setBatches(data.batches);   
      });
      setValue("college", "");
      setValue("batch", "");
    }
  }, [selectedDegree, setValue]);

  // 3. Helper: Date Formatter (Backend expects yyyy/MM/dd)
  const formatDateForBackend = (dateStr: string) => {
    if (!dateStr) return "";
    return dateStr.replace(/-/g, "/"); // Converts 2025-12-18 to 2025/12/18
  };

  // 4. Calculate End Date
  const getCalculatedEndDate = () => {
    if (!startDate || !duration) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + (parseInt(duration) - 1));
    return date.toISOString().split('T')[0]; // Returns yyyy-mm-dd
  };

  const endDate = getCalculatedEndDate();

  // 5. Load Sessions (With Debugging)
  useEffect(() => {
    // Check if we have all fields
    const hasRequiredFields = (selectedCollege || customCollege) && selectedProgram && startDate && endDate;
    
    if (hasRequiredFields) {
      setLoadingSessions(true);
      console.log("Fetching Sessions with:", { 
        college: selectedCollege, 
        program: selectedProgram, 
        start: formatDateForBackend(startDate), 
        end: formatDateForBackend(endDate) 
      });

      getSessions({
        collegeId: selectedCollege,
        collegeName: selectedCollege === "0" ? customCollege : "",
        courseId: selectedProgram,
        startDate: formatDateForBackend(startDate), // Send yyyy/MM/dd
        endDate: formatDateForBackend(endDate)      // Send yyyy/MM/dd
      }).then(data => {
        console.log("Sessions Received:", data);
        setSessions(data);
        setLoadingSessions(false);
      });
    } else {
      setSessions([]);
    }
  }, [selectedCollege, customCollege, selectedProgram, startDate, endDate]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        startDate: formatDateForBackend(data.startDate), // Send yyyy/MM/dd
        endDate: formatDateForBackend(getCalculatedEndDate())
      };
      
      await submitApplication(payload);
      
      toast({
        title: "Success!",
        description: "Application submitted.",
        className: "bg-green-600 text-white border-none",
      });
      reset();
      setPreviewUrl(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      setPreviewUrl(URL.createObjectURL(photoFile[0]));
    }
  }, [photoFile]);

  const selectStyle = "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:opacity-50 dark:bg-slate-950 dark:border-slate-800";
  const ErrorMsg = ({ field }: { field: keyof FormData }) => errors[field] ? <span className="text-xs text-red-500 mt-1 block">{errors[field]?.message as string}</span> : null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-slate-200 dark:border-zinc-800 p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Application Form</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid md:grid-cols-2 gap-5">
           <div><Label>Name</Label><Input {...register("name")} /><ErrorMsg field="name" /></div>
           <div><Label>Email</Label><Input {...register("email")} /><ErrorMsg field="email" /></div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
           <div><Label>Phone</Label><Input {...register("phone")} /><ErrorMsg field="phone" /></div>
           <div>
             <Label>Program</Label>
             <select className={selectStyle} {...register("program")}>
               <option value="">Select Program</option>
               {programs.map(p => <option key={p.IProgramID} value={p.IProgramID}>{p.IProgramName}</option>)}
             </select>
             <ErrorMsg field="program" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
           <div><Label>Register No</Label><Input {...register("regno")} /><ErrorMsg field="regno" /></div>
           <div>
             <Label>Degree</Label>
             <select className={selectStyle} {...register("degree")}>
               <option value="">Select Degree</option>
               {degrees.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
             </select>
             <ErrorMsg field="degree" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
           <div>
             <Label>College</Label>
             <select className={selectStyle} {...register("college")}>
               <option value="">Select College</option>
               {colleges.map(c => <option key={c.CollegeID} value={c.CollegeID}>{c.CollegeName}</option>)}
               <option value="0">Others</option>
             </select>
             <ErrorMsg field="college" />
             {selectedCollege === "0" && (
               <Input placeholder="Enter College Name" className="mt-2" {...register("customCollege")} />
             )}
           </div>

           <div>
             <Label>Batch</Label>
             <select className={selectStyle} {...register("batch")}>
               <option value="">Select Batch</option>
               {batches.map(b => <option key={b.BatchID} value={b.BatchID}>{b.BatchYear}</option>)}
             </select>
             <ErrorMsg field="batch" />
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
           <div>
             <Label>Year</Label>
             <select className={selectStyle} {...register("year")}>
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
             </select>
             <ErrorMsg field="year" />
           </div>
           <div>
             <Label>Duration</Label>
             <select className={selectStyle} {...register("duration")}>
                <option value="">Select Duration</option>
                <option value="7">7 Days</option>
                <option value="15">15 Days</option>
                <option value="30">1 Month</option>
                <option value="90">3 Months</option>
             </select>
             <ErrorMsg field="duration" />
           </div>
           <div>
             <Label>Start Date</Label>
             <Input type="date" {...register("startDate")} />
             <ErrorMsg field="startDate" />
           </div>
        </div>

        {/* --- SESSION SECTION --- */}
        <div>
           <Label>Session</Label>
           <select className={selectStyle} {...register("session")}>
              {/* Option 1: Default */}
              <option value="">Select Session</option>

              {/* Option 2: Actual Sessions */}
              {sessions.map(s => (
                <option key={s.ISessionID} value={s.ISessionID}>{s.ISessionName}</option>
              ))}

              {/* Option 3: Loading State */}
              {loadingSessions && <option disabled>Loading sessions...</option>}

              {/* Option 4: User hasn't selected required fields yet */}
              {!loadingSessions && sessions.length === 0 && (
                 (!selectedCollege || !selectedProgram || !startDate || !duration) 
                 ? <option disabled>Select College, Program, Duration & Date first</option>
                 : <option disabled>No sessions available for these dates</option>
              )}
           </select>
           <ErrorMsg field="session" />
           
           {/* Debugging Text (Optional: Remove after fixing) */}
           {/* <p className="text-xs text-gray-400 mt-1">
             Debug: Col:{selectedCollege}, Prog:{selectedProgram}, Dur:{duration}, Date:{startDate}
           </p> */}
        </div>

        <div>
            <Label>Photo</Label>
            {previewUrl && <img src={previewUrl} className="h-20 w-20 rounded-full mb-2 object-cover border" />}
            <Input type="file" accept="image/*" {...register("photo")} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Apply Now"}
        </Button>

      </form>
    </div>
  );
};