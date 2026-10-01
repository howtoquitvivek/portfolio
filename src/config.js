import {
  Rocket,
  Database,
  Atom,
  Beaker,
  TrendingUp,
  BarChart2,
  Mic,
  CreditCard,
  BookOpen
} from 'lucide-react';

const EMAIL = 'vivekbarman425@gmail.com';

export const config = {
  // Global Settings
  faviconPath: '/favicon/',

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
    ctaPrimary: { label: 'Resume ⤓', href: '/resume.pdf', download: 'Vivek_Barman_Resume.pdf' }
  },

  // Theme Colors
  theme: {
    light: {
      primary: '#18181B',
      secondary: '#09090B',
      accent: '#52525B',
      bg: '#FAFAFA',
      text: '#09090B',
      border: 'rgba(0, 0, 0, 0.08)',
      inactiveBlend: '#F4F4F5'
    },
    dark: {
      primary: '#EDEDED',
      secondary: '#FAFAFA',
      accent: '#A1A1AA',
      bg: '#0A0B0E',
      text: '#FAFAFA',
      border: 'rgba(255, 255, 255, 0.08)',
      inactiveBlend: '#14151B'
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
