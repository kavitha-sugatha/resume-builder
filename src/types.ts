export type ResumeContact = {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  website: string;
};

export type ResumeEducation = {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

export type ResumeExperience = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  bullets: string[];
};

export type ResumeData = {
  profilePhotoUrl: string;
  fullName: string;
  headline: string;
  summary: string;
  contact: ResumeContact;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
};
