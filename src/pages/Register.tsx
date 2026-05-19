  import { useEffect, useState } from "react";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { Helmet } from "react-helmet-async";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import Navbar from "@/components/Navbar";
  import Footer from "@/components/Footer";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useToast } from "@/hooks/use-toast";
import {
  SubscriptionType,
  CustomerUser,
  getDefaultSubscriptions,
  logoutCustomer,
  registerCustomer,
} from "@/lib/auth";
import { fileToBase64 } from "@/lib/utils";

const formSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Provide a valid email"),
    phone: z
      .string()
      .min(10, "Provide a valid phone number")
      .max(20, "Too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password"),
    aadharNumber: z.string().optional(),
    companyName: z.string().optional(),
    gstNumber: z.string().optional(),
    idCard: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [type, setType] = useState<SubscriptionType>("Academic");
  const [planId, setPlanId] = useState<string>("");
  const [plans, setPlans] = useState<Array<{ plan_name?: string; name?: string; features?: string[]; category: SubscriptionType }>>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  useEffect(() => {
    // Ensure any existing login state is cleared so the user lands on /login after
    // registration (instead of being auto-redirected to the portal).
    logoutCustomer();
  }, []);

    useEffect(() => {
      const t = searchParams.get("type");
      const p = searchParams.get("plan");
      const pId = searchParams.get("plan_id") ?? searchParams.get("planId");

      if (t && (t === "Academic" || t === "Commercial")) {
        setType(t);
      }

      if (pId) {
        setPlanId(pId);
      } else if (p) {
        setPlanId(p);
      }
    }, [searchParams]);

  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      setPlanError(null);

      try {
        const res = await fetch("https://employee.azentraglobal.com/api/v2/hosting-plans");
        const data = await res.json();
        if (!data?.status || !data?.data) {
          throw new Error("Invalid plan response");
        }

        const academicPlans = Array.isArray(data.data.Academic) ? data.data.Academic : [];
        const commercialPlans = Array.isArray(data.data.Commercial) ? data.data.Commercial : [];

        const normalized = [
          ...academicPlans.map((p: any) => ({ ...p, category: "Academic" as const })),
          ...commercialPlans.map((p: any) => ({ ...p, category: "Commercial" as const })),
        ];

        setPlans(normalized);
      } catch (err) {
        setPlanError("Unable to load hosting plans. Please try again later.");
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (!plans.length) return;

    const selected = plans.find((p) => {
      const current = planId?.toString();
      return (
        (p.plan_id != null && p.plan_id.toString() === current) ||
        (p.plan_name ?? p.name) === current
      );
    });

    // If the user switched account type, reset the selected plan to avoid mismatches.
    if (selected && selected.category !== type) {
      setPlanId("");
      return;
    }

    // Normalize the selected plan to plan_name for display and form selection.
    if (selected && selected.plan_name && selected.plan_name !== planId) {
      setPlanId(selected.plan_name);
      return;
    }

    if (!planId) {
      const matching = plans.find((p) => p.category === type);
      const defaultPlan = matching ?? plans[0];
      const id = defaultPlan?.plan_name ?? defaultPlan?.name;
      if (id) {
        setPlanId(id);
      }
    }
  }, [plans, type, planId]);

  const submit = async (data: FormData) => {
    try {
      if (!planId) {
        throw new Error("Please select a hosting plan before registering.");
      }

      if (type === "Academic" && !data.aadharNumber) {
        throw new Error("Aadhar number is required for Academic registrations.");
      }

      if (type === "Commercial" && (!data.companyName || !data.gstNumber)) {
        throw new Error("Company name and GST number are required for Business registrations.");
      }

      const selectedPlan = plans.find((p) => {
        const current = planId?.toString();
        return (
          (p.plan_id != null && p.plan_id.toString() === current) ||
          (p.plan_name ?? p.name) === current
        );
      });

      const payload: Record<string, unknown> = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        type,
        plan_id: selectedPlan?.plan_id ?? planId,
      };

      // Academic
      if (type === "Academic") {
        payload.aadhaar_number = data.aadharNumber;
        payload.aadhar_number = data.aadharNumber; // some APIs accept alternate spelling
      }

      // Commercial
      if (type === "Commercial") {
        payload.company_name = data.companyName;
        payload.gst_number = data.gstNumber;
      }

      // Include ID card (optional)
      if (data.idCard && data.idCard.length > 0) {
        payload.id_card_url = await fileToBase64(data.idCard[0]);
      }

      const res = await fetch(
        "https://employee.azentraglobal.com/api/v2/hosting-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!result.status) {
        throw new Error(result.message || "Registration failed");
      }

      // Save a local copy of the user (including a default subscription) so the
      // portal can show the chosen plan immediately after login.
      try {
        const defaultSubs = getDefaultSubscriptions(type, planId || undefined);

        // Optionally enrich the subscription with plan features from the backend
        // hosting plans API (used on the pricing pages).
        type HostingPlan = {
          plan_name?: string;
          features?: string[];
          cpanel_url?: string;
        };

        const planDetails = await (async () => {
          if (!planId) return null;
          try {
            const planRes = await fetch(
              "https://employee.azentraglobal.com/api/v2/hosting-plans"
            );
            const planJson = await planRes.json();
            if (!planJson?.status || !planJson?.data) return null;

            const plans = type === "Academic" ? planJson.data.Academic : planJson.data.Commercial;
            if (!Array.isArray(plans)) return null;

            const normalize = (p: any) => ({
              plan_name: p.plan_name ?? p.name ?? "",
              features: Array.isArray(p.features) ? p.features : [],
              cpanel_url: p.cpanel_url ?? p.cpanelUrl ?? p.cpanelURL ?? "",
            });

            const normalized = (plans as any[]).map(normalize);
            return normalized.find((p) => p.plan_name === planId) ?? null;
          } catch {
            return null;
          }
        })();

        const subscription = { ...defaultSubs[0] };
        if (planDetails) {
          if (planDetails.plan_name) subscription.name = planDetails.plan_name;
          if (Array.isArray(planDetails.features)) subscription.features = planDetails.features;
          if (planDetails.cpanel_url) subscription.cpanelUrl = planDetails.cpanel_url;
        }

        const localUser: CustomerUser = {
          id: crypto.randomUUID?.() ?? `${Date.now()}`,
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          type,
          companyName: data.companyName,
          gstNumber: data.gstNumber,
          aadharNumber: data.aadharNumber,
          subscriptions: [subscription],
        };

        try {
          registerCustomer(localUser);
        } catch {
          // ignore if already registered locally; remote backend may still have created it.
        }
      } catch {
        // ignore local storage issues
      }

      // ✅ Registration succeeded, move user to login
      toast({
        title: "Registration successful",
        description: "Please login to continue.",
      });

      navigate("/login?from=register");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: message,
      });
    }
  };

    const idCardFile = watch("idCard");

    useEffect(() => {
      if (idCardFile && idCardFile.length > 0) {
        const file = idCardFile[0];
        const reader = new FileReader();
        reader.onload = () => setIdCardPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setIdCardPreview(null);
      }
    }, [idCardFile]);

    const pageTitle = type === "Academic"
      ? "Academic Hosting Registration"
      : "Business Hosting Registration";

    return (
      <>
        <Helmet>
          <title>{pageTitle} | Azentra</title>
          <meta
            name="description"
            content="Register to access your customer portal and manage your hosting subscriptions."
          />
        </Helmet>

        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <section className="py-20">
              <div className="container-custom">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-card p-10 rounded-3xl shadow-sm border border-border">
                    <h1 className="text-3xl font-bold mb-3">{pageTitle}</h1>
                    <p className="text-muted-foreground mb-4">
                      Please provide your details to create an account for your
                      customer portal.
                    </p>

                    <div className="grid gap-5 md:grid-cols-2 mb-6">
                      <div>
                        <Label>Account type</Label>
                        <select
                          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={type}
                          onChange={(e) => setType(e.target.value as SubscriptionType)}
                        >
                          <option value="Academic">Academic</option>
                          <option value="Commercial">Business</option>
                        </select>
                      </div>

                      <div>
                        <Label>Hosting plan</Label>
                        {plansLoading ? (
                          <div className="mt-2 text-sm text-muted-foreground">Loading plans…</div>
                        ) : (
                          <select
                            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={planId}
                            onChange={(e) => setPlanId(e.target.value)}
                          >
                            <option value="">Select a plan</option>
                            {plans
                              .filter((p) => p.category === type)
                              .map((p) => {
                                const id = p.plan_name ?? p.name ?? "";
                                return (
                                  <option key={id} value={id}>
                                    {id}
                                  </option>
                                );
                              })}
                          </select>
                        )}
                        {planError && (
                          <p className="text-xs text-red-500 mt-1">{planError}</p>
                        )}
                      </div>
                    </div>

                    {planId && (
                      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
                        <p className="text-sm text-muted-foreground">
                          Selected plan: <span className="font-medium">{planId}</span>
                        </p>

                        {plans.find((p) => (p.plan_name ?? p.name) === planId)?.features?.length ? (
                          <div className="mt-3">
                            <h3 className="text-sm font-semibold">Plan features</h3>
                            <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                              {plans
                                .find((p) => (p.plan_name ?? p.name) === planId)
                                ?.features?.map((feature) => (
                                  <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    )}

                    <form onSubmit={handleSubmit(submit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label>Name</Label>
                          <Input placeholder="Full name" {...register("name")} />
                          {errors.name && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input placeholder="you@example.com" {...register("email")} />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label>Phone</Label>
                          <Input placeholder="Mobile number" {...register("phone")} />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label>Password</Label>
                          <Input type="password" placeholder="Password" {...register("password")} />
                          {errors.password && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label>Confirm Password</Label>
                          <Input type="password" {...register("confirmPassword")} />
                          {errors.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                        {type !== "Academic" ? (
                          <div>
                            <Label>Company Name</Label>
                            <Input placeholder="Company / Brand" {...register("companyName")} />
                            {errors.companyName && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.companyName.message}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <Label>Aadhar Number</Label>
                            <Input placeholder="1234 5678 1234" {...register("aadharNumber")} />
                            {errors.aadharNumber && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.aadharNumber.message}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {type !== "Academic" ? (
                          <div>
                            <Label>GST Number</Label>
                            <Input placeholder="GSTIN" {...register("gstNumber")} />
                          </div>
                        ) : (
                          <div>
                            <Label>ID Card (Optional)</Label>
                            <Input type="file" accept="image/*" {...register("idCard")} />
                            {idCardPreview && (
                              <img
                                src={idCardPreview}
                                className="h-24 w-24 rounded-lg mt-3 object-cover"
                                alt="ID preview"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3">
                        <p className="text-sm text-muted-foreground">
                          By registering you agree to our terms and will be able to
                          access your customer portal to manage hosting subscriptions.
                        </p>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Registering..." : "Create account"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </>
    );
  };

  export default Register;
