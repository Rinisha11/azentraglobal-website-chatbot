import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Gift, CheckCircle, Sparkles, Copy } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface Participant {
  id: string;
  name: string;
  age: string;
  college: string;
  phone: string;
  city: string;
  timestamp: string;
}

const LuckyDraw = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    college: "",
    phone: "",
    city: "",
  });
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const generateId = () => {
    // Generate random ID starting with "I" (International Conference)
    const randomPart = Math.floor(100000 + Math.random() * 900000); // 6 digit number
    return `I${randomPart}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // base URL for the CodeIgniter API; configure via env or hardcode
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://employee.azentraglobal.com/api/v2/Intern/luckydraw";

  const postToApi = async (participant: Participant) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
      });

      if (!res.ok) {
        // throw so we can catch and still save locally as fallback
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("API response", data);
      return data;
    } catch (err) {
      console.error("Error sending participant to API", err);
      // swallow error so UI still proceeds
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Generate unique ID
    const newId = generateId();
    setGeneratedId(newId);

    // Create participant object
    const participant: Participant = {
      id: newId,
      name: formData.name,
      age: formData.age,
      college: formData.college,
      phone: formData.phone,
      city: formData.city,
      timestamp: new Date().toISOString(),
    };

    // try sending to the CodeIgniter API first
    setIsLoading(true);
    const apiResult = await postToApi(participant);
    setIsLoading(false);

    if (!apiResult) {
      setApiError("Failed to contact server; saved locally.");
    }

    // still persist locally as a fallback/caching mechanism
    const existingData = localStorage.getItem("luckyDrawParticipants");
    const participants: Participant[] = existingData
      ? JSON.parse(existingData)
      : [];
    participants.push(participant);
    localStorage.setItem("luckyDrawParticipants", JSON.stringify(participants));

    setIsSubmitted(true);
  };

  const handleCopyId = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      college: "",
      phone: "",
      city: "",
    });
    setGeneratedId(null);
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <>
      <Helmet>
        <title>
          Lucky Draw | Azentra Global - International Conference 2024
        </title>
        <meta
          name="description"
          content="Participate in Azentra Global's Lucky Draw! Register now for a chance to win exciting prizes at our International Conference stall."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-primary/20 via-background to-purple-900/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
              <Reveal>
                <div className="max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-6">
                    <Gift className="h-4 w-4" />
                    <span>International Conference 2024</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                    Lucky <span className="text-primary">Draw</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Scan the QR code, register your details, and stand a chance
                    to win exciting prizes! Don't miss this opportunity.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Registration Form / Success */}
          <section className="py-16 -mt-10 relative z-20">
            <div className="container-custom px-4">
              <div className="max-w-lg mx-auto">
                {!isSubmitted ? (
                  <Reveal>
                    <Card className="shadow-2xl border-2 border-primary/20">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl flex items-center justify-center gap-2">
                          <Sparkles className="h-6 w-6 text-primary" />
                          Register Now
                        </CardTitle>
                        <CardDescription>
                          Fill in your details to participate in the lucky draw
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">
                              Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                              <p className="text-xs text-red-500">
                                {errors.name}
                              </p>
                            )}
                          </div>

                          <div className="">
                            <div className="space-y-2">
                              <Label htmlFor="age">Age</Label>
                              <Input
                                id="age"
                                type="number"
                                placeholder="Your age"
                                value={formData.age}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    age: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="space-y-2 pt-3">
                              <Label htmlFor="college">College</Label>
                              <Input
                                id="college"
                                placeholder="Your college name"
                                value={formData.college}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    college: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">
                              Phone Number{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="Enter 10-digit phone number"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && (
                              <p className="text-xs text-red-500">
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city">
                              City <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="city"
                              placeholder="Enter your city"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                              className={errors.city ? "border-red-500" : ""}
                            />
                            {errors.city && (
                              <p className="text-xs text-red-500">
                                {errors.city}
                              </p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            className="w-full h-12 text-lg mt-4"
                            disabled={isLoading}
                          >
                            {isLoading ? "Submitting…" : "Submit & Generate ID"}
                          </Button>
                          {apiError && (
                            <p className="text-xs text-red-500 mt-2">
                              {apiError}
                            </p>
                          )}
                        </form>
                      </CardContent>
                    </Card>
                  </Reveal>
                ) : (
                  <Reveal>
                    <Card className="shadow-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-background">
                      <CardHeader className="text-center pb-4">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-10 w-10 text-green-500" />
                        </div>
                        <CardTitle className="text-2xl text-green-600">
                          Registration Successful!
                        </CardTitle>
                        <CardDescription>
                          Thank you for participating in our Lucky Draw
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border-2 border-dashed border-green-300">
                          <p className="text-sm text-muted-foreground mb-2">
                            Your Lucky ID
                          </p>
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-4xl font-bold text-primary tracking-wider">
                              {generatedId}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleCopyId}
                              className="ml-2"
                            >
                              <Copy className="h-5 w-5" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Save this ID for the lucky draw spin!
                          </p>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            <strong>Important:</strong> Keep this ID safe! The
                            winner will be selected through an online spinner at
                            the end of the event.
                          </p>
                        </div>

                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="w-full"
                        >
                          Register Another Person
                        </Button>
                      </CardContent>
                    </Card>
                  </Reveal>
                )}
              </div>
            </div>
          </section>

          {/* Instructions */}
          <section className="py-12 bg-muted/20">
            <div className="container-custom px-4">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Scan QR Code",
                      desc: "Scan the QR code at our stall",
                    },
                    {
                      step: "2",
                      title: "Fill Details",
                      desc: "Enter your name, phone & city",
                    },
                    {
                      step: "3",
                      title: "Get Your ID",
                      desc: "Receive your unique lucky ID",
                    },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  ))}
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

export default LuckyDraw;
