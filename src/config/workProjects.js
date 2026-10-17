export const WORK_PROJECTS = [
  {
    id: 'abhilash-tiwari',
    title: 'Abhilash Tiwari — Portfolio & CMS Platform',
    category: 'Verified Client Production Build',
    audience: 'Motion designers, video editors, and production agencies reviewing creative video projects.',
    problemSolved: 'Replaced scattered video links with a centralized, branded platform featuring dynamic project showcases, embedded video players, and a private admin panel.',
    deliverables: [
      'Production React 19 + Vite frontend with customized design tokens and smooth transitions',
      'Firebase Firestore database storing portfolio entries and categorized project metadata',
      'Authenticated admin portal (/admin) allowing the client to manage case studies without touching code',
      'Responsive video player modals and direct inquiry contact form with EmailJS integration'
    ],
    tech: ['React 19', 'Vite', 'Firebase Auth', 'Firestore', 'EmailJS', 'Swiper'],
    liveUrl: 'https://abhilash-tiwari-portfolio.vercel.app',
    repoUrl: 'https://github.com/howtoquitvivek/abhilash-tiwari-portfolio'
  },
  {
    id: 'edufinance',
    title: 'EduFinance — Interactive FinTech Learning Platform',
    category: 'Hackhazard 2025 Global Top 100 Demo',
    audience: 'Students, young professionals, and early investors seeking practical financial literacy.',
    problemSolved: 'Converts abstract investment concepts into an interactive curriculum backed by simulated market data and real-time knowledge verification.',
    deliverables: [
      'Modular lesson engine with interactive quiz checkpoints and instant progress tracking',
      'Simulated market data feed illustrating asset fluctuations and risk management strategies',
      'Responsive full-stack architecture built under 48-hour competitive hackathon constraints'
    ],
    tech: ['MERN Stack', 'React', 'Node.js', 'Express', 'Simulated WebSockets'],
    liveUrl: 'https://edufinance-bytegg.netlify.app/',
    repoUrl: 'https://github.com/parshadk/hackhazard_hackathon'
  },
  {
    id: 'systems-tools',
    title: 'Prahari & Anveshak — Internal Security & Geospatial Systems',
    category: 'Technical Systems Research',
    audience: 'Android security researchers and geospatial machine learning engineers.',
    problemSolved: 'Demonstrates deep backend and systems competency including static bytecode analysis and planetary data processing.',
    deliverables: [
      'Prahari: Static Android APK analyzer parsing manifests and DEX bytecode for security risks',
      'Anveshak (NASA Space Apps): Planetary satellite data visualization interface utilizing deep learning CNN models'
    ],
    tech: ['Python', 'Deep Learning', 'Static Analysis', 'Android Bytecode', 'QGIS'],
    liveUrl: null,
    repoUrl: 'https://github.com/howtoquitvivek/prahari-apk-analyzer'
  }
];
