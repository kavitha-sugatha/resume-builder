import { create } from 'zustand';
import type { ResumeData } from './types';

const defaultData: ResumeData = {
  profilePhotoUrl: 'dummy-headshot.svg',
  fullName: 'Maya Iyer',
  headline: 'Seattle, Washington | (206) 555-0198 | maya.iyer@example.com',
  summary:
    'Product-minded software engineer with 6+ years of experience building customer-facing web applications, internal tools, and polished design systems. Known for translating ambiguous requirements into clear interfaces, collaborating closely with product and design partners, and delivering reliable releases across fast-moving teams. Comfortable working across frontend architecture, API integration, accessibility, and design quality reviews.',
  contact: {
    phone: '(206) 555-0198',
    email: 'maya.iyer@example.com',
    location: 'Seattle, Washington',
    linkedin: 'linkedin.com/in/maya-iyer-ui',
    website: 'maya-iyer.dev',
  },
  skills: [
    'React, TypeScript, Vite',
    'Design Systems, Component Libraries, Storybook',
    'HTML, CSS, JavaScript, Accessibility',
    'REST API Integration, State Management',
    'Performance Optimization, Code Review',
    'Figma Collaboration, UI Specifications',
    'Analytics, A/B Testing, Experimentation',
    'Cross-functional Communication, Product Thinking',
    'Documentation, Mentoring, Agile Delivery',
    'English, Malayalam, Hindi',
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Engineer',
      company: 'Northstar Health',
      location: 'Seattle, Washington',
      startDate: 'Jun 2022',
      endDate: 'Present',
      summary: 'Leading development on a patient operations platform used by care coordinators, clinicians, and support teams.',
      bullets: [
        'Rebuilt core workflow screens in React and TypeScript, reducing task completion time and improving perceived performance.',
        'Established a reusable design system and documented component patterns for product and engineering teams.',
        'Partnered with product managers and UX designers to ship accessible, responsive releases on a weekly cadence.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Product Engineer',
      company: 'Brightleaf Studio',
      location: 'Remote',
      startDate: 'Jan 2020',
      endDate: 'May 2022',
      summary: 'Built client-facing portals and internal dashboards for a boutique digital product studio.',
      bullets: [
        'Owned frontend delivery for multiple web apps, from initial prototypes through production handoff.',
        'Improved Lighthouse scores and interaction quality by tuning bundles, caching, and rendering paths.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Software Engineer',
      company: 'Cloudline Labs',
      location: 'Austin, Texas',
      startDate: 'Jul 2017',
      endDate: 'Dec 2019',
      summary: 'Supported a SaaS analytics product with a focus on dashboards, onboarding flows, and API integrations.',
      bullets: [
        'Implemented dashboard modules and reusable UI primitives for a multi-tenant analytics experience.',
        'Worked closely with backend engineers to define API contracts and reduce integration defects.',
      ],
    },
    {
      id: 'exp-4',
      role: 'Frontend Intern',
      company: 'Harbor Digital',
      location: 'Seattle, Washington',
      startDate: 'May 2016',
      endDate: 'Aug 2016',
      summary: 'Supported a small team building promotional sites and marketing assets for local businesses.',
      bullets: [
        'Converted design mockups into responsive landing pages and reusable layout blocks.',
        'Assisted with content updates, QA checks, and browser compatibility validation.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Washington',
      degree: 'B.S. in Informatics',
      location: 'Seattle, Washington',
      startDate: '2012',
      endDate: '2016',
      details: 'Focused on human-computer interaction, web application design, and information architecture.',
    },
    {
      id: 'edu-2',
      school: 'General Assembly',
      degree: 'Frontend Development Immersive',
      location: 'Remote',
      startDate: '2017',
      endDate: '2017',
      details: 'Completed an intensive program covering modern JavaScript, React, testing, and application architecture.',
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
