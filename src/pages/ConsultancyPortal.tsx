import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  logoutConsultancyUser,
  getCurrentConsultancyUser,
  updateConsultancyUser,
} from "@/lib/consultancyAuth";
import { getConsultancyJobs, applyConsultancyJob, getConsultancyEmployerProfile } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ConsultancyJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  employerId: string;
  positions: string;
};

const ConsultancyPortal = () => {
  const [user, setUser] = useState(() => getCurrentConsultancyUser());
  const [jobs, setJobs] = useState<ConsultancyJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [jobFetchError, setJobFetchError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadData = async () => {
      if (user.type === "jobseeker") {
        setIsLoadingJobs(true);
        setJobFetchError(null);

        try {
          const apiJobs = await getConsultancyJobs();
          setJobs(
            Array.isArray(apiJobs)
              ? apiJobs.map((job: any) => ({
                  id: String(job.id ?? job.job_id ?? job.jobId ?? ""),
                  title: job.title ?? job.job_title ?? job.jobTitle ?? "Consultancy Opening",
                  company: job.company_name ?? job.company ?? "Azentra Global",
                  location: job.location ?? job.preferred_location ?? "Remote",
                  experience: job.experience ?? job.exp_level ?? "Not specified",
                  salary: job.salary ?? job.ctc ?? job.positions ?? "Not disclosed",
                  description: job.description ?? job.summary ?? job.details ?? "",
                  employerId: String(job.employer_id ?? job.employerId ?? ""),
                  positions: String(job.positions ?? job.number_of_positions ?? ""),
                }))
              : []
          );
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Unable to load jobs.";
          setJobFetchError(message);
        } finally {
          setIsLoadingJobs(false);
        }
      } else if (user.type === "employer") {
        // Fetch fresh employer profile details from API
        try {
          const profileData = await getConsultancyEmployerProfile(user.email);
          if (profileData) {
            const updatedUser = {
              ...user,
              employer: {
                companyName: profileData.company_name ?? user.employer?.companyName ?? "",
                designation: profileData.designation ?? user.employer?.designation ?? "",
                companyWebsite: profileData.company_website ?? user.employer?.companyWebsite,
                requirementSummary: profileData.requirement_summary ?? user.employer?.requirementSummary ?? "",
                hiringFor: profileData.hiring_for ?? user.employer?.hiringFor ?? "",
                numberOfPositions: profileData.positions ?? user.employer?.numberOfPositions ?? "",
                preferredLocation: profileData.preferred_location ?? user.employer?.preferredLocation,
              },
            };
            updateConsultancyUser(updatedUser);
            setUser(updatedUser);
          }
        } catch (error: unknown) {
          console.error("Failed to fetch employer profile:", error);
          // Keep existing user data if fetch fails
        }
      }
    };

    loadData();
  }, [user]);

  const handleLogout = () => {
    logoutConsultancyUser();
    navigate("/consultancy/login");
  };

  const appliedJobIds = useMemo(() => (user?.jobsApplied ?? []).map(String), [user]);

const handleApply = async (job: ConsultancyJob) => {
        if (!user || user.type !== "jobseeker") return;
        const jobId = String(job.id);

        if (appliedJobIds.includes(jobId)) {
          toast({
            title: "Already applied",
            description: "You have already applied for this job.",
          });
          return;
        }

        if (!job.employerId) {
          toast({
            variant: "destructive",
            title: "Unable to apply",
            description: "Employer information is missing for this job.",
          });
          return;
        }

        try {
          const jobId = String(job.id);
          await applyConsultancyJob({
            job_id: jobId,
            employer_id: job.employerId,
            jobseeker_id: user.id,
          });

          const updatedUser = {
            ...user,
            jobsApplied: Array.from(new Set([...(user.jobsApplied ?? []).map(String), jobId])),
          };
          updateConsultancyUser(updatedUser);
          setUser(updatedUser);

          toast({
            title: "Application submitted",
            description: "Azentra Global will contact you soon to arrange your interview.",
          });
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Unable to apply.";
          toast({
            variant: "destructive",
            title: "Application failed",
            description: message,
          });
        }
  };

  if (!user) {
    return <Navigate to="/consultancy/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{user.type === "jobseeker" ? "Job Seeker Portal" : "Employer Portal"} | Azentra</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-16">
          <div className="container-custom">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-green-600">Consultancy Portal</p>
                <h1 className="text-3xl font-bold">{user.type === "jobseeker" ? "Job Seeker Dashboard" : "Employer Dashboard"}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Welcome, {user.name}. Manage your {user.type === "jobseeker" ? "applications" : "employer request"} here.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">{user.type === "jobseeker" ? "Job Seeker" : "Employer"}</Badge>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </div>
            </div>

            {user.type === "jobseeker" ? (
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-border bg-card p-8">
                    <h2 className="text-xl font-semibold mb-4">Available job opportunities</h2>
                    <div className="space-y-4">
                      {isLoadingJobs ? (
                        <div className="rounded-3xl border border-slate-200 p-6 text-sm text-slate-600">
                          Loading jobs...
                        </div>
                      ) : jobFetchError ? (
                        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                          {jobFetchError}
                        </div>
                      ) : jobs.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 p-6 text-sm text-slate-600">
                          No jobs available right now. Please check back later.
                        </div>
                      ) : (
                        jobs.map((job) => (
                          <div key={job.id} className="rounded-3xl border border-slate-200 p-6">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{job.title}</h3>
                                <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                              </div>
                              <Badge variant="outline">{job.experience}</Badge>
                            </div>
                            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{job.description}</p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="text-sm text-slate-500">Salary: {job.salary}</div>
                              {(() => {
                                const jobId = String(job.id);
                                const isApplied = appliedJobIds.includes(jobId);
                                return (
                                  <Button
                                    size="sm"
                                    onClick={() => handleApply(job)}
                                    disabled={isApplied}
                                  >
                                    {isApplied ? "Applied" : "Apply"}
                                  </Button>
                                );
                              })()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-border bg-card p-8">
                    <h2 className="text-xl font-semibold mb-4">My applications</h2>
                    {appliedJobIds.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No applications yet. Click apply on a job to send your profile to our team.</p>
                    ) : (
                      <ul className="space-y-3">
                        {appliedJobIds.map((id) => {
                          const job = jobs.find((item) => item.id === id);
                          return (
                            <li key={id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-semibold">{job?.title ?? id}</p>
                                  <p className="text-sm text-muted-foreground">{job?.company ?? "Azentra Global"}</p>
                                </div>
                                <Badge variant="secondary">Submitted</Badge>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                <aside className="space-y-6">
                  <div className="rounded-3xl border border-border bg-card p-8">
                    <h2 className="text-xl font-semibold mb-3">Profile summary</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Your profile details are saved securely. Azentra Global will reach out once your profile matches an employer requirement.</p>
                    <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                      <div><strong>Name:</strong> {user.name}</div>
                      <div><strong>Email:</strong> {user.email}</div>
                      <div><strong>Phone:</strong> {user.phone}</div>
                      <div><strong>Applied roles:</strong> {appliedJobIds.length}</div>
                    </div>
                  </div>
                </aside>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-border bg-card p-8">
                    <h2 className="text-xl font-semibold mb-4">Employer request</h2>
                    <p className="text-sm text-muted-foreground mb-6">Your employer registration request is received. Our team will contact you soon to discuss recruitment support.</p>
                    <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                      <div><strong>Company:</strong> {user.employer?.companyName ?? "-"}</div>
                      <div><strong>Contact person:</strong> {user.name}</div>
                      <div><strong>Designation:</strong> {user.employer?.designation ?? "-"}</div>
                      <div><strong>Requirement:</strong> {user.employer?.requirementSummary ?? "-"}</div>
                      <div><strong>Hiring for:</strong> {user.employer?.hiringFor ?? "-"}</div>
                      <div><strong>Positions:</strong> {user.employer?.numberOfPositions ?? "-"}</div>
                      <div><strong>Preferred location:</strong> {user.employer?.preferredLocation ?? "-"}</div>
                      {user.employer?.companyWebsite && (
                        <div><strong>Website:</strong> {user.employer.companyWebsite}</div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-border bg-card p-8">
                    <h2 className="text-xl font-semibold mb-4">Next steps</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Our Azentra Global team will review your requirement and contact you to begin the employer partnership.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li>1. We verify the hiring requirement.</li>
                      <li>2. We connect you with matching candidates.</li>
                      <li>3. Interview coordination is handled by Azentra.</li>
                    </ul>
                  </div>
                </div>

                <aside className="space-y-6">
                  <div className="rounded-3xl border border-border bg-card p-8">
                    <h2 className="text-xl font-semibold mb-3">Employer details</h2>
                    <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                      <div><strong>Registered email:</strong> {user.email}</div>
                      <div><strong>Phone:</strong> {user.phone}</div>
                      <div><strong>Account type:</strong> Employer</div>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ConsultancyPortal;
