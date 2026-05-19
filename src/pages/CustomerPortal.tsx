import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CustomerUser,
  getCurrentCustomer,
  logoutCustomer,
  updateCustomer,
} from "@/lib/auth";
import { ChevronRight, LayoutGrid, Settings2, LogOut, RefreshCcw, ArrowUpRight, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = ({
  user,
  onUpdate,
  planFeatures,
}: {
  user: CustomerUser;
  onUpdate: (user: CustomerUser) => void;
  planFeatures: Record<string, string[]>;
}) => {
  const { toast } = useToast();

  const handleRenew = (subId: string) => {
    const updated = { ...user };
    const subscription = updated.subscriptions.find((s) => s.id === subId);
    if (!subscription) return;

    const now = new Date();
    const expires = new Date(subscription.expiresAt);
    const base = expires > now ? expires : now;
    base.setMonth(base.getMonth() + 1);

    subscription.expiresAt = base.toISOString();
    updateCustomer(updated);
    onUpdate(updated);

    toast({
      title: "Renewed",
      description: `${subscription.name} has been renewed for 1 month.`,
    });
  };

  const handleUpgrade = (subId: string) => {
    const updated = { ...user };
    const subscription = updated.subscriptions.find((s) => s.id === subId);
    if (!subscription) return;

    subscription.name = `${subscription.name} (Upgraded)`;
    updateCustomer(updated);
    onUpdate(updated);

    toast({
      title: "Upgrade applied",
      description: `${subscription.name} is now upgraded.`,
    });
  };

  const subscriptions = user.subscriptions ?? [];
  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const expiredCount = subscriptions.length - activeCount;

  const subscriptionsWithFeatures = useMemo(() => {
    const normalizeKey = (key: string) => key.trim().toLowerCase();

    return subscriptions.map((sub) => {
      // Prefer features from the latest plan data fetched from the API,
      // but keep any local features as fallbacks.
      const planKey = normalizeKey(sub.planId || sub.name || "");
      const apiFeatures = planFeatures[planKey] ?? [];

      const mergedFeatures = Array.from(
        new Set([...(apiFeatures ?? []), ...(sub.features ?? [])])
      );

      return {
        ...sub,
        features: mergedFeatures,
      };
    });
  }, [planFeatures, subscriptions]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">View and manage your active cPanel subscriptions.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{subscriptions.length} total</Badge>
            <Badge variant="default">{activeCount} active</Badge>
            {expiredCount > 0 && <Badge variant="outline">{expiredCount} expired</Badge>}
          </div>
        </div>

        {subscriptions.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              It looks like you don&apos;t have any active subscriptions yet. If you have already purchased a plan, please contact support or re-login to refresh your subscription data.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium">Need help?</span>
              <a
                href="tel:+918925552250"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Call administrator: +91 89255 52250
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">No active cPanel subscription yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Your account is registered, but the hosting subscription needs to be activated by the administrator. Once activated you will receive your cPanel credentials by email.
                  </p>
                </div>
                <a
                  href="tel:+918925552250"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Call Admin: +91 89255 52250
                </a>
              </div>
            </div>
            {subscriptionsWithFeatures.map((sub) => (
              <div key={sub.id} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{sub.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge variant="outline">{sub.type}</Badge>
                      <Badge variant={sub.status === "active" ? "default" : "secondary"}>{sub.status}</Badge>
                    </div>
                    {/* <p className="mt-3 text-sm text-muted-foreground">Expires: {new Date(sub.expiresAt).toDateString()}</p> */}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRenew(sub.id)}
                      className="min-w-[130px]"
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" /> Renew
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleUpgrade(sub.id)}
                      className="min-w-[130px]"
                    >
                      <ArrowUpRight className="mr-2 h-4 w-4" /> Upgrade
                    </Button>
                  </div>
                </div>

                {sub.features && sub.features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">Features</h4>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {sub.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* {sub.cpanelUrl && (
                  <p className="mt-4 text-sm">
                    Access cPanel: <a className="text-primary hover:underline" href={sub.cpanelUrl} target="_blank" rel="noreferrer">Open cPanel</a>
                  </p>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Account = ({ user }: { user: CustomerUser; onUpdate: (user: CustomerUser) => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account details</h2>
        <p className="text-muted-foreground">
          Your account details are view-only. Please contact support to update account information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={user.name} disabled />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={user.email} disabled />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={user.phone ?? ""} disabled />
        </div>
        {user.type === "Business" ? (
          <>
            <div>
              <Label>Company</Label>
              <Input value={user.companyName ?? ""} disabled />
            </div>
            <div>
              <Label>GST Number</Label>
              <Input value={user.gstNumber ?? ""} disabled />
            </div>
          </>
        ) : (
          <div>
            <Label>Aadhar Number</Label>
            <Input value={user.aadharNumber ?? ""} disabled />
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Need changes? Please contact the administrator at <strong>+91 89255 52250</strong>.
        </p>
      </div>
    </div>
  );
};

const Profile = ({ user }: { user: CustomerUser }) => {
  const maskedPassword = user.password ? "*".repeat(Math.max(user.password.length, 8)) : "********";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-muted-foreground">Your account details are shown below. Email and password are view-only.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input value={user.name} disabled />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={user.email} disabled />
        </div>
        <div>
          <Label>Password</Label>
          <Input value={maskedPassword} disabled />
        </div>
        <div>
          <Label>Account type</Label>
          <Input value={user.type} disabled />
        </div>
      </div>
    </div>
  );
};

const CustomerPortal = () => {
  const [user, setUser] = useState<CustomerUser | null>(() => getCurrentCustomer());
  const [planFeatures, setPlanFeatures] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    const normalizeKey = (key: string) => key.trim().toLowerCase();

    // Fetch available hosting plans once so we can display the full feature lists.
    (async () => {
      try {
        const res = await fetch("https://employee.azentraglobal.com/api/v2/hosting-plans");
        const data = await res.json();
        if (!data?.status || !data?.data) return;

        const allPlans: any[] = [
          ...(Array.isArray(data.data.Academic) ? data.data.Academic : []),
          ...(Array.isArray(data.data.Commercial) ? data.data.Commercial : []),
        ];

        const features: Record<string, string[]> = {};
        allPlans.forEach((plan) => {
          const name = plan.plan_name ?? plan.name;
          if (!name) return;

          const planFeatures = Array.isArray(plan.features)
            ? plan.features
            : typeof plan.features === "string"
            ? plan.features
                .split("\n")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : [];

          features[normalizeKey(name)] = planFeatures;
        });

        setPlanFeatures(features);
      } catch {
        // ignore
      }
    })();
  }, [user]);

  const isMobile = useIsMobile();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleLogout = () => {
    logoutCustomer();
    navigate("/login");
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const SidebarContentMarkup = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold">Customer Portal</h3>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleLogout} className="inline-flex">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2 pb-2">
          Navigation
        </div>

        <nav className="flex flex-col gap-1 px-2">
          {[
            { to: "dashboard", label: "Dashboard", Icon: LayoutGrid },
            { to: "account", label: "Account", Icon: Settings2 },
            { to: "profile", label: "Profile", Icon: ChevronRight },
          ].map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => {
                if (isMobile) setSidebarOpen(false);
              }}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-border p-4">
        <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Customer Portal | Azentra</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {isMobile && (
          <div className="absolute left-4 top-4 z-50">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
                <SidebarContentMarkup />
              </SheetContent>
            </Sheet>
          </div>
        )}

        <div className="flex min-h-screen">
          {!isMobile && (
            <aside className="w-72 border-r border-border bg-sidebar">
              <SidebarContentMarkup />
            </aside>
          )}

          <main className="flex-1 pt-8 pb-12">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={<Dashboard user={user} onUpdate={setUser} planFeatures={planFeatures} />}
                />
                <Route path="account" element={<Account user={user} onUpdate={setUser} />} />
                <Route path="profile" element={<Profile user={user} />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CustomerPortal;
