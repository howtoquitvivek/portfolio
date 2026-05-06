import {
  Rocket,
  Database,
  Atom,
  Beaker,
  TrendingUp,
  BarChart2,
  Mic,
  CreditCard,
  BookOpen,
  BadgeCheck,
  Code,
  Mail,
  UserCheck,
  Smartphone
} from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';

const EMAIL = 'vivekbarman425@gmail.com';

export const config = {
  // Global Settings
  activeThemeName: 'pink',
  faviconPath: '/favicon_io_3/',

  // Contact Information
  contact: {
    email: EMAIL,
    socials: {
      github: {
        url: 'https://github.com/howtoquitvivek',
        handle: '@howtoquitvivek'
      },
      linkedin: {
        url: 'https://linkedin.com/in/vivek-barman',
        handle: 'vivek-barman'
      },
      instagram: {
        url: 'https://instagram.com/howtoquitvivek',
        handle: '@howtoquitvivek'
      }
    }
  },

  // Hero Section
  hero: {
    subtitle: 'VIVEK BARMAN — FULL-STACK DEVELOPER',
    title: {
      line1: ["I", "build", "scalable"],
      line2: ["full-stack", "applications"],
      highlight: "scalable"
    },
    description: "I’m a full-stack developer learning by building scalable applications and improving my backend and system design skills through real projects.",
    ctaPrimary: { label: 'Download Resume', href: '/resume.pdf', download: 'Vivek_Barman_Resume.pdf' },
    ctaSecondary: { label: 'See My Work', href: '/work?mode=work' }
  },

  // Theme Colors
  theme: {
    light: {
      primary: '#E57CD8',
      secondary: '#412A4C',
      accent: '#E57CD8',
      bg: '#FEFBFA',
      text: '#2C1338',
      border: 'rgba(44, 19, 56, 0.1)',
      inactiveBlend: '#FEFBFA'
    },
    dark: {
      primary: '#E57CD8',
      secondary: '#FEFBFA',
      accent: '#E57CD8',
      bg: '#120A17',
      text: '#FEFBFA',
      border: 'rgba(254, 251, 250, 0.1)',
      inactiveBlend: '#3c3742'
    }
  },

  // About Experience (Mobile App Simulation) Data
  aboutExperience: {
    userName: 'Vivek',
    stats: [
      {
        icon: Rocket,
        sublabel: 'WINS',
        value: '4+ Hackathon',
        color: '#FFB800'
      },
      {
        icon: Database,
        sublabel: 'Multimedia & Dev',
        value: '10+ Freelance',
        color: '#50C878'
      },
      {
        icon: Atom,
        sublabel: 'TECH DOMAINS',
        value: 'ML & Web Dev',
        color: '#8A70FF'
      },
      {
        icon: Beaker,
        sublabel: 'PM & BACKEND',
        value: 'Android App',
        color: '#4A90E2'
      }
    ],
    chatMessages: [
      "Android app developer Intern @Stock8",
      "Freelance developer and video editor",
      "Open source contributor and hackathon mentor",
      "Working on real-world industrial projects 🚀"
    ],
    skills: [
      { name: 'Web Dev', level: 85, color: '#8A70FF', icon: Atom },
      { name: 'AI/ML', level: 70, color: '#40E0D0', icon: TrendingUp },
      { name: 'Video Editing', level: 80, color: '#FFB84D', icon: Rocket }
    ],
    products: [
      { name: 'Stock App UI Kit', price: '$500' }
    ],
    navigation: [
      { label: 'Performance', icon: TrendingUp },
      { label: 'Stock', icon: BarChart2 },
      { label: 'Bill', icon: Mic, isMain: true },
      { label: 'Payments', icon: CreditCard },
      { label: 'Khata', icon: BookOpen }
    ]
  },

  // Work Page Configuration
  work: {
    title: "Work With Me",
    subtitle: "I'm open to real-world projects, collaborations, and learning opportunities where I can build and improve as a developer.",
    tabs: [
      {
        id: 'webdev',
        label: 'Websites',
        heading: 'Website Development',
        description: 'Building secure, data-driven applications with MERN, Firebase, and FastAPI. Specialist in, Businness portfolios, robust auth systems and complex interactive dashboards.',
        features: ['MERN & Firebase Integration', 'Flask/FastAPI Backends', 'Secure Auth & Dashboards', 'End-to-End Scalability'],
        cta: 'Start a project',
        ctaHref: `mailto:${EMAIL}?subject=Web Development Project`,
        item: 'webdev'
      },
      {
        id: 'ml',
        label: 'AI & ML',
        heading: 'Data-Driven Problem Solving',
        description: 'From text to image dataset analysis. I build predictive models/implement exising models and create synthetic datasets using Scikit-learn and HuggingFace.',
        features: ['Scikit-learn & HuggingFace', 'Anomaly Detection Models', 'Geospatial Data Analysis', 'Synthetic Dataset Design'],
        cta: 'Discuss an AI project',
        ctaHref: `mailto:${EMAIL}?subject=AI/ML Project`,
        item: 'ml'
      },
      {
        id: 'android',
        label: 'Android',
        heading: 'Android Mobile Apps',
        description: 'Developing performant mobile solutions with Expo and React Native. Focused on fintech-grade UI/UX and rapid prototyping.',
        features: ['Expo & React Native', 'Fintech UI/UX Design', 'Native Feature Integration', 'Rapid Prototyping'],
        cta: 'Build an app together',
        ctaHref: `mailto:${EMAIL}?subject=Android App Project`,
        item: 'android'
      },
      {
        id: 'opensource',
        label: 'Collaborate',
        heading: 'Open Source Contributor',
        description: 'Active contributor to the MetaBrainz ecosystem (ListenBrainz). I focus on core component building and codebase stability while never ignoring clear written explanations of my code.',
        features: ['ListenBrainz Contributor', 'Component Development', 'Bug Fixing & Refactoring', 'Collaborative Architecture'],
        cta: 'View my GitHub',
        ctaHref: 'https://github.com/howtoquitvivek',
        item: 'opensource'
      },
      {
        id: 'hireme',
        label: 'Freelance',
        heading: 'Business & Custom Solutions',
        description: 'High-velocity delivery for business portfolios and custom projects. 5-day turnaround with full end-to-end management and support.',
        features: ['5-Day Rapid Delivery', 'Post-Launch Support', 'Professional Business Portfolios', 'End-to-End Project Management'],
        cta: 'Get in touch',
        ctaHref: `mailto:${EMAIL}?subject=Freelance Opportunity`,
        item: 'hireme'
      }
    ]
  },

  // Achievements Data
  achievements: [
    {
      title: "AWS Certified Cloud Practitioner",
      desc: "Earned my first global certification! (CLF-02)",
      date: "Apr 2026",
      item: "cloud"
    },
    {
      title: "App Development Intern @Stock8",
      desc: "Started working on live application to build real-world mobile solutions and improve my programming practices.",
      date: "Jan 2026",
      item: "internStock8"
    },
    {
      title: "CyberShield 2025 Winner",
      desc: "Secured first place at the National CyberShield Hackathon at JEC Jabalpur, competing against a massive pool of talented developers.",
      date: "Nov 2025",
      item: "hackathonCS"
    },
    {
      title: "HackHazard 2025 Top 100",
      desc: "Built EduFinance with Team Bytegg and secured a Top 100 spot globally out of thousands of participating teams.",
      date: "Jul 2025",
      item: "hackathonHH"
    }
  ]
};
