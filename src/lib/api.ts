// src/lib/api.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://employee.azentraglobal.com/api/v2/intern";
const BASE_URL_NEW = import.meta.env.VITE_API_BASE_URL_NEW || "https://intern.azentraglobal.com/api/v2/intern";

const CAREER_URL = import.meta.env.VITE_CAREER_URL || "https://employee.azentraglobal.com/api/v2/intern/azentraIntern";
const CAREER_URL_NEW = import.meta.env.VITE_CAREER_URL_NEW || "https://intern.azentraglobal.com/api/v2/intern/azentraIntern";


// Debugging: Check console to see which URL is being used
console.log("Current API Mode:", import.meta.env.MODE); 
// console.log("Using API URL:", BASE_URL);

const handleResponse = async (response: Response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("❌ Invalid JSON:", text);
    throw new Error("Server Response was not valid JSON. Check network tab.");
  }
};

// 1. Fetch Programs
export const getPrograms = async () => {
  try {
    const response = await fetch(`${BASE_URL_NEW}/InternPrograms`, { method: "POST" });
    const data = await handleResponse(response);
    return data.programs || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 2. Fetch Colleges & Batches (Triggered when Degree is selected)
export const getCollegesAndBatches = async (degreeId: string) => {
  const formData = new FormData();
  formData.append("DegID", degreeId);

  try {
    const response = await fetch(`${BASE_URL_NEW}/collegeList`, {
      method: "POST",
      body: formData,
    });
    const data = await handleResponse(response);
    return {
      colleges: data.Data || [],  // List of Colleges
      batches: data.Batch || [],  // List of Batches (IDs)
      degrees: data.Degree || []
    };
  } catch (error) {
    return { colleges: [], batches: [], degrees: [] };
  }
};

// 3. Fetch Sessions (Triggered when College + Course + Date are set)
export const getSessions = async (payload: any) => {
  const formData = new FormData();
  formData.append("CollegeID", payload.collegeId);
  formData.append("CourseID", payload.courseId);
  formData.append("CollegeName", payload.collegeName || ""); // For 'Other' colleges
  formData.append("SlotStartDate", payload.startDate);
  formData.append("SlotEndDate", payload.endDate);

  try {
    const response = await fetch(`${BASE_URL_NEW}/session`, {
      method: "POST",
      body: formData,
    });
    const data = await handleResponse(response);
    return data.Session || []; // Returns valid sessions for that date
  } catch (error) {
    return [];
  }
};

// 4. Submit
export const submitApplication = async (data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("regno", data.regno);
  
  // --- IDS ---
  formData.append("course", data.program);   // ID from Program Dropdown
  formData.append("college", data.college);  // ID from College Dropdown ("0" for Other)
  formData.append("collegename", data.college === "0" ? data.customCollege : ""); 
  formData.append("degree", data.degree);    // ID 
  formData.append("batchyear", data.batch);  // ID from Batch Dropdown
  formData.append("year", data.year);        // Text (1st, 2nd...)
  formData.append("session", data.session);  // ID from Session Dropdown

  // --- DATES ---
  formData.append("SlotStartDate", data.startDate);
  formData.append("SlotEndDate", data.endDate); // Calculated string

  formData.append("from_web", "azentraglobal");

  if (data.photo && data.photo.length > 0) {
    formData.append("photo", data.photo[0]);
  }

  const response = await fetch(`${BASE_URL}/internadd`, {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: formData,
  });

  const result = await handleResponse(response);

  if (result.response === "Error" || result.response_code === 0) {
    throw new Error(result.message || "Submission failed");
  }

  return result;
};

export const submitDynamicForm = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || "Submission failed");
    }

    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getConsultancyJobs = async () => {
  const response = await fetch("https://employee.azentraglobal.com/api/v2/Consultancy/get_jobs", {
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
};

export const applyConsultancyJob = async (payload: {
  job_id: string;
  employer_id: string;
  jobseeker_id: string;
}) => {
  const response = await fetch("https://employee.azentraglobal.com/api/v2/Consultancy/apply_job", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Failed to apply for job.");
  }

  return result;
};

export const getConsultancyEmployerProfile = async (email: string) => {
  const response = await fetch("https://employee.azentraglobal.com/api/v2/Consultancy/get_profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Failed to load employer profile.");
  }

  return result.data ?? null;
};

// --- CAREER APPLICATION FUNCTION ---
export const submitCareerApplication = async (formData: FormData) => {
  try {
    // 1. Send Request
    const response = await fetch(CAREER_URL_NEW, {
      method: "POST",
      body: formData,
    });

    // 2. Handle HTTP Errors (404, 500)
    const result = await handleResponse(response);
    
    if (!response.ok) {
      throw new Error(result.message || "Network Error: Could not reach server.");
    }

    // 3. --- THE ROBUST CHECK ---
    // Instead of checking specific errors, we check for Success.
    // Assuming '1' is the ONLY success code.
    if (result.response_code !== 1) {
      
      // Captures "Phone exists", "Email exists", "Invalid ID", etc.
      const backendMessage = result.message || result.response || "Submission declined by server.";
      
      console.warn("Backend rejected submission:", result); // Debugging aid
      throw new Error(backendMessage);
    }

    // 4. Success
    return result;

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// --- WORKSHOP REGISTRATION FUNCTION ---
export const submitWorkshopRegistration = async (data: any) => {
  const formData = new FormData();

  formData.append("fullName", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.phone);
  formData.append("city", data.city);
  formData.append("profileType", data.profileType);
  formData.append("organization", data.institutionCompany);
  formData.append("department", data.department);

  try {
    const response = await fetch("https://employee.azentraglobal.com/api/v2/Workshop/submit", {
      method: "POST",
      body: formData,
    });

    const result = await handleResponse(response);

    if (!response.ok || !result.status) {
      throw new Error(result.message || "Workshop registration failed");
    }

    return result;
  } catch (error) {
    console.error("Workshop Registration Error:", error);
    throw error;
  }
};