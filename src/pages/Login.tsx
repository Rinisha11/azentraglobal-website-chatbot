import { useEffect } from "react";
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
  CustomerUser,
  getAllCustomers,
  saveAllCustomers,
  getCurrentCustomer,
  setCurrentCustomer,
  loginCustomer,
  setAuthToken,
} from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    // If already logged in, redirect to portal
    const current = getCurrentCustomer();
    if (current) {
      navigate("/portal");
    }
  }, [navigate]);

  useEffect(() => {
    if (searchParams.get("from") === "register") {
      toast({
        title: "Registration successful",
        description: "Please login to continue.",
      });
    }
  }, [searchParams, toast]);

const onSubmit = async (data: FormData) => {
  try {
    let user: CustomerUser;
    let token: string | null = null;

    // Try remote login first. This also allows keeping a synced backend user store.
    try {
      const res = await fetch(
        "https://employee.azentraglobal.com/api/v2/hosting-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (!result.status) {
        throw new Error(result.message || "Login failed");
      }

      user = result.user;
      token = result.token ?? `local-${crypto.randomUUID?.() ?? Date.now()}`;

      // Ensure local customer store includes this user (so portal can resolve current user).
      const customers = getAllCustomers();
      if (!customers.some((c) => c.email.toLowerCase() === user.email.toLowerCase())) {
        saveAllCustomers([...customers, user]);
      }

      setCurrentCustomer(user.email);
    } catch (_remoteError: unknown) {
      // Fallback to local storage login if remote fails or is unreachable.
      user = loginCustomer(data.email, data.password);
    }

    setAuthToken(token);

    toast({
      title: "Login successful",
      description: "Redirecting to dashboard...",
    });

    navigate("/portal/dashboard");
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unable to login.";

    toast({
      variant: "destructive",
      title: "Login failed",
      description: message,
    });
  }
};
  return (
    <>
      <Helmet>
        <title>Login | Azentra</title>
        <meta name="description" content="Login to your Azentra customer portal." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <section className="py-20">
            <div className="container-custom">
              <div className="max-w-md mx-auto">
                <div className="bg-card p-10 rounded-3xl shadow-sm border border-border">
                  <h1 className="text-3xl font-bold mb-3">Customer Portal Login</h1>
                  <p className="text-muted-foreground mb-8">
                    Use your email and password to sign in and manage your hosting.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label>Email</Label>
                      <Input placeholder="you@example.com" {...register("email")} />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input type="password" {...register("password")} />
                      {errors.password && (
                        <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                      Don&apos;t have an account? <a href="/register" className="text-primary hover:underline">Register</a>
                    </p>
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

export default Login;
