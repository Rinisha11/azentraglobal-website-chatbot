import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitWorkshopRegistration } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().min(10),
  city: z.string().min(1, "City is required"),
  profileType: z.string().min(1, "Select profile type"),
  institutionCompany: z.string().optional(),
  department: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const RegistrationFormWorkshop = () => {
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitWorkshopRegistration(data);
      
      toast({
        title: "Success!",
        description: "Workshop registration completed successfully!",
        className: "bg-green-600 text-white border-none",
      });
      reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

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
           <div><Label>Phone Number</Label><Input {...register("phone")} /><ErrorMsg field="phone" /></div>
           <div><Label>City</Label><Input {...register("city")} /><ErrorMsg field="city" /></div>
        </div>

        <div>
          <Label>Profile Type</Label>
          <select className={selectStyle} {...register("profileType")}>
            <option value="">Select Profile Type</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Business">Business</option>
            <option value="Others">Others</option>
          </select>
          <ErrorMsg field="profileType" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
           <div><Label>Name of Institution/Company <span className="text-xs text-slate-400">(Optional)</span></Label><Input {...register("institutionCompany")} /><ErrorMsg field="institutionCompany" /></div>
           <div><Label>Department <span className="text-xs text-slate-400">(Optional)</span></Label><Input {...register("department")} /><ErrorMsg field="department" /></div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Apply Now"}
        </Button>

      </form>
    </div>
  );
};