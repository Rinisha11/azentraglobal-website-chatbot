// This defines the shape of the data for your application
export interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  program: string;
  college: string;
  regno: string;
  degree: string;
  batch: string;
  year: string;
  duration: string;
  startDate: string;
  session: string;
  // FileList is the standard HTML type for <input type="file">
  photo?: FileList | null; 
}