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

export const config = {
  // Global Settings
  activeThemeName: 'pink',
  faviconPath: '/favicon_io_3/',

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
    ctaSecondary: { label: 'See My Work', href: '/work' }
  },

  // Theme Colors
  theme: {
    light: {
      primary: '#E57CD8',
      secondary: '#412A4C',
      accent: '#E57CD8',
      bg: '#FEFBFA',
      text: '#2C1338',
      border: 'rgba(44, 19, 56, 0.1)'
    },
    dark: {
      primary: '#E57CD8',
      secondary: '#FEFBFA',
      accent: '#E57CD8',
      bg: '#120A17',
      text: '#FEFBFA',
      border: 'rgba(254, 251, 250, 0.1)'
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
        label: 'Web Development',
        heading: 'Full-stack web applications',
        description: 'Building modern, responsive web applications from concept to deployment. I work across the entire stack — React frontends, Node/Express backends, databases, and cloud deployment.',
        features: ['React & Next.js SPAs', 'REST & GraphQL APIs', 'Database design & optimization', 'CI/CD & cloud deployment'],
        cta: 'Start a project',
        ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Web Development Project',
        item: 'webdev' // used for asset resolution
      },
      {
        id: 'ml',
        label: 'Machine Learning',
        heading: 'Intelligent solutions with ML',
        description: 'Applying machine learning to solve real-world problems — from data preprocessing and model training to evaluation and deployment of predictive systems.',
        features: ['Data analysis & visualization', 'Model training & evaluation', 'NLP & computer vision', 'ML pipeline development'],
        cta: 'Discuss an ML project',
        ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Machine Learning Project',
        item: 'ml'
      },
      {
        id: 'opensource',
        label: 'Open Source',
        heading: 'Contributing to open source',
        description: "I actively contribute to open-source projects and am always looking for impactful repositories to collaborate on. Let's build something the community can use.",
        features: ['Bug fixes & feature PRs', 'Documentation improvements', 'Code reviews & mentoring', 'Community-driven projects'],
        cta: 'View my GitHub',
        ctaHref: 'https://github.com/howtoquitvivek',
        item: 'opensource'
      },
      {
        id: 'hireme',
        label: 'Hire Me',
        heading: 'Available for opportunities',
        description: "I'm open to internships, freelance work, and full-time roles where I can grow and deliver value. I bring strong fundamentals, fast learning, and genuine passion.",
        features: ['Internships & co-ops', 'Freelance contracts', 'Full-time positions', 'Remote or on-site'],
        cta: 'Get in touch',
        ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Job Opportunity',
        item: 'hireme'
      },
      {
        id: 'android',
        label: 'Android Apps',
        heading: 'Native Android development',
        description: 'Crafting performant Android applications with Kotlin and Jetpack Compose. From idea through Play Store publishing — clean architecture, smooth UX.',
        features: ['Kotlin & Jetpack Compose', 'Material Design 3', 'Room, Retrofit & Hilt', 'Play Store deployment'],
        cta: 'Build an app together',
        ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Android App Project',
        item: 'android'
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
