# 🚀 Minimalist Developer Portfolio

A high-performance, minimalist developer portfolio built with **React**, **Vite**, and **Framer Motion**. This site is designed to be easily configurable via a central JSON-like configuration file, allowing you to update your profile, projects, and achievements without touching the core UI code.

---

## 🛠 Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Styling**: Vanilla CSS (Modern CSS variables)

---

## ⚙️ Configuration System

Most of the content on this site is driven by the central configuration file located at:
`file:///home/howtoquitvivek/portfolio/src/config.js`

### Key Configuration Areas:

- **Global Settings**: Set your `activeThemeName` and `faviconPath`.
- **Hero Section**: Update your name, titles, and call-to-action buttons.
- **About Experience**: Configure the "mobile app simulation" data, including stats, chat messages, and skills.
- **Work Section**: Define your service areas (Web Dev, ML, etc.) and their respective features.
- **Achievements**: Add milestones with dates and descriptions.

---

## 🖼 Asset Management

All static assets are stored in the `/public/assets` directory. These assets are referenced dynamically by the application and do not require manual imports.

### Directory Structure:
- `public/assets/hero/`: Main hero illustrations.
- `public/assets/work/`: Icons for the work section (e.g., `work-webdev.png`).
- `public/assets/achievement/`: Images for your milestones.
- `public/assets/about/[theme_name]/`: Custom themed images for the "About" section.

### Important: Adding New Assets
When adding new images, ensure the filename matches the `item` property in your `config.js`. 
For example, if an achievement has `item: 'cloud'`, the image should be named `achievement-cloud.png`.

---

## 🎨 Themes & Styling

The site uses a powerful CSS variable-based theming system.

1. **Colors**: Defined in `src/config.js` under the `theme` object.
2. **Glassmorphism**: The UI uses a "glass" aesthetic that automatically adapts colors from your theme config.
3. **Typography**: Custom fonts are imported in `src/index.css`.

---

## 🚀 Getting Started

### Development
To start the local development server:
```bash
npm run dev
```

### Production Build
To create an optimized production bundle:
```bash
npm run build
```
The build artifacts will be located in the `dist/` directory.

### Deployment
To deploy, simply upload the contents of the `dist/` folder to your favorite hosting service (GitHub Pages, Vercel, Netlify, etc.).

> [!IMPORTANT]
> Always run `npm run build` before deploying to ensure all your assets and configuration changes are correctly bundled.

---

## 📄 License
This project is for personal portfolio use.
