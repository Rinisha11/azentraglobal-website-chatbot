export type SubscriptionType = "Academic" | "Business";

export type Subscription = {
  id: string;
  planId: string;
  name: string;
  type: SubscriptionType;
  status: "active" | "expired" | "cancelled";
  expiresAt: string; // ISO date
  cpanelUrl?: string;
  features?: string[];
};

export type CustomerUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  type: SubscriptionType;
  aadharNumber?: string;
  idCardUrl?: string;
  companyName?: string;
  gstNumber?: string;
  subscriptions: Subscription[];
};

const STORAGE_USERS = "azentra_customers";
const STORAGE_CURRENT = "azentra_current_customer";

const safeParse = <T>(value: unknown, fallback: T): T => {
  try {
    return (JSON.parse(value as string) as T) ?? fallback;
  } catch {
    return fallback;
  }
};

export function getAllCustomers(): CustomerUser[] {
  return safeParse<CustomerUser[]>(localStorage.getItem(STORAGE_USERS), []);
}

export function saveAllCustomers(customers: CustomerUser[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(customers));
}

export function findCustomerByEmail(email: string) {
  const customers = getAllCustomers();
  return customers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function registerCustomer(user: CustomerUser) {
  const existing = findCustomerByEmail(user.email);
  if (existing) {
    throw new Error("A user with this email already exists.");
  }
  const customers = getAllCustomers();
  customers.push(user);
  saveAllCustomers(customers);
  return user;
}

export function setCurrentCustomer(email: string | null) {
  if (!email) {
    localStorage.removeItem(STORAGE_CURRENT);
    return;
  }
  localStorage.setItem(STORAGE_CURRENT, email);
}

export function getCurrentCustomer(): CustomerUser | null {
  const email = localStorage.getItem(STORAGE_CURRENT);
  if (!email) return null;
  const user = findCustomerByEmail(email);
  if (!user) return null;

  // Ensure we always have a subscriptions array (some legacy/remote users may not include it).
  return {
    ...user,
    subscriptions: user.subscriptions ?? [],
  };
}

const STORAGE_TOKEN = "token";

export function setAuthToken(token: string | null) {
  if (!token) {
    localStorage.removeItem(STORAGE_TOKEN);
    return;
  }
  localStorage.setItem(STORAGE_TOKEN, token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function logoutCustomer() {
  setCurrentCustomer(null);
  setAuthToken(null);
}

export function loginCustomer(email: string, password: string) {
  const user = findCustomerByEmail(email);
  if (!user) {
    throw new Error("No user found with this email.");
  }
  if (user.password !== password) {
    throw new Error("Invalid password.");
  }
  setCurrentCustomer(user.email);
  setAuthToken(`local-${crypto.randomUUID?.() ?? Date.now()}`);
  return user;
}

export function updateCustomer(updated: CustomerUser) {
  const customers = getAllCustomers();
  const index = customers.findIndex((u) => u.email.toLowerCase() === updated.email.toLowerCase());
  if (index === -1) {
    throw new Error("User not found.");
  }
  customers[index] = updated;
  saveAllCustomers(customers);
  return updated;
}

export function getDefaultSubscriptions(type: SubscriptionType, planId?: string): Subscription[] {
  const now = new Date();
  const expiry = new Date(now);
  expiry.setMonth(expiry.getMonth() + 1);

  const id = `${type}-${planId ?? "default"}-${now.getTime()}`;
  const planName = planId ? planId : type === "Academic" ? "Academic Starter" : "Business Starter";

  const featuresByPlan: Record<string, string[]> = {
    "Business Starter": [
      "cPanel access",
      "24/7 support",
      "Daily backups",
      "Unlimited bandwidth",
      "Free SSL certificate",
    ],
    "Professional": [
      "cPanel access",
      "Priority support",
      "Daily backups",
      "Unlimited bandwidth",
      "Free SSL certificate",
      "Free domain",
    ],
    "Enterprise": [
      "cPanel access",
      "24/7 support",
      "Daily backups",
      "Unlimited bandwidth",
      "Free SSL certificate",
      "Free domain",
      "Advanced security",
    ],
  };

  const matchedKey = Object.keys(featuresByPlan).find((key) => planName.startsWith(key));
  const defaultFeatures = matchedKey
    ? featuresByPlan[matchedKey]
    : ["cPanel access", "24/7 support", "Daily backups"];

  return [
    {
      id,
      planId: planId ?? "starter",
      name: planName,
      type,
      status: "active",
      expiresAt: expiry.toISOString(),
      cpanelUrl: "https://your-cpanel.example.com",
      features: defaultFeatures,
    },
  ];
}
