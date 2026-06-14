import { create } from 'zustand';
import type { ResumeData } from './types';

const defaultData: ResumeData = {
  profilePhotoUrl: '/profile.jpg',
  fullName: 'Kavitha Govindankutty Nair Sugatha',
  headline: 'Austin, Texas | (512) 363-7451 | kavitha.sugatha@gmail.com',
  summary:
    'Versatile and analytical Professional with a Bachelor’s degree and 4+ years of industry experience spanning Mobile Application Development, Education, and Customer Service. Adept at building responsive digital applications using modern framework architectures while possessing a proven track record in classroom instruction, student mentorship, and fast-paced retail operations. Recognized for strong logical thinking, exceptional communication skills, and an adaptable leadership style that drives collaborative learning and team success.',
  contact: {
    phone: '(512) 363-7451',
    email: 'kavitha.sugatha@gmail.com',
    location: 'Austin, Texas',
    linkedin: 'linkedin.com/in/kavitha-vipin-3a2473351/',
    website: 'medium.com/@kavitha.sugatha',
  },
  skills: [
    'Mobile Application Development (Android, iOS, Flutter)',
    'AngularJS, Java, Kotlin',
    'Xcode, Corona (Lua)',
    'HTML, JavaScript, CSS',
    'RESTful API Integration, Game Development',
    'Lesson Delivery, Classroom Management, Student Engagement',
    'Student Mentorship, Interactive/Digital Learning Resource Development, Critical Thinking & Problem Solving',
    'Client Relations, Cash Handling, Financial Product Awareness',
    'MS Excel, MS Word, MS PowerPoint',
    'English, Malayalam, Hindi, Tamil',
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Software Developer',
      company: 'UST Global',
      location: 'Trivandrum, Kerala, India',
      startDate: 'Mar 2016',
      endDate: 'Apr 2018',
      summary:
        'Specialized in cross-platform mobile application development utilizing AngularJS and executing RESTful API integrations.',
      bullets: [
        'Developed responsive, user-friendly applications featuring clean, modular, and highly scalable source code.',
        'Conducted rigorous QA testing to optimize application performance, documented thorough technical specifications, and participated in structured code reviews.',
        'Mentored junior developers, driving defect reduction, skill advancement, and overall system performance improvements.',
      ],
    },
    {
      id: 'exp-2',
      role: 'System Engineer / Software Developer',
      company: 'Schogini Systems Pvt Ltd',
      location: 'Trivandrum, Kerala, India',
      startDate: 'May 2010',
      endDate: 'Jul 2012',
      summary: 'Specialized in designing interactive and digital educational applications for pre-K and elementary school children.',
      bullets: [
        'Engineered bug-free, interactive mobile apps utilizing Xcode, Android platforms, and Corona SDK (Lua).',
        'Collaborated tightly with cross-functional teams to deliver secure, high-performing applications that inspire and engage young learners.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Android Developer',
      company: 'Zayan Infotech Pvt Ltd',
      location: 'Kerala, India',
      startDate: 'Aug 2012',
      endDate: 'May 2013',
      summary: '',
      bullets: [
        'Contributed to Android application development, debugging, and testing.',
        'Supported UI implementation and feature enhancements for mobile app releases.',
      ],
    },
    {
      id: 'exp-4',
      role: 'Cashier',
      company: 'Home Depot',
      location: 'Austin, Texas',
      startDate: 'Mar 2026',
      endDate: 'Apr 2026',
      summary: '',
      bullets: [
        'Delivered accurate customer transactions and cash handling in a fast-paced retail environment.',
        'Supported shoppers efficiently during peak periods while maintaining accuracy, speed, and a positive customer experience.',
      ],
    },
    {
      id: 'exp-5',
      role: 'Head Cashier',
      company: 'Home Depot',
      location: 'Austin, Texas',
      startDate: 'Jun 2026',
      endDate: 'Present',
      summary: '',
      bullets: [
        'Delivered accurate customer transactions and cash handling in a fast-paced retail environment.',
        'Supported shoppers efficiently during peak periods while maintaining accuracy, speed, and a positive customer experience.',
      ],
    },
    {
      id: 'exp-6',
      role: 'Substitute Teacher (Part-time)',
      company: 'Nyos Charter School',
      location: 'Austin, Texas',
      startDate: '2025',
      endDate: 'Present',
      summary: '',
      bullets: [
        'Facilitated classroom routines and lesson plans across diverse student groups, ensuring continuity during teacher absences.',
        'Encouraged student engagement, critical thinking, and structured problem-solving during instructional periods.',
      ],
    },
    {
      id: 'exp-7',
      role: 'Assistant Teacher',
      company: 'Nest at Anderson Mill',
      location: 'Austin, Texas',
      startDate: 'Apr 2025',
      endDate: '',
      summary: '',
      bullets: [
        'Supported lead teachers in delivering lessons and maintaining a positive, organized learning environment for young children.',
        'Adapted to individual student needs with patience and creativity to keep learners engaged and motivated.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'NarayanaGuru College Of Engineering – Anna University',
      degree: 'Bachelor of Engineering (B.E.)',
      location: 'Kanyakumari, Tamil Nadu, India',
      startDate: '2006',
      endDate: '2010',
      details: '',
    },
  ],
};

type ResumeStore = {
  data: ResumeData;
  setField: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
  setProfilePhoto: (profilePhotoUrl: string) => void;
  setContactField: <K extends keyof ResumeData['contact']>(field: K, value: ResumeData['contact'][K]) => void;
  addSkill: (skill: string) => void;
  updateSkill: (index: number, value: string) => void;
  removeSkill: (index: number) => void;
  addExperience: () => void;
  updateExperienceField: (id: string, field: keyof ResumeData['experience'][number], value: string) => void;
  updateExperienceBullet: (id: string, index: number, value: string) => void;
  addExperienceBullet: (id: string) => void;
  removeExperienceBullet: (id: string, index: number) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducationField: (id: string, field: keyof ResumeData['education'][number], value: string) => void;
  removeEducation: (id: string) => void;
  reset: () => void;
};

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const emptyExperience = () => ({
  id: createId('exp'),
  role: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  summary: '',
  bullets: [''],
});

const emptyEducation = () => ({
  id: createId('edu'),
  school: '',
  degree: '',
  location: '',
  startDate: '',
  endDate: '',
  details: '',
});

export const useResumeStore = create<ResumeStore>((set) => ({
  data: defaultData,
  setField: (field, value) => set((state) => ({ data: { ...state.data, [field]: value } })),
  setProfilePhoto: (profilePhotoUrl) => set((state) => ({ data: { ...state.data, profilePhotoUrl } })),
  setContactField: (field, value) =>
    set((state) => ({ data: { ...state.data, contact: { ...state.data.contact, [field]: value } } })),
  addSkill: (skill) =>
    set((state) => ({
      data: { ...state.data, skills: [...state.data.skills, skill] },
    })),
  updateSkill: (index, value) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.map((skill, currentIndex) => (currentIndex === index ? value : skill)),
      },
    })),
  removeSkill: (index) =>
    set((state) => ({
      data: { ...state.data, skills: state.data.skills.filter((_, currentIndex) => currentIndex !== index) },
    })),
  addExperience: () => set((state) => ({ data: { ...state.data, experience: [...state.data.experience, emptyExperience()] } })),
  updateExperienceField: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      },
    })),
  updateExperienceBullet: (id, index, value) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((item) =>
          item.id === id
            ? { ...item, bullets: item.bullets.map((bullet, currentIndex) => (currentIndex === index ? value : bullet)) }
            : item,
        ),
      },
    })),
  addExperienceBullet: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((item) =>
          item.id === id ? { ...item, bullets: [...item.bullets, ''] } : item,
        ),
      },
    })),
  removeExperienceBullet: (id, index) =>
    set((state) => ({
      data: {
        ...state.data,
        experience: state.data.experience.map((item) =>
          item.id === id
            ? { ...item, bullets: item.bullets.filter((_, currentIndex) => currentIndex !== index) }
            : item,
        ),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      data: { ...state.data, experience: state.data.experience.filter((item) => item.id !== id) },
    })),
  addEducation: () => set((state) => ({ data: { ...state.data, education: [...state.data.education, emptyEducation()] } })),
  updateEducationField: (id, field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      data: { ...state.data, education: state.data.education.filter((item) => item.id !== id) },
    })),
  reset: () => set({ data: defaultData }),
}));
