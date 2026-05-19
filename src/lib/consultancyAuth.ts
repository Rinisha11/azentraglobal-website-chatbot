export type ConsultancyAccountType = "jobseeker" | "employer";

export type ConsultancyJobSeekerProfile = {
  address?: string;
  gender?: string;
  academicStatus?: string;
  qualification?: string;
  specialization?: string;
  passingYear?: string;
  category?: string;
  role?: string;
  jobType?: string;
  preferredLocation?: string;
  expectedCTC?: string;
  linkedinProfile?: string;
  expLevel?: string;
  currentOrg?: string;
  currentDesignation?: string;
  currentCTC?: string;
  noticePeriod?: string;
  resumeName?: string;
};

export type ConsultancyEmployerProfile = {
  companyName: string;
  designation: string;
  companyWebsite?: string;
  requirementSummary: string;
  hiringFor: string;
  numberOfPositions: string;
  preferredLocation?: string;
};

export type ConsultancyUser = {
  id: string;
  type: ConsultancyAccountType;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
  profile?: ConsultancyJobSeekerProfile;
  employer?: ConsultancyEmployerProfile;
  jobsApplied?: string[];
};

const STORAGE_USERS = "azentra_consultancy_users";
const STORAGE_CURRENT = "azentra_current_consultancy";

const safeParse = <T>(value: unknown, fallback: T): T => {
  try {
    return (JSON.parse(value as string) as T) ?? fallback;
  } catch {
    return fallback;
  }
};

export function getAllConsultancyUsers(): ConsultancyUser[] {
  return safeParse<ConsultancyUser[]>(localStorage.getItem(STORAGE_USERS), []);
}

export function saveAllConsultancyUsers(users: ConsultancyUser[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

export function findConsultancyUserByEmail(email: string) {
  const users = getAllConsultancyUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function registerConsultancyUser(user: ConsultancyUser) {
  const existing = findConsultancyUserByEmail(user.email);
  if (existing) {
    throw new Error("A user with this email already exists.");
  }
  const users = getAllConsultancyUsers();
  users.push(user);
  saveAllConsultancyUsers(users);
  return user;
}

export function updateConsultancyUser(updated: ConsultancyUser) {
  const users = getAllConsultancyUsers();
  const index = users.findIndex((item) => item.email.toLowerCase() === updated.email.toLowerCase());
  if (index === -1) {
    throw new Error("User not found.");
  }
  users[index] = updated;
  saveAllConsultancyUsers(users);
  return updated;
}

export function setCurrentConsultancyUser(email: string | null) {
  if (!email) {
    localStorage.removeItem(STORAGE_CURRENT);
    return;
  }
  localStorage.setItem(STORAGE_CURRENT, email);
}

export function getCurrentConsultancyUser(): ConsultancyUser | null {
  const email = localStorage.getItem(STORAGE_CURRENT);
  if (!email) return null;
  const user = findConsultancyUserByEmail(email);
  return user ?? null;
}

export function logoutConsultancyUser() {
  setCurrentConsultancyUser(null);
}

const CONSULTANCY_API_BASE = "https://employee.azentraglobal.com/api/v2/Consultancy";

const mapApiToConsultancyUser = (data: any, password: string): ConsultancyUser => {
  const user: ConsultancyUser = {
    id: String(data.id ?? ""),
    type: data.type === "employer" ? "employer" : "jobseeker",
    name: data.full_name ?? data.fullName ?? data.name ?? "",
    email: data.email ?? "",
    password,
    phone: data.phone ?? "",
    createdAt: data.created_at ?? "",
    jobsApplied: [],
  };

  if (user.type === "employer") {
    user.employer = {
      companyName: data.company_name ?? "",
      designation: data.designation ?? "",
      companyWebsite: data.company_website ?? undefined,
      requirementSummary: data.requirement_summary ?? "",
      hiringFor: data.hiring_for ?? "",
      numberOfPositions: data.positions ?? "",
      preferredLocation: data.preferred_location ?? undefined,
    };
  } else {
    user.profile = {
      address: data.address ?? undefined,
      gender: data.gender ?? undefined,
      academicStatus: data.academic_status ?? undefined,
      qualification: data.qualification ?? undefined,
      specialization: data.specialization ?? undefined,
      passingYear: data.passing_year ?? undefined,
      category: data.category ?? undefined,
      role: data.role ?? undefined,
      jobType: data.job_type ?? undefined,
      preferredLocation: data.preferred_location ?? undefined,
      expectedCTC: data.expected_ctc ?? undefined,
      linkedinProfile: data.linkedin_profile ?? undefined,
      expLevel: data.exp_level ?? undefined,
      currentOrg: data.current_org ?? undefined,
      currentDesignation: data.current_designation ?? undefined,
      currentCTC: data.current_ctc ?? undefined,
      noticePeriod: data.notice_period ?? undefined,
      resumeName: data.resume ?? undefined,
    };
  }

  return user;
};

export async function loginConsultancyUser(email: string, password: string) {
  const response = await fetch(`${CONSULTANCY_API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Unable to login.");
  }

  const user = mapApiToConsultancyUser(result.data, password);
  const existingUser = findConsultancyUserByEmail(email);

  const mergedUser: ConsultancyUser = {
    ...user,
    jobsApplied: existingUser?.jobsApplied ?? user.jobsApplied,
  };

  const users = getAllConsultancyUsers().filter(
    (item) => item.email.toLowerCase() !== mergedUser.email.toLowerCase()
  );
  users.push(mergedUser);
  saveAllConsultancyUsers(users);
  setCurrentConsultancyUser(mergedUser.email);

  return mergedUser;
}

export async function getConsultancyJobs() {
  const response = await fetch(`${CONSULTANCY_API_BASE}/get_jobs`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Failed to load consultancy jobs.");
  }

  return result.data ?? [];
}
