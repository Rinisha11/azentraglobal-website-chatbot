import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { getCurrentConsultancyUser, loginConsultancyUser } from "@/lib/consultancyAuth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

type FormData = z.infer<typeof schema>;

const ConsultancyLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const current = getCurrentConsultancyUser();
    if (current) {
      navigate("/consultancy/portal");
    }
  }, [navigate]);

  useEffect(() => {
    if (searchParams.get("from") === "register") {
      toast({
        title: "Registration successful",
        description: "Please login to continue to your consultancy portal.",
      });
    }
  }, [searchParams, toast]);

  const onSubmit = async (data: FormData) => {
    try {
      await loginConsultancyUser(data.email, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back. Redirecting to your consultancy portal.",
      });
      navigate("/consultancy/portal");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to login.";
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
        <title>Consultancy Login | Azentra</title>
        <meta
          name="description"
          content="Login to the Azentra consultancy portal for job seekers and employers."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <section className="py-20">
            <div className="container-custom">
              <div className="max-w-md mx-auto">
                <div className="bg-card p-10 rounded-3xl shadow-sm border border-border">
                  <h1 className="text-3xl font-bold mb-3">Consultancy Portal Login</h1>
                  <p className="text-muted-foreground mb-8">
                    Sign in with your email and password to access your employer or job seeker portal.
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
                      Don&apos;t have an account? <Link to="/consultancy" className="text-primary hover:underline">Register here</Link>.
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

export default ConsultancyLogin;
